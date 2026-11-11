// No em dash (U+2014) in anything a visitor or a search engine sees:
// C:\Projects\CLAUDE.md. Static read, no dependencies. Fails on an em dash, the
// &mdash; / &#8212; entities or a \u2014 escape anywhere outside code comments in
// app/ (pages, metadata exports, title and description templates, JSON-LD,
// the feed and sitemap), lib/ (post bodies, course data, advert copy, the
// contact email), components/, i18n/, messages/ (all 18 languages) and public/
// text files (manifest, robots, llms.txt if added).
// Run: node --test tests/*.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIRS = ['app', 'lib', 'components', 'i18n', 'messages', 'public'];
const TEXT = /\.(tsx?|jsx?|mjs|json|md|txt|xml|html|svg|webmanifest|css)$/;
const DASH = /\u2014|&mdash;|&#8212;|&#x2014;|\\u2014/i;

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (TEXT.test(name)) out.push(p);
  }
  return out;
}

/** Code with comments blanked out (block comments, JSX comments and // line comments). */
export function withoutComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    // A // comment starts a line or follows whitespace or ;,){ ; a URL's // follows a colon.
    .replace(/(^|[\s;,){])\/\/[^\n]*/g, (m, lead) => lead + ' '.repeat(m.length - lead.length));
}

function hits() {
  const found = [];
  for (const file of DIRS.flatMap((d) => walk(join(ROOT, d)))) {
    const raw = readFileSync(file, 'utf8');
    const src = /\.(json|md|txt|xml|html|svg|webmanifest)$/.test(file) ? raw : withoutComments(raw);
    src.split('\n').forEach((line, i) => {
      if (DASH.test(line)) found.push(`${relative(ROOT, file).split(sep).join('/')}:${i + 1}: ${line.trim().slice(0, 100)}`);
    });
  }
  return found;
}

test('no em dash in customer-facing source: pages, metadata, data files, messages, public text', () => {
  assert.deepEqual(hits(), []);
});

test('the comment filter keeps strings and URLs and drops only comments', () => {
  const sample = [
    "const a = 'Fees: \u2014 here'; // note \u2014 fine",
    "const u = 'https://example.com/x'; /* block \u2014 fine */",
    "  // whole-line comment \u2014 fine",
    "<p>{/* JSX comment \u2014 fine */}text</p>",
  ].join('\n');
  const kept = withoutComments(sample).split('\n');
  assert.match(kept[0], /\u2014 here/, 'string kept');
  assert.doesNotMatch(kept[0], /note/, 'line comment dropped');
  assert.match(kept[1], /https:\/\/example\.com/, 'URL kept');
  assert.doesNotMatch(kept[1], /\u2014/, 'block comment dropped');
  assert.doesNotMatch(kept[2], /\u2014/);
  assert.doesNotMatch(kept[3], /\u2014/);
});
