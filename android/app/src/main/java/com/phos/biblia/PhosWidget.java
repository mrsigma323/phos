package com.phos.biblia;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.widget.RemoteViews;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import org.json.JSONArray;
import org.json.JSONObject;

/** Widget de la pantalla de inicio: santo (o fiesta) y versículo del día. Lo rellena la app (14 días por adelantado). */
public class PhosWidget extends AppWidgetProvider {
    @Override
    public void onUpdate(Context c, AppWidgetManager m, int[] ids) { draw(c, m, ids); }

    static void draw(Context c, AppWidgetManager m, int[] ids) {
        String title = "Phos", body = c.getString(R.string.widget_empty);
        try {
            String today = new SimpleDateFormat("yyyy-MM-dd", Locale.ROOT).format(new Date());
            JSONArray a = new JSONArray(c.getSharedPreferences("phos_widget", Context.MODE_PRIVATE).getString("days", "[]"));
            for (int i = 0; i < a.length(); i++) {
                JSONObject o = a.getJSONObject(i);
                if (today.equals(o.optString("d"))) { title = o.optString("t", title); body = o.optString("b", body); break; }
            }
        } catch (Exception e) { }
        Intent open = new Intent(c, MainActivity.class).putExtra("open", "hoy").addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        PendingIntent pi = PendingIntent.getActivity(c, 11, open, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        for (int id : ids) {
            RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.widget);
            v.setTextViewText(R.id.w_title, title);
            v.setTextViewText(R.id.w_body, body);
            v.setOnClickPendingIntent(R.id.w_root, pi);
            m.updateAppWidget(id, v);
        }
    }
}
