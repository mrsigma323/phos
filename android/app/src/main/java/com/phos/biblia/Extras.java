package com.phos.biblia;

import android.app.Activity;
import android.app.WallpaperManager;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.CancellationSignal;
import android.os.Handler;
import android.os.Looper;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.util.Base64;
import androidx.core.content.FileProvider;
import androidx.credentials.Credential;
import androidx.credentials.CredentialManager;
import androidx.credentials.CredentialManagerCallback;
import androidx.credentials.CustomCredential;
import androidx.credentials.GetCredentialRequest;
import androidx.credentials.GetCredentialResponse;
import androidx.credentials.exceptions.GetCredentialException;
import com.google.android.libraries.identity.googleid.GetSignInWithGoogleOption;
import com.google.android.libraries.identity.googleid.GoogleIdTokenCredential;
import java.io.File;
import java.io.FileOutputStream;
import java.util.concurrent.Executor;
import java.util.function.Consumer;
import org.json.JSONArray;

/** Funciones extra del puente: voz continua, compartir, fondo de pantalla, widget y entrar con Google. */
class Extras {
    static final Executor MAIN = r -> new Handler(Looper.getMainLooper()).post(r);

    // ---------- Voz: leer un capítulo versículo a versículo ----------
    static void listen(TextToSpeech tts, Consumer<String> js) {
        tts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
            @Override public void onStart(String id) {
                if (id != null && id.startsWith("seq:")) js.accept("window.PhosTTS&&PhosTTS.onVerse(" + id.split(":")[1] + ")");
            }
            @Override public void onDone(String id) {
                if (id == null || !id.startsWith("seq:")) return;
                String[] p = id.split(":");
                if (p[1].equals(p[2])) js.accept("window.PhosTTS&&PhosTTS.onEnd()");
            }
            @Override public void onError(String id) { }
        });
    }
    static void speakSeq(TextToSpeech tts, String json, String lang) {
        try {
            JSONArray a = new JSONArray(json);
            tts.stop();
            if (lang != null && !lang.isEmpty()) tts.setLanguage(java.util.Locale.forLanguageTag(lang));
            tts.setSpeechRate(0.95f);
            int last = a.length() - 1;
            for (int i = 0; i <= last; i++) {
                tts.speak(a.getString(i), i == 0 ? TextToSpeech.QUEUE_FLUSH : TextToSpeech.QUEUE_ADD, null, "seq:" + i + ":" + last);
                if (i < last) tts.playSilentUtterance(250, TextToSpeech.QUEUE_ADD, "pausa");
            }
        } catch (Exception e) { }
    }

    // ---------- Compartir ----------
    static void shareText(Activity a, String txt) {
        Intent i = new Intent(Intent.ACTION_SEND).setType("text/plain").putExtra(Intent.EXTRA_TEXT, txt);
        a.startActivity(Intent.createChooser(i, null));
    }
    static void shareImage(Activity a, String b64, String txt) {
        new Thread(() -> {
            try {
                File dir = new File(a.getCacheDir(), "share");
                dir.mkdirs();
                File f = new File(dir, "phos.png");
                try (FileOutputStream o = new FileOutputStream(f)) { o.write(Base64.decode(b64, Base64.DEFAULT)); }
                Uri u = FileProvider.getUriForFile(a, a.getPackageName() + ".files", f);
                Intent i = new Intent(Intent.ACTION_SEND).setType("image/png").putExtra(Intent.EXTRA_STREAM, u)
                        .addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                if (txt != null && !txt.isEmpty()) i.putExtra(Intent.EXTRA_TEXT, txt);
                a.runOnUiThread(() -> a.startActivity(Intent.createChooser(i, null)));
            } catch (Exception e) { }
        }).start();
    }
    static void setWallpaper(Context c, String b64) {
        new Thread(() -> {
            try {
                byte[] d = Base64.decode(b64, Base64.DEFAULT);
                Bitmap bmp = BitmapFactory.decodeByteArray(d, 0, d.length);
                WallpaperManager.getInstance(c).setBitmap(bmp);
            } catch (Exception e) { }
        }).start();
    }

    // ---------- Widget ----------
    static void widgetSet(Context c, String json) {
        c.getSharedPreferences("phos_widget", Context.MODE_PRIVATE).edit().putString("days", json).apply();
        AppWidgetManager m = AppWidgetManager.getInstance(c);
        int[] ids = m.getAppWidgetIds(new ComponentName(c, PhosWidget.class));
        if (ids.length > 0) PhosWidget.draw(c, m, ids);
    }

    // ---------- Entrar con Google (Credential Manager) ----------
    static void googleSignIn(Activity a, Consumer<String> js) {
        String clientId = a.getString(R.string.google_web_client_id);
        if (clientId.isEmpty()) { js.accept("window.PhosAuth&&PhosAuth.onError(\"Falta configurar el ID de cliente de Google\")"); return; }
        GetSignInWithGoogleOption opt = new GetSignInWithGoogleOption.Builder(clientId).build();
        GetCredentialRequest req = new GetCredentialRequest.Builder().addCredentialOption(opt).build();
        CredentialManager.create(a).getCredentialAsync(a, req, new CancellationSignal(), MAIN,
            new CredentialManagerCallback<GetCredentialResponse, GetCredentialException>() {
                @Override public void onResult(GetCredentialResponse r) {
                    Credential cr = r.getCredential();
                    if (cr instanceof CustomCredential && GoogleIdTokenCredential.TYPE_GOOGLE_ID_TOKEN_CREDENTIAL.equals(cr.getType())) {
                        String tok = GoogleIdTokenCredential.createFrom(cr.getData()).getIdToken();
                        js.accept("window.PhosAuth&&PhosAuth.onGoogle(" + MainActivity.quote(tok) + ")");
                    } else js.accept("window.PhosAuth&&PhosAuth.onError(\"\")");
                }
                @Override public void onError(GetCredentialException e) {
                    js.accept("window.PhosAuth&&PhosAuth.onError(" + MainActivity.quote(String.valueOf(e.getMessage())) + ")");
                }
            });
    }
}
