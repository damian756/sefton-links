// No link or URL to the domains in lib/blocked-domains.ts (standing rule,
// Damian, 11 Nov 2026). Static read of every text file under app/, lib/,
// components/, content/, messages/ and public/, comments included: a domain
// written out anywhere in those folders fails. Naming the organisations in
// words is fine. Run: node --test tests/*.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BLOCKED_DOMAINS } from '../lib/blocked-domains.ts';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIRS = ['app', 'lib', 'components', 'content', 'messages', 'public'];
const TEXT = /\.(tsx?|jsx?|mjs|cjs|json|md|txt|xml|html|svg|css|webmanifest)$/;
const SELF = join('lib', 'blocked-domains.ts');

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// The domain itself or any subdomain of it, not a longer name that ends the same way.
export const BLOCKED = new RegExp(`(?<![a-z0-9-])(?:[a-z0-9-]+\\.)*(?:${BLOCKED_DOMAINS.map(escape).join('|')})(?![a-z0-9-])`, 'i');

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (TEXT.test(name)) out.push(p);
  }
  return out;
}

test('no link or URL to a blocked domain in app/, lib/, components/, content/, messages/ or public/', () => {
  const hits = [];
  for (const file of DIRS.flatMap((d) => walk(join(ROOT, d)))) {
    const rel = relative(ROOT, file);
    if (rel === SELF) continue;
    readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
      const m = line.match(BLOCKED);
      if (m) hits.push(`${rel.split(sep).join('/')}:${i + 1}: ${m[0]}`);
    });
  }
  assert.deepEqual(hits, []);
});

test('the domain pattern catches links, subdomains and schema URLs, and not look-alikes', () => {
  for (const s of [
    'https://www.sefton.gov.uk/parking',
    'href="http://boldhotel.com"',
    "sameAs: ['https://www.facebook.com/x', 'https://thegrand.co.uk/']",
    'visit democracy.sefton.gov.uk today',
    'southportmarket.co.uk',
  ]) assert.match(s, BLOCKED, s);
  for (const s of ['The Bold Hotel on Lord Street', 'Southport Market', 'notboldhotel.com']) {
    assert.doesNotMatch(s, BLOCKED, s);
  }
  assert.ok(BLOCKED_DOMAINS.length >= 18);
});
