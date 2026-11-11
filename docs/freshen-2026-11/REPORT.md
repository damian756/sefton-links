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
- Addresses: `DISPLAY_EMAIL` (hello@seftoncoast.network) printed on contact, advertise, disclosure and privacy. Before: hello@churchtownmedia.co.uk (a dead address, already replaced live by the hotfix `0268841`) and `partnerships@seftoncoast.network` on the advertise page.
- Sponsored articles: support only.
- Affiliate links removed: LateRooms, Champions Travel, Cottages.com, Sykes and Golf Breaks on the accommodation, Open, course, itineraries and home pages and in the planner; `lib/affiliate-links.ts` deleted; affiliate strings removed from all 18 message files. Privacy and terms (all 18 languages): the "Affiliate Links" heading and sentence removed from each (privacy: "Some links on this site are affiliate links (Golf Breaks, Booking.com, Sykes Cottages). These are clearly labelled. Clicking them may result in a commission to SeftonLinks.com at no extra cost to you."; terms: "This site participates in affiliate programmes including Golf Breaks, Booking.com and Sykes Cottages. Commissions earned help fund the editorial operation at no cost to users.").
- Disclosure states current funding (Churchtown Media Ltd pays; businesses can buy a labelled advert or sponsored article) and has an Advertising section.
- Existing advertisers: none. No visit counting on this site.
- Tests 23 of 23 (addresses, recipient, reply-to, escaping, logging, honeypot, caps, no provider test sender, no affiliates). tsc 0; eslint 0 errors and 15 warnings (baseline 1 and 15).
- For Damian: the £35 post-sponsor price; ad cards English-only; about 50 to 60 lines in each other language file still contain em dashes (untouched translated strings); verdict copy left as it was (course data "consistently excellent conditioning", "Ranked in world's top 5", "Excellent value", and restaurant and hotel lines); Birkdale's 24/36 handicap limits unverified; the privacy page names Plausible and Clarity but the site loads Clarity and Ahrefs, and does not mention the `PageView` log in `proxy.ts`. Draft privacy line: "If you use our contact form, we receive your name, email address and message by email, sent through our email provider Resend, and use them only to reply to you."
