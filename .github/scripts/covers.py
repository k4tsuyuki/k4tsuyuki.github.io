"""Скачивает обложки всех эдитов с YouTube на сам сайт: img/covers/<id>.jpg (1280 px) и <id>-s.jpg (маленькая).
Сайт берёт их в первую очередь, YouTube только запасной вариант (нужно там, где YouTube заблокирован).
Качает только то, чего ещё нет."""
import io, re, sys, urllib.request
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "img" / "covers"

def ids():
    seen = []
    for f in ("works.js", "shop.js"):
        p = ROOT / f
        if not p.exists():
            continue
        t = p.read_text(encoding="utf-8")
        for m in re.finditer(r"(?:youtu\.be/|[?&]v=|/shorts/|yt:)([\w-]{11})", t):
            if m.group(1) not in seen:
                seen.append(m.group(1))
    return seen

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    made = 0
    for vid in ids():
        big, small = OUT / f"{vid}.jpg", OUT / f"{vid}-s.jpg"
        if big.exists() and small.exists():
            continue
        im = None
        for q in ("maxresdefault", "sddefault", "hqdefault"):
            try:
                with urllib.request.urlopen(f"https://i.ytimg.com/vi/{vid}/{q}.jpg", timeout=20) as r:
                    im = Image.open(io.BytesIO(r.read())).convert("RGB"); im.load()
                if im.width > 120:
                    break
                im = None
            except Exception:
                im = None
        if im is None:
            print("no cover:", vid); continue
        if q != "maxresdefault":   # 4:3 с чёрными полосами -> вырезать 16:9
            h = round(im.width * 9 / 16); top = (im.height - h) // 2
            im = im.crop((0, top, im.width, top + h))
        b = im.copy(); b.thumbnail((1280, 720), Image.LANCZOS)
        b.save(big, quality=82, optimize=True, progressive=True)
        s = im.copy(); s.thumbnail((320, 180), Image.LANCZOS)
        s.save(small, quality=70, optimize=True)
        made += 1
    print("covers downloaded:", made)

if __name__ == "__main__":
    sys.exit(main())
