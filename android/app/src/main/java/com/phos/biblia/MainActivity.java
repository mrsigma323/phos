package com.phos.biblia;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.res.AssetManager;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

/**
 * Phos para Android: la app web (assets/www) dentro de un WebView,
 * con voz del sistema, cobros de Google Play (Billing) y recordatorios.
 */
public class MainActivity extends Activity {
    static final String HOST = "appassets.androidplatform.net";
    WebView web;
    TextToSpeech tts;
    boolean ttsReady = false;
    Billing billing;

    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);
        getWindow().setStatusBarColor(Color.rgb(74, 20, 22));
        getWindow().setNavigationBarColor(Color.rgb(246, 241, 231));
        web = new WebView(this);
        setContentView(web);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setTextZoom(100);
        tts = new TextToSpeech(this, status -> ttsReady = (status == TextToSpeech.SUCCESS));
        billing = new Billing(this, this::toJs);
        web.addJavascriptInterface(new Bridge(), "PhosApp");
        web.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView v, WebResourceRequest r) {
                Uri u = r.getUrl();
                if (!HOST.equals(u.getHost())) return null;
                String path = u.getPath();
                if (path == null || path.equals("/") || path.isEmpty()) path = "/index.html";
                Map<String, String> h = new HashMap<>();
                h.put("Access-Control-Allow-Origin", "*");
                h.put("Cache-Control", "no-cache");
                try {
                    InputStream in = getAssets().open("www" + path, AssetManager.ACCESS_STREAMING);
                    String m = mime(path);
                    return new WebResourceResponse(m, m.startsWith("text") || path.endsWith(".json") ? "utf-8" : null, 200, "OK", h, in);
                } catch (Exception e) {
                    return new WebResourceResponse("text/plain", "utf-8", 404, "Not Found", h, null);
                }
            }
            @Override
            public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest r) {
                Uri u = r.getUrl();
                if (HOST.equals(u.getHost())) return false;
                open(u);
                return true;
            }
        });
        if (b != null) web.restoreState(b);
        else web.loadUrl("https://" + HOST + "/index.html" + deepLink(getIntent()));
        Reminders.rescheduleAll(this);
    }

    /** Una notificación puede abrir una sección concreta (p. ej. #lecturas). */
    static String deepLink(Intent i) {
        String d = i == null ? null : i.getStringExtra("open");
        return d == null ? "" : "#" + d;
    }

    @Override
    protected void onNewIntent(Intent i) {
        super.onNewIntent(i);
        String d = deepLink(i);
        if (!d.isEmpty()) toJs("window.phosOpen&&phosOpen(" + quote(d.substring(1)) + ")");
    }

    void open(Uri u) { try { startActivity(new Intent(Intent.ACTION_VIEW, u)); } catch (Exception e) { } }

    /** Ejecuta JavaScript en la app desde cualquier hilo. */
    void toJs(String js) { runOnUiThread(() -> { if (web != null) web.evaluateJavascript(js, null); }); }

    static String quote(String s) {
        StringBuilder o = new StringBuilder("\"");
        for (char c : s.toCharArray()) {
            if (c == '"' || c == '\\') o.append('\\').append(c);
            else if (c < 32) o.append(String.format("\\u%04x", (int) c));
            else o.append(c);
        }
        return o.append('"').toString();
    }

    static String mime(String p) {
        if (p.endsWith(".html")) return "text/html";
        if (p.endsWith(".json")) return "application/json";
        if (p.endsWith(".js")) return "text/javascript";
        if (p.endsWith(".css")) return "text/css";
        if (p.endsWith(".png")) return "image/png";
        if (p.endsWith(".webmanifest")) return "application/manifest+json";
        return "application/octet-stream";
    }

    class Bridge {
        // ---------- Voz ----------
        @JavascriptInterface
        public void speak(String text, String lang) {
            if (!ttsReady) return;
            try {
                if (lang != null && lang.length() > 0) tts.setLanguage(Locale.forLanguageTag(lang));
                String[] parts = text.split("\\|");
                boolean first = true;
                for (String p : parts) {
                    if (p.trim().isEmpty()) continue;
                    if (!first) tts.playSilentUtterance(450, TextToSpeech.QUEUE_ADD, "pausa");
                    tts.setSpeechRate(first ? 0.85f : 0.6f);
                    tts.speak(p, first ? TextToSpeech.QUEUE_FLUSH : TextToSpeech.QUEUE_ADD, null, "phos");
                    first = false;
                }
            } catch (Exception e) { }
        }
        @JavascriptInterface
        public void stop() { try { tts.stop(); } catch (Exception e) { } }

        // ---------- Google Play: cobros ----------
        @JavascriptInterface public boolean billingAvailable() { return true; }
        /** Pide a Google Play precios y compras activas; responde en PhosPay.onProducts / onEntitlement. */
        @JavascriptInterface public void billingRefresh() { billing.refresh(); }
        /** productId: "phos_premium" (suscripción) o "apoyo_2", "apoyo_5", "apoyo_10" (aportaciones). basePlan: "mensual" o "anual". */
        @JavascriptInterface public void billingBuy(String productId, String basePlan) { runOnUiThread(() -> billing.buy(MainActivity.this, productId, basePlan)); }
        /** Abre la pantalla de Google Play para gestionar o cancelar la suscripción. */
        @JavascriptInterface public void billingManage() {
            open(Uri.parse("https://play.google.com/store/account/subscriptions?sku=" + Billing.SUB + "&package=" + getPackageName()));
        }

        // ---------- Recordatorios ----------
        /** json: [{"id":"oracion-manana","at":1731500000000,"title":"…","body":"…","open":"hoy"}, …] */
        @JavascriptInterface public void remindersSet(String json) { Reminders.replace(MainActivity.this, json); }
        @JavascriptInterface public void remindersClear() { Reminders.replace(MainActivity.this, "[]"); }
        @JavascriptInterface public boolean notificationsAllowed() {
            return Build.VERSION.SDK_INT < 33 || checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED;
        }
        @JavascriptInterface public void notificationsAsk() {
            if (Build.VERSION.SDK_INT >= 33) runOnUiThread(() -> requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, 7));
        }
        @JavascriptInterface public String appVersion() { return BuildConfigLite.VERSION; }
    }

    @Override
    public void onRequestPermissionsResult(int code, String[] p, int[] r) {
        boolean ok = r.length > 0 && r[0] == PackageManager.PERMISSION_GRANTED;
        toJs("window.PhosNotif&&PhosNotif.onPermission(" + ok + ")");
    }

    @Override
    protected void onResume() { super.onResume(); if (billing != null) billing.refresh(); }

    @Override
    protected void onSaveInstanceState(Bundle o) { super.onSaveInstanceState(o); web.saveState(o); }

    @Override
    public void onBackPressed() {
        web.evaluateJavascript("window.phosBack?window.phosBack():false", new ValueCallback<String>() {
            public void onReceiveValue(String v) {
                if (!"true".equals(v)) MainActivity.super.onBackPressed();
            }
        });
    }

    @Override
    protected void onDestroy() {
        if (tts != null) tts.shutdown();
        if (billing != null) billing.end();
        if (web != null) web.destroy();
        super.onDestroy();
    }
}
