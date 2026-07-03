#!/usr/bin/env python3
"""Generate the CV's Selected Publications / Selected Referred Conference
Proceedings blocks from src/data/{pubs,procs}.json (single source of truth)
and splice them into cv/CV_template.Rmd -> cv/CV_Hyunwoo_Park_gen.Rmd.

Contract: output for the current data must be byte-identical to the previously
hand-written blocks (verified at migration, 2026-07-03). Entries with
cvSelected: true appear, newest first, numbered [J#]/[C#] by position from the
oldest entry (site convention, len - index)."""
import json, pathlib, sys

HERE = pathlib.Path(__file__).parent
DATA = HERE.parent / 'src' / 'data'

BADGE = {
  'utd24': r'\utd', 'ft50': r'\ft', 'abs4*': r'\absfourstar',
  'abs4': r'\absfour', 'abs3': r'\absthree', 'abs': r'\absgen',
  'top cs': r'\topcs',
}
AWARD = {
  'Best Paper': r'\bestpaper', 'Best Poster': r'\bestposter',
  'Best Paper Finalist': r'\bestpaperfinalist',
  'Best Student Paper': r'\beststudentpaper',
}

def tex(s):
  return s.replace('&', r'\&').replace('%', r'\%').replace('#', r'\#')

def authors_tex(s):
  out = []
  for a in s.split(', '):
    star = a.endswith('*')
    name = a[:-1] if star else a
    t = r'\textbf{%s}' % name if name == 'Park H' else name
    out.append(t + ('$^*$' if star else ''))
  return ', '.join(out)

def cite_tail(p):
  # volume(number), pp.range | bare article id | no. articleNo
  vol, num, pages = p.get('volume'), p.get('number'), p.get('pages')
  bits = ''
  if vol:
    bits = vol + (f'({num})' if num else '')
  if pages:
    # 'pp.' only for real page ranges; a dashless value is an article id
    part = f'pp.{pages}' if '-' in pages else pages
    bits += f', {part}' if bits else part
  if p.get('articleNo'):
    bits += f', no. {p["articleNo"]}'
  return f', {bits}' if bits else ''

def links_tex(p):
  out = []
  if p.get('link'):
    out.append(r'[\href{%s}{Link {\scriptsize\faExternalLink}}]' % p['link'])
  if p.get('demo'):
    out.append(r'[\href{%s}{Live Demo {\scriptsize\faDesktop}}]' % p['demo'])
  return out

def entry(label, p, venue_key):
  # cvTitleTex: optional raw-TeX title override (e.g. italics inside the title)
  title = p['cvTitleTex'] if p.get('cvTitleTex') else tex(p['title'])
  parts = [f'{authors_tex(p["authors"])}. {p["year"]}. {title}.']
  if venue_key == 'journal':
    parts.append(r'\textit{%s}%s' % (tex(p['journal']), cite_tail(p)))
  else:
    # proceedings string may carry a trailing status like "(Accepted)"
    proc = tex(p['proceedings'])
    if proc.endswith('(Accepted)'):
      parts.append(r'\textit{%s} (Accepted)' % proc[:-len(' (Accepted)')])
    else:
      parts.append(r'\textit{%s}' % proc)
  body = ' '.join(parts[:1]) + ' ' + parts[1]
  tail = links_tex(p)
  badges = [BADGE[t] for t in p.get('top', []) if t in BADGE]
  badges += [AWARD[a] for a in p.get('award', []) if a in AWARD]
  if tail:
    body += ' ' + ' '.join(tail)
  if badges:
    body += ' ' + '~'.join(badges)
  return r'\pubentry{[%s]}{%s}' % (label, body)

def block(items, prefix, venue_key):
  total = len(items)
  lines = []
  for i, p in enumerate(items):
    if not p.get('cvSelected'):
      continue
    lines.append(entry(f'{prefix}{total - i}', p, venue_key))
  return '\n\n'.join(lines)

def main():
  pubs = json.load(open(DATA / 'pubs.json'))['items']
  procs = json.load(open(DATA / 'procs.json'))['items']
  tpl = (HERE / 'CV_template.Rmd').read_text()
  out = tpl.replace('<!--GEN:PUBS-->', block(pubs, 'J', 'journal'))
  out = out.replace('<!--GEN:PROCS-->', block(procs, 'C', 'proceedings'))
  if '<!--GEN:' in out:
    sys.exit('unreplaced GEN marker remains')
  (HERE / 'CV_Hyunwoo_Park_gen.Rmd').write_text(out)
  print(f'generated CV_Hyunwoo_Park_gen.Rmd '
        f'({sum(1 for p in pubs if p.get("cvSelected"))} pubs, '
        f'{sum(1 for p in procs if p.get("cvSelected"))} procs)')

if __name__ == '__main__':
  main()
