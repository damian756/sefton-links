// SeftonLinks no longer uses affiliate links (Damian, 11 Nov 2026). Static
// read of the site's code and messages: no affiliate network, redirect or tag,
// no affiliate module, and rel="sponsored" only on labelled adverts and
// sponsored articles. Run: npm run test:enquiry   (node --test tests/*.test.mjs)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const read = (p) => readFileSync(join(ROOT, p), 'utf8');
const rel = (p) => relative(ROOT, join(ROOT, p)).split(sep).join('/');

function walk(dirs, onFile) {
  const go = (dir) => {
    if (!existsSync(join(ROOT, dir))) return;
    for (const name of readdirSync(join(ROOT, dir))) {
      const p = join(dir, name);
      if (statSync(join(ROOT, p)).isDirectory()) go(p);
      else onFile(p, name);
    }
  };
  for (const d of dirs) go(d);
}

const AFFILIATE = [
  /awin1\.com/i,
  /awclick/i,
  /tidd\.ly/i,
  /prf\.hn/i,
  /booking\.com[^\s"'`]*[?&]aid=/i,
  /[?&](ref|affid|awinmid|awinaffid|clickref)=/i,
  /laterooms\.com/i,
  /championstravel/i,
  /cottages\.com/i,
  /sykescottages/i,
  /golfbreaks\.com/i,
  /amazon\.[a-z.]+\/[^\s"'`]*[?&]tag=/i,
  /goape\.co\.uk/i,
  /affiliate-links/i,
];

test('no affiliate domain, redirect or tag in app/, lib/, components/, content/ or messages/', () => {
  const hits = [];
  walk(['app', 'lib', 'components', 'content', 'messages'], (p, name) => {
    if (!/\.(tsx?|jsx?|mjs|json|md|txt)$/.test(name)) return;
    const src = read(p);
    for (const re of AFFILIATE) if (re.test(src)) hits.push(`${rel(p)}: ${re}`);
  });
  assert.deepEqual(hits, []);
});

test('the affiliate links module is gone', () => {
  assert.equal(existsSync(join(ROOT, 'lib/affiliate-links.ts')), false);
});

test('no affiliate or commission disclosure is left in the messages', () => {
  const hits = [];
  walk(['messages'], (p, name) => {
    if (!name.endsWith('.json')) return;
    if (/"[A-Za-z]*[Aa]ffiliate[A-Za-z]*"\s*:/.test(read(p))) hits.push(rel(p));
  });
  assert.deepEqual(hits, []);
});

test('rel="sponsored" appears only on labelled adverts and sponsored articles', () => {
  const allowed = new Set(['components/AdSlot.tsx', 'app/[locale]/blog/[slug]/page.tsx']);
  const hits = [];
  walk(['app', 'components', 'lib'], (p, name) => {
    // JSX attributes only (comments in lib/ describe the rule).
    if (/\.(tsx|jsx)$/.test(name) && /\srel=["'{][^>\n]*sponsored/.test(read(p)) && !allowed.has(rel(p))) hits.push(rel(p));
  });
  assert.deepEqual(hits, []);
});
