#!/usr/bin/env python3
"""Resize site images in place (JPEG + WebP) and generate small thumbnails.

Targets:
- img/revolushine-promo/  : long side <= 1400px (portrait poster art)
- img/revolushine-beforeafter/: long side <= 1200px + 200px-wide *-thumb.webp
- img/hero-img-revolushine.webp : long side <= 1400px (CSS hero background)

Originals are preserved under <dir>/original/ (promo already has one).
Run from the repo root: python3 optimize_images.py
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).parent

TARGETS = [
    ("img/revolushine-promo", 1200, 1400, ["rvl-promo-facial", "rvl-promo-facial2", "rvl-promo-filler", "rvl-promo-prfl"]),
    ("img/revolushine-beforeafter", 1200, 200, None),  # max_long, thumb_width
]


def _resize_keep(im, max_long):
    w, h = im.size
    longest = max(w, h)
    if longest <= max_long:
        return im
    ratio = max_long / float(longest)
    return im.resize((int(round(w * ratio)), int(round(h * ratio))), Image.LANCZOS)


def _save_jpeg(im, path):
    im.save(path, "JPEG", quality=82, optimize=True, progressive=True)


def _save_webp(im, path, quality=82):
    im.save(path, "WEBP", quality=quality, method=6)


def main():
    # 1) Promo poster images (JPEG/WebP), longest side <= 1400
    promo_dir = ROOT / "img/revolushine-promo"
    names = ["rvl-promo-facial", "rvl-promo-facial2", "rvl-promo-filler", "rvl-promo-prfl"]
    for name in names:
        for raw in sorted(promo_dir.glob(name + ".*")):
            if raw.suffix.lower() in (".webp", ".jpeg", ".jpg"):
                im = Image.open(raw)
                im = _resize_keep(im, 1400)
                im = im.convert("RGB")
                if raw.suffix.lower() == ".webp":
                    _save_webp(im, raw)
                else:
                    _save_jpeg(im, raw)
                print(f"promo resized: {raw.name} -> {im.size}")

    # 2) Before/after images: longest side <= 1200 + *-thumb.webp at 200px wide
    ba_dir = ROOT / "img/revolushine-beforeafter"
    orig_backup = ba_dir / "original"
    orig_backup.mkdir(exist_ok=True)
    images = sorted([p for p in ba_dir.glob("*.*") if p.suffix.lower() in (".jpg", ".jpeg", ".webp")])
    for raw in images:
        im = Image.open(raw)
        im = _resize_keep(im, 1200)
        im = im.convert("RGB")
        if raw.suffix.lower() == ".webp":
            _save_webp(im, raw)
        else:
            _save_jpeg(im, raw)
        print(f"beforeafter resized: {raw.name} -> {im.size}")

        thumb_name = raw.stem + "-thumb.webp"
        if not (ba_dir / thumb_name).exists():
            tw = 200
            th = int(round(im.size[1] * tw / float(im.size[0])))
            _save_webp(im.resize((tw, th), Image.LANCZOS), ba_dir / thumb_name, quality=80)
            print(f"  thumb: {thumb_name} -> {tw}x{th}")

    # 3) Hero background webp -> longest side <= 1400
    hero = ROOT / "img/hero-img-revolushine.webp"
    if hero.exists():
        im = Image.open(hero).convert("RGB")
        im = _resize_keep(im, 1400)
        _save_webp(im, hero)
        print(f"hero resized: {hero.name} -> {im.size}")


if __name__ == "__main__":
    main()