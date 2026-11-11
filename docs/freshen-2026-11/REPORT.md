# Sefton Links freshen-up, November 2026

Internal report for Damian. Work done 11 Nov 2026 on `main`. Base URL (from `lib/metadata.ts`, `app/sitemap.ts`, `app/robots.ts`): https://www.seftonlinks.com. Commits `1a164ff` (code, copy, posts) and `f4ca1fd` (screenshots), not pushed. Screenshots: `docs/freshen-2026-11/screens/` (JPEG, 1440 and 390).

## 0. What the site does for languages today

- `i18n/routing.ts` lists 18 locales; English has no prefix.
- Blog posts are English only: `app/[locale]/blog/[slug]/page.tsx` builds only `locale: 'en'` and returns notFound for others; `/de/blog/<slug>` and `/de/blog` redirect (308) to the English URLs. Post bodies live only in `lib/blog.ts`.
- UI strings, metadata and some course copy are translated in `messages/<locale>.json`; the courses table and cards use English `lib/courses.ts`.
- What was done: both new posts are English only, matching current practice; only `messages/en.json` was edited. The other 17 locale files still carry the pre-Open "returns in July 2026" framing, the old Formby, Birkdale and Hillside visitor information where translated, and about 1,800 em dashes (83 to 111 per file).

## 1. What was found (ranked)

1. **Formby Golf Club visitor information wrong site-wide**: the site said men-only, no online booking, introduction only, handicap 20, and linked to `formby-golf.co.uk` (does not resolve). formbygolfclub.co.uk: visitors welcome, online booking, handicap certificate max 28 (men) and 36 (ladies). Files: `lib/courses.ts`, `messages/en.json`. Screens: `before-tee-times-1440.jpg`, `before-courses-1440.jpg`.
2. **Royal Birkdale**: the site said tee times available, book three to six months ahead; the club's booking page says fully booked for visitors throughout 2026 and 2027. Phone shown 01704 552261; the club gives 01704 552020. Older posts still say to book Birkdale (section 5).
3. **Hillside**: fees given as £100 to £150; the club's 2027 table runs £195 to £352, and the winter rate is "closed for maintenance" 19 Oct to mid-March 2027.
4. **West Lancashire**: fees given as £80 to £130 (club: £120 winter weekday up to £295 2026 summer weekend); "slightly further north at Blundellsands" (Blundellsands is south: L23 8SZ at 53.498 vs PR8 2LX at 53.622); "10 minutes' walk" from Hall Road (club: 50 yards).
5. **Southport Old Links**: `southportoldlinks.com` does not resolve; the real site is southportoldlinksgolfclub.co.uk.
6. **Conditions page showed February notes as today's**: `lib/conditions-data.ts` last edited 20 Feb 2026, shown under today's date with "updated manually each morning by 7:30am". `before-conditions-1440.jpg`.
7. **Open facts**: "155th Open" (The R&A: 2026 was the 154th; St Andrews 2027 is the 155th); "10 Opens" at Birkdale (now 11); champion lists ended at 2017; the Fox post had 70-68-62-68 (theopen.com: 72-68-62-68), listed Harrington twice, left out Baker-Finch, and made unsupported claims (age 39, "29 previous attempts", "third New Zealander", individual shots).
8. **Stale "upcoming Open" copy**: home hero, Open block and editorial, footer, blog category description, Open page (badge, JSON-LD "is scheduled", tickets FAQ), Birkdale description, advertise page. `before-home-1440.jpg`, `before-the-open-2026-1440.jpg`.
9. **Broken**: duplicated slugs `hillside-golf-club-review` (3 posts), `formby-golf-club-review` (2), `west-lancashire-golf-club-review` (2) caused duplicate-key errors, wrong-article cards and duplicate sitemap URLs (`before-blog-1440.jpg`); a post used a non-existent category (`course-guides`); internal links in posts were plain text; hero `quality={85}` console warning; `/feed` returns 404 live.
10. **Machine-made copy**: "The World's Greatest Links Golf Corridor", "The definitive links golf guide" (four places), "Curated", a trophy emoji as an icon, taglines with em dashes ("The finest links course you've never heard of"); older posts use "genuinely" about 50 times, "actually" 42, "honest" 31; em dashes on English pages (59 from `lib/courses.ts`, 18 from `lib/blog.ts`).
11. **Advertise page**: unsupported claims ("highest-ever traffic", "most affluent audience", "high-net-worth", international visitors, "no other independent golf guide"), "20 languages" (the site has 18), a "Jul 12: The Open starts" stat, and placements no component renders. `before-advertise-1440.jpg`, `before-advertise-390.jpg`.

Left alone because it works: the home "Latest" strip (built from the post list), blog search and filters, the course comparison table, the post template, mobile layouts.

## 2. What changed

| Change | Files | Screens |
|---|---|---|
| Formby corrected (welcome, online booking, handicap 28/36, fees, winter maintenance, buggies on medical grounds) with live website and booking links | `lib/courses.ts`, `messages/en.json` | `before/after-tee-times-1440.jpg`, `before/after-courses-1440.jpg` |
| Royal Birkdale: fully booked through 2027, phone 01704 552020, club dress code, past-tense tagline and description | same | `after-courses-1440.jpg` |
| Hillside £195 to £352 and winter closure; West Lancs £120 to £295, "further south", Hall Road 50 yards, booking link; Old Links links | `lib/courses.ts`, `messages/en.json`, `lib/blog.ts` | `after-courses-1440.jpg` |
| Conditions: notes older than 7 days hidden; each card says "No recent course report" with the club's link; no daily-update claim. To show notes again, edit them and change `CONDITIONS_UPDATED` in `lib/conditions-data.ts` | `lib/conditions-data.ts`, `components/ConditionTracker.tsx`, `app/[locale]/conditions/page.tsx`, `messages/en.json` | `before/after-conditions-1440.jpg` |
| 154th, 11 Opens, Ryan Fox in both champion lists, Open page FAQ JSON-LD in past tense | `app/[locale]/page.tsx`, `app/[locale]/the-open-2026/page.tsx`, `messages/en.json`, `components/OpenCountdown.tsx` | `after-home-1440.jpg`, `after-home-390.jpg`, `after-the-open-2026-1440.jpg` |
| Fox post corrected against theopen.com; unsupported claims removed; "book Birkdale" ending replaced | `lib/blog.ts` | `before/after-blog-ryan-fox-wins-open-2026-royal-birkdale-1440.jpg` |
| Upcoming-Open English copy rewritten (hero, Open block, editorial, footer, category description, Open page text) | `messages/en.json`, `lib/blog.ts` | `after-home-1440.jpg` |
| Duplicate slugs: listings, sitemap and feed keep the first post per slug (the one each URL already served); nothing deleted | `lib/blog.ts` | `after-blog-1440.jpg` |
| Category `course-guides` changed to `links-golf-tips`; "seftonlinks.com/..." text in posts renders as internal links | `lib/blog.ts`, `app/[locale]/blog/[slug]/page.tsx` | `post-*.jpg` |
| Slogans out: hero title "Sefton Coast Links Golf"; "definitive", "Curated", "Greatest Show" removed; taglines rewritten; trophy emoji swapped for the lucide Trophy icon; `quality={85}` removed | `messages/en.json`, `app/[locale]/layout.tsx`, `app/[locale]/page.tsx`, `components/OpenCountdown.tsx`, `lib/courses.ts` | `after-home-1440.jpg` |
| Customer-facing em dashes removed from every changed file | as listed | |
| Advertise: unsupported claims removed; stats now 18 languages (menus), 6 course guides, the live post count, 4 network sites; Open block in past tense; unrendered placements "by arrangement"; packages, prices and service lines unchanged | `app/[locale]/advertise/page.tsx` | `before/after-advertise-1440.jpg`, `before/after-advertise-390.jpg` |

## 3. The two new posts

Both use the existing byline, second person and plain statements; no first-person experience; no business judged; English only; hero images already in the repo.

### 3.1 Winter Golf on the Sefton Coast: What the Clubs Say for 2026 to 2027
- Slug: `winter-golf-sefton-coast`; URL: https://www.seftonlinks.com/blog/winter-golf-sefton-coast
- Category Golf Travel; image `/images/sefton-coast-morning.jpg`; about 1,050 words. Internal links: /courses, /blog/winter-rules-golf-preferred-lies-mats.
- Why: winter rates, closures and mats are what golfers check from November to March; no winter coverage existed, and this season changed a lot (Birkdale fully booked, Hillside closed to visitors).
- Sources (accessed 11 Nov 2026):
  - https://members.royalbirkdale.com/visitorbooking/ : fully booked for visitor tee times throughout 2026 and 2027, including the Birkdale Open Experience Package; check back for 2028.
  - https://royalbirkdale.com/visitors/ : winter and shoulder-rate maintenance warning; re-book or refund after a closure; dress code (collared shirt tucked in, dimple or textured soles; no jeans, tracksuits, round-neck T-shirts or trainers).
  - https://www.hillside-golfclub.co.uk/visitors/visitors-golf/ : winter rate "CLOSED FOR MAINTENANCE (Oct 19th – Mid-March 2027)"; spring from 1 Mar 2027 £195 midweek, £225 Sunday; summer 19 Apr to 30 Sep 2027 £315 midweek, £352 weekend; winter disruption (temporary greens, GUR bunkers, alternative tees); compulsory fairway mats December to February; Secretary's Office 01704 567169.
  - https://www.hillside-golfclub.co.uk/course-works-phase-4/?preview=true : Phase 4 update dated 27 Oct 2026 on the 10th and 18th holes.
  - https://www.formbygolfclub.co.uk/play/play-formby/ : Nov 2026 to Feb 2027 £155 Mon to Fri, £175 Sat and Sun (juniors £77.50 and £87.50); March 2027 £180 and £205; April to September 2027 £320 and £350; winter maintenance may bring temporary greens, bunker closures or a shorter course; weekends are members' competition days; phone 01704 872164.
  - https://www.formbygolfclub.co.uk/play/visitor-faqs/ : handicap certificate, max 28 gentlemen, 36 ladies; buggies on medical grounds only.
  - https://www.westlancashiregolf.co.uk/visitors/visitors-green-fees/ : "November 26 to February 27" £120 per person weekday, £440 weekday fourball, £480 weekend fourball, with tea or coffee and a bacon roll; March 2027 £135; April 2027 £200 and £250; winter greens work possible; online booking.
  - https://www.westlancashiregolf.co.uk/visitors/dress-code-etiquette/ : metal spikes on the course only 1 Oct to 31 Mar; in those months non-spiked shoes in the clubhouse only in the Spike Bar.
  - https://www.westlancashiregolf.co.uk/contact/how-to-find-us/ : 50 yards from Hall Road station, Northern Line.
  - https://www.sandagolfclub.co.uk/visitors/visitors/ and /visitors/green-fees-offers/ : visitors welcome all year; prime season late April to late September; rates on the booking portal, varying with demand, time of day and year; groups over 12 contact the golf coordinator.
  - https://www.southportoldlinksgolfclub.co.uk/ and /green-fees--old-links-golf : nine holes with 18 tees; visitors weekdays and Saturdays; course status codes; winter rates generally December to February or when mats or temporary greens are in use; compulsory mats under winter rules; phone 01704 228207 option 5. The page is headed "Winter 2025-2026", so the post quotes no prices.

### 3.2 Preferred Lies, Fairway Mats and Temporary Greens: Winter Rules Explained
- Slug: `winter-rules-golf-preferred-lies-mats`; URL: https://www.seftonlinks.com/blog/winter-rules-golf-preferred-lies-mats
- Category Links Golf Tips; image `/images/blog-sefton-links-may-conditions.jpg`; about 1,000 words. Internal links: /blog/winter-golf-sefton-coast, /blog/club-selection-links-courses-wind.
- Why: an evergreen winter search topic the site did not cover; pairs with 3.1.
- Sources (accessed 11 Nov 2026):
  - https://www.randa.org/en/rog/committee-procedures/8 (Model Local Rules): E-3 purpose, conditions and limits; E-3 wording (fairway height or less; relief area such as one club-length, a scorecard length or 6 inches; not nearer the hole; in the general area; once); general penalty for a wrong place; E-12 mats; D-2 temporary greens; E-4 aeration holes; handicap acceptability left to the local handicapping body.
  - https://www.randa.org/en/articles/the-r-a-2024-2025-winter-rules-faq-s : E-2 vs E-3; marking; why mats; Rule 16.3 embedded ball; leaves and F-14; water in a bunker relief options.
  - The club pages in 3.1, for the Sefton Coast section.
  - Left out: England Golf's handicapping pages returned no readable text, so the post does not quote their preferred-lies period; a new Rules of Golf edition was not confirmed.

### 3.3 Other facts used in fixes
- theopen.com (home, `/latest/ryan-fox-royal-birkdale-2026-story`, `/latest/ryan-fox-birkdale-2026-in-numbers-putting-approach-driving-statistics`, `/players/ryan-fox`, `/venues/royal-birkdale`), accessed 11 Nov 2026: 154th Open; Fox 72-68-62-68, 270, 10 under, one ahead of Cameron Young; his 62 equalled the lowest round in Open history; second New Zealander after Sir Bob Charles; Birkdale's Opens 1954 to 2026; St Andrews 2027 is the 155th.
- https://royalbirkdale.com/contact-us/ : +44 (0)1704 552020.
- api.postcodes.io (L23 8SZ, PR8 2LX) for the north/south fix.

## 4. Reviewer's findings

An independent reviewer (fresh context) re-fetched every source and checked about 88 factual claims in the two posts: 10 MUST FIX, 12 SHOULD FIX. All fixed in commit `9661f6a` (screenshots `fix-before-*`, `fix-after-*`):

1. Birkdale's phone on the contact page: 01704 552020.
2. Copy saying Birkdale can be booked: the Muirfield comparison removed; the tee-times tip says Birkdale is fully booked through 2027 and Hillside closed until mid-March 2027; the Open page's "Play the Course" lines and "Visiting Royal Birkdale" box rewritten; tee-times meta updated.
3. Itineraries re-planned around courses visitors can book, with costs summed from the clubs' published per-person rates (S&A and Old Links named, not priced): 2-day winter links (West Lancashire and Formby, £275 weekdays, Nov to Feb); 3-day classic adds S&A; 5-day coast tour from mid-March 2027 (£510 for Hillside, Formby and West Lancashire weekdays, plus S&A and Old Links); 2-day value (Old Links and West Lancashire, £120 plus Old Links). Birkdale dropped, with a dated availability note; named-business verdicts in stay and dining lines removed.
4. Course meta descriptions match the corrected course data.
5. Open count now theopen.com's wording: "Since first hosting The Open in 1954, the most regular Open venue apart from St Andrews".
6. Champion scores now each winner's 72-hole total from theopen.com's results pages (2026 Fox 270, 2017 Spieth 268, 2008 Harrington 283, 1998 O'Meara 280, 1991 Baker-Finch 272, 1983 Watson 275, 1976 Miller 279, 1971 Trevino 278, 1965 Thomson 285, 1961 Palmer 284, 1954 Thomson 283), with notes rewritten (1998 play-off; 1976 closing 66 to win by six; 1971 the 100th Open and third win in four weeks after the U.S. and Canadian Opens; 1961 the 6-iron at the 15th, now the 16th; 2017 birdie, eagle, birdie, birdie from the 14th, no triple bogey).
7. West Lancashire fees £120 to £250, "November 2026 to April 2027" (new optional fee-note field).
8. Hillside value verdict, preferred visitor days and "the day before Royal Birkdale" removed.
9. Other languages: `i18n/request.ts` now lays each locale over English; the 83 keys changed in English since `9cd63de` plus four stale Open keys were removed from the 17 other locale files so they show English. Nothing translated or edited in another language.
10. Blackpool post: 11 Opens, Birkdale fully booked, Hillside closed until mid-March, current fees.
11. to 14. Winter rules post: Hillside closure noted; withdrawal wording narrowed to E-3, F-14 and E-4; "Playing from the wrong place under any of the three carries the general penalty"; Hillside course updates cited from the published page.
15. Winter golf post: sunset time dropped, S&A introduced, dress-code example now West Lancashire's.
16. Images: better-fitting existing images on both posts and a new optional `imageAlt` field with real descriptions.
17. "Except Hillside until mid-March 2027" added on the home page and in the Fox post.
18. Unsupported fees: Birkdale "Not published" with "Fully booked for visitors through 2027"; Old Links "Ask the club" (01704 228207, option 5); S&A "On booking portal"; home stat "£120 to £352 published green fees".
19. Advertise page sentences removed in the stage B rewrite.
20. Fox post reworded in the site's own words.
21. Conditions page re-renders hourly; `ConditionTracker` takes club links as props.
22. Winter rules post says "under the 2023 Rules of Golf"; no 2027 edition claimed.

Sources (fetched 11 Nov 2026): royalbirkdale.com (contact, visitors, visitor booking), hillside-golfclub.co.uk (visitors golf, course works), formbygolfclub.co.uk, westlancashiregolf.co.uk (fees, dress code), sandagolfclub.co.uk (visitors, fees), southportoldlinksgolfclub.co.uk, theopen.com (Royal Birkdale venue page, each previous-Open results page 1954 to 2026, Ryan Fox story, numbers and player pages), randa.org (Model Local Rules, winter rules FAQ, Rules of Golf 2023). No Wikipedia source used.

## 5. Bigger suggestions for Damian (not built)

- **The Open 2026 page and gold nav button** still carry the tickets CTA, accommodation urgency and countdown; only facts and tense were changed. Options: an Open-at-Birkdale history and results page, or a redirect. `openPage.*` strings in 18 locales plus layout. `after-the-open-2026-1440.jpg`.
- **The conditions feature** needs daily edits to `lib/conditions-data.ts`; update it daily, or make it wind-only with links to each club's status page. `after-conditions-1440.jpg`.
- **The 17 non-English locale files**: stale Open framing, old visitor information, about 1,800 em dashes; a careful translation pass of the keys changed in `git diff 9cd63de messages/en.json`. `idea-de-1440.jpg`.
- **First-person claims in Damian's name** ("I played", "I have played all five ... multiple times", "I Played Royal Birkdale Off 24"; the blog intro and bio say he plays off 24; the course-reviews category promises "first-hand accounts of playing every course"). Only he can confirm. `after-blog-1440.jpg`.
- **Four unreachable duplicate posts**: second `west-lancashire-golf-club-review` (19 Feb), second and third `hillside-golf-club-review` (17 Mar, 3 Apr), second `formby-golf-club-review` (4 Apr). New slugs or delete; hidden from listings for now.
- **Older posts with stale or unverified advice** (e.g. `september-golf-sefton-coast` says book Birkdale two to three months ahead; "handicap certificate required" for West Lancs is not stated by the club).
- **Course data that does not match the clubs' scorecards** (`lib/courses.ts`): Royal Birkdale 7,156 yd on the site vs tee options 4,877 to 6,736 yd; Hillside 6,850 vs 7,109 black / 6,830 white; West Lancashire 6,756 vs 7,016 black / 6,706 white; Southport & Ainsdale 6,612 vs 6,797 white / 7,007 black; Old Links par 71, 6,318 yd vs nine holes with 18 tees, 6,460 yd. Not verified, left as is: Birkdale handicap 24/36, Birkdale £300 to £350, S&A £65 to £100, Old Links £40 to £60, home past-champion scores, "1873 oldest club on the coast", "Six championship courses". `after-courses-1440.jpg`.
- **RSS feed 404**: the `proxy.ts` matcher sends `/feed` through the locale middleware; add `feed` to the exclusions. Not touched because `proxy.ts` also writes page views to the database. `idea-feed-1440.jpg`.
- **AI-style hero images** showing cliffs and rocky shores the Sefton coast does not have (e.g. `/images/blog-reading-links-greens.jpg`). `idea-blog-category-links-golf-tips-1440.jpg`.
- **Tics in older posts**: "genuinely" about 50, "actually" 42, "honest" 31, "significantly" 25 in `lib/blog.ts`.

## 6. Checks run

- Baseline: tsc 0 errors; eslint 2 errors (in `accommodation/page.tsx` and `advertise/page.tsx`) and 15 warnings. After: tsc 0; eslint 1 error and the same 15 warnings (the advertise error went with the rewritten line).
- Console on home, courses, blog, conditions, Open page, tee times, the Fox post and both new posts: clean.
- Screenshots of every changed page and both posts at 1440 and 390: no orphans, no overflow; new-post headings fit at 390.
- Em dash scan of changed files: none in customer-facing strings (four in code comments).
- Sitemap: no duplicate blog URLs; both new posts included.
- Database disclosure: `proxy.ts` logs browser page loads to `PageView`. About 50 early screenshot and console loads on the local dev server (which loads `.env.local`) were probably recorded; not deleted. Later runs used an empty `DATABASE_URL` and a bot user agent.

## 7. Advertising (stage B)

Built 11 Nov 2026 in commit `ca27350`, not pushed.

- Spaces (`lib/ad-slots.ts`, drawn by `components/AdSlot.tsx`; all empty; English pages only because the card labels are not translated): home card below the course grid (£39 a month); one partner card per course page, at the end of the sidebar and away from the "After Your Round" restaurant list, for hotels, B&Bs, restaurants or golf travel, never a golf club (£35); Tee Times and Conditions sponsors (£35); end-of-post sponsor on seven travel and itinerary posts, one sponsor per post (£35, a placeholder for Damian to confirm); golf season package (all six course pages, March to October, £249); sponsored article (£149); network bundle (£149 a month). Every price "plus VAT"; founding offer with no count. Filled cards labelled "Advertisement" or "Sponsor" at 11px in full colour; `rel="sponsored noopener"`; an expired `until` drops off within a day. Screenshots `ads-empty-*`, `ads-filled-*` (temporary example sponsor, not committed).
- Advertise page rewritten to the approved menu; old £450/£650/£800 packages and `partnerships@` gone; no traffic or audience claims; `?space=` shows "You asked about ..."; every button goes to `/contact?topic=advertise&space=...`.
- New contact form: https://www.seftonlinks.com/contact (and `/<locale>/contact`), POST `/api/contact`. Required `name` (max 100), `email` (one plain address, max 254), `subject` (`general`, `correction`, `advertising`, `press` or `other`), `message` (10 to 5,000 characters). Optional `space` (known slot or option id; unknown values dropped) and honeypot `website` (filled means ok and nothing sent). Sends to `DELIVERY_EMAIL` (damian@churchtownmedia.co.uk) from noreply@seftonlinks.com, reply-to the enquirer, escapes all input, strips CR/LF from the subject, sends no auto-reply, logs failures. Responses: 200, 400 validation, 503 if `RESEND_API_KEY` missing, 502 if the send fails. Needs `RESEND_API_KEY` on Vercel; `RESEND_FROM_EMAIL` optional (used only if @seftonlinks.com). `resend` ^6.9.2 added.
- Addresses: `DISPLAY_EMAIL` (hello@seftoncoast.network) printed on contact, advertise, disclosure and privacy. Before: an old address that no longer exists (already replaced live by the hotfix `0268841`) and `partnerships@seftoncoast.network` on the advertise page.
- Sponsored articles: support only.
- Affiliate links removed: LateRooms, Champions Travel, Cottages.com, Sykes and Golf Breaks on the accommodation, Open, course, itineraries and home pages and in the planner; `lib/affiliate-links.ts` deleted; affiliate strings removed from all 18 message files. Privacy and terms (all 18 languages): the "Affiliate Links" heading and sentence removed from each (privacy: "Some links on this site are affiliate links (Golf Breaks, Booking.com, Sykes Cottages). These are clearly labelled. Clicking them may result in a commission to SeftonLinks.com at no extra cost to you."; terms: "This site participates in affiliate programmes including Golf Breaks, Booking.com and Sykes Cottages. Commissions earned help fund the editorial operation at no cost to users.").
- Disclosure states current funding (Churchtown Media Ltd pays; businesses can buy a labelled advert or sponsored article) and has an Advertising section.
- Existing advertisers: none. No visit counting on this site.
- Tests 23 of 23 (addresses, recipient, reply-to, escaping, logging, honeypot, caps, no provider test sender, no affiliates). tsc 0; eslint 0 errors and 15 warnings (baseline 1 and 15).
- For Damian: the £35 post-sponsor price; ad cards English-only; about 50 to 60 lines in each other language file still contain em dashes (untouched translated strings); verdict copy left as it was (course data "consistently excellent conditioning", "Ranked in world's top 5", "Excellent value", and restaurant and hotel lines); Birkdale's 24/36 handicap limits unverified; the privacy page names Plausible and Clarity but the site loads Clarity and Ahrefs, and does not mention the `PageView` log in `proxy.ts`. Draft privacy line: "If you use our contact form, we receive your name, email address and message by email, sent through our email provider Resend, and use them only to reply to you."

## 8. The Open and freshness sweep

Work done 11 Nov 2026 on `main`, not pushed. Commits: `11b09a4`, `3c272c9`, `de3aab3`, `8eac18e`, `62321d7`, `f500635`, `376b2f3`, `902252b`. Privacy wording is on branch `privacy-wording` (`a6e44b9`), not merged. Full change log, one row per change with file, before and after: `docs/freshen-2026-11/open-sweep-changes.tsv`. Screenshots: `docs/freshen-2026-11/screens/open-before-*` and `open-after-*`, covering home and `/the-open-2026` in en, de, ja and fr at 1440 and 390, plus accommodation, the Royal Birkdale page and a pre-Open post at 1440.

### 8.1 The Open (the 154th Open at Royal Birkdale ran 12 to 19 July 2026, so nothing on the site may read as if it is still to come)
- `/the-open-2026` keeps its URL and is now "The Open at Royal Birkdale". It records the 2026 result: Ryan Fox, 72-68-62-68, 270, 10 under par, one ahead of Cameron Young, with Sam Burns third. It also covers Birkdale's 11 Opens since 1954, the other championships the club lists, past champions, and "Visiting Royal Birkdale Now": fully booked through 2027 including the Birkdale Open Experience Package, the other five courses, and tee times.
- Removed from that page: tickets, "Where to Stay for The Open", spectator tips, the countdown, the SouthportGuide Open hub link and the SportsEvent JSON-LD. The JSON-LD is now a WebPage with a past-tense FAQ.
- Home: Open banner, countdown ("Ryan Fox. Champion Golfer 2026.") and SportsEvent JSON-LD removed; hero, Open block and editorial reworded as a record.
- Nav: the gold "The Open 2026" button is now a plain "The Open" link. Footer column: "The Open at Birkdale".
- Also changed: site keywords, OpenGraph and Twitter text, blog index metadata, feed description, sitemap priority. `components/OpenCountdown.tsx` deleted; `OPEN_DATE` removed.
- Accommodation: the Open callout and "Popular with Open Championship groups in 2017" removed.
- Contact: the ticket line now just points to TheOpen.com. The 404 page no longer mentions an "Open hub".
- Blog: posts in "The Open 2026" category dated before 19 July, and five build-up travel posts, stay as dated records with a "Written before The 154th Open" note. Elsewhere, Open and "book Birkdale" advice was rewritten, e.g. `september-golf-sefton-coast` and the `golf-near-blackpool-sefton-links` heading.
- Factual slips in the dated Open posts were also fixed: week dates, Birkdale postcode, winners list, number of Opens, the 17th is a par 5.

### 8.2 Named businesses (no ranking or criticism of any named club, hotel or restaurant)
- Course data (`lib/courses.ts` and `courseData`), removed and replaced with what each club's own site says:
  - Royal Birkdale: "Ranked in world's top 5".
  - Hillside: "Consistently excellent conditioning", "a match for any course in England", "Excellent clubhouse".
  - Formby: "The course itself is exceptional".
  - West Lancashire: "links golf at its purest", "This is a shame", "lacks the manicured polish of Royal Birkdale", "Good value", "more relaxed than Southport clubs".
  - S&A: "Excellent value", "the best of the Sefton Coast", "among the most accessible".
  - Old Links: "Hidden value", "Most accessible ... on the coast", "punches above its green fee".
- Dining lines: "Bistrot Pierre ... reliable and good value" removed (Southport branch not confirmed on bistrotpierre.co.uk). "The Grill Room ... fine dining" is now "The Vincent Hotel, 98 Lord Street: a hotel with the V Café & Restaurant and a cocktail bar". "Closest quality option", "popular village pub", "local favourite" and "excellent pub" removed.
- Accommodation: "classic choice", "The Grill Room is excellent", "upscale", "stylish", "good spa", "quality B&Bs" and "Good value" removed. The Bold Hotel, The Vincent Hotel and Formby Hall Golf Resort & Spa are described from their own sites. Hotel rates removed.
- Home and conditions: "Six of England's finest", the Scotland "same quality tier" comparison, "Better access than ... Scotland", and the drainage comparison between named clubs removed.
- Facts fixed from the clubs' sites:
  - Birkdale: Ryder Cups 1965 and 1969, Walker Cup 1951, Curtis Cup 1948 (was Walker Cup 2019, Curtis Cup 2000).
  - Formby: the Walker and Curtis Cup claims replaced by the Amateur and PGA Seniors Championships.
  - Old Links: founded 1926 (centenary 2026), not 1901.
- Blog: 115 verdict edits in 44 posts. Titles changed, slugs kept.

### 8.3 Freshness
- "this winter" (tee-times meta, itineraries): now "winter 2026 to 2027".
- "updated recently" (home tools card, conditions): now "in the last seven days", matching the code.
- Privacy and terms "Last updated: February 2026": now November 2026 in all 18 languages, since the affiliate text came off both pages on 11 Nov.
- Blog: 11 old fees and addresses replaced with current club figures; dated posts keep words relative to their own date.
- Left as accurate: "© 2026", the disclosure date, the home "Latest" strip.

### 8.4 Languages
- In the 17 other locale files, every key whose English changed or was deleted is removed, so it falls back to the corrected English (about 103 keys per file).
- The 575 em dashes left in translated strings are replaced: colon, French " : ", full-width colon in ja and zh, brackets for asides.
- Not done: no new translation of the reworded English. `/de`, `/ja` and the rest show English on the Open page and course descriptions until it is translated.

### 8.5 Analytics and privacy
- Microsoft Clarity removed on `main` (`f500635`). A headless check found only analytics.ahrefs.com requests and one session cookie, NEXT_LOCALE.
- Branch `privacy-wording` rewrites the analytics sentence to name Ahrefs Web Analytics. It adds a cookie sentence and a page-counts sentence for the `proxy.ts` PageView log; the page-counts sentence was not asked for. Translated in 16 languages; Welsh carries the English. For Damian to approve before merging.

### 8.6 URLs to resubmit
Every page below also changed under each of the 17 locale prefixes, e.g. https://www.seftonlinks.com/de/the-open-2026.

Pages:
- https://www.seftonlinks.com/
- https://www.seftonlinks.com/the-open-2026
- https://www.seftonlinks.com/accommodation
- https://www.seftonlinks.com/courses
- https://www.seftonlinks.com/courses/royal-birkdale
- https://www.seftonlinks.com/courses/hillside
- https://www.seftonlinks.com/courses/formby
- https://www.seftonlinks.com/courses/west-lancashire
- https://www.seftonlinks.com/courses/southport-ainsdale
- https://www.seftonlinks.com/courses/southport-old-links
- https://www.seftonlinks.com/tee-times
- https://www.seftonlinks.com/itineraries
- https://www.seftonlinks.com/conditions
- https://www.seftonlinks.com/contact
- https://www.seftonlinks.com/terms
- https://www.seftonlinks.com/blog
- https://www.seftonlinks.com/blog/category/the-open-2026
- https://www.seftonlinks.com/blog/category/golf-travel
- https://www.seftonlinks.com/blog/category/course-reviews
- https://www.seftonlinks.com/blog/category/links-golf-tips

The 46 posts:
- https://www.seftonlinks.com/blog/autumn-wind-sefton-coast-courses
- https://www.seftonlinks.com/blog/best-value-golf-sefton-coast
- https://www.seftonlinks.com/blog/blackpool-open-2026-golf-itinerary
- https://www.seftonlinks.com/blog/can-i-play-royal-birkdale-during-open-week
- https://www.seftonlinks.com/blog/corporate-golf-days-sefton-coast
- https://www.seftonlinks.com/blog/formby-golf-club-review
- https://www.seftonlinks.com/blog/getting-to-royal-birkdale-for-the-open-2026
- https://www.seftonlinks.com/blog/golf-near-blackpool-sefton-links
- https://www.seftonlinks.com/blog/golf-southport-july-2026
- https://www.seftonlinks.com/blog/hillside-golf-club-most-underrated-links
- https://www.seftonlinks.com/blog/hillside-golf-club-review
- https://www.seftonlinks.com/blog/how-to-book-tee-times-sefton-coast
- https://www.seftonlinks.com/blog/i-played-royal-birkdale-off-24
- https://www.seftonlinks.com/blog/links-golf-for-beginners
- https://www.seftonlinks.com/blog/open-2026-accommodation-guide
- https://www.seftonlinks.com/blog/open-2026-contenders-royal-birkdale
- https://www.seftonlinks.com/blog/open-2026-no-ticket-golfers-guide
- https://www.seftonlinks.com/blog/open-2026-practice-rounds-guide
- https://www.seftonlinks.com/blog/open-2026-round-1-conditions-royal-birkdale
- https://www.seftonlinks.com/blog/open-2026-six-weeks-out
- https://www.seftonlinks.com/blog/open-2026-three-weeks-out
- https://www.seftonlinks.com/blog/open-2026-which-holes-to-watch
- https://www.seftonlinks.com/blog/playing-hillside-during-open-week
- https://www.seftonlinks.com/blog/royal-birkdale-may-conditions-2026
- https://www.seftonlinks.com/blog/royal-birkdale-open-2026-what-it-teaches-you
- https://www.seftonlinks.com/blog/royal-birkdale-watching-guide-2026
- https://www.seftonlinks.com/blog/sefton-coast-course-for-your-handicap
- https://www.seftonlinks.com/blog/sefton-coast-five-course-itinerary
- https://www.seftonlinks.com/blog/sefton-coast-golf-august-2026
- https://www.seftonlinks.com/blog/sefton-coast-golf-in-spring
- https://www.seftonlinks.com/blog/sefton-coast-golf-july-august
- https://www.seftonlinks.com/blog/sefton-coast-golf-trip-from-manchester
- https://www.seftonlinks.com/blog/sefton-coast-golf-trip-open-week-2026
- https://www.seftonlinks.com/blog/sefton-coast-golf-trip-organiser
- https://www.seftonlinks.com/blog/sefton-coast-july-conditions-2026
- https://www.seftonlinks.com/blog/sefton-coast-links-june-2026
- https://www.seftonlinks.com/blog/sefton-links-may-conditions-2026
- https://www.seftonlinks.com/blog/september-golf-sefton-coast
- https://www.seftonlinks.com/blog/southport-ainsdale-golf-club-review
- https://www.seftonlinks.com/blog/southport-old-links-review
- https://www.seftonlinks.com/blog/staying-in-formby-for-the-open-2026
- https://www.seftonlinks.com/blog/the-open-2026-day-by-day-guide
- https://www.seftonlinks.com/blog/the-open-2026-first-timers-guide
- https://www.seftonlinks.com/blog/watching-the-open-2026-without-a-ticket
- https://www.seftonlinks.com/blog/west-lancashire-golf-club-review
- https://www.seftonlinks.com/blog/west-lancashire-september-2026

### 8.7 Sources (fetched 11 Nov 2026)
- theopen.com:
  - /venues/royal-birkdale: founded 1889, redesigned 1922, the most regular venue after St Andrews.
  - /previous-opens/royal-birkdale-154th-open: leaderboard, and the week as 12 to 19 July 2026.
  - /latest/ryan-fox-royal-birkdale-2026-story: practice days Sunday to Wednesday, level par at halfway, record-equalling 62, birdie at the 72nd, more than 300,000 spectators.
  - /players/ryan-fox: his first major.
- royalbirkdale.com:
  - /history: 11 Opens, 6 Women's Opens, Ryder Cups 1965 and 1969, Senior Open 2013, Walker Cup 1951, Curtis Cup 1948, second New Zealand champion.
  - /visitors: Members for the Day, open competitions, buggies need a medical certificate, clubhouse dress, tees 4,877 to 6,736 yards.
- members.royalbirkdale.com/visitorbooking: fully booked through 2026 and 2027, check back for 2028; 01704 552020.
- Hillside, Formby, West Lancashire, S&A and Old Links sites: home, history, visitors and fee pages.
- boldhotel.com, thevincenthotel.com, formbyhallgolfresort.co.uk.

### 8.8 Checks
- `npm run test:enquiry` 23/23 pass. tsc 0 errors. eslint 0 errors and 14 warnings (baseline 0 and 15).
- The console check, run with the bot user agent, was clean on the en, de, ja and fr home and Open pages, accommodation and a blog post; the only line is the "Ignoring Event: localhost" analytics warning.
- No em dash left in `messages/*.json` or in any customer-facing string in a changed file.
- The dev server ran on 3103 with an empty `DATABASE_URL` and a bot user agent, so no page views were written to the database.

### 8.9 For Damian
- Approve `privacy-wording`, including the page-counts sentence.
- Confirm Clarity removal on `main` is wanted now; the coordinator's second note could be read as holding it for the branch.
- Translation pass for the reworded English in the 17 locales.
- Unverified figures left as they were: Birkdale handicap 24/36, yardages and ratings, the "1873 Oldest Club" stat.
- First-person claims in your name in the blog.
- The four unreachable duplicate posts, which still contain verdicts.
- `/feed` 404 (the `proxy.ts` matcher).
- Old Links' founding year (1926).
- A dev-only hydration warning on the language flags, which is also there before this work.

## 9. Review findings and fixes

The independent review (`links-review.md`, 11 Nov 2026, at `c729d89`) listed 42 findings: 8 wrong facts, 7 broken rules, 9 misleading, 18 minor. Every fix that adds or changes a fact was checked against the club's or operator's own page, fetched again on 11 Nov 2026. Where a figure could not be confirmed it was removed, not guessed. All work is on `main` (not pushed) except the privacy wording, which is on `privacy-wording`.

### 9.1 Applied

| Group | Findings | What changed | Commit |
|---|---|---|---|
| Course data | C1, C2, C5, C8, C10, C11, D3 | Tee yardages, pars, course and slope ratings as each club publishes them, with the page used and the date read (11 Nov 2026) under every table; a `visitorStatus` per course from each visitor page (Fully booked through 2027, Closed until mid-March 2027, Book online) in place of the label worked out from difficulty; difficulty badges and column removed; JSON-LD locality (Formby, Blundellsands); S&A booking advice from its visitor page; West Lancs buggies; Hillside and S&A championships from their own pages; Formby's four Amateurs and the 2004 Curtis Cup; unsourced handicap limits removed (Formby's 28 and 36 stay); "no two consecutive holes" removed; West Lancs 2001 English Amateur removed (club page 404). | `702ac68` |
| Copy in messages | C9, C11, C12, C13, D4, F1, G3 | Station tip (Hillside station is on Waterloo Road like the club), handicap tip (Formby only), "Links Courses" label, Spieth 2017 from the club's history page, accommodation labels ("Places to Stay", "Facilities and location") and no hotel rates, planner descriptions without dining, two double-colon asides. Changed keys removed from the 17 other locale files so the English shows. | `702ac68`, `60a4b86` |
| Blog | D1, D2, D5, C1, C3, C4, C6, C7, C9, C10, C12, G2, G3 | "Course Guides" label (slug kept) in the index, metadata, feed and home cards; verdicts on named clubs removed or replaced with what each club says about itself; S&A par 3s (the 16th is a par 5), Hillside 16th (par 3, 218 yards), Formby 7,128 yards, S&A 7,007 yards; stations (Hillside, on Waterloo Road; Birkdale is the next stop from Liverpool; no walking or journey times); London trains from Euston (Avanti); no Blackpool driving route; wind speeds, crowd sizes, hotel room count, ticket prices, the July price rise and corporate group sizes removed; S&A lead times replaced with the club's words; double-colon asides and "genuinely" (16) removed; Formby and corporate post titles; three never-shown duplicate posts deleted; corporate post's club callout moved above "What to Book First". | `b0747df` |
| Advertising | A1, A2, A3, A4 | Post sponsor shows "Ask us" with no price (the slots stay, as decided); page and post sponsors "never a golf club"; option point and comments say "do not rank or judge any business"; disclosure uses the approved wording. | `463cd54` |
| Contact form | A5, A6, E2 | Route returns an error code; the form shows the page's own `errorText` for a send failure and English field messages until translated; `sendEnquiry` helper tested with a fake client (returned error, thrown error, success); affiliate test covers `public/`; Open link to theopen.com. | `d319fe8` |
| Code health | H1, H2, H3, H4, H5 | `/feed` out of the proxy matcher (feed now 200); home blog links straight to `/blog`; host redirects keep the path; stale condition notes not in the page data; Open page notes without quotation marks and no FAQPage node. | `cea80e4`, `b0747df`, `64bf0ef`, `38baf5c`, `f4c6dd5` |
| Cookie | P2 (code) | `localeCookie: false` (next-intl 4.8.3 reads the cookie only when `localeDetection` is true; it is false). Headless Edge on the server, bot user agent, Ahrefs blocked: no Set-Cookie, no cookies, no storage on `/`, `/de`, `/de/courses/hillside`, `/ja/scorecard`, `/blog`, `/contact`, `/courses/formby`. | `b7c1cd9` |
| Report | A7 | The old address is described, not written out. | `d7365e4` |
| Privacy | P2, P4, P5, P6 | See 9.3. | `0aedd86` (branch) |

### 9.2 Not applied, and why
- **P3 (Ahrefs sentence):** left as agreed across the five sites; Damian is raising the reviewer's point (link clicks and form submissions) himself.
- **E1 (sponsor slots on two pre-Open posts):** the decision was to keep the post-end slots; both posts carry the dated pre-Open note. For Damian.
- **P1 and section 0 (push order):** for Damian. `main` already holds origin (`916a23e`); merge `privacy-wording` with `main` in the same push (a trial merge with `git merge-tree` is clean).
- **Partly applied:** C1, West Lancashire's ratings are published as a picture of a table, not copied; S&A lists two black-tee ratings without saying which matches the black yardage, so none is shown for black; Royal Birkdale publishes no rating. A5, the four field messages are English in the other 17 languages until translated (browser validation catches these first; a send failure now shows the translated message).

### 9.3 Privacy wording (branch `privacy-wording`, `0aedd86`)
- Cookies. Before: "Cookies: the site sets one cookie, NEXT_LOCALE, which remembers the language of the page you viewed and is deleted when you close your browser. It sets no analytics or advertising cookies." After: "Cookies: the site sets no cookies."
- Page counts. Before: "...the device type (desktop, mobile or tablet) and the time. It does not store your IP address." After: "...the device type (desktop, mobile or tablet) and the time. These records do not include your IP address."
- Contact form (new). After: "Contact form: if you send us a message, the form sends your name, email address, subject and message, and the advert space if you asked about one, to our inbox by email through our email provider, Resend."
- Ahrefs sentence unchanged. Changed keys removed from the 17 other locale files; Welsh also drops `analyticsDesc`, which carried the same English. The cookie sentence is true only with `b7c1cd9` from `main`.

### 9.4 Standing rule on six organisations
- LC1 applied ("Copy: no council attribution (standing rule)", `8bec78e`): the road-closure line in `/blog/getting-to-royal-birkdale-for-the-open-2026` no longer names the council. The fact came from the post's own pre-Open text; no council page was used.
- Links: no link to any of the 18 blocked domains was found in the source (0 removed for every organisation); one domain written in a code comment was taken out. `lib/blocked-domains.ts` holds the list; `tests/no-blocked-links.test.mjs` fails on any of them. Rendered check: 106 pages (English sitemap plus `/de` and `/ja`), 0 hits (`e804a5c`).
- Waiting for Damian, untouched: LM1 to LM3 (The Bold Hotel, whose own site calls it a Mikhail venue) and LK1 to LK3 (Southport Market).

### 9.5 Sources (fetched 11 Nov 2026)
- royalbirkdale.com/the-course/ (hole yardages and pars; back tees 7,176, par 70); /visitors/ (four tees 4,877 to 6,736; dress code); members.royalbirkdale.com/visitorbooking/ (fully booked 2026 and 2027); /history/ (Spieth led by two going into the final round).
- hillside-golfclub.co.uk/the-course/course-overview/ (scorecard and ratings; Hawtree, Ebert); /visitors/visitors-golf/ (closed to mid-March 2027; trolleys £20; buggies £35); /heritage/tournaments/.
- formbygolfclub.co.uk/the-course/course-overview/ (scorecard and ratings); /play/play-formby/; /play/visitor-faqs/ (handicaps 28 and 36); /club/history/ (Amateurs 1957, 1967, 1984, 2009; Curtis Cup 2004; Palmer Cup 2016; PGA Seniors 2021, 2022; first pines 1887); /contact-us/ (Golf Road, Freshfield).
- westlancashiregolf.co.uk/the-course/course-overview/ (scorecards; ratings image); /visitors/visitors-green-fees/ (visitors welcome; 6 buggies at £45); /contact/how-to-find-us/ (Hall Road station 50 yards).
- sandagolfclub.co.uk/golf/course-overview/ (scorecards and ratings); /visitors/green-fees-offers/; /visitors/visitors/ (welcome throughout the year; prime season late April to late September); /heritage/club-history/ (1936 British Ladies Amateur; Amateur 1984, 2005, 2023); /heritage/ryder-cup/.
- southportoldlinksgolfclub.co.uk/course-guide (White 6,460 par 72, 72.4/125; Gold; Black women) and home page (Southport Golf Academy).
- nationalrail.co.uk/stations/hillside/ (Waterloo Road, PR8 4QR) and /stations/birkdale/ (Liverpool Road, PR8 4AF); postcodes.io for the order of the stations; avantiwestcoast.co.uk (London Euston to Liverpool Lime Street).
- boldhotel.com (Mikhail loyalty app page) for the standing rule only.

## 10. Improvements and modernising

### 10.1 What was measured
Production build served on port 3103 with an empty `DATABASE_URL` and a bot user agent (Ahrefs blocked); dev server for the sweep. 352 URLs (sitemap with alternates, plus feed, robots, manifest, advertise and 404 pages): all 200 except the two intended 404s; 0 raw message keys; 0 em dashes. Every HTML page: one h1, `lang` right, valid JSON-LD, no image without alt. 14 page types at 1440 and 390: layout shift 0, no sideways scroll, keyboard focus visible. About 500 KB of script per route (uncompressed), fonts 168 KB. 25 external links resolve (Royal Birkdale refuses scripted requests). Every route is rendered on demand (build route table).

### 10.2 Em dash sweep
Source: 0 in customer-facing strings across `app/`, `lib/`, `components/`, `i18n/`, `messages/` (18 files) and `public/`; 6 in code comments, left. Rendered: 0 in 352 URLs (titles, meta, OpenGraph, JSON-LD, visible text, feed, sitemap). Nothing to fix. Test: `tests/no-em-dash.test.mjs` (`ca55b4c`), checked to fail on a planted em dash.

### 10.3 Ranked list
1. **Done** `e5fcfc3`: blog index pictures through next/image. The page fetched 80 MB of originals; now about 1.3 MB. (15 min)
2. **Done** `3fd6bc1`, `e5fcfc3`, `7846794`: canonical and og:url point at each locale's own page; 242 translated pages named the English page as canonical, against their own hreflang. Advertise, privacy and terms keep the English canonical. Worth a look before pushing: Google may start indexing the translated pages. (25 min)
3. **Done** `eb93be5`: tee time cards stack on phones; the status and the Website button no longer squeeze or clip at 390. (10 min)
4. **Done** `7846794`: train line for Royal Birkdale (Hillside station) and West Lancashire (Hall Road, 50 yards); all five other courses in each course sidebar (Southport Old Links was in none). (20 min)
5. **Done** `635c092`: the blog index sends the search box only card fields; HTML 451 KB to 275 KB. (10 min)
6. **Proposed:** static rendering for the localised pages (see 10.4). (1 to 2 h)
7. **Proposed:** contrast and tap targets (see 10.4). (2 to 3 h)
8. **Proposed:** translate the new English keys (see 10.4). (half a day)
9. **Done** `ab60548`: Article JSON-LD carries the post picture; `/disclosure` in the sitemap. (10 min)
10. **Done** `f5740a5`, `e5fcfc3`: conditions headings h1 to h2; blog search box labelled; card pictures use their own description or are decorative. (10 min)
11. **Done** `7846794`: no numbers beside the club names on `/courses`. (5 min)
12. **Done** `ca55b4c`, `e804a5c`: em dash and blocked-links tests.
13. **Proposed:** per-course getting-there lines for Hillside, Formby, S&A and Old Links from each club's page. (1 to 2 h)
14. **Proposed:** re-encode the 2 to 3.6 MB originals in `public/images` (78 MB in all; posts use them as OpenGraph images). (1 h)
15. **Proposed:** an "Updated" date on the 40 posts changed on 11 Nov, shown on the page and used for `dateModified` and the sitemap `lastmod` (now always "today"). (1 h)
16. **Left:** 249 titles over 65 characters and 240 descriptions over 160; Google shortens them, and rewriting them is a copy job.
17. **Left:** the home page's planner and itineraries cards both go to `/itineraries`; needs a content choice.

### 10.4 Proposals
- **Static rendering.** Every route is "rendered on demand" because next-intl reads the request locale; calling `setRequestLocale(locale)` in the layout and pages would let Next.js pre-render and revalidate them. Faster first byte and fewer function calls; touches every page. Evidence: route table in the build log.
- **Contrast and tap targets.** Gold #B8912A text and buttons on light backgrounds measure 2.7 to 2.95:1 and greys at 40 to 60% opacity 2.1 to 3.5:1 (AA needs 4.5:1); footer links are 15 to 20 px tall. A darker gold (#86671A, 4.9:1 on cream, 5.3:1 behind white text) on light backgrounds and greys at 75% would pass. Screenshots: `docs/freshen-2026-11/screens/idea-contrast-now-courses-royal-birkdale-1440.jpg` and `idea-contrast-mock-courses-royal-birkdale-1440.jpg` (also `-blog-` and `-390`).
- **Translations.** About 30 new or changed English keys (visitor status, scorecard source lines, contact errors, the Open sweep keys) show in English on the 17 other languages; the home blog strip and "Est." are hard-coded English. Screenshot: the German scorecard page (see final message for path).
- **Getting there**, **image originals** and **updated dates**: as in 10.3, items 13 to 15.

### 10.5 Checks
`npx tsc --noEmit` 0 errors (baseline 0). `npx eslint .` 0 errors, 13 warnings (baseline 14; the blog `<img>` warning went). `node --test tests/*.test.mjs` 32 of 32 (baseline 23; new: blog data, em dash, blocked links, sendEnquiry, route codes). `next build` passes. Screenshots at 1440, 1024, 768 and 390 of 23 changed pages; 9.4 MB committed (`5b4b4e7`: home, courses/royal-birkdale, scorecard, tee-times, accommodation, advertise, contact, and the contrast mock-up); the rest are in the session scratchpad.

## 11. SEO

SEO pass, 11 Nov 2026, commit `f70a47b` (not pushed). Checked on the dev server (port 3103, empty `DATABASE_URL`, bot user agent) against `main` at `6651395`, which is live.

### 11.1 Advertise page: title restored (Damian, 11 Nov 2026). Do not undo.
The old advertise page ranked well, so its title is back and its wording is kept in the copy. The URL `/advertise`, the canonical (the English page, no hreflang), and tonight's H1 and meta description stay as they are.

| | Before tonight (`ca27350^`, live) | Tonight's new page | Now |
|---|---|---|---|
| `<title>` | Advertise on SeftonLinks \| Sefton Coast Network \| SeftonLinks.com | Advertise on SeftonLinks \| SeftonLinks.com | Advertise on SeftonLinks \| Sefton Coast Network \| SeftonLinks.com |
| `og:title` | Advertise on SeftonLinks \| Sefton Coast Network | Advertise on SeftonLinks | Advertise on SeftonLinks \| Sefton Coast Network |

Headings and sentences on the old page (`ca27350^`) that contain "advertis" with "SeftonLinks", "Sefton Coast" or "golf", and where the page says it now:
1. The title, above: restored.
2. The old meta description, "Display advertising on SeftonLinks and the Sefton Coast Network, beside course guides, visitor information and golf travel articles for the Sefton Coast." Tonight's page did not say this. Now the hero paragraph opens: "Advertising on SeftonLinks puts your business beside our course guides, visitor information and golf travel articles for the Sefton Coast, and the bundle adds the other Sefton Coast Network sites." (True: course page partners, Tee Times and Conditions sponsors, sponsored articles, and the bundle across the four sites.)

No other heading or sentence on the old page matched ("Advertising and Partnerships", "Why advertise here" and "Advertising packages" have no place or golf word). The version live before the advertising work (`0268841`) also had "Display advertising across the Sefton Coast Network." (covered by the same sentence) and "Advertisers on SeftonLinks in July are reaching this audience at peak." (about Open week 2026, which is past: not restored).

The site's own links to `/advertise`: the footer link texts "View advertising options →" and "Advertise" are as they were before tonight. The footer line beside them is back to "Advertise with the Sefton Coast Network" (tonight it read "Advertise on SeftonLinks"). Its lead-in stays "Hotel, B&B, restaurant or golf travel business?" (before: "Golf club, travel brand or local business?"), because page and post sponsors can no longer be golf clubs. There was no header link before tonight and there is none now. The "advertise here" cards ("See advertising options") and the contact page link are new tonight, so there is no earlier wording to keep.

### 11.2 What changed
- **Sitemap** (`app/sitemap.ts`): the 15 translated page types are listed in all 18 locales, each as its own `<url>` with the same 22 hreflang alternates. Before, the 255 translated URLs appeared only as alternates of the English entries. 74 URLs before, 329 now (74 English, 15 in each of the 17 other languages). `lastmod` was the build time on every URL. Now it is the post's own date or `updated` date for posts, the newest of those for the blog index and categories, and the day the course data was read (11 Nov 2026, shown under each course table) for course guides. Other pages have no date of their own, so they have no `lastmod`. Privacy and terms stay out (noindex).
- **Dates** (`lib/blog.ts`): an optional `updated` date, set to 11 Nov 2026 on the 48 posts whose text changed since `0268841`. It drives Article `dateModified`, `og:modifiedTime`, the sitemap `lastmod` and an "Updated 11 Nov 2026" line beside the post date. Two posts did not change and have none.
- **Schema**: the layout put a WebSite block on every page and the home page added a second, with a different publisher. Now the home page carries the site's one WebSite and one Organization (SeftonLinks.com, logo `icon-512.png`, parent organisation Churchtown Media, which posts name as publisher). BreadcrumbList added to posts and blog categories, which show breadcrumbs; course guide breadcrumbs now point at the page's own language. Checked: every JSON-LD block parses; GolfCourse on course guides with address, geo, phone and the club's published figures; Article with headline, image, author, publisher, `datePublished` and `dateModified`. There are no ratings, reviews, events or opening hours in the schema, so nothing to fix there. The Open page has a BreadcrumbList without a visible breadcrumb; left, as it matches the site's structure.
- **Titles and tags**: privacy and terms no longer double the site name ("Privacy Policy | SeftonLinks | SeftonLinks.com"). `twitter:title` was the home title on every page; it now follows each page's own Open Graph title, description and image. Disclosure, privacy and terms get their own `og:url` and `og:title`.
- **Internal links**: English course guides list the posts about that club plus the booking, green fees and winter posts. Posts about a club link to its course guide, and every post links to three more in its category (`COURSE_POSTS` in `lib/blog.ts`). Links to Sefton Coast Wildlife, seftoncoast.network and Churchtown Media go straight to their www hosts; the bare domains answered with a 307 redirect (`9858ab1`).
- **Canonicals**: no change needed. Every indexable page has one absolute https canonical on www pointing at itself. Translated pages are self-canonical with reciprocal hreflang and x-default. Advertise, privacy, terms, disclosure, the blog, categories and posts have an English canonical and no hreflang. No `Link` hreflang header. Query strings (`?space=`, `?q=`, `?utm_*`, `?page=`) render the page with the clean URL as canonical; the site has no pagination. Locale blog URLs redirect (308) to English and are not in the sitemap. The 404 page is noindex with no canonical.
- **robots.txt**: unchanged and correct: `Allow: /`, `Disallow: /api/`, `Sitemap: https://www.seftonlinks.com/sitemap.xml`.

### 11.3 Checks
Every sitemap URL fetched from the dev server: before, 74 (74 × 200, 0 redirects, 0 404s, 0 noindex); after, 329 (329 × 200, 0 redirects, 0 404s, 0 noindex). Each sitemap entry's alternates match the page's own hreflang tags. Each page has one canonical equal to its URL, one title, one h1, and `og:url` equal to the canonical. 0 em dashes in the rendered HTML. `npx tsc --noEmit` 0 errors; `npx eslint .` 0 errors, 13 warnings (same as before); `node --test tests/*.test.mjs` 34 of 34 (2 new); `next build` passes.

### 11.4 Left, and why
- **Translations.** The 17 other languages show the English home title and description, and English titles, descriptions and much body text on the Open, conditions and course pages (the old translations went tonight with the stale Open copy). They are now self-canonical and in the sitemap, but Google is likely to treat them as copies of the English pages until they are translated. See Traffic, item 2.1.
- **Long titles and descriptions.** 65 of 74 English titles are over 60 characters with the " | SeftonLinks.com" suffix, and 53 descriptions are over 160. Left, because the rule is not to trade a title that may rank for a tidier one. Shorten only pages Search Console shows with impressions and no clicks (Traffic, item 2.3).
- **Slugs with judgement words** (`hillside-golf-club-most-underrated-links`, `best-value-golf-sefton-coast`): left. The URLs may rank, and the titles are neutral.

## Traffic: what to do next

Ranked by likely visits gained. Search terms are proposed phrasings (no keyword tool data). Check them against Search Console's queries for seftonlinks.com before writing.

### 1. Search terms the site does not cover yet
1. **Golf near Liverpool** ("golf courses near liverpool", "links golf liverpool"). The site has Manchester and Blackpool trip posts but nothing for Liverpool, the nearest city. West Lancashire (Blundellsands, Hall Road station) and Formby are a short train ride out. Sources: Merseyrail and each club's directions page.
2. **Royal Birkdale visitor booking for 2027 and 2028** ("can I play royal birkdale"). The post of that name is about Open week. The club's visitor booking page said fully booked through 2027 when checked on 11 Nov 2026.
3. **Golf courses near Southport** ("golf courses southport", "golf near southport"). `/courses` is titled for the Sefton Coast, and people looking for a round often search by town. A post that answers it, or the edit in 2.2.
4. **Spring 2027: when the clubs take visitors again** ("golf southport march 2027"). Hillside is closed to visitors until mid-March 2027. Publish late February, from the clubs' own pages.
5. **Open competitions visitors can enter in 2027** ("open golf competitions southport 2027"). Nothing on the site. Each club's fixtures page once published (usually January).
6. **Dress codes, club by club** ("royal birkdale dress code"). Mentioned in passing only. Each club's visitors page.
7. **Women's golf on the Sefton Coast** ("women's open royal birkdale"): the Women's Opens at Birkdale and the 2004 Curtis Cup at Formby. Club history pages and The R&A.

Changed from the draft: "Southport & Ainsdale and its Ryder Cup history" is dropped, as the retitled post "Southport & Ainsdale: Twice a Ryder Cup Venue" covers it. "Golf by train on Merseyrail" folds into item 1. Items 1, 3 and 4 are new.

### 2. Pages one edit away from ranking
1. **Translate the meta titles and descriptions** for the 15 translated page types (home first, then the course guides, the Open page and conditions), then the body keys listed in 10.4. 255 pages are in the sitemap and self-canonical, and with English titles they mostly duplicate the English pages. Half a day for titles and descriptions.
2. **`/courses`**: add "Southport" and "near Liverpool" to the description and the first paragraph, in plain words, without changing the title (it may already rank). Ten minutes.
3. **Post titles**: once Search Console has a month of data, shorten to "place plus thing" only the long post titles with impressions and no clicks. Leave any with clicks.
4. **Faster pages**: static rendering for the localised pages (10.4). Every route is rendered on demand today.

### 3. Posts a month
Two a month: one practical (booking, getting there, prices, conditions) and one about a club or its history. Seasonal posts go up two to three weeks before the month they cover. No Open build-up posts until a future Open is announced for Birkdale. The monthly conditions posts stopped after July, and the winter post covers November to March, so the next seasonal post is spring 2027 (item 1.4).
