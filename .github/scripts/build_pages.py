"""Builds w/<edit>/index.html for every work in works.js.

Each page carries the edit's own title and YouTube thumbnail, so a link like
katsuyuki.studio/w/dove-doll-4hc/ shows that edit in Telegram/Discord previews,
then opens the site with the edit in the player. Slugs match index.html.
"""
import html, json, re, shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "w"
SITE = "https://katsuyuki.studio"

PAGE = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} · Katsuyuki</title>
<link rel="icon" type="image/png" sizes="64x64" href="/img/favicon.png">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="canonical" href="{url}">
<meta name="description" content="{desc}">
<meta property="og:type" content="video.other">
<meta property="og:site_name" content="Katsuyuki">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{image}">
<meta property="og:image:width" content="{iw}">
<meta property="og:image:height" content="{ih}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#060606">
<meta http-equiv="refresh" content="0; url=/?w={slug}">
<style>html{{background:#060606}}</style>
<script>location.replace("/?w={slug}")</script>
</head>
<body></body>
</html>
"""


def slug_of(title, vid):
    s = re.sub(r"['’]", "", title.lower())
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s or vid or "work"


def works_with_slugs():
    text = (ROOT / "works.js").read_text(encoding="utf-8")
    block = text[text.index("window.WORKS"):]
    works = []
    for i, m in enumerate(re.finditer(r"\{[^{}]*\}", block)):
        o = m.group(0)
        get = lambda k: (re.search(k + r'\s*:\s*"((?:[^"\\]|\\.)*)"', o) or [None, ""])[1]
        title = json.loads('"' + get("title") + '"') if get("title") else ""
        if not title:
            continue
        link = get("link")
        vid = (re.search(r"(?:youtu\.be/|v=|/shorts/|/embed/)([\w-]{11})", link) or [None, ""])[1]
        tags = re.findall(r'"([^"]*)"', (re.search(r"tags\s*:\s*\[([^\]]*)\]", o) or [None, ""])[1])
        works.append(dict(title=title, year=get("year"), id=vid, tags=tags, i=i))
    # same order and duplicate rule as index.html: newest year first, then file order
    works.sort(key=lambda w: (-(int(w["year"]) if w["year"].isdigit() else 0), w["i"]))
    used = set()
    for w in works:
        base = slug_of(w["title"], w["id"]); slug = base; n = 2
        while slug in used:
            slug = f"{base}-{n}"; n += 1
        used.add(slug)
        w["slug"] = slug
    return works


def main():
    works = works_with_slugs()
    if OUT.exists():
        shutil.rmtree(OUT)
    for w in works:
        slug = w["slug"]
        desc = " / ".join([x for x in [w["year"]] + w["tags"][:2] if x]) + " · Katsuyuki"
        if (ROOT / "img" / "og" / f"{slug}.jpg").exists():  # branded card from og_images.py
            image, iw, ih = f"{SITE}/img/og/{slug}.jpg", 1200, 630
        elif w["id"]:
            image, iw, ih = f"https://i.ytimg.com/vi/{w['id']}/maxresdefault.jpg", 1280, 720
        else:
            image, iw, ih = SITE + "/img/og.jpg", 1200, 630
        e = lambda v: html.escape(v, quote=True)
        page = PAGE.format(title=e(w["title"]), desc=e(desc), url=f"{SITE}/w/{slug}/", image=e(image), slug=slug, iw=iw, ih=ih)
        (OUT / slug).mkdir(parents=True, exist_ok=True)
        (OUT / slug / "index.html").write_text(page, encoding="utf-8")
    # sitemap.xml: main pages + every edit page, so search engines find them all
    urls = [SITE + p for p in ("/", "/about/", "/order/", "/files/")] + [f"{SITE}/w/{w['slug']}/" for w in works]
    xml = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    xml += [f"  <url><loc>{html.escape(u)}</loc></url>" for u in urls]
    xml.append("</urlset>")
    (ROOT / "sitemap.xml").write_text("\n".join(xml) + "\n", encoding="utf-8")
    print("Pages:", len(works), "| sitemap URLs:", len(urls))


if __name__ == "__main__":
    main()
