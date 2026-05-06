"""
Resize ir konvertuoti originalias nuotraukas į 3 dydžius (480w/768w/1200w)
JPG + WebP formatais. Saugo aspect ratio.
"""
from PIL import Image
from pathlib import Path

IMAGES_DIR = Path(__file__).parent.parent / "src" / "assets" / "images"
WIDTHS = [480, 768, 1200]
JPG_QUALITY = 82
WEBP_QUALITY = 80

# semantic_name -> orig file
TARGETS = {
    "hero-lashes":              "orig-hero-lashes.jpg",
    "portfolio-1-before-after": "orig-portfolio-1-before-after.jpg",
    "portfolio-2-brows":        "orig-portfolio-2-collage-brows.jpg",
    "portfolio-3-volume":       "orig-portfolio-3-volume-collage.jpg",
    "portfolio-4-classic":      "orig-portfolio-4-classic.jpg",
}


def process(name: str, src: Path) -> None:
    img = Image.open(src)
    if img.mode != "RGB":
        img = img.convert("RGB")
    w, h = img.size
    print(f"\n{name}: {w}x{h}")

    for target_w in WIDTHS:
        if target_w >= w:
            new_w, new_h = w, h
        else:
            ratio = target_w / w
            new_w = target_w
            new_h = int(h * ratio)

        resized = img.resize((new_w, new_h), Image.LANCZOS)

        jpg_path = IMAGES_DIR / f"{name}-{target_w}w.jpg"
        webp_path = IMAGES_DIR / f"{name}-{target_w}w.webp"

        resized.save(jpg_path, "JPEG", quality=JPG_QUALITY, optimize=True, progressive=True)
        resized.save(webp_path, "WEBP", quality=WEBP_QUALITY, method=6)

        print(f"  {target_w}w  jpg={jpg_path.stat().st_size//1024}KB  webp={webp_path.stat().st_size//1024}KB  ({new_w}x{new_h})")


def main() -> None:
    for name, orig in TARGETS.items():
        src = IMAGES_DIR / orig
        if not src.exists():
            print(f"SKIP: {src} not found")
            continue
        process(name, src)
    print("\nDone.")


if __name__ == "__main__":
    main()
