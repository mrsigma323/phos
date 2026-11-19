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
import android.view.View;
import android.view.WindowManager;
import android.widget.LinearLayout;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
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
    View topPad, botPad;
    static final int WINE = 0xFF4A1416, CREAM = 0xFFF6F1E7, DARK = 0xFF17110F;

    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);
        // Pantalla completa controlada: desde Android 15 el sistema dibuja la app bajo las barras
        // (de estado y de navegación). Reservamos su espacio con dos franjas de color para que
        // ningún botón quede tapado, en todas las versiones y con gestos o con botones.
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
        getWindow().setStatusBarColor(Color.TRANSPARENT);
        getWindow().setNavigationBarColor(Color.TRANSPARENT);
        if (Build.VERSION.SDK_INT >= 29) { getWindow().setNavigationBarContrastEnforced(false); getWindow().setStatusBarContrastEnforced(false); }
        if (Build.VERSION.SDK_INT >= 28) {
            WindowManager.LayoutParams lp = getWindow().getAttributes();
            lp.layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
            getWindow().setAttributes(lp);
        }
        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setBackgroundColor(WINE);
        topPad = new View(this); topPad.setBackgroundColor(WINE);
        botPad = new View(this);
        web = new WebView(this);
        web.setBackgroundColor(WINE); // mismo vino que la pantalla de carga: sin destello blanco
        root.addView(topPad, new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, 0));
        root.addView(web, new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, 0, 1f));
        root.addView(botPad, new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, 0));
        setContentView(root);
        setBars(false);
        ViewCompat.setOnApplyWindowInsetsListener(root, (v, ins) -> {
            Insets sb = ins.getInsets(WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout());
            Insets kb = ins.getInsets(WindowInsetsCompat.Type.ime());
            v.setPadding(sb.left, 0, sb.right, 0);
            topPad.getLayoutParams().height = sb.top;
            botPad.getLayoutParams().height = Math.max(sb.bottom, kb.bottom);
            topPad.requestLayout(); botPad.requestLayout();
            return WindowInsetsCompat.CONSUMED;
        });
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setTextZoom(100);
        tts = new TextToSpeech(this, status -> { ttsReady = (status == TextToSpeech.SUCCESS); if (ttsReady) Extras.listen(tts, this::toJs); });
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
        // ---------- Tema: color de la franja inferior del sistema ----------
        @JavascriptInterface
        public void setTheme(boolean dark) { runOnUiThread(() -> setBars(dark)); }

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
        /** Solo la APK de prueba (depurable) desbloquea Premium; la de Google Play no es depurable. */
        @JavascriptInterface public boolean isTestBuild() { return (getApplicationInfo().flags & android.content.pm.ApplicationInfo.FLAG_DEBUGGABLE) != 0; }

        // ---------- Voz continua, compartir, fondo, widget y cuenta ----------
        @JavascriptInterface public void speakSeq(String json, String lang) { if (ttsReady) Extras.speakSeq(tts, json, lang); }
        @JavascriptInterface public void shareText(String txt) { runOnUiThread(() -> Extras.shareText(MainActivity.this, txt)); }
        @JavascriptInterface public void shareImage(String b64, String txt) { Extras.shareImage(MainActivity.this, b64, txt); }
        @JavascriptInterface public void setWallpaper(String b64) { Extras.setWallpaper(MainActivity.this, b64); }
        @JavascriptInterface public void widgetSet(String json) { Extras.widgetSet(MainActivity.this, json); }
        @JavascriptInterface public void ruleWidgetSet(String json) { RuleWidget.set(MainActivity.this, json); }
        @JavascriptInterface public String ruleWidgetGet() { return RuleWidget.get(MainActivity.this); }
        /** «Entrar con Google» solo se muestra cuando el ID de cliente está configurado. */
        // ---------- Modo lectura: «No molestar» con permiso del usuario ----------
        @JavascriptInterface public boolean dndAllowed() { return Dnd.allowed(MainActivity.this); }
        @JavascriptInterface public void dndAsk() { Dnd.ask(MainActivity.this); }
        @JavascriptInterface public boolean dndOn(int minutes) { return Dnd.on(MainActivity.this, minutes); }
        @JavascriptInterface public void dndOff() { Dnd.off(MainActivity.this); }
        @JavascriptInterface public void vibrate() { try { android.os.Vibrator v = (android.os.Vibrator) getSystemService(VIBRATOR_SERVICE); if (v == null) return; if (android.os.Build.VERSION.SDK_INT >= 26) v.vibrate(android.os.VibrationEffect.createWaveform(new long[]{0, 120, 120, 120}, -1)); else v.vibrate(new long[]{0, 120, 120, 120}, -1); } catch (Exception e) { } }
        @JavascriptInterface public boolean googleReady() { return !getString(R.string.google_web_client_id).isEmpty(); }
        @JavascriptInterface public void googleSignIn() { runOnUiThread(() -> Extras.googleSignIn(MainActivity.this, MainActivity.this::toJs)); }
    }

    @Override
    public void onRequestPermissionsResult(int code, String[] p, int[] r) {
        boolean ok = r.length > 0 && r[0] == PackageManager.PERMISSION_GRANTED;
        toJs("window.PhosNotif&&PhosNotif.onPermission(" + ok + ")");
    }

    @Override
    protected void onResume() { super.onResume(); if (billing != null) billing.refresh(); toJs("window.PhosFocus&&PhosFocus.onResume()"); toJs("window.PhosRule&&PhosRule.sync()"); }

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
    /** Colores de las franjas del sistema según el tema de la app (claro u oscuro). */
    void setBars(boolean dark) {
        // Antes de Android 8 los iconos de la barra de navegación son siempre blancos: franja oscura.
        boolean lightNav = !dark && Build.VERSION.SDK_INT >= 26;
        botPad.setBackgroundColor(dark ? DARK : (lightNav ? CREAM : WINE));
        WindowInsetsControllerCompat c = WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
        c.setAppearanceLightStatusBars(false);
        c.setAppearanceLightNavigationBars(lightNav);
    }

}
