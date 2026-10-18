"""Adds new videos from the YouTube channel to the top of works.js.

Runs from .github/workflows/youtube.yml. Only videos the script has not seen
before are added, so works removed from works.js by hand never come back.
Shorts are skipped.
"""
import json, re, sys, urllib.request, urllib.error, xml.etree.ElementTree as ET
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
    if added:
        WORKS.write_text(text, encoding="utf-8")

    today = datetime.now(timezone.utc).date().isoformat()
    checked = state.get("checked", "")
    new_state = {
        "channel_id": cid,
        "seen": sorted(seen | {v["id"] for v in videos}),
        # touched about once a month so GitHub keeps the scheduled check switched on
        "checked": today if added or first_run or checked[:7] != today[:7] else checked,
    }
    if new_state != state:
        STATE.write_text(json.dumps(new_state, indent=2) + "\n")
    print("Added:", added or "nothing", "(first run, only remembering current videos)" if first_run else "")


if __name__ == "__main__":
    main()
