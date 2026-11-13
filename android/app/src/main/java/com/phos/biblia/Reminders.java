package com.phos.biblia;

import android.app.AlarmManager;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Build;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Recordatorios personalizados (función de Phos Premium).
 * La app web calcula los próximos días (oración, ayunos, santo, plan de lectura)
 * y entrega aquí una lista; Android los avisa aunque la app esté cerrada.
 * La lista se guarda y se vuelve a programar al reiniciar el móvil.
 */
final class Reminders {
    static final String PREFS = "phos_reminders", KEY = "list", CHANNEL = "phos_diario";
    static final int MAX = 60;

    static void replace(Context c, String json) {
        cancelAll(c);
        c.getSharedPreferences(PREFS, 0).edit().putString(KEY, json == null ? "[]" : json).apply();
        rescheduleAll(c);
    }

    static void rescheduleAll(Context c) {
        try {
            JSONArray a = new JSONArray(c.getSharedPreferences(PREFS, 0).getString(KEY, "[]"));
            AlarmManager am = (AlarmManager) c.getSystemService(Context.ALARM_SERVICE);
            long now = System.currentTimeMillis();
            for (int i = 0; i < a.length() && i < MAX; i++) {
                JSONObject r = a.getJSONObject(i);
                long at = r.optLong("at");
                if (at <= now) continue;
                // Aviso aproximado (no exacto): no exige permisos especiales y respeta la batería.
                am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at, pending(c, i, r));
            }
        } catch (Exception e) { }
    }

    static void cancelAll(Context c) {
        AlarmManager am = (AlarmManager) c.getSystemService(Context.ALARM_SERVICE);
        for (int i = 0; i < MAX; i++) {
            PendingIntent p = PendingIntent.getBroadcast(c, i, new Intent(c, Fire.class), PendingIntent.FLAG_NO_CREATE | PendingIntent.FLAG_IMMUTABLE);
            if (p != null) { am.cancel(p); p.cancel(); }
        }
    }

    static PendingIntent pending(Context c, int i, JSONObject r) {
        Intent it = new Intent(c, Fire.class)
                .putExtra("title", r.optString("title", "Phos"))
                .putExtra("body", r.optString("body", ""))
                .putExtra("open", r.optString("open", ""))
                .putExtra("n", i);
        return PendingIntent.getBroadcast(c, i, it, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    public static class Fire extends BroadcastReceiver {
        @Override public void onReceive(Context c, Intent in) {
            NotificationManager nm = (NotificationManager) c.getSystemService(Context.NOTIFICATION_SERVICE);
            if (Build.VERSION.SDK_INT >= 26 && nm.getNotificationChannel(CHANNEL) == null) {
                NotificationChannel ch = new NotificationChannel(CHANNEL, "Recordatorios de Phos", NotificationManager.IMPORTANCE_DEFAULT);
                ch.setDescription("Oración, ayunos, santo del día y plan de lectura");
                nm.createNotificationChannel(ch);
            }
            Intent open = new Intent(c, MainActivity.class).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP)
                    .putExtra("open", in.getStringExtra("open"));
            PendingIntent tap = PendingIntent.getActivity(c, 1000 + in.getIntExtra("n", 0), open, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
            android.app.Notification.Builder b = Build.VERSION.SDK_INT >= 26 ? new android.app.Notification.Builder(c, CHANNEL) : new android.app.Notification.Builder(c);
            b.setSmallIcon(R.mipmap.ic_launcher)
             .setColor(Color.rgb(74, 20, 22))
             .setContentTitle(in.getStringExtra("title"))
             .setContentText(in.getStringExtra("body"))
             .setStyle(new android.app.Notification.BigTextStyle().bigText(in.getStringExtra("body")))
             .setContentIntent(tap)
             .setAutoCancel(true);
            try { nm.notify(2000 + in.getIntExtra("n", 0), b.build()); } catch (SecurityException e) { /* sin permiso de notificaciones */ }
        }
    }

    public static class Boot extends BroadcastReceiver {
        @Override public void onReceive(Context c, Intent in) { rescheduleAll(c); }
    }

    private Reminders() { }
}
