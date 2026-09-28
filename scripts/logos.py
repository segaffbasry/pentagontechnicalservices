"""Split the live accreditations composite (Accreditations-scaled-e1758640393389.png, 1200x465, white ground)
into one transparent PNG per mark for the accreditations ticker.

Each rough box is trimmed to its ink, then white is keyed out: alpha comes from the distance to white,
and the colour is un-premultiplied against white so anti-aliased edges don't leave a pale fringe.
Run: python3 scripts/logos.py (needs Pillow + numpy).
"""
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "_scrape" / "Accreditations-scaled-e1758640393389.png"
OUT = ROOT / "public" / "media" / "accreditations"

# The silver caption ("Silver Member", rows 232-238, x 721-770) touches the gold mark's box; it is painted white first.
ERASE = {"constructionline-gold": (700, 229, 880, 239)}

# name -> rough box (x0, y0, x1, y1) on the 1200x465 composite
BOXES = {
    "iso-14001": (0, 0, 235, 150),
    "iso-9001": (0, 155, 235, 310),
    "iso-45001": (0, 315, 235, 465),
    "chas-standard": (315, 45, 500, 230),
    "chas-elite": (315, 232, 500, 410),
    "constructionline-bronze": (615, 60, 790, 150),
    "constructionline-silver": (705, 160, 875, 240),
    "constructionline-gold": (565, 229, 880, 392),
    "carbon-footprint": (955, 165, 1200, 300),
}


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    src = Image.open(SRC).convert("RGBA")
    ground = Image.new("RGBA", src.size, "white")
    ground.alpha_composite(src)
    rgb = np.asarray(ground.convert("RGB")).astype(float)
    for name, box in BOXES.items():
        x0, y0, x1, y1 = box
        if name in ERASE:
            ex0, ey0, ex1, ey1 = ERASE[name]
            rgb_n = rgb.copy()
            rgb_n[ey0:ey1, ex0:ex1] = 255
        else:
            rgb_n = rgb
        crop = rgb_n[y0:y1, x0:x1]
        ink = (255 - crop.min(axis=2)) > 18
        ys, xs = np.where(ink)
        crop = crop[max(ys.min() - 2, 0): ys.max() + 3, max(xs.min() - 2, 0): xs.max() + 3]
        a = (255 - crop.min(axis=2)) / 255.0
        a = np.clip((a - .03) / .97, 0, 1)
        safe = np.where(a > 0, a, 1)[..., None]
        col = np.clip((crop - 255 * (1 - a[..., None])) / safe, 0, 255)
        img = np.dstack([col, a * 255]).astype(np.uint8)
        im = Image.fromarray(img)
        im.save(OUT / f"{name}.png", optimize=True)
        print(name, im.size)


if __name__ == "__main__":
    main()
