import json, os, re, shutil
RAW = "/home/claude/bibles_raw"
OUT = "/home/claude/ebible/site/data"
if os.path.exists(OUT): shutil.rmtree(OUT)
os.makedirs(OUT)

def load(src, only=None):
    books, order = {}, []
    for line in open(f"{RAW}/{src}/{src}_vpl.txt", encoding="utf-8"):
        m = re.match(r"^(\S+) (\d+):(\d+) ?(.*)$", line.rstrip("\n"))
        if not m: continue
        b, c, v, t = m.group(1), m.group(2), int(m.group(3)), m.group(4).strip()
        if not t: continue
        if only and not only(b): continue
        if b not in books: books[b] = {}; order.append(b)
        books[b].setdefault(c, []).append([v, t])
    return books, order

NTSET = set("MAT MAR LUK JOH ACT ROM 1CO 2CO GAL EPH PHI COL 1TH 2TH 1TI 2TI TIT PHM HEB JAM 1PE 2PE 1JO 2JO 3JO JUD REV".split())
ORTHO = ["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","1ES","4ES","NEH","TOB","JDT","ESG","1MA","2MA","3MA","PSA","JOB","PRO","ECC","SOL","WIS","SIR","HOS","AMO","MIC","JOE","OBA","JON","NAH","HAB","ZEP","HAG","ZEC","MAL","ISA","JER","BAR","LAM","EPJ","EZE","DNG","SUS","BEL","PRA"]
SKIP = {"PRM","PSX","4MA"}  # libros que la app aún no muestra

EDITIONS = {
 "ortodoxa-griega": ([("grclxx",None),("grcbyz",None)], ORTHO, "lxx"),
 "vulgata-clementina": ([("latVUC",None)], None, "lxx"),
 "reina-valera-1909": ([("spaRV1909",None)], None, "heb"),
 "original-hebreo-griego": ([("hboWLC",None),("grctr",None)], None, "heb"),
 "en-ortho": ([("eng-Brenton",lambda b:b not in NTSET),("eng-web",lambda b:b in NTSET)], None, "lxx"),
 "en-dra": ([("engDRA",None)], None, "lxx"),
 "en-kjv": ([("eng-kjv2006",None)], None, "heb"),
 "es-blm": ([("spablm",None)], None, "heb"),
 "pt-bsl": ([("porbrbsl",None)], None, "heb"),
 "fr-sbl": ([("frasbl",None)], None, "heb"),
 "fr-lsg": ([("fraLSG",None)], None, "heb"),
 "it-1927": ([("ita1927",None)], None, "heb"),
 "de-1912": ([("deu1912",None)], None, "heb"),
 "ru-syn": ([("russyn",None)], None, "lxx"),
 "ro-bl": ([("ronbl",None)], None, "heb"),
}
MAX = 900_000
manifest = {}
total = 0; files = 0
for eid, (parts, order, scheme) in EDITIONS.items():
    books, seq = {}, []
    for src, only in parts:
        b, o = load(src, only); books.update(b); seq += o
    seq = [x for x in seq if x not in SKIP]
    if order: seq = [x for x in order if x in books] + [x for x in seq if x not in order]
    os.makedirs(f"{OUT}/{eid}")
    chunks, cur, size = [], {}, 0
    meta = []
    for c in seq:
        s = len(json.dumps(books[c], ensure_ascii=False))
        if cur and size + s > MAX: chunks.append(cur); cur, size = {}, 0
        cur[c] = books[c]; size += s
        meta.append([c, sorted(books[c], key=int), len(chunks)])
    if cur: chunks.append(cur)
    for i, ch in enumerate(chunks):
        p = f"{OUT}/{eid}/{i}.json"
        json.dump(ch, open(p, "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
        total += os.path.getsize(p); files += 1
    manifest[eid] = {"s": scheme, "n": len(chunks), "b": [[c, ",".join(k) if k != [str(i) for i in range(1, len(k)+1)] else len(k), f] for c, k, f in meta]}
    print(eid, len(seq), "libros", len(chunks), "trozos")
open("/home/claude/ebible/manifest.js", "w", encoding="utf-8").write("const MANIFEST=" + json.dumps(manifest, ensure_ascii=False, separators=(",", ":")) + ";\n")
print("total", round(total/1e6,1), "MB en", files, "archivos")
