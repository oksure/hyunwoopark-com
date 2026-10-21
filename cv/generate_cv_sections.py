#!/usr/bin/env python3
"""Generate shared CV sections from src/data and splice them into the Rmd."""
import json, pathlib, re

HERE = pathlib.Path(__file__).parent
DATA = HERE.parent / 'src' / 'data'
GEN_MARKER = re.compile(r'<!--GEN:([A-Z_]+)-->')
URL = re.compile(r'https?://[^\s]+')

TEX_ESCAPES = {
  '\\': r'\textbackslash{}', '{': r'\{', '}': r'\}', '$': r'\$',
  '&': r'\&', '%': r'\%', '#': r'\#', '_': r'\_',
  '^': r'\textasciicircum{}', '~': r'\textasciitilde{}',
}
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
  return ''.join(TEX_ESCAPES.get(char, char) for char in str(s))


def text_tex(s):
  """Escape text for TeX while retaining readable, clickable URLs."""
  s = str(s)
  out = []
  start = 0
  for match in URL.finditer(s):
    url = match.group(0)
    end = len(url)
    while end and url[end - 1] in '.,;:!?)]':
      end -= 1
    out.append(tex(s[start:match.start()]))
    if end:
      out.append(r'\url{%s}' % url[:end])
    out.append(tex(url[end:]))
    start = match.end()
  out.append(tex(s[start:]))
  return ''.join(out)


def authors_tex(s):
  out = []
  for author in s.split(', '):
    star = author.endswith('*')
    name = author[:-1] if star else author
    rendered = r'\textbf{%s}' % tex(name) if name == 'Park H' else tex(name)
    out.append(rendered + ('$^*$' if star else ''))
  return ', '.join(out)


def cite_tail(p):
  # volume(number), pp.range | bare article id | no. articleNo
  vol, num, pages = p.get('volume'), p.get('number'), p.get('pages')
  bits = ''
  if vol:
    bits = vol + (f'({num})' if num else '')
  if pages:
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
    venue = r'\textit{%s}%s' % (tex(p['journal']), cite_tail(p))
    if p.get('status'):
      venue += f' ({tex(p["status"])})'
    parts.append(venue)
  else:
    proc = tex(p['proceedings'])
    accepted_suffix = ' (Accepted)'
    legacy_status = None
    if proc.endswith(accepted_suffix):
      legacy_status = 'Accepted'
      proc = proc[:-len(accepted_suffix)]
    status = p.get('status') or legacy_status
    suffix = f' ({tex(status)})' if status else ''
    parts.append(r'\textit{%s}%s' % (proc, suffix))
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
    label = p.get('label', f'{prefix}{total - i}')
    lines.append(entry(label, p, venue_key))
  return '\n\n'.join(lines)


def award_line(item, kind):
  title = text_tex(item['title'])
  awarder = item.get('awarder')
  year = item.get('year')
  if kind == 'grant' and awarder in {'PI', 'Co-PI'}:
    parts = [f'**{text_tex(awarder)}**', f'_{title}_']
  else:
    if kind == 'award' and item.get('special'):
      title = f'**{title}**'
    parts = [title]
    if awarder:
      parts.append(f'_{text_tex(awarder)}_')
  if year:
    parts.append(text_tex(year))
  line = '- ' + ', '.join(parts)
  if item.get('notes'):
    line += f' ({text_tex(item["notes"])})'
  return line


def awards_block(items, kind):
  return '\n'.join(award_line(item, kind) for item in items
                   if item.get('type') == kind)


def teaching_block(data):
  sections = []
  for institution in data['items']:
    lines = [f'## {text_tex(institution["institution"])}']
    courses = institution.get('courses', [])
    for index, course in enumerate(courses):
      role = course['role']
      details = course.get('details', [])
      if role == 'TA':
        lines.extend(f'- {text_tex(detail)}' for detail in details)
      elif role == 'Current Students' and len(details) == 1:
        lines.append(f'- {text_tex(role)}: {text_tex(details[0])}')
      elif role == 'Instructor' and len(details) == 1 and institution['institution'].startswith('Georgia Institute of Technology'):
        lines.append(f'- {text_tex(role)}, {text_tex(details[0])}')
      elif role in {'Past Students', 'Courses', 'Advising & Committee', 'Course Development'} or len(details) > 1:
        lines.append(f'- {text_tex(role)}')
        lines.extend(f'  - {text_tex(detail)}' for detail in details)
      elif details:
        lines.append(f'- {text_tex(role)}: {text_tex(details[0])}')
      else:
        lines.append(f'- {text_tex(role)}')
      if (institution['institution'].startswith((
          'Seoul National University', 'The Ohio State University'))
          and index < len(courses) - 1):
        lines.append(r'\vspace{.5em}')
    sections.append('\n'.join(lines))
  return '\n\n'.join(sections)


def category_details(item):
  for detail in item.get('details', []):
    if isinstance(detail, dict):
      yield detail.get('category', ''), detail.get('subdetails', [])
    else:
      yield '', [detail]


def service_block(items):
  sections = []
  for item in items:
    kind, title = item.get('type'), item.get('title', 'Professional Service')
    details = list(category_details(item))
    if kind == 'membership':
      lines = ['## Professional Membership']
      for category, values in details:
        values = [text_tex(value) for value in values]
        if category == 'International':
          lines.append('- International')
          if values:
            lines.append('  - ' + values[0])
          if len(values) > 1:
            lines.append('  - ' + ', '.join(values[1:]))
        elif values:
          lines.append(f'- {text_tex(category)}: ' + ', '.join(values))
      sections.append('\n'.join(lines))
    elif kind == 'conference':
      for category, values in details:
        lines = [f'## {text_tex(category or title)}']
        lines.extend(f'- {text_tex(value)}' for value in values)
        sections.append('\n'.join(lines))
    elif kind == 'service':
      heading = ('University and Department Service'
                 if title == 'University Service' else title)
      lines = [f'## {text_tex(heading)}']
      for category, values in details:
        if category:
          lines.append(f'- {text_tex(category)}')
          lines.extend(f'  - {text_tex(value)}' for value in values)
        else:
          lines.extend(f'- {text_tex(value)}' for value in values)
      sections.append('\n'.join(lines))
    elif kind == 'reviewer':
      lines = [f'## {text_tex(title)}']
      for category, values in details:
        values = [text_tex(value) for value in values]
        if title == 'Editorial Review Board' and category == 'Journals':
          lines.extend(f'- {value}' for value in values)
        elif title == 'Ad-hoc Reviewer':
          lines.extend([f'- **{text_tex(category)}**', '',
                        '  ' + ', '.join(values)])
        elif category:
          lines.append(f'- **{text_tex(category)}**')
          lines.extend(f'  - {value}' for value in values)
        else:
          lines.extend(f'- {value}' for value in values)
      sections.append('\n'.join(lines))
    else:
      lines = [f'## {text_tex(title)}']
      for category, values in details:
        if category:
          lines.append(f'- {text_tex(category)}')
          lines.extend(f'  - {text_tex(value)}' for value in values)
        else:
          lines.extend(f'- {text_tex(value)}' for value in values)
      sections.append('\n'.join(lines))
  return '\n\n'.join(sections)


def software_block(data, resources=None):
  lines = []
  for item in data['items']:
    line = f'- **{text_tex(item["name"])}**'
    if item.get('link'):
      line += f': \\url{{{item["link"]}}}'
    lines.append(line)
  selected = [item for item in (resources or {}).get('items', [])
              if item.get('cvSelected')]
  if selected:
    title = text_tex((resources or {}).get('title', 'Research Resources'))
    lines.extend(['', f'**{title}**', ''])
    for item in selected:
      line = f'- **{text_tex(item["name"])}**'
      if item.get('description'):
        line += f': {text_tex(item["description"])}'
      meta = [text_tex(item[key]) for key in ('kind', 'year') if item.get(key)]
      if meta:
        line += ' (' + ', '.join(meta) + ')'
      if item.get('link'):
        line += f' \\url{{{item["link"]}}}'
      lines.append(line)
  return '\n'.join(lines)


def year_sort_key(year):
  match = re.search(r'\d{4}', str(year))
  return int(match.group(0)) if match else -1


def conference_block(items):
  grouped = {}
  for item in items:
    item_years = {}
    for conference in item.get('conferences', []):
      year = str(conference.get('year') or 'Undated')
      item_years.setdefault(year, []).append(conference)
    for year, conferences in item_years.items():
      grouped.setdefault(year, []).append((item['title'], conferences))

  sections = []
  for year in sorted(grouped, key=year_sort_key, reverse=True):
    lines = [f'## {text_tex(year)}', r'\nopagebreak[4]']
    for title, conferences in grouped[year]:
      venues = []
      for conference in conferences:
        venue = [text_tex(conference.get(key, ''))
                 for key in ('name', 'location') if conference.get(key)]
        if venue:
          venues.append(', '.join(venue))
      line = f'- **{text_tex(title)}**'
      if venues:
        line += ': ' + '; '.join(venues)
      lines.append(line)
    sections.append('\n'.join(lines))
  return '\n\n'.join(sections)


def patents_section(data):
  selected = [item for item in data['items'] if item.get('cvSelected') is True]
  if not selected:
    return ''
  years = sorted({str(item['year']) for item in selected if item.get('year')},
                 key=year_sort_key)
  noun = 'patent application' if len(selected) == 1 else 'patent applications'
  line = f'- Co-inventor on a {noun}'
  if years:
    line += ', ' + ', '.join(text_tex(year) for year in years)
  return '# Patents\n' + line + '.'


def working_papers_section(data, research):
  items = (data or {}).get('items', [])
  selected = [item for item in items if item.get('cvSelected')]
  entries = []
  for index, item in enumerate(selected):
    label = item.get('label', f'W{len(selected) - index}')
    body = (f'{authors_tex(item["authors"])}. {text_tex(item["year"])}. '
            f'{text_tex(item["title"])}.')
    if item.get('status'):
      body += f' \\textit{{{text_tex(item["status"])}}}.'
    if item.get('cvNote'):
      body += f' ({text_tex(item["cvNote"])})'
    if item.get('link'):
      body += r' [\href{%s}{Link {\scriptsize\faExternalLink}}]' % item['link']
    entries.append(r'\pubentry{[%s]}{%s}' % (label, body))
  sections = []
  if entries:
    title = data.get('title', 'Working Papers').strip()
    if not title.lower().startswith('selected '):
      title = 'Selected ' + title
    sections.append(f'# {text_tex(title)}\n\\vspace{{.5em}}\n\n' +
                    '\n\n'.join(entries))
  ongoing = [item for item in research.get('ongoing', [])
             if item.get('cvSelected') is True]
  if ongoing:
    heading = '## Selected Research in Progress' if entries else '# Selected Research in Progress'
    bullets = []
    for item in ongoing:
      if not item.get('title') or not item.get('description'):
        raise ValueError('selected research-in-progress entries need title and description')
      bullets.append(f'- **{text_tex(item["title"])}**: '
                     f'{text_tex(item["description"])}')
    sections.append(heading + '\n' + '\n'.join(bullets))
  return '\n\n'.join(sections)


def render_template(template, data):
  awards = data['awards']['items']
  replacements = {
    'PUBS': block(data['pubs']['items'], 'J', 'journal'),
    'PROCS': block(data['procs']['items'], 'C', 'proceedings'),
    'AWARDS_AWARD': awards_block(awards, 'award'),
    'AWARDS_FELLOWSHIP': awards_block(awards, 'fellowship'),
    'AWARDS_GRANT': awards_block(awards, 'grant'),
    'TEACHING': teaching_block(data['teaching']),
    'SERVICES': service_block(data['servs']['items']),
    'CONFS': conference_block(data['confs']['items']),
    'PATENTS': patents_section(data['patents']),
    'SOFTWARE': software_block(data['software'], data.get('resources')),
    'WORKING_PAPERS': working_papers_section(
      data.get('working-papers'), data['research']),
  }

  def replace(match):
    marker = match.group(1)
    if marker not in replacements:
      raise ValueError(f'unknown CV generation marker: {marker}')
    return replacements[marker]

  output = GEN_MARKER.sub(replace, template)
  if '<!--GEN:' in output:
    raise ValueError('unreplaced CV generation marker remains')
  return output


def load_data(name, optional=False):
  path = DATA / f'{name}.json'
  if optional and not path.exists():
    return None
  with path.open(encoding='utf-8') as source:
    return json.load(source)


def main():
  data = {name: load_data(name) for name in (
    'pubs', 'procs', 'awards', 'teaching', 'servs', 'software', 'research',
    'confs', 'patents')}
  data['working-papers'] = load_data('working-papers', optional=True)
  data['resources'] = load_data('resources', optional=True)
  template = (HERE / 'CV_template.Rmd').read_text(encoding='utf-8')
  output = render_template(template, data)
  (HERE / 'CV_Hyunwoo_Park_gen.Rmd').write_text(output, encoding='utf-8')
  n_pubs = sum(bool(item.get('cvSelected')) for item in data['pubs']['items'])
  n_procs = sum(bool(item.get('cvSelected')) for item in data['procs']['items'])
  n_working = sum(bool(item.get('cvSelected')) for item in
                  (data['working-papers'] or {}).get('items', []))
  n_resources = sum(bool(item.get('cvSelected')) for item in
                    (data['resources'] or {}).get('items', []))
  n_research = sum(item.get('cvSelected') is True for item in
                   data['research'].get('ongoing', []))
  n_confs = sum(len(item.get('conferences', []))
                for item in data['confs']['items'])
  n_patents = sum(item.get('cvSelected') is True
                  for item in data['patents']['items'])
  print(f'generated CV_Hyunwoo_Park_gen.Rmd ({n_pubs} pubs, {n_procs} procs, '
        f'{n_working} working papers, {n_resources} resources, '
        f'{n_research} research-in-progress items, {n_confs} conference events, '
        f'{n_patents} generic patent records)')


if __name__ == '__main__':
  main()
