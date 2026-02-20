# SeftonLinks — Full i18n Translation Plan

## Audit Summary (Feb 2026)

**611 total strings** to extract across the site:
- 493 short (labels, headings, buttons)
- 118 long (paragraphs, editorial)
- `lib/courses.ts` accounts for 151 strings (25% of total)
- Across 18 locales = ~11,000 translated strings to generate and maintain

### String counts per file

| File | Short | Long | Uses t() | Total |
|---|---|---|---|---|
| `app/[locale]/page.tsx` (homepage) | 40 | 20 | Yes (~7 keys) | 60 |
| `app/[locale]/courses/page.tsx` | 14 | 1 | Yes (~3 keys) | 15 |
| `app/[locale]/courses/[slug]/page.tsx` | 42 | 5 | No | 47 |
| `app/[locale]/the-open-2026/page.tsx` | 94 | 12 | Yes (~5 keys) | 106 |
| `app/[locale]/itineraries/page.tsx` | 15 | 6 | No | 21 |
| `app/[locale]/conditions/page.tsx` | 3 | 5 | No | 8 |
| `app/[locale]/scorecard/page.tsx` | 24 | 5 | No | 29 |
| `app/[locale]/tee-times/page.tsx` | 26 | 15 | No | 41 |
| `app/[locale]/accommodation/page.tsx` | 58 | 11 | No | 69 |
| `app/[locale]/contact/page.tsx` | 10 | 3 | No | 13 |
| `app/[locale]/privacy/page.tsx` | 6 | 3 | No | 9 |
| `app/[locale]/terms/page.tsx` | 5 | 4 | No | 9 |
| `app/[locale]/not-found.tsx` | 3 | 1 | No | 4 |
| `app/[locale]/layout.tsx` (footer) | 27 | 2 | No | 29 |
| `lib/courses.ts` | 126 | 25 | N/A | 151 |
| **TOTALS** | **493** | **118** | | **611** |

---

## Architecture Decision

**Use `next-intl` messages files throughout — NOT MDX.**

Reasons:
- MDX is overengineered for this volume (longest editorial is 4 paragraphs)
- `next-intl` is already working — expanding it is the path of least resistance
- One system is better than two for a solo-operated site
- All translatable strings become maintainable from one place

### Namespace structure (in messages/*.json)

```
nav.*              — already done ✅
home.*             — partially done, needs expansion
courses.*          — partially done, needs expansion
open.*             — partially done, needs expansion
conditions.*       — partially done, needs expansion
footer.*           — partially done (tagline/builtBy only), needs expansion
meta.*             — NEW: page titles and descriptions for all pages
homePage.*         — NEW: all homepage body strings
coursesPage.*      — NEW: courses listing body strings
courseDetail.*     — NEW: course slug page strings
openPage.*         — NEW: The Open 2026 page strings
itinerariesPage.*  — NEW: itineraries page strings
scorecardPage.*    — NEW: scorecard page strings
teeTimesPage.*     — NEW: tee times page strings
accommodationPage.*— NEW: accommodation page strings
contactPage.*      — NEW: contact page strings
legalPage.*        — NEW: privacy + terms shared strings
notFound.*         — NEW: 404 page strings
courseData.*       — NEW: translatable fields from lib/courses.ts
```

---

## Implementation Phases

### Phase 1 — Native meta titles & descriptions
**Effort: ~30 minutes**

Add `meta` namespace to all 18 locale files. Wire `generateMetadata()` in every page to use `getTranslations({ locale, namespace: 'meta' })`.

Meta titles to use (from SEO audit):

| Page | English title (before template) |
|---|---|
| Homepage | Sefton Coast Links Golf — Royal Birkdale, Hillside & The Open 2026 |
| /courses | Sefton Coast Golf Courses — Royal Birkdale, Hillside & Formby |
| /the-open-2026 | The Open Championship 2026 at Royal Birkdale — Visitor Guide |
| /scorecard | Sefton Coast Golf Scorecards — Par, Yardage & Course Rating |
| /tee-times | Tee Times at Royal Birkdale & Sefton Coast Golf Clubs |
| /itineraries | Sefton Coast Golf Breaks — 2, 3 & 5-Day Itineraries |
| /accommodation | Golf Accommodation near Royal Birkdale, Southport |
| /conditions | Sefton Coast Course Conditions — Daily Playing Status |
| /contact | Contact SeftonLinks |
| /courses/royal-birkdale | Royal Birkdale Golf Club — Visitor Guide, Green Fees & Tee Times |
| /courses/hillside | Hillside Golf Club Southport — Visitor Guide & Green Fees |
| /courses/formby | Formby Golf Club — Visitor Guide, Green Fees & Tee Times |
| /courses/west-lancashire | West Lancashire Golf Club — Visitor Green Fees & Tee Times |
| /courses/southport-ainsdale | Southport & Ainsdale Golf Club — Visitor Guide & Green Fees |
| /courses/southport-old-links | Southport Old Links Golf Club — Visitor Guide & Green Fees |

Each written natively per locale — not translated from English.

---

### Phase 2 — Page body content extraction
**Effort: ~1.5 hours**

For each page file:
1. Identify all hardcoded English user-facing strings
2. Add keys to `messages/en.json` under the appropriate namespace
3. Replace hardcoded strings with `t('key')` calls
4. Build-check after each page

**Order of priority:**
1. Homepage (highest traffic)
2. The Open 2026 (time-sensitive, July 2026)
3. Course slug pages (high-intent)
4. Courses listing
5. Tee Times
6. Accommodation
7. Itineraries
8. Scorecard
9. Conditions
10. Footer (layout.tsx)
11. Contact / Privacy / Terms / 404

---

### Phase 3 — Course data translation
**Effort: ~45 minutes**

`lib/courses.ts` has 151 strings. Strategy: translate high-value fields, leave factual/local data in English.

**Translate (move to messages):**
- `tagline` (6 strings) — marketing copy, high visibility
- `description` (6 multi-paragraph strings) — main editorial
- `visitorPolicy` (6 strings) — important for non-English visitors

**Leave in English:**
- `highlights[]` — English place names and historical facts
- `practicalNotes[]` — English-specific advice
- `nearbyDining[]` — English restaurant/pub names
- `majorHistory[]` — proper names (tournaments, players)
- All structured data: par, yardage, ratings, green fees, postcodes

---

### Phase 4 — Generate native content for all 17 locales
**Effort: ~15 minutes**

Run parallel agents to write native content (not translations) for all 17 locale files. Priority locales for quality: de, ja, fr, nl, sv.

---

## Maintenance Workflow (post-migration)

When editing content in the future:
1. Edit the string in `messages/en.json`
2. Note the key(s) that changed
3. Run agent: "Re-translate these keys across all 17 locale files: [list of keys]"
4. Build and push

---

## Status

- ✅ Nav translations (all 18 locales)
- ✅ Basic home/courses/open/conditions/footer keys (all 18 locales)
- ✅ Hreflang on all pages (all 18 locales)
- ✅ Canonical URLs on all pages
- ✅ SEO-optimised English meta titles
- ✅ Language switcher preserves page path
- ✅ Sitemap includes all locale URLs
- ⬜ Phase 1: Native meta translations in all 18 locales
- ⬜ Phase 2: Body content extraction to messages files
- ⬜ Phase 3: Course data translation
- ⬜ Phase 4: Native content for all 17 locales
