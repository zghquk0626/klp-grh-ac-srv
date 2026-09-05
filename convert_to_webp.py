#!/usr/bin/env python3
"""Convert all JPEG/PNG images in img/ to WebP format."""
from pathlib import Path
from PIL import Image

QUALITY = 80
IMG_DIR = Path("img")

for ext in ("*.jpg", "*.jpeg", "*.JPEG", "*.png"):
    for src in IMG_DIR.rglob(ext):
        dst = src.with_suffix(".webp")
        if dst.exists():
            continue
        with Image.open(src) as img:
            img.save(dst, "WEBP", quality=QUALITY)
        src_size = src.stat().st_size
        dst_size = dst.stat().st_size
        saved = (1 - dst_size / src_size) * 100
        print(f"{src.name}: {src_size//1024}KB -> {dst_size//1024}KB ({saved:.0f}% saved)")
