import json, os, re

RAW = "/home/claude/bibles_raw"
OUT = "/home/claude/ebible/site/data"
os.makedirs(OUT, exist_ok=True)

def load(src):
    books = {}
    order = []
    with open(f"{RAW}/{src}/{src}_vpl.txt", encoding="utf-8") as f:
        for line in f:
            line = line.rstrip("\n")
            m = re.match(r"^(\S+) (\d+):(\d+) ?(.*)$", line)
            if not m:
                continue
            b, c, v, t = m.group(1), m.group(2), int(m.group(3)), m.group(4).strip()
            if not t:
                continue
            if b not in books:
                books[b] = {}
                order.append(b)
            books[b].setdefault(c, []).append([v, t])
    return books, order

def save(eid, parts, order=None):
    books = {}
    seq = []
    for src in parts:
        b, o = load(src)
        books.update(b)
        seq += o
    if order:
        seq = [x for x in order if x in books] + [x for x in seq if x not in order]
    data = {"books": [{"c": k, "ch": books[k]} for k in seq]}
    p = f"{OUT}/{eid}.json"
    with open(p, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))
    print(eid, len(seq), "libros", round(os.path.getsize(p) / 1e6, 1), "MB")

ORTHO = ["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH",
         "1ES","4ES","NEH","TOB","JDT","ESG","1MA","2MA","3MA","PSA","JOB","PRO","ECC","SOL",
         "WIS","SIR","HOS","AMO","MIC","JOE","OBA","JON","NAH","HAB","ZEP","HAG","ZEC","MAL",
         "ISA","JER","BAR","LAM","EPJ","EZE","DNG","SUS","BEL","PRA"]

save("ortodoxa-griega", ["grclxx", "grcbyz"], ORTHO)
save("vulgata-clementina", ["latVUC"])
save("reina-valera-1909", ["spaRV1909"])
save("original-hebreo-griego", ["hboWLC", "grctr"])
