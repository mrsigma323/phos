package com.phos.biblia;

import android.app.AlarmManager;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.provider.Settings;

/**
 * «No molestar» durante el Modo lectura, solo con permiso expreso del usuario.
 * Guarda el estado anterior y lo restaura al terminar; una alarma lo restaura igualmente
 * aunque la app se cierre, para que el móvil nunca se quede en silencio por error.
 */
class Dnd {
    static final String PREFS = "phos_dnd";

    static NotificationManager nm(Context c) { return (NotificationManager) c.getSystemService(Context.NOTIFICATION_SERVICE); }

    static boolean allowed(Context c) { return nm(c).isNotificationPolicyAccessGranted(); }

    /** Abre los ajustes de Android para que el usuario conceda (o no) el permiso. */
    static void ask(Context c) {
        try { c.startActivity(new Intent(Settings.ACTION_NOTIFICATION_POLICY_ACCESS_SETTINGS).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)); } catch (Exception e) { }
    }

    /** Activa «No molestar» (solo prioridad: alarmas y contactos favoritos siguen sonando) hasta dentro de `minutes`. */
    static boolean on(Context c, int minutes) {
        if (!allowed(c)) return false;
        NotificationManager n = nm(c);
        if (!c.getSharedPreferences(PREFS, Context.MODE_PRIVATE).contains("prev"))
            c.getSharedPreferences(PREFS, Context.MODE_PRIVATE).edit().putInt("prev", n.getCurrentInterruptionFilter()).apply();
        n.setInterruptionFilter(NotificationManager.INTERRUPTION_FILTER_PRIORITY);
        AlarmManager am = (AlarmManager) c.getSystemService(Context.ALARM_SERVICE);
        am.set(AlarmManager.RTC_WAKEUP, System.currentTimeMillis() + Math.max(1, minutes) * 60_000L + 30_000L, end(c));
        return true;
    }

    /** Restaura el modo que tenía el usuario antes de empezar. */
    static void off(Context c) {
        android.content.SharedPreferences p = c.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        if (p.contains("prev") && allowed(c)) {
            try { nm(c).setInterruptionFilter(p.getInt("prev", NotificationManager.INTERRUPTION_FILTER_ALL)); } catch (Exception e) { }
        }
        p.edit().remove("prev").apply();
        ((AlarmManager) c.getSystemService(Context.ALARM_SERVICE)).cancel(end(c));
    }

    static PendingIntent end(Context c) {
        return PendingIntent.getBroadcast(c, 77, new Intent(c, End.class), PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    public static class End extends BroadcastReceiver {
        @Override public void onReceive(Context c, Intent i) { off(c); }
    }
}
