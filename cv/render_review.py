#!/usr/bin/env python3
"""Render every CV page and assemble a labeled, complete review sheet."""
import argparse, math, pathlib, re, subprocess
from PIL import Image, ImageDraw

parser = argparse.ArgumentParser()
parser.add_argument('pdf', type=pathlib.Path)
parser.add_argument('--out-dir', required=True, type=pathlib.Path)
args = parser.parse_args()
args.out_dir.mkdir(parents=True, exist_ok=True)
info = subprocess.run(['pdfinfo', str(args.pdf)], check=True,
                      capture_output=True, text=True).stdout
count = int(re.search(r'Pages:\s+(\d+)', info).group(1))
subprocess.run(['pdftoppm', '-r', '120', '-png', str(args.pdf),
                str(args.out_dir / 'page')], check=True, capture_output=True)
files = sorted(args.out_dir.glob('page-*.png'),
               key=lambda p: int(p.stem.split('-')[-1]))
if len(files) != count:
  raise SystemExit(f'Expected {count} pages, found {len(files)}. Use a fresh output directory.')
width, gutter, label = 360, 14, 24
with Image.open(files[0]) as first:
  height = round(first.height * width / first.width)
cols = min(3, count)
sheet = Image.new('RGB', (cols * (width + gutter) + gutter,
                         math.ceil(count / cols) * (height + label + gutter) + gutter), '#e7e7e7')
draw = ImageDraw.Draw(sheet)
for i, path in enumerate(files):
  x = gutter + (i % cols) * (width + gutter)
  y = gutter + (i // cols) * (height + label + gutter)
  draw.text((x + 4, y + 5), f'Page {i + 1} / {count}', fill='black')
  with Image.open(path) as page:
    sheet.paste(page.convert('RGB').resize((width, height), Image.Resampling.LANCZOS), (x, y + label))
sheet.save(args.out_dir / 'all-pages.png')
print(f'Rendered all {count} pages: {args.out_dir / "all-pages.png"}')
