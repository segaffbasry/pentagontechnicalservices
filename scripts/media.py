"""Convert the scraped live-site imagery (_scrape/) into web-sized WebP files in public/media.

Widths are capped at each source's own size, so nothing is upscaled. The hero film
(banner.mp4, 850x480 h264) is copied as-is with a poster frame taken at 4s.
Run: python3 scripts/media.py (needs Pillow; ffmpeg for the poster).
"""
import shutil
import subprocess
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "_scrape"
OUT = ROOT / "public" / "media"

# source file -> (output name, max width)
JOBS = {
    "banner1.jpg": ("banner", 1948),
    "pentagon2.jpg": ("glass-tower", 1600),
    "safe-hands.jpg": ("safe-hands", 2000),
    "pentagon.jpg": ("canopy", 991),
    "Pentagon1.jpg": ("facade", 498),
    "data-centre-1.jpg": ("hall-corridor", 1000),
    "data-centre-4.jpg": ("hall-colour", 1152),
    "data-centre-6.jpg": ("hall-blue", 1152),
    "data-centre-7.jpg": ("hall-window", 1200),
    "data-centre-9.jpg": ("hall-aisle", 1000),
    "USA.png": ("news-usa", 1000),
    "recruiting.png": ("news-recruiting", 740),
    "Accreditations.png": ("news-accreditations", 740),
    "data-cloud-global-congress.png": ("news-datacloud", 740),
    "talent.png": ("news-talent", 740),
}


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for src, (name, width) in JOBS.items():
        im = Image.open(SRC / src).convert("RGB")
        if im.width > width:
            im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
        im.save(OUT / f"{name}.webp", "WEBP", quality=80, method=6)
        print(f"{name}.webp {im.width}x{im.height}")
    # The accreditation marks are split out separately by scripts/logos.py.
    shutil.copy(SRC / "banner.mp4", OUT / "hero.mp4")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", "4", "-i", str(OUT / "hero.mp4"), "-frames:v", "1", "-q:v", "3", str(SRC / "poster.jpg")], check=True)
    Image.open(SRC / "poster.jpg").save(OUT / "hero-poster.webp", "WEBP", quality=78)


if __name__ == "__main__":
    main()
