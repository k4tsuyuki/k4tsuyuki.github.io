"""One-off: exact upload dates for the videos in .github/all-videos.tsv."""
import re, time, urllib.request
from pathlib import Path
P = Path(".github/all-videos.tsv")
UA = {"User-Agent": "Mozilla/5.0", "Accept-Language": "en", "Cookie": "SOCS=CAI; CONSENT=YES+1"}
out = []
for line in P.read_text().splitlines():
    vid = line.split("\t")[0]
    date = ""
    for _ in range(2):
        try:
            html = urllib.request.urlopen(urllib.request.Request("https://www.youtube.com/watch?v=" + vid, headers=UA), timeout=30).read().decode("utf-8", "replace")
            m = re.search(r'"(?:uploadDate|publishDate)":"(\d{4}-\d\d-\d\d)', html) or re.search(r'itemprop="(?:uploadDate|datePublished)" content="(\d{4}-\d\d-\d\d)', html)
            if m: date = m.group(1); break
        except Exception as e:
            print(vid, e)
        time.sleep(2)
    out.append(vid + "\t" + date)
    time.sleep(.5)
Path(".github/video-dates.tsv").write_text("\n".join(out) + "\n")
print(sum(1 for l in out if l.split("\t")[1]), "of", len(out))
