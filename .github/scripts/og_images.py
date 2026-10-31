"""Branded link-preview images for every edit: img/og/<slug>.jpg.

Cover (b&w, darkened) + logo + title + K sign. Only missing images are made,
so it is cheap to run hourly. build_pages.py points og:image at them.
"""
import io, random, sys, urllib.request
from pathlib import Path
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "img" / "og"
W, H = 1200, 630
FONTS = ["/usr/share/fonts/truetype/liberation/LiberationSans-{}.ttf",
         "/usr/share/fonts/truetype/liberation2/LiberationSans-{}.ttf"]
INK, DIM = (238, 235, 229), (169, 164, 156)


def font(style, size):
    for f in FONTS:
        p = Path(f.format(style))
        if p.exists():
            return ImageFont.truetype(str(p), size)
    return ImageFont.load_default(size)


def cover(src):
    im = ImageOps.fit(src.convert("L"), (W, H), Image.LANCZOS)
    im = ImageEnhance.Contrast(im).enhance(1.1)
    im = ImageEnhance.Brightness(im).enhance(0.55)
    return im.convert("RGB")


def shade():
    # vignette + darker bottom, as one alpha mask over black
    m = Image.new("L", (W, H))
    px = m.load()
    for y in range(0, H, 2):
        for x in range(0, W, 2):
            dx, dy = (x - W / 2) / (W * .62), (y - H * .45) / (H * .75)
            v = max(0, min(1, ((dx * dx + dy * dy) ** .5 - .3) / .7)) * .75
            b = max(0, (y / H - .55) / .45) * .85
            a = int(255 * (1 - (1 - v) * (1 - b)))
            for i in (0, 1):
                for j in (0, 1):
                    if x + i < W and y + j < H:
                        px[x + i, y + j] = a
    return m


def grain(seed):
    rnd = random.Random(seed)
    n = Image.frombytes("L", (W // 2, H // 2), bytes(rnd.randrange(256) for _ in range(W * H // 4)))
    return n.resize((W, H))


def card(bg, meta, title):
    im = cover(bg) if bg else Image.new("RGB", (W, H), (11, 11, 11))
    im = Image.composite(Image.new("RGB", (W, H)), im, SHADE)
    im = Image.blend(im, Image.merge("RGB", [GRAIN] * 3), .06)
    logo = Image.open(ROOT / "img" / "logo.png").convert("RGBA")
    lw = 560; logo = logo.resize((lw, round(logo.height * lw / logo.width)), Image.LANCZOS)
    shadow = Image.new("L", (W, H)); ly = int(H * (.44 if bg else .46) - logo.height / 2)
    shadow.paste(logo.split()[3], ((W - lw) // 2, ly + 8))
    shadow = shadow.filter(ImageFilter.GaussianBlur(26)).point(lambda a: int(a * .6))
    im = Image.composite(Image.new("RGB", (W, H)), im, shadow).convert("RGBA")
    im.alpha_composite(logo, ((W - lw) // 2, ly))
    d = ImageDraw.Draw(im)
    if title:
        size = 56
        while size > 30 and d.textlength(title, font=font("Regular", size)) > 760:
            size -= 2
        d.text((56, H - 46), title, font=font("Regular", size), fill=INK, anchor="ls")
        if meta:
            d.text((56, H - 46 - size - 12), meta.upper(), font=font("Bold", 20), fill=DIM, anchor="ls")
    k = Image.open(ROOT / "img" / "k.png").convert("RGBA")
    kh = 70; k = k.resize((round(k.width * kh / k.height), kh), Image.LANCZOS)
    kx = W - 56 - k.width
    im.alpha_composite(k, (kx, H - 40 - kh))
    d.text((kx - 18, H - 46 - 18), "KATSUYUKI.STUDIO", font=font("Bold", 20), fill=DIM, anchor="rs")
    return im.convert("RGB")


SHADE = shade()
GRAIN = grain(7)


def main():
    sys.path.insert(0, str(Path(__file__).parent))
    from build_pages import works_with_slugs
    OUT.mkdir(parents=True, exist_ok=True)
    made = 0
    for w in works_with_slugs():
        p = OUT / f"{w['slug']}.jpg"
        if p.exists() or not w["id"]:
            continue
        bg = None
        for q in ("maxresdefault", "hqdefault"):
            try:
                with urllib.request.urlopen(f"https://i.ytimg.com/vi/{w['id']}/{q}.jpg", timeout=20) as r:
                    bg = Image.open(io.BytesIO(r.read())); bg.load(); break
            except Exception:
                pass
        if bg is None:
            continue
        meta = " · ".join(w["tags"][:2])
        card(bg, meta, w["title"]).save(p, quality=86, optimize=True, progressive=True)
        made += 1
    print("OG images made:", made)


if __name__ == "__main__":
    main()
