package com.phos.biblia;

import android.app.Activity;
import android.content.Context;
import com.android.billingclient.api.AcknowledgePurchaseParams;
import com.android.billingclient.api.BillingClient;
import com.android.billingclient.api.BillingClientStateListener;
import com.android.billingclient.api.BillingFlowParams;
import com.android.billingclient.api.BillingResult;
import com.android.billingclient.api.ConsumeParams;
import com.android.billingclient.api.PendingPurchasesParams;
import com.android.billingclient.api.ProductDetails;
import com.android.billingclient.api.Purchase;
import com.android.billingclient.api.PurchasesUpdatedListener;
import com.android.billingclient.api.QueryProductDetailsParams;
import com.android.billingclient.api.QueryPurchasesParams;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;

/**
 * Cobros con Google Play (Play Billing Library 8).
 *
 * Productos que hay que crear en Play Console (mismos identificadores):
 *  - Suscripción "phos_premium" con dos planes base: "mensual" y "anual"
 *    (opcional: oferta de prueba gratuita de 7 días en cada plan).
 *  - Productos únicos consumibles para «Apoyar a Phos»: "apoyo_2", "apoyo_5", "apoyo_10".
 *
 * La app web recibe los resultados en:
 *  PhosPay.onProducts(lista), PhosPay.onEntitlement(estado), PhosPay.onPurchase(compra), PhosPay.onError(código, texto)
 */
class Billing implements PurchasesUpdatedListener {
    static final String SUB = "phos_premium";
    static final List<String> TIPS = Arrays.asList("apoyo_2", "apoyo_5", "apoyo_10");

    final BillingClient client;
    final Consumer<String> js;
    final Map<String, ProductDetails> details = new HashMap<>();
    boolean ready = false;

    Billing(Context ctx, Consumer<String> js) {
        this.js = js;
        client = BillingClient.newBuilder(ctx)
                .setListener(this)
                .enablePendingPurchases(PendingPurchasesParams.newBuilder().enableOneTimeProducts().build())
                .enableAutoServiceReconnection()
                .build();
        connect();
    }

    void connect() {
        client.startConnection(new BillingClientStateListener() {
            @Override public void onBillingSetupFinished(BillingResult r) {
                ready = r.getResponseCode() == BillingClient.BillingResponseCode.OK;
                if (ready) refresh(); else error(r);
            }
            @Override public void onBillingServiceDisconnected() { ready = false; }
        });
    }

    void end() { try { client.endConnection(); } catch (Exception e) { } }

    /** Precios localizados + compras activas. */
    void refresh() {
        if (!ready) return;
        List<QueryProductDetailsParams.Product> subs = new ArrayList<>();
        subs.add(QueryProductDetailsParams.Product.newBuilder().setProductId(SUB).setProductType(BillingClient.ProductType.SUBS).build());
        List<QueryProductDetailsParams.Product> tips = new ArrayList<>();
        for (String t : TIPS) tips.add(QueryProductDetailsParams.Product.newBuilder().setProductId(t).setProductType(BillingClient.ProductType.INAPP).build());
        query(subs);
        query(tips);
        client.queryPurchasesAsync(QueryPurchasesParams.newBuilder().setProductType(BillingClient.ProductType.SUBS).build(),
                (r, list) -> { if (r.getResponseCode() == BillingClient.BillingResponseCode.OK) entitlement(list); });
        // Aportaciones que quedaron sin consumir (p. ej. se cerró la app a mitad).
        client.queryPurchasesAsync(QueryPurchasesParams.newBuilder().setProductType(BillingClient.ProductType.INAPP).build(),
                (r, list) -> { if (r.getResponseCode() == BillingClient.BillingResponseCode.OK) for (Purchase p : list) handle(p); });
    }

    void query(List<QueryProductDetailsParams.Product> products) {
        client.queryProductDetailsAsync(QueryProductDetailsParams.newBuilder().setProductList(products).build(), (r, res) -> {
            if (r.getResponseCode() != BillingClient.BillingResponseCode.OK) { error(r); return; }
            StringBuilder o = new StringBuilder("[");
            for (ProductDetails d : res.getProductDetailsList()) {
                details.put(d.getProductId(), d);
                if (o.length() > 1) o.append(',');
                o.append(describe(d));
            }
            js.accept("window.PhosPay&&PhosPay.onProducts(" + o.append(']') + ")");
        });
    }

    /** Resumen JSON de un producto con sus precios ya traducidos por Google Play. */
    static String describe(ProductDetails d) {
        StringBuilder o = new StringBuilder("{\"id\":" + MainActivity.quote(d.getProductId()) + ",\"type\":" + MainActivity.quote(d.getProductType()));
        if (d.getOneTimePurchaseOfferDetails() != null)
            o.append(",\"price\":").append(MainActivity.quote(d.getOneTimePurchaseOfferDetails().getFormattedPrice()));
        if (d.getSubscriptionOfferDetails() != null) {
            o.append(",\"plans\":[");
            boolean first = true;
            for (ProductDetails.SubscriptionOfferDetails s : d.getSubscriptionOfferDetails()) {
                List<ProductDetails.PricingPhase> ph = s.getPricingPhases().getPricingPhaseList();
                ProductDetails.PricingPhase last = ph.get(ph.size() - 1);
                boolean trial = false;
                for (ProductDetails.PricingPhase p : ph) if (p.getPriceAmountMicros() == 0) trial = true;
                if (!first) o.append(',');
                first = false;
                o.append("{\"basePlan\":").append(MainActivity.quote(s.getBasePlanId()))
                 .append(",\"offer\":").append(s.getOfferId() == null ? "null" : MainActivity.quote(s.getOfferId()))
                 .append(",\"price\":").append(MainActivity.quote(last.getFormattedPrice()))
                 .append(",\"period\":").append(MainActivity.quote(last.getBillingPeriod()))
                 .append(",\"trial\":").append(trial).append('}');
            }
            o.append(']');
        }
        return o.append('}').toString();
    }

    void buy(Activity a, String productId, String basePlan) {
        ProductDetails d = details.get(productId);
        if (d == null) { js.accept("window.PhosPay&&PhosPay.onError(-2,\"Producto no disponible todavía\")"); refresh(); return; }
        BillingFlowParams.ProductDetailsParams.Builder p = BillingFlowParams.ProductDetailsParams.newBuilder().setProductDetails(d);
        if (d.getSubscriptionOfferDetails() != null) {
            // Preferimos la oferta con prueba gratuita del plan elegido; si no hay, el plan base.
            String token = null;
            for (ProductDetails.SubscriptionOfferDetails s : d.getSubscriptionOfferDetails()) {
                if (basePlan != null && !basePlan.equals(s.getBasePlanId())) continue;
                if (token == null || s.getOfferId() != null) token = s.getOfferToken();
            }
            if (token == null) { js.accept("window.PhosPay&&PhosPay.onError(-2,\"Plan no disponible\")"); return; }
            p.setOfferToken(token);
        }
        BillingResult r = client.launchBillingFlow(a, BillingFlowParams.newBuilder().setProductDetailsParamsList(Arrays.asList(p.build())).build());
        if (r.getResponseCode() != BillingClient.BillingResponseCode.OK) error(r);
    }

    @Override
    public void onPurchasesUpdated(BillingResult r, List<Purchase> list) {
        if (r.getResponseCode() == BillingClient.BillingResponseCode.OK && list != null) {
            for (Purchase p : list) handle(p);
            refresh();
        } else if (r.getResponseCode() != BillingClient.BillingResponseCode.USER_CANCELED) error(r);
    }

    void handle(Purchase p) {
        if (p.getPurchaseState() != Purchase.PurchaseState.PURCHASED) return;   // pendiente: se resuelve más tarde
        boolean tip = false;
        for (String id : p.getProducts()) if (TIPS.contains(id)) tip = true;
        // El servidor de Phos guarda el recibo (y lo verifica con Google cuando esté configurado).
        js.accept("window.PhosPay&&PhosPay.onPurchase({\"products\":" + list(p.getProducts()) + ",\"token\":" + MainActivity.quote(p.getPurchaseToken())
                + ",\"order\":" + MainActivity.quote(p.getOrderId() == null ? "" : p.getOrderId()) + ",\"tip\":" + tip + "})");
        if (tip) {
            client.consumeAsync(ConsumeParams.newBuilder().setPurchaseToken(p.getPurchaseToken()).build(), (res, t) -> { });
        } else if (!p.isAcknowledged()) {
            client.acknowledgePurchase(AcknowledgePurchaseParams.newBuilder().setPurchaseToken(p.getPurchaseToken()).build(), res -> { });
        }
    }

    void entitlement(List<Purchase> list) {
        boolean active = false;
        String token = "";
        for (Purchase p : list)
            if (p.getProducts().contains(SUB) && p.getPurchaseState() == Purchase.PurchaseState.PURCHASED) { active = true; token = p.getPurchaseToken(); if (!p.isAcknowledged()) handle(p); }
        js.accept("window.PhosPay&&PhosPay.onEntitlement({\"premium\":" + active + ",\"token\":" + MainActivity.quote(token) + "})");
    }

    static String list(List<String> l) {
        StringBuilder o = new StringBuilder("[");
        for (String s : l) { if (o.length() > 1) o.append(','); o.append(MainActivity.quote(s)); }
        return o.append(']').toString();
    }

    void error(BillingResult r) {
        js.accept("window.PhosPay&&PhosPay.onError(" + r.getResponseCode() + "," + MainActivity.quote(r.getDebugMessage()) + ")");
    }
}
