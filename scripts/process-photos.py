"""Convert the raw WeTransfer PNGs (3000px, transparent) into web-ready WebP.

Usage: python -I scripts/process-photos.py "<path to X ISPO ITEMS>" public/images/products

Each entry maps a client photo folder to (category, model slug). An optional third
value keeps only files whose name contains that text (e.g. Glory focus pads come in
Long / Short / Mini variants inside one folder).
"""
import os
import sys
from PIL import Image

MAP = {
    # Essential
    "Essential/Gloves/Aiba": ("gloves", "mandala"),
    "Essential/Gloves/AD": ("gloves", "dotline"),
    "Essential/Gloves/RDX": ("gloves", "warrior"),
    "Essential/Protective Gear/Aiba/Head Gear": ("protective", "mandala-headguard"),
    "Essential/Protective Gear/AD/Head Guards": ("protective", "dotline-headguard"),
    "Essential/Protective Gear/RDX/Head Guards": ("protective", "warrior-headguard"),
    "Essential/Protective Gear/Aiba/Shinpads": ("protective", "mandala-shinguard"),
    "Essential/Protective Gear/AD/Shin Pads": ("protective", "dotline-shinguard"),
    "Essential/Protective Gear/RDX/Shinpads": ("protective", "warrior-shinguard"),
    "Essential/Coaching Equipment/Aiba/Focus Pads": ("coaching", "mandala-focus-pads"),
    "Essential/Coaching Equipment/RDX/Focus Pads": ("coaching", "warrior-focus-pads"),
    # Elite
    "Elite/Gloves/Apex": ("gloves", "apex"),
    "Elite/Gloves/Glory": ("gloves", "glory"),
    "Elite/Gloves/Fly": ("gloves", "fly"),
    "Elite/Protective Gear/Apex/Head Guards": ("protective", "apex-headguard"),
    "Elite/Protective Gear/Glory/Head Guards": ("protective", "glory-headguard"),
    "Elite/Protective Gear/Fly/Head Gear": ("protective", "fly-headguard"),
    "Elite/Protective Gear/Apex/Shin Pads": ("protective", "apex-shinguard"),
    "Elite/Protective Gear/Glory/Shinpads": ("protective", "glory-shinguard"),
    "Elite/Protective Gear/Fly/Shinpads": ("protective", "fly-shinguard"),
    "Elite/Coaching Equipment/Glory/Focus Pads#Long": ("coaching", "glory-focus-long", "(Long)"),
    "Elite/Coaching Equipment/Glory/Focus Pads#Short": ("coaching", "glory-focus-short", "(Short)"),
    "Elite/Coaching Equipment/Glory/Focus Pads#Mini": ("coaching", "glory-focus-mini", "(Mini)"),
    "Elite/Coaching Equipment/Fly/Focus Pads": ("coaching", "fly-focus-pads"),
    "Elite/Coaching Equipment/Apex/Arm Pads": ("coaching", "apex-arm-pads"),
    "Elite/Coaching Equipment/Glory/Arm Pads": ("coaching", "glory-arm-pads"),
    "Elite/Coaching Equipment/Fly/Arm Pads": ("coaching", "fly-arm-pads"),
    "Elite/Coaching Equipment/Glory/Belly Pads": ("coaching", "glory-belly-pads"),
    # Collections outside the levels
    "MMA Gloves": ("gloves", "mma-hybrid"),
    "Accessories/Speedball": ("fightwear", "speedball"),
    "Accessories/Shin In Step": ("fightwear", "shin-instep"),
    "Accessories/Groin Guards": ("fightwear", "groin-guard"),
    "Accessories/Boxing Shoes": ("fightwear", "boxing-shoes"),
}
SIZES = (1400, 700)

src_root, out_root = sys.argv[1], sys.argv[2]
for key, target in MAP.items():
    cat, slug = target[0], target[1]
    match = target[2] if len(target) > 2 else None
    folder = os.path.join(src_root, key.split("#")[0])
    files = sorted(
        f for f in os.listdir(folder)
        if f.lower().endswith(".png") and (match is None or match in f)
    )
    out = os.path.join(out_root, cat, slug)
    os.makedirs(out, exist_ok=True)
    for i, name in enumerate(files, 1):
        im = Image.open(os.path.join(folder, name)).convert("RGBA")
        for size in SIZES:
            im.resize((size, size), Image.LANCZOS).save(
                os.path.join(out, f"{i}-{size}.webp"), "WEBP", quality=82, method=4
            )
    print(cat, slug, len(files), flush=True)
