#!/usr/bin/env python3
"""Build the responsive image set the frames load.

Reads every source in assets-src/ and writes, into public/images, a WebP
at each width the layout can actually use plus one JPEG fallback, along with
src/image-manifest.json so the component only ever names a file that exists.

    python3 scripts/images.py

Drop a replacement in assets-src/ and re-run.
"""
import json
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
# Outside public/ so the originals never get copied into the deploy.
SRC = ROOT / 'assets-src'
OUT = ROOT / 'public' / 'images'
# Each entry carries the widths that exist and the source aspect ratio, which
# the component needs: a full-bleed cover crop renders far wider than its box
# whenever the frame is more portrait than the photograph.
MANIFEST = ROOT / 'src' / 'image-manifest.json'

# 2400 covers a 1200px frame at 2x; 800 covers a 390px phone at 2x.
WIDTHS = [800, 1200, 1800, 2400]
FALLBACK_WIDTH = 1600


def widths_for(native: int) -> list[int]:
    """Ladder up to and including the native width.

    The top rung has to be the source's own width: a phone at DPR 3 renders a
    full-bleed cover crop at ~3000 device pixels, and anything less than native
    there is visibly softer than what the site served before.
    """
    ws = [w for w in WIDTHS if w < native]
    ws.append(native)
    return ws


def build(path: Path) -> dict:
    im = Image.open(path).convert('RGB')  # every one of these is a backdrop
    stem = path.stem
    # A plot carries thin lines and small type; a photograph does not.
    quality = 90 if stem == 'pystock' else 82

    ws = widths_for(im.width)
    for w in ws:
        r = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        dst = OUT / f'{stem}-{w}.webp'
        r.save(dst, 'WEBP', quality=quality, method=6)
        print(f'  {dst.name:<28} {dst.stat().st_size / 1024:7.1f} KB')

    fw = min(FALLBACK_WIDTH, im.width)
    r = im.resize((fw, round(im.height * fw / im.width)), Image.LANCZOS)
    dst = OUT / f'{stem}.jpg'
    r.save(dst, 'JPEG', quality=quality, optimize=True, progressive=True)
    print(f'  {dst.name:<28} {dst.stat().st_size / 1024:7.1f} KB  (fallback)')
    return {'w': ws, 'a': round(im.width / im.height, 3)}


def main() -> int:
    if not SRC.is_dir():
        print(f'no source directory: {SRC}', file=sys.stderr)
        return 1
    manifest = {}
    for path in sorted(SRC.iterdir()):
        if path.suffix.lower() not in {'.jpg', '.jpeg', '.png', '.webp'}:
            continue
        print(path.name)
        manifest[f'/images/{path.stem}.jpg'] = build(path)
    MANIFEST.write_text(json.dumps(manifest, indent=2) + '\n')
    print(f'\n{len(manifest)} sources -> {MANIFEST.relative_to(ROOT)}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
