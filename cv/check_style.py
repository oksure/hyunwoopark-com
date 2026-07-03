#!/usr/bin/env python3
"""Style gate for the CV build — catches 'generic pandoc article' regressions
(skipped class/preamble/postproc) while allowing normal content edits.
Exits 1 with reasons on failure. Requires poppler-utils + Pillow."""
import re, sys, subprocess as sp, tempfile, pathlib

pdf = sys.argv[1]
fails = []

def run(*cmd):
  return sp.run(cmd, capture_output=True, text=True).stdout

# 1. page count in a sane band (content edits move it a little, not a lot)
pages = int(re.search(r'Pages:\s+(\d+)', run('pdfinfo', pdf)).group(1))
if not 6 <= pages <= 10:
  fails.append(f'page count {pages} outside 6-10')

# 2. fonts: Times family required, FontAwesome required (Link icons),
#    Computer/Latin Modern forbidden (= pandoc default article, preamble skipped)
fonts = run('pdffonts', pdf)
if not re.search(r'Nimbus.*Rom|Times', fonts, re.I):
  fails.append('Times/Nimbus font missing (mathptmx not applied)')
if 'FontAwesome' not in fonts:
  fails.append('FontAwesome missing (Link icons broken)')
if re.search(r'\bCMR|LMRoman', fonts):
  fails.append('Computer/Latin Modern fonts present (custom class skipped)')

# 3. structural text
txt = run('pdftotext', pdf, '-')
if 'Hyunwoo Park' not in txt:
  fails.append('name missing from text layer')
if not re.search(r'Page \d+ of \d+', txt):
  fails.append('fancyhdr "Page X of N" footer missing')
if not re.search(r'\[J\d+\]', txt):
  fails.append('bracketed [J#] publication numbering missing (postproc skipped)')

# 4. colored badge pixels on page 1 (tikz UTD24/FT50/ABS boxes; generic build ~0)
try:
  from PIL import Image
  with tempfile.TemporaryDirectory() as d:
    sp.run(['pdftoppm', '-png', '-f', '1', '-l', '1', '-r', '60', pdf, f'{d}/p'],
           check=True, capture_output=True)
    img = Image.open(next(pathlib.Path(d).glob('p*.png'))).convert('HSV')
    h, s, v = img.split()
    sat, val = s.load(), v.load()
    colored = sum(1 for y in range(0, img.height, 2) for x in range(0, img.width, 2)
                  if sat[x, y] > 115 and val[x, y] > 115)
    # verified gpu build measures ~124 at this sampling; the generic build is 0
    if colored < 50:
      fails.append(f'colored badge/link pixels too few on p1 ({colored} < 50)')
except Exception as e:
  fails.append(f'badge pixel check errored: {e}')

if fails:
  print('STYLE GATE FAILED:')
  for f in fails: print(f'  ✗ {f}')
  sys.exit(1)
print(f'style gate OK ({pages} pages, Times+FontAwesome, [J#] numbering, badges present)')
