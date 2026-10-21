#!/usr/bin/env python3
import json, shutil, subprocess, unittest

from generate_cv_sections import DATA, render_template, tex, text_tex, conference_block


TEMPLATE = """# Publications
<!--GEN:PUBS-->
# Proceedings
<!--GEN:PROCS-->
<!--GEN:WORKING_PAPERS-->
## Awards
<!--GEN:AWARDS_AWARD-->
## Fellowships
<!--GEN:AWARDS_FELLOWSHIP-->
## Grants
<!--GEN:AWARDS_GRANT-->
# Teaching
<!--GEN:TEACHING-->
# Professional Services
<!--GEN:SERVICES-->
# Conference Presentations
<!--GEN:CONFS-->
# Software
<!--GEN:SOFTWARE-->
"""


def sample_data():
  return {
    'pubs': {'items': [
      {'cvSelected': True, 'label': 'J12', 'authors': 'Park H*', 'year': '2026',
       'title': 'A&B_1', 'journal': 'Journal & Review',
       'status': 'Forthcoming issue'},
      {'cvSelected': True, 'authors': 'Lee D', 'year': '2025', 'title': 'Fallback',
       'journal': 'Journal', 'status': 'Published'},
    ]},
    'procs': {'items': [
      {'cvSelected': True, 'label': 'C8', 'authors': 'Park H', 'year': '2026',
       'title': 'Proceedings Paper', 'proceedings': 'Conference',
       'status': 'Accepted'},
    ]},
    'awards': {'items': [
      {'type': 'award', 'title': 'Award & Prize', 'awarder': 'Dept_1',
       'year': '2026', 'special': True},
      {'type': 'fellowship', 'title': 'Fellowship', 'awarder': 'Institute',
       'year': '2025'},
      {'type': 'grant', 'title': 'Research Grant', 'awarder': 'PI', 'year': '2024'},
    ]},
    'teaching': {'items': [
      {'institution': 'Seoul National University', 'courses': [
        {'role': 'Current Students',
         'details': ['See https://example.test/members/']},
        {'role': 'Courses', 'details': ['Course A', 'Course B']},
      ]},
    ]},
    'servs': {'items': [
      {'type': 'membership', 'title': 'Membership', 'details': [
        {'category': 'International', 'subdetails': ['INFORMS', 'Society & Group']},
        {'category': 'Korean', 'subdetails': ['Association One', 'Association Two']},
      ]},
      {'type': 'service', 'title': 'University Service', 'details': [
        {'category': 'Seoul National University', 'subdetails': ['Committee A']},
      ]},
      {'type': 'reviewer', 'title': 'Ad-hoc Reviewer', 'details': [
        {'category': 'Journals', 'subdetails': ['Journal A', 'Journal B']},
      ]},
    ]},
    'software': {'items': [
      {'name': 'Tool_1', 'link': 'https://example.test/tool_name'},
    ]},
    'working-papers': {'title': 'Working Papers', 'items': [
      {'id': 'selected', 'title': 'Selected Paper', 'authors': 'Lee D, Park H',
       'year': '2026', 'status': 'Working paper', 'cvNote': 'Prize & recognition',
       'cvSelected': True},
      {'id': 'unselected', 'title': 'Do Not Include', 'authors': 'Park H',
       'year': '2025', 'status': 'Draft', 'cvSelected': False},
    ]},
    'resources': {'title': 'Research Systems and Resources', 'items': [
      {'id': 'selected', 'name': 'Selected Resource', 'description': 'Description & detail',
       'year': '2026', 'kind': 'Research system', 'cvSelected': True},
      {'id': 'unselected', 'name': 'Unselected Resource', 'description': 'Hidden',
       'year': '2025', 'kind': 'Resource', 'cvSelected': False},
    ]},
    'research': {'ongoing': [
      {'title': 'Progress & Topic', 'description': 'Short _description_.',
       'cvSelected': True, 'authors': 'Do not cite', 'targetVenue': 'Do not claim'},
      {'title': 'Unselected Topic', 'description': 'Not in the CV.',
       'cvSelected': False},
    ]},
    'confs': {'items': [
      {'title': 'Paper A', 'conferences': [
        {'name': 'Conference One', 'location': 'Berlin', 'year': '2026'},
        {'name': 'Conference Two', 'location': 'Online', 'year': '2026'},
        {'name': 'Conference Three', 'year': '2024'},
      ]},
      {'title': 'Paper B', 'conferences': [
        {'name': 'Conference Four', 'location': 'Seoul', 'year': '2025'},
      ]},
    ]},
  }


class CvGenerationTests(unittest.TestCase):
  def test_tex_escaping_and_url_preservation(self):
    self.assertEqual(
      tex(r'A & B 50% #1_file {draft} $x^y~ \path'),
      r'A \& B 50\% \#1\_file \{draft\} \$x\textasciicircum{}y\textasciitilde{} \textbackslash{}path',
    )
    self.assertEqual(
      text_tex('Visit https://example.test/a_b?q=1&x=2.'),
      r'Visit \url{https://example.test/a_b?q=1&x=2}.',
    )

  def test_shared_sections_selection_and_labels(self):
    output = render_template(TEMPLATE, sample_data())
    self.assertNotIn('<!--GEN:', output)
    self.assertIn(r'\pubentry{[J12]}', output)
    self.assertIn(r'\pubentry{[J1]}', output)
    self.assertIn(r'\pubentry{[C8]}', output)
    self.assertIn(r'\pubentry{[W1]}', output)
    self.assertIn('(Forthcoming issue)', output)
    self.assertIn('(Published)', output)
    self.assertIn(r'\textit{Conference} (Accepted)', output)
    self.assertIn(r'**Award \& Prize**', output)
    self.assertIn(r'_Dept\_1_', output)
    self.assertIn(r'\textit{Working paper}', output)
    self.assertIn(r'Prize \& recognition', output)
    self.assertIn(r'\url{https://example.test/members/}', output)
    self.assertIn('Professional Membership', output)
    self.assertIn('University and Department Service', output)
    self.assertIn('Ad-hoc Reviewer', output)
    self.assertIn('Selected Resource', output)
    self.assertNotIn('Selected Research in Progress', output)
    self.assertNotIn(r'Progress \& Topic', output)
    self.assertNotIn('Do not cite', output)
    self.assertNotIn('Do not claim', output)
    self.assertNotIn('Unselected Resource', output)
    self.assertNotIn('Do Not Include', output)

  def test_optional_files_may_be_absent(self):
    data = sample_data()
    data.pop('working-papers')
    data.pop('resources')
    data['research'] = {'ongoing': []}
    output = render_template(TEMPLATE, data)
    self.assertNotIn('Selected Working Papers', output)
    self.assertNotIn('Research Systems and Resources', output)
    self.assertIn(r'Tool\_1', output)
    self.assertNotIn('<!--GEN:', output)

  def test_conference_records_and_no_patent_section(self):
    output = render_template(TEMPLATE, sample_data())
    conferences = output.split('# Conference Presentations\n', 1)[1].split(
      '# Software', 1)[0]
    self.assertIn('## 2026', conferences)
    self.assertIn('## 2025', conferences)
    self.assertIn('## 2024', conferences)
    self.assertIn('## 2026\n\n- **Paper A**', conferences)
    self.assertLess(conferences.index('## 2026'), conferences.index('## 2025'))
    self.assertLess(conferences.index('## 2025'), conferences.index('## 2024'))
    self.assertIn(r'**Paper A**: Conference One, Berlin; Conference Two, Online',
                  conferences)
    self.assertIn('Conference Three', conferences)
    self.assertIn('Conference Four, Seoul', conferences)
    self.assertNotIn('Patents', output)
    self.assertNotIn('Co-inventor', output)
    self.assertNotIn('Application filed', output)
    self.assertNotIn('2027', output)

  @unittest.skipUnless(shutil.which('pandoc'), 'Pandoc required for rendering regression')
  def test_conferences_are_parsed_as_bullet_lists(self):
    markdown = conference_block(sample_data()['confs']['items'])
    result = subprocess.run(['pandoc', '-f', 'markdown', '-t', 'json'],
                            input=markdown, capture_output=True, text=True, check=True)
    blocks = json.loads(result.stdout)['blocks']
    self.assertEqual([item['t'] for item in blocks],
                     ['Header', 'BulletList', 'Header', 'BulletList', 'Header', 'BulletList'])
    self.assertEqual(sum(len(item['c']) for item in blocks if item['t'] == 'BulletList'), 3)

  def test_public_funding_is_explicitly_curated(self):
    records = json.loads((DATA / 'awards.json').read_text())['items']
    actual = {item['title'] for item in records if item['type'] == 'grant'}
    self.assertEqual(actual, {
      'Korea NRF Human-in-the-Loop AI Decision-Making Algorithm and Policy',
      'Korea NRF Large-scale AI Model and Platform Optimization Center',
      'Korea NRF Emerging Scholar Program',
      'FDA Broad Agency Announcement (BAA): FDA Quality Management and Pharmaceutical Firm Learning to Reduce Drug Quality Risks',
      'U01 Grant from FDA to NIPTE: Manufacturing Sector Research Initiative',
    })


if __name__ == '__main__':
  unittest.main()
