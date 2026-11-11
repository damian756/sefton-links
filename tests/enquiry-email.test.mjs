// Every enquiry is delivered to DELIVERY_EMAIL; every address a visitor sees is
// DISPLAY_EMAIL. The contact route sends from our own domain, escapes what the
// enquirer typed, sets reply-to to the enquirer, logs failed sends, sends no
// auto-reply and ignores the honeypot. Static reads plus the pure helpers in
// lib/: nothing is sent and no route is called.
// Run: npm run test:enquiry   (node --test tests/*.test.mjs)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  DEFAULT_FROM,
  buildEnquiryEmail,
  cleanSubject,
  escapeHtml,
  fromOnOwnDomain,
  logSendError,
  plainAddress,
} from '../lib/enquiry-email.ts';
import { DELIVERY_EMAIL, DISPLAY_EMAIL } from '../lib/contact.ts';
import { CONTACT_SUBJECTS, LIMITS, isContactSubject } from '../lib/contact-form.ts';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const read = (p) => readFileSync(join(ROOT, p), 'utf8');
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;

const ROUTE = 'app/api/contact/route.ts';
const FORM = 'app/[locale]/contact/ContactForm.tsx';

// Pages that print our contact address.
const DISPLAYS = [
  'app/[locale]/contact/page.tsx',
  'app/[locale]/advertise/page.tsx',
  'app/[locale]/disclosure/page.tsx',
  'app/[locale]/privacy/page.tsx',
];

// Addresses allowed in the route that are not contact addresses.
const NOT_CONTACT = new Set(['noreply@seftonlinks.com']);
const addresses = (src) => (src.match(EMAIL) ?? []).filter((a) => !NOT_CONTACT.has(a));

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
const rel = (p) => relative(ROOT, join(ROOT, p)).split(sep).join('/');

test('DELIVERY_EMAIL and DISPLAY_EMAIL have the agreed values', () => {
  assert.equal(DELIVERY_EMAIL, 'damian@churchtownmedia.co.uk');
  assert.equal(DISPLAY_EMAIL, 'hello@seftoncoast.network');
});

for (const file of DISPLAYS) {
  test(`${file} prints DISPLAY_EMAIL and no hard-coded address`, () => {
    const src = read(file);
    assert.match(src, /import \{[^}]*\bDISPLAY_EMAIL\b[^}]*\} from '@\/lib\/contact'/, 'imports DISPLAY_EMAIL');
    assert.match(src, /\{DISPLAY_EMAIL\}/, 'prints it');
    assert.match(src, /href=\{`mailto:\$\{DISPLAY_EMAIL\}`\}/, 'links to it');
    assert.doesNotMatch(src, /DELIVERY_EMAIL/, 'never shows the delivery address');
    assert.deepEqual(addresses(src), [], 'no hard-coded address');
  });
}

test('the contact route delivers to DELIVERY_EMAIL with reply-to set to the enquirer', () => {
  const src = read(ROUTE);
  assert.match(src, /import \{[^}]*\bDELIVERY_EMAIL\b[^}]*\} from '@\/lib\/contact'/);
  assert.match(src, /const TO_EMAIL = DELIVERY_EMAIL;/);
  assert.match(src, /const replyTo = plainAddress\(body\.email\);/);
  assert.match(src, /buildEnquiryEmail\(enquiry, \{ from: FROM_EMAIL, to: TO_EMAIL, replyTo \}\)/);
  assert.deepEqual(addresses(src), [], 'no hard-coded address');
});

test('the contact route sends one email only (no auto-reply), checks the result and logs errors', () => {
  const src = read(ROUTE);
  assert.equal((src.match(/resend\.emails\.send\(/g) ?? []).length, 1);
  assert.match(src, /const \{ error \} = await resend\.emails\.send\(mail\);/);
  assert.ok((src.match(/logSendError\(/g) ?? []).length >= 2);
  assert.match(src, /if \(!apiKey\) \{\s*console\.error\(/, 'logs a missing RESEND_API_KEY');
});

test('the contact route sends from our own domain and never from a provider test sender', () => {
  const src = read(ROUTE);
  assert.match(src, /const FROM_EMAIL = fromOnOwnDomain\(process\.env\.RESEND_FROM_EMAIL\);/);
  assert.equal(DEFAULT_FROM, 'SeftonLinks <noreply@seftonlinks.com>');
  assert.equal(fromOnOwnDomain(undefined), DEFAULT_FROM);
  assert.equal(fromOnOwnDomain(''), DEFAULT_FROM);
  assert.equal(fromOnOwnDomain('Test <onboarding@resend.dev>'), DEFAULT_FROM);
  assert.equal(fromOnOwnDomain('x@example.com'), DEFAULT_FROM);
  assert.equal(fromOnOwnDomain('SeftonLinks <hello@seftonlinks.com>'), 'SeftonLinks <hello@seftonlinks.com>');
  assert.equal(fromOnOwnDomain('A <a@seftonlinks.com>\r\nBcc: b@example.com'), DEFAULT_FROM);
});

test('resend.dev appears nowhere in app/, lib/ or components/', () => {
  const hits = [];
  walk(['app', 'lib', 'components'], (p, name) => {
    if (/\.(tsx?|jsx?|mjs|json)$/.test(name) && /resend\.dev/i.test(read(p))) hits.push(rel(p));
  });
  assert.deepEqual(hits, []);
});

test('honeypot: the form has a hidden "website" field and the route sends nothing when it is filled', () => {
  const form = read(FORM);
  assert.match(form, /name="website"/);
  assert.match(form, /aria-hidden="true"/);
  assert.match(form, /website: data\.get\('website'\)/);
  const src = read(ROUTE);
  const honeypot = src.indexOf("body.website.trim() !== ''");
  assert.ok(honeypot > 0, 'checks the honeypot');
  assert.ok(honeypot < src.indexOf('resend.emails.send('), 'before any send');
  assert.match(src, /if \(typeof body\.website === 'string' && body\.website\.trim\(\) !== ''\) \{\s*return NextResponse\.json\(\{ ok: true \}\);\s*\}/);
});

test('name is capped at 100 characters and the subject is one of a fixed list', () => {
  assert.equal(LIMITS.name, 100);
  const src = read(ROUTE);
  assert.match(src, /name\.length > LIMITS\.name/);
  assert.match(src, /isContactSubject\(subject\)/);
  assert.match(read(FORM), /maxLength=\{LIMITS\.name\}/);
  assert.deepEqual([...CONTACT_SUBJECTS], ['general', 'correction', 'advertising', 'press', 'other']);
  assert.ok(isContactSubject('advertising'));
  assert.ok(!isContactSubject('Advertising\r\nBcc: x@example.com'));
});

test('the contact form posts to the contact route and is the only form', () => {
  assert.match(read(FORM), /fetch\('\/api\/contact'/);
  const forms = [];
  walk(['app', 'components'], (p, name) => {
    if (/\.tsx$/.test(name) && /<form\b/.test(read(p))) forms.push(rel(p));
  });
  assert.deepEqual(forms, ['app/[locale]/contact/ContactForm.tsx']);
});

test('no client component imports lib/contact (the delivery address stays on the server)', () => {
  const hits = [];
  walk(['app', 'components', 'lib'], (p, name) => {
    if (!/\.(tsx?|jsx?)$/.test(name)) return;
    const src = read(p);
    if (/^\s*['"]use client['"]/.test(src) && /from ['"]@\/lib\/contact['"]/.test(src)) hits.push(rel(p));
  });
  assert.deepEqual(hits, []);
});

test('no other address of ours appears anywhere in the site', () => {
  const ours = /@(seftoncoast\.network|churchtownmedia\.co\.uk|seftonlinks\.com)\b/;
  const found = [];
  walk(['app', 'components', 'lib', 'public', 'messages'], (p, name) => {
    if (!/\.(tsx?|mjs|js|json|txt|md|html|xml)$/.test(name)) return;
    for (const a of read(p).match(EMAIL) ?? []) {
      if (ours.test(a)) found.push(`${rel(p)}: ${a}`);
    }
  });
  assert.deepEqual(found.sort(), [
    'lib/contact.ts: damian@churchtownmedia.co.uk', // DELIVERY_EMAIL
    'lib/contact.ts: hello@seftoncoast.network', // DISPLAY_EMAIL
    'lib/enquiry-email.ts: noreply@seftonlinks.com', // DEFAULT_FROM, not a contact address
  ]);
});

const HOSTILE = {
  name: 'Jo <script>alert("x")</script>',
  email: 'jo@example.com',
  subject: 'Advertising\r\nBcc: victim@example.com',
  message: `Hello <b>there</b> & "friends" 'all'`,
  space: 'Partner on the <Hillside> course guide',
};

test('escapeHtml escapes the five HTML characters', () => {
  assert.equal(escapeHtml(`<a href="x">'&'</a>`), '&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;');
  assert.equal(escapeHtml(undefined), '');
});

test('cleanSubject strips CR and LF', () => {
  assert.equal(cleanSubject('a\r\nb\nc'), 'a b c');
});

test('the enquiry email goes to DELIVERY_EMAIL, replies to the enquirer and escapes every user value', () => {
  const mail = buildEnquiryEmail(HOSTILE, { from: DEFAULT_FROM, to: DELIVERY_EMAIL, replyTo: 'jo@example.com' });
  assert.equal(mail.to, DELIVERY_EMAIL);
  assert.equal(mail.replyTo, 'jo@example.com');
  assert.equal(mail.from, DEFAULT_FROM);
  assert.doesNotMatch(mail.subject, /[\r\n]/);
  assert.doesNotMatch(mail.html, /<script>|<b>there|<Hillside>/);
  assert.match(mail.html, /Jo &lt;script&gt;alert\(&quot;x&quot;\)&lt;\/script&gt;/);
  assert.match(mail.html, /Hello &lt;b&gt;there&lt;\/b&gt; &amp; &quot;friends&quot; &#39;all&#39;/);
  assert.match(mail.html, /Partner on the &lt;Hillside&gt; course guide/);
});

test('plainAddress accepts one plain address and rejects anything else', () => {
  assert.equal(plainAddress(' jo@example.com '), 'jo@example.com');
  for (const bad of ['', 'jo', 'a@b.com, c@d.com', 'Jo <jo@example.com>', 'jo@example.com\nBcc: x@y.com', 'jo @example.com', 'a;b@c.com', `${'a'.repeat(250)}@example.com`, 42, null]) {
    assert.equal(plainAddress(bad), null, String(bad));
  }
});

test('a failed send is logged with the error name and message only', () => {
  const lines = [];
  logSendError({ name: 'validation_error', message: 'The from domain is not verified', detail: HOSTILE.message }, (l) => lines.push(l));
  assert.deepEqual(lines, ['[contact] enquiry email failed: validation_error: The from domain is not verified']);
  logSendError(new Error('network down'), (l) => lines.push(l));
  assert.equal(lines[1], '[contact] enquiry email failed: Error: network down');
});
