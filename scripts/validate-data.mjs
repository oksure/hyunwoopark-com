import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = name => JSON.parse(fs.readFileSync(path.join(root, 'src/data', `${name}.json`), 'utf8'));
const papers = ['pubs', 'procs', 'working-papers'].flatMap(name => read(name).items);
const ids = new Set();
const labels = new Set();
for (const paper of papers) {
  assert(paper.id && paper.title && paper.authors && paper.year, `Incomplete paper: ${paper.title}`);
  assert(!ids.has(paper.id), `Duplicate paper ID: ${paper.id}`);
  ids.add(paper.id);
  if (paper.label) {
    assert(!labels.has(paper.label), `Duplicate publication label: ${paper.label}`);
    labels.add(paper.label);
  }
  for (const link of [paper.link, paper.demo].filter(Boolean)) {
    assert(['https:', 'http:'].includes(new URL(link).protocol), `Invalid link: ${link}`);
  }
  if (/workshop/i.test(paper.proceedings || '')) assert.equal(paper.recordType, 'workshop');
  if (/Findings/.test(paper.proceedings || '')) assert.equal(paper.recordType, 'findings');
}
const research = read('research');
const themes = new Set(research.themes.map(theme => theme.id));
for (const work of research.works) {
  assert(ids.has(work.publicationId), `Missing paper reference: ${work.publicationId}`);
  assert(themes.has(work.theme), `Missing theme: ${work.theme}`);
  if (work.image) {
    assert(work.image.startsWith('/research/') && !work.image.includes('..'));
    assert(work.alt && work.credit, `Image metadata missing: ${work.id}`);
    assert(fs.existsSync(path.join(root, 'public', work.image)), `Missing image: ${work.image}`);
  }
}
for (const item of research.ongoing) assert(themes.has(item.theme));
const content = fs.readdirSync(path.join(root, 'src/data')).filter(name => name.endsWith('.json'))
  .map(name => fs.readFileSync(path.join(root, 'src/data', name), 'utf8')).join('\n');
assert(!/\/home\/[^/]+\/|user_uploads|NATHUMBEHAV-\d+|10-\d{4}-\d{7}|\/SiteForm\//.test(content), 'Private evidence in public data');
const checks = {
  publications: papers.length,
  stableLabels: labels.size,
  themes: themes.size,
  featuredWorks: research.works.filter(work => work.featured).length,
  workingPapers: read('working-papers').items.length,
  selectedResearchInProgress: research.ongoing.filter(item => item.cvSelected).length,
};
console.log(JSON.stringify({ pass: true, ...checks }, null, 2));
