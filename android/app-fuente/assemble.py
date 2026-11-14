import os
D = os.path.dirname(os.path.abspath(__file__)) + "/"
r = lambda f: open(D + f, encoding="utf-8").read()
head = r("head.html")
extra_css = r("extra.css") if os.path.exists(D + "extra.css") else ""
head = head.replace("</style>", extra_css + "\n</style>", 1)
WEB = bool(os.environ.get("WEB"))
LEARN_FILES = ["langdata.js","learn2.js","learn3.js","learn4.js","learn5.js","learn6.js","learn7.js","learn8.js"]
OTHER = ["health.js","foods.js","topics_data.js","topics.js","menu.js","today_data.js","santos_data.js","today.js","today_cal.js","habits_data.js","habits.js"]

def web_sections():
    """La web no lleva cursos: de sections.js solo quedan las utilidades
    generales, los XP y el renderizador de artículos."""
    import re as _r
    sec = r("sections.js")
    tail = sec[sec.index("// ---------- Salud, Deporte, M\u00e1s ----------"):]
    head = sec.split("// ---------- Examen de unidad")[0] + "\n".join(
        l for l in sec.split("\n")[:40]
        if _r.match(r"const (fmt|rnd|shuffle|pickN|today)=", l))
    xp = ("function stats(){return store.get('stats',{xp:0,streak:0,last:null})}\n"
          "function addXP(n){const s=stats();s.xp+=n;const t=today();\n"
          " if(s.last!==t){const y=new Date(Date.now()-864e5).toISOString().slice(0,10);"
          "s.streak=s.last===y?s.streak+1:1;s.last=t}\n store.set('stats',s)}\n"
          "let LS=null;\nfunction renderLearn(){S.sec=SECS[0];render()}\n")
    return head + "\n" + xp + "\n" + tail

if WEB:
    lines = r("content.js").split("\n")
    content = "\n".join(lines[0:3] + lines[137:])  # NAV + CT + ART + ARTX, sin SUM/GROUP/GOF/INTRO
    js = "\n".join(r(f) for f in ["i18n.js", "i18n2.js", "content_i18n.js", "manifest.js"]) + "\n" + content
    js += "\n" + r("app.js").replace("__VIVLOS__", r("vivlos.json"))
    js += "\n" + web_sections()
    # La sección «Hoy» necesita la tabla de fiestas y las fechas de Pascua,
    # que viven al principio del archivo de fiestas. El resto (las lecciones) no se incluye.
    f5 = r("learn5.js")
    js += "\n" + f5[:f5.index("async function buildFeastLesson")]
    rest = ["features.js"] + OTHER
else:
    parts = ["i18n.js", "i18n2.js", "content.js", "learn_basic.js", "content_i18n.js", "meta.js", "manifest.js"]
    js = "\n".join(r(f) for f in parts)
    js += "\n" + r("app.js").replace("__VIVLOS__", r("vivlos.json"))
    js += "\n" + r("sections.js")
    rest = ["features.js"] + LEARN_FILES + OTHER + ["mejoras_i18n.js", "premium_i18n.js", "premium.js", "plus_i18n.js", "retos_data.js", "retos.js", "plus.js", "vida.js", "welcome.js", "mejoras.js", "guia.js", "vidas.js", "focus.js", "nivel.js", "nivel2.js", "nivel3.js", "tr_base.js", "tr_pt.js", "tr_fr.js", "tr_it.js", "tr_de.js", "tr_el.js", "tr_ru.js", "tr_ro.js", "tr_apply.js"]
for f in rest:
    if os.path.exists(D + f): js += "\n" + r(f)
if WEB:
    import re as _re
    head=_re.sub(r'<link rel="preconnect" href="https://fonts.googleapis.com">','',head)
    head=_re.sub(r'<link href="https://fonts.googleapis.com/[^>]*>','<link rel="stylesheet" href="/fonts/fonts.css">',head)
if WEB:
    js += "\n" + r("weblite.js")
    # los textos bíblicos viven en /data/biblia/ (los usa también la web de ordenador)
    js = js.replace("fetch('data/'", "fetch('../data/biblia/'")
js += "\napplyLang();\nrender();\ntry{if('serviceWorker' in navigator&&window.top===window)navigator.serviceWorker.register('sw.js').catch(function(){})}catch(e){}\n"
SPLASH = """<div id="splash" aria-hidden="true"><svg viewBox="0 0 30 40" fill="none" stroke="#E2C27A" stroke-width="2.6" stroke-linecap="round"><path d="M15 3v34M10 8h10M5 16h20M9 29l12-5"/></svg><b>Phos</b><i></i></div>
<style>#splash{position:fixed;inset:0;z-index:100;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:radial-gradient(120% 70% at 50% 30%,#8A3A2E 0%,#4A1416 50%,#22080A 100%);transition:opacity .6s}#splash.out{opacity:0;pointer-events:none}#splash svg{width:92px;height:122px;filter:drop-shadow(0 0 24px rgba(226,194,122,.55));animation:sp 1.6s ease-in-out infinite alternate}#splash b{font:600 64px 'Cormorant Garamond',Georgia,serif;color:#FBF6EA;letter-spacing:2px}#splash i{width:120px;height:3px;border-radius:2px;background:linear-gradient(90deg,transparent,#E2C27A,transparent);animation:sl 1.4s linear infinite}@keyframes sp{from{opacity:.75;transform:scale(.96)}to{opacity:1;transform:scale(1.04)}}@keyframes sl{from{transform:translateX(-40px)}to{transform:translateX(40px)}}</style>
"""
if not WEB:
    head = head.replace("<body>\n", "<body>\n" + SPLASH, 1)
os.makedirs(D + "site", exist_ok=True)
open(D + ("site/index.web.html" if WEB else "site/index.html"), "w", encoding="utf-8").write(head + "<script>\n" + js + "\n</script>\n</body>\n</html>\n")
print("ok", len(head) + len(js))
