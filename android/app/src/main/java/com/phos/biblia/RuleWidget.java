package com.phos.biblia;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.view.View;
import android.widget.RemoteViews;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import org.json.JSONArray;
import org.json.JSONObject;

/** Widget «Regla de vida»: las metas de hoy, que se pueden marcar sin abrir la app. La app lo rellena y recoge lo marcado al volver. */
public class RuleWidget extends AppWidgetProvider {
    static final String TOGGLE = "com.phos.biblia.RULE_TOGGLE";
    static final int[] ROWS = {R.id.rw_0, R.id.rw_1, R.id.rw_2, R.id.rw_3, R.id.rw_4, R.id.rw_5};

    static String today() { return new SimpleDateFormat("yyyy-MM-dd", Locale.ROOT).format(new Date()); }
    static String get(Context c) { return c.getSharedPreferences("phos_rule", Context.MODE_PRIVATE).getString("rule", "{}"); }
    static void set(Context c, String json) {
        c.getSharedPreferences("phos_rule", Context.MODE_PRIVATE).edit().putString("rule", json).apply();
        AppWidgetManager m = AppWidgetManager.getInstance(c);
        int[] ids = m.getAppWidgetIds(new ComponentName(c, RuleWidget.class));
        if (ids.length > 0) draw(c, m, ids);
    }

    @Override public void onUpdate(Context c, AppWidgetManager m, int[] ids) { draw(c, m, ids); }

    @Override public void onReceive(Context c, Intent i) {
        super.onReceive(c, i);
        if (!TOGGLE.equals(i.getAction())) return;
        try {
            JSONObject o = new JSONObject(get(c));
            if (!today().equals(o.optString("d"))) return;
            JSONArray a = o.getJSONArray("items");
            int n = i.getIntExtra("i", -1);
            if (n < 0 || n >= a.length()) return;
            JSONObject it = a.getJSONObject(n);
            it.put("done", !it.optBoolean("done"));
            o.put("w", true);
            set(c, o.toString());
        } catch (Exception e) { }
    }

    static void draw(Context c, AppWidgetManager m, int[] ids) {
        String title = "⛰️ " + c.getString(R.string.rule_widget_name), foot = c.getString(R.string.rule_widget_empty);
        JSONArray items = new JSONArray();
        try {
            JSONObject o = new JSONObject(get(c));
            if (today().equals(o.optString("d"))) { title = o.optString("t", title); items = o.optJSONArray("items"); if (items == null) items = new JSONArray(); }
        } catch (Exception e) { }
        Intent open = new Intent(c, MainActivity.class).putExtra("open", "vida").addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        PendingIntent pi = PendingIntent.getActivity(c, 12, open, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        int done = 0;
        for (int id : ids) {
            RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.widget_rule);
            v.setTextViewText(R.id.rw_title, title);
            v.setOnClickPendingIntent(R.id.rw_title, pi);
            done = 0;
            for (int k = 0; k < ROWS.length; k++) {
                if (k < items.length()) {
                    JSONObject it = items.optJSONObject(k);
                    boolean d = it.optBoolean("done");
                    if (d) done++;
                    v.setViewVisibility(ROWS[k], View.VISIBLE);
                    v.setTextViewText(ROWS[k], (d ? "✅  " : "⬜  ") + it.optString("i") + " " + it.optString("l"));
                    Intent t = new Intent(c, RuleWidget.class).setAction(TOGGLE).putExtra("i", k);
                    v.setOnClickPendingIntent(ROWS[k], PendingIntent.getBroadcast(c, 100 + k, t, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE));
                } else v.setViewVisibility(ROWS[k], View.GONE);
            }
            v.setTextViewText(R.id.rw_foot, items.length() == 0 ? foot : done + " / " + items.length());
            v.setOnClickPendingIntent(R.id.rw_foot, pi);
            m.updateAppWidget(id, v);
        }
    }
}
