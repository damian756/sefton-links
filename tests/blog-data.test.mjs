// Blog data checks: one entry per slug, known categories, and no "review" label
// on the course guides. Static: loads lib/blog.ts (no imports) and reads files.
// Run: node --test tests/*.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BLOG_CATEGORIES, BLOG_POSTS } from '../lib/blog.ts';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const read = (p) => readFileSync(join(ROOT, p), 'utf8');

test('every blog slug appears once', () => {
  const seen = new Map();
  for (const p of BLOG_POSTS) seen.set(p.slug, (seen.get(p.slug) ?? 0) + 1);
  const twice = [...seen].filter(([, n]) => n > 1).map(([s]) => s);
  assert.deepEqual(twice, [], `duplicate slugs: ${twice.join(', ')}`);
});

test('every post is in a known category', () => {
  const known = new Set(BLOG_CATEGORIES.map((c) => c.slug));
  const unknown = BLOG_POSTS.filter((p) => !known.has(p.categorySlug)).map((p) => p.slug);
  assert.deepEqual(unknown, []);
});

test('course articles are labelled guides, not reviews (the slug course-reviews stays)', () => {
  const cat = BLOG_CATEGORIES.find((c) => c.slug === 'course-reviews');
  assert.ok(cat, 'course-reviews category exists');
  assert.equal(cat.label, 'Course Guides');
  for (const c of BLOG_CATEGORIES) {
    assert.doesNotMatch(`${c.label} ${c.description}`, /\breviews?\b/i, c.slug);
  }
  for (const f of ['app/[locale]/blog/page.tsx', 'app/feed/route.ts']) {
    assert.doesNotMatch(read(f), /course reviews/i, f);
  }
});
