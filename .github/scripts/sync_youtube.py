"""Adds new videos from the YouTube channel to the top of works.js.

Runs from .github/workflows/youtube.yml. Only videos the script has not seen
before are added, so works removed from works.js by hand never come back.
Shorts are skipped.

It also looks up each video's frame size once. Edits that are not 16:9
(for example 1920x1440 or 1920x800) get ratio: "1920x1440" in works.js,
so the site's player takes that shape.
"""
import json, math, re, sys, time, urllib.request, urllib.error, xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path

HANDLE = "k4tsuyuki"
DEFAULT_TAGS = '["AMV", "4K"]'
ROOT = Path(__file__).resolve().parents[2]
WORKS = ROOT / "works.js"
STATE = ROOT / ".github" / "youtube-seen.json"
UA = {"User-Agent": "Mozilla/5.0", "Accept-Language": "en", "Cookie": "SOCS=CAI; CONSENT=YES+1"}


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k):
        return None


def get(url, follow=True):
    req = urllib.request.Request(url, headers=UA)
    opener = urllib.request.build_opener() if follow else urllib.request.build_opener(NoRedirect)
    try:
        with opener.open(req, timeout=30) as r:
            return r.status, r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        if follow:
            raise
        return e.code, ""


def channel_id(state):
    if state.get("channel_id"):
        return state["channel_id"]
    _, html = get(f"https://www.youtube.com/@{HANDLE}")
    for pat in (r'"externalId":"(UC[\w-]{22})"', r'channel_id=(UC[\w-]{22})', r'"channelId":"(UC[\w-]{22})"'):
        m = re.search(pat, html)
        if m:
            return m.group(1)
    sys.exit("Could not find the channel id for @" + HANDLE)


def feed(cid):
    _, xml = get(f"https://www.youtube.com/feeds/videos.xml?channel_id={cid}")
    ns = {"a": "http://www.w3.org/2005/Atom", "yt": "http://www.youtube.com/xml/schemas/2015"}
    return [{
        "id": e.find("yt:videoId", ns).text,
        "title": e.find("a:title", ns).text or "",
        "published": e.find("a:published", ns).text or "",
    } for e in ET.fromstring(xml).findall("a:entry", ns)]


def is_short(vid):
    status, _ = get(f"https://www.youtube.com/shorts/{vid}", follow=False)
    return status == 200


def frame_size(vid):
    """Largest video format of the upload as (width, height), or None if YouTube didn't say."""
    try:
        _, html = get(f"https://www.youtube.com/watch?v={vid}&hl=en")
    except Exception:
        return None
    i = html.find('"adaptiveFormats"')
    if i < 0:
        return None
    sizes = [(int(w), int(h)) for w, h in re.findall(r'"width":(\d+),"height":(\d+)', html[i:i + 200000])]
    return max(sizes, key=lambda s: s[0] * s[1]) if sizes else None


def add_ratios(text, state):
    """Writes ratio: "WxH" into works.js lines of videos that aren't 16:9. Each video is checked once."""
    sized = set(state.get("sized", []))
    lines = text.split("\n")
    budget = 25  # a few per run, so a blocked YouTube page doesn't slow every run down
    for n, line in enumerate(lines):
        m = re.search(r'link:\s*"[^"]*(?:youtu\.be/|v=|/embed/)([\w-]{11})', line)
        if not m or m.group(1) in sized or "ratio:" in line or budget == 0:
            continue
        budget -= 1
        size = frame_size(m.group(1))
        time.sleep(1)
        if not size:
            continue
        sized.add(m.group(1))
        w, h = size
        if h and w > h and abs(w / h - 16 / 9) > 0.05:
            g = math.gcd(w, h)
            # 2880x2160 and 1920x1440 are the same shape; keep the size he'd recognise when it's a common one
            shape = {(4, 3): "1920x1440", (12, 5): "1920x800"}.get((w // g, h // g), f"{w}x{h}")
            lines[n] = re.sub(r"\s*\}(,?)\s*$", f', ratio: "{shape}" }}\\1', line)
            print("Ratio", shape, "for", m.group(1))
    return "\n".join(lines), sorted(sized)


def js(s):
    return s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ").strip()


def main():
    state = json.loads(STATE.read_text()) if STATE.exists() else {}
    cid = channel_id(state)
    try:
        videos = feed(cid)
    except Exception as e:  # YouTube's feed is sometimes down; the next run tries again
        print("Feed unavailable:", e)
        return
    first_run = "seen" not in state
    seen = set(state.get("seen", []))
    text = WORKS.read_text(encoding="utf-8")
    on_site = set(re.findall(r'(?:youtu\.be/|v=|/shorts/|/embed/)([\w-]{11})', text))

    added = []
    if not first_run:
        for v in sorted(videos, key=lambda v: v["published"]):  # oldest first, so the newest ends up on top
            if v["id"] in seen or v["id"] in on_site or is_short(v["id"]):
                continue
            line = '  { title: "%s", year: "%s", link: "https://youtu.be/%s", tags: %s },\n' % (
                js(v["title"]), v["published"][:4], v["id"], DEFAULT_TAGS)
            text = text.replace("window.WORKS = [\n", "window.WORKS = [\n" + line, 1)
            added.append(v["title"])
    before = WORKS.read_text(encoding="utf-8")
    text, sized = add_ratios(text, state)
    if text != before:
        WORKS.write_text(text, encoding="utf-8")

    today = datetime.now(timezone.utc).date().isoformat()
    checked = state.get("checked", "")
    new_state = {
        "channel_id": cid,
        "seen": sorted(seen | {v["id"] for v in videos}),
        "sized": sized,
        # touched about once a month so GitHub keeps the scheduled check switched on
        "checked": today if added or first_run or checked[:7] != today[:7] else checked,
    }
    if new_state != state:
        STATE.write_text(json.dumps(new_state, indent=2) + "\n")
    print("Added:", added or "nothing", "(first run, only remembering current videos)" if first_run else "")


if __name__ == "__main__":
    main()
