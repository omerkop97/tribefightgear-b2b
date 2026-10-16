"""Convert the raw WeTransfer PNGs (3000px, transparent) into web-ready WebP.

Usage: python -I scripts/process-photos.py "<path to X ISPO ITEMS>" public/images/products
"""
import os
import sys
from PIL import Image

# raw folder (relative to X ISPO ITEMS) -> (category, model slug)
MAP = {
    "Essential/Gloves/Aiba": ("gloves", "mandala"),
    "Essential/Gloves/AD": ("gloves", "dotline"),
    "Essential/Gloves/RDX": ("gloves", "warrior"),
    "MMA Gloves": ("gloves", "mma-hybrid"),
    "Essential/Protective Gear/Aiba/Head Gear": ("protective", "mandala-headguard"),
    "Essential/Protective Gear/AD/Head Guards": ("protective", "dotline-headguard"),
    "Essential/Protective Gear/RDX/Head Guards": ("protective", "warrior-headguard"),
    "Essential/Protective Gear/Aiba/Shinpads": ("protective", "mandala-shinguard"),
    "Essential/Protective Gear/AD/Shin Pads": ("protective", "dotline-shinguard"),
    "Essential/Protective Gear/RDX/Shinpads": ("protective", "warrior-shinguard"),
    "Essential/Coaching Equipment/Aiba/Focus Pads": ("coaching", "mandala-focus-pads"),
    "Essential/Coaching Equipment/RDX/Focus Pads": ("coaching", "warrior-focus-pads"),
}
SIZES = (1400, 700)

src_root, out_root = sys.argv[1], sys.argv[2]
for rel, (cat, slug) in MAP.items():
    folder = os.path.join(src_root, rel)
    files = sorted(f for f in os.listdir(folder) if f.lower().endswith(".png"))
    out = os.path.join(out_root, cat, slug)
    os.makedirs(out, exist_ok=True)
    for i, name in enumerate(files, 1):
        im = Image.open(os.path.join(folder, name)).convert("RGBA")
        for size in SIZES:
            im.resize((size, size), Image.LANCZOS).save(
                os.path.join(out, f"{i}-{size}.webp"), "WEBP", quality=82, method=6
            )
    print(cat, slug, len(files))
