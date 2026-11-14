"""Completa las Biblias de cada idioma con los libros que les faltan.

1. Primero, con traducciones de dominio público (fuentes fiables):
   - ru-syn  ← Sinodal 1876 completa (deuterocanónicos)            scrollmapper/bible_databases
   - ro-bl   ← Cornilescu corregida, Antiguo Testamento             seven1m/open-bibles (ron-rccv)
   - de-1912 ← Menge 1939 (Tobías, Judit, Sabiduría, Sirácida…)     scrollmapper/bible_databases
   - fr-sbl  ← Giguet 1872, LXX (Baruc 6, Susana, Bel, Manasés)      scrollmapper/bible_databases
   - en-ortho← King James con apócrifos (2 Esdras, Manasés)         scrollmapper/bible_databases
2. Después, con las traducciones hechas por Phos (carpeta traducciones_phos/<edición>/<LIBRO>.json),
   que la app marca con un aviso y con palabras explicadas.

Se puede ejecutar las veces que haga falta: parte siempre del manifiesto base guardado la primera vez.
"""
import json, os, re, xml.etree.ElementTree as ET
SRC = "/home/claude/fuentes_biblia"
DATA = "/home/claude/phos/data/biblia"
APP = os.path.dirname(os.path.abspath(__file__))
MAN = os.path.join(APP, "manifest.js")
BASE = os.path.join(APP, "manifest_base.json")
PHOS = os.path.join(APP, "traducciones_phos")

man = json.loads(open(MAN, encoding="utf-8").read().split("=", 1)[1].rstrip().rstrip(";"))
if not os.path.exists(BASE):
    json.dump(man, open(BASE, "w", encoding="utf-8"), ensure_ascii=False)
base = json.load(open(BASE, encoding="utf-8"))

SM = {"Tobit": "TOB", "Judith": "JDT", "Wisdom": "WIS", "Sirach": "SIR", "Baruch": "BAR", "I Maccabees": "1MA", "II Maccabees": "2MA",
      "III Maccabees": "3MA", "I Esdras": "1ES", "II Esdras": "4ES", "Epistle of Jeremiah": "EPJ",
      "Susanna": "SUS", "Bel and the Dragon": "BEL"}
USFX = {"SNG": "SOL", "EZK": "EZE", "JOL": "JOE", "NAM": "NAH"}

def sm(file, want, extra=None):
    d = json.load(open(f"{SRC}/{file}", encoding="utf-8")); out = {}
    for b in d["books"]:
        code = SM.get(b["name"])
        chs = {str(c["chapter"]): [[v["verse"], v["text"].strip()] for v in c["verses"] if v["text"].strip()] for c in b["chapters"]}
        if code in want: out[code] = chs
        if extra: extra(b["name"], chs, out)
    return out

def comma(s):  # rumano: ş ţ con coma debajo, como se escribe hoy
    return s.replace("ş", "ș").replace("Ş", "Ș").replace("ţ", "ț").replace("Ţ", "Ț")

def usfx_ot(file):
    xml = open(f"{SRC}/{file}", encoding="utf-8-sig").read()
    out = {}
    for m in re.finditer(r'<book id="(\w+)">(.*?)</book>', xml, re.S):
        code = USFX.get(m.group(1), m.group(1))
        if code in ("MAT",): break
        body = re.sub(r"<f\b.*?</f>|<x\b.*?</x>|<h>.*?</h>|<id\b.*?</id>|<p sfm=\"(?:mt|s)\d?\"[^>]*>.*?</p>", "", m.group(2), flags=re.S)
        chs = {}; ch = None; v = None
        for part in re.split(r'(<c id="\d+"\s*/>|<v id="\d+"\s*/>|<ve\s*/>)', body):
            mc = re.match(r'<c id="(\d+)"', part); mv = re.match(r'<v id="(\d+)"', part)
            if mc: ch = mc.group(1); chs[ch] = []; v = None; continue
            if mv: v = int(mv.group(1)); continue
            if part.startswith("<ve"): v = None; continue
            t = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", part)).strip()
            if ch and v and t:
                if chs[ch] and chs[ch][-1][0] == v: chs[ch][-1][1] += " " + comma(t)
                else: chs[ch].append([v, comma(t)])
        out[code] = chs
    return out

def synodal_extra(name, chs, out):
    if name == "Daniel":  # Sinodal: Dn 13 = Susana, Dn 14 = Bel y el dragón
        if "13" in chs: out["SUS"] = {"1": chs["13"]}
        if "14" in chs: out["BEL"] = {"1": chs["14"]}

# Oración de Azarías y cántico de los tres jóvenes (en esta app, PRA): Daniel 3, 25-90 en las Biblias que lo traen dentro de Daniel
GRK_PRA = None
for fn in os.listdir(f"{DATA}/ortodoxa-griega"):
    d = json.load(open(f"{DATA}/ortodoxa-griega/{fn}", encoding="utf-8"))
    if "PRA" in d: GRK_PRA = [v for v, t in d["PRA"]["1"]]
def dan3(file):
    d = json.load(open(f"{SRC}/{file}", encoding="utf-8"))
    dan = next(b for b in d["books"] if b["name"] == "Daniel")["chapters"][2]["verses"]
    vs = [x["text"].strip() for x in dan if 25 <= x["verse"] <= 90]
    return {"PRA": {"1": [[n, t] for n, t in zip(GRK_PRA, vs)]}}
def kjva_pra():
    d = json.load(open(f"{SRC}/KJVA.json", encoding="utf-8"))
    vs = next(b for b in d["books"] if b["name"] == "Prayer of Azariah")["chapters"][0]["verses"]
    return {"PRA": {"1": [[x["verse"] - 1, x["text"].strip()] for x in vs if x["verse"] > 1]}}
def merge(*ds):
    o = {}
    for d in ds: o.update(d)
    return o
ADD = {
 "ru-syn": (merge(sm("RusSynodal.json", {"TOB","JDT","WIS","SIR","BAR","1MA","2MA","3MA","1ES","4ES","EPJ"}, synodal_extra), dan3("RusSynodal.json")), "Синодальный перевод (1876)"),
 # "ro-bl": Cornilescu corregida (VT) EN ESPERA hasta confirmar los derechos de la Sociedad Bíblica. Mientras, el VT rumano se muestra en inglés.
 # "ro-bl": (usfx_ot("ron-rccv.usfx.xml"), "Cornilescu (VT)"),
 "de-1912": (sm("GerMenge.json", {"TOB","JDT","WIS","SIR","BAR","1MA","2MA"}), "Menge-Bibel 1939"),
 "fr-sbl": (merge(sm("FreLXXGiguet.json", {"EPJ","SUS","BEL"}), {"PRA": dan3("FreCrampon.json")["PRA"]}), "Giguet 1872 (LXX) · Crampon 1923"),
 "en-ortho": (merge(sm("KJVA.json", {"4ES"}), kjva_pra()), "King James Version (1769)"),
}
# Orden de referencia: Vulgata (con los deuterocanónicos en su sitio) + los libros solo ortodoxos antes del NT
REF = [b[0] for b in base["vulgata-clementina"]["b"]]
for i, c in enumerate([b[0] for b in base["ortodoxa-griega"]["b"]]):
    if c not in REF: REF.insert(REF.index("MAT"), c)

SOURCES = {}  # edición → libro → [fuente, 'pd' | 'phos']
def write(eid, books, label, kind):
    m = man[eid]
    have = {b[0] for b in m["b"]}
    new = {c: books[c] for c in books if c not in have and books[c]}
    if not new: return
    # trozos nuevos de ~900 kB
    chunks, cur, size = [], {}, 0
    for c, chs in new.items():
        s = len(json.dumps(chs, ensure_ascii=False))
        if cur and size + s > 900_000: chunks.append(cur); cur, size = {}, 0
        cur[c] = chs; size += s
    if cur: chunks.append(cur)
    meta = []
    for ch in chunks:
        f = m["n"]; m["n"] += 1
        json.dump(ch, open(f"{DATA}/{eid}/{f}.json", "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
        for c, chs in ch.items():
            k = sorted(chs, key=int)
            meta.append([c, ",".join(k) if k != [str(i) for i in range(1, len(k) + 1)] else len(k), f])
            SOURCES.setdefault(eid, {})[c] = [label, kind]
    m["b"] = sorted(m["b"] + meta, key=lambda b: REF.index(b[0]) if b[0] in REF else 999)
    print(eid, kind, "+", len(new), "libros:", " ".join(new))

man = json.loads(json.dumps(base))
for eid in man:  # borra trozos de ejecuciones anteriores
    for f in range(base[eid]["n"], 40):
        p = f"{DATA}/{eid}/{f}.json"
        if os.path.exists(p): os.remove(p)
for eid, (books, label) in ADD.items(): write(eid, books, label, "pd")
# Carta de Jeremías: en muchas Biblias es el capítulo 6 de Baruc. Se ofrece también como libro aparte, con el mismo texto.
def book(eid, c):
    e = next((x for x in man[eid]["b"] if x[0] == c), None)
    return json.load(open(f"{DATA}/{eid}/{e[2]}.json", encoding="utf-8"))[c] if e else None
for eid in ("es-blm", "pt-bsl", "de-1912", "it-1927", "ro-bl"):
    if any(x[0] == "EPJ" for x in man[eid]["b"]): continue
    bar = book(eid, "BAR")
    if bar and "6" in bar:
        lab = (SOURCES.get(eid, {}).get("BAR") or [None])[0]
        write(eid, {"EPJ": {"1": bar["6"]}}, lab or "", "pd")
# Traducciones de Phos: traducciones_phos/<edición>/<LIBRO>.json = {"src": "...", "ch": {"1": [[v, texto], …]}, "gloss": {"1:5": [[palabra, explicación]]}}
GLOSS = {}
if os.path.isdir(PHOS):
    for eid in sorted(os.listdir(PHOS)):
        books = {}
        for fn in sorted(os.listdir(f"{PHOS}/{eid}")):
            if not fn.endswith(".json"): continue
            d = json.load(open(f"{PHOS}/{eid}/{fn}", encoding="utf-8")); c = fn[:-5]
            books[c] = d["ch"]
            if d.get("gloss"): GLOSS.setdefault(eid, {})[c] = d["gloss"]
        write(eid, books, "Phos", "phos")
open(MAN, "w", encoding="utf-8").write("const MANIFEST=" + json.dumps(man, ensure_ascii=False, separators=(",", ":")) + ";\n")
open(os.path.join(APP, "libros_extra_data.js"), "w", encoding="utf-8").write(
    "// Generado por libros_extra.py: de dónde sale cada libro añadido y las palabras explicadas de las traducciones de Phos\n"
    "const BOOKSRC=" + json.dumps(SOURCES, ensure_ascii=False, separators=(",", ":")) + ";\nconst PHOSGLOSS=" + json.dumps(GLOSS, ensure_ascii=False, separators=(",", ":")) + ";\n")
