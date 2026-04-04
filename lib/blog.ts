export interface BlogAuthor {
  name: string;
  bio: string;
  jobTitle: string;
  url: string;
  schemaId: string;
}

export interface BlogCategory {
  slug: string;
  label: string;
  description: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  categorySlug: string;
  date: string;
  readingTime: string;
  /** Path relative to /public, e.g. '/images/courses/hillside.jpg' */
  image?: string;
  content: ContentBlock[];
}

export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'callout'; text: string }
  | { type: 'hr' };

// ── Author ────────────────────────────────────────────────────────────────────

export const DAMIAN: BlogAuthor = {
  name: 'Damian Roche',
  jobTitle: 'Founder, Churchtown Media & SeftonLinks.com',
  bio: "Damian lives in Churchtown, Southport: about three miles from the first tee at Royal Birkdale. He plays off 24 on a good day, has personally donated more golf balls to the willow scrub than he'd like to admit, and built SeftonLinks because he couldn't find a decent guide to the courses on his own doorstep. He founded Churchtown Media and runs the Sefton Coast Network. His golf is genuinely a work in progress.",
  url: 'https://www.churchtownmedia.co.uk/about',
  schemaId: 'https://www.churchtownmedia.co.uk/about#founder',
};

// ── Categories ────────────────────────────────────────────────────────────────

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: 'course-reviews',
    label: 'Course Reviews',
    description: 'Honest, first-hand accounts of playing every course on the Sefton Coast: written by a 24-handicapper who lives three miles from Royal Birkdale. Green fees, visitor experience, and the holes that will haunt you.',
  },
  {
    slug: 'links-golf-tips',
    label: 'Links Golf Tips',
    description: 'Practical advice for playing links golf: shot selection, course management, reading links greens, and matching yourself to the right course for your handicap.',
  },
  {
    slug: 'the-open-2026',
    label: 'The Open 2026',
    description: 'Everything you need to know about The Open Championship 2026 at Royal Birkdale: tickets, transport, where to stay, what to play, and how to get the most out of the week.',
  },
  {
    slug: 'golf-travel',
    label: 'Golf Travel',
    description: 'Planning a golf trip to the Sefton Coast: itineraries, value courses, and where to stay.',
  },
];

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((c) => c.slug === slug);
}

// ── Posts ─────────────────────────────────────────────────────────────────────

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'i-played-royal-birkdale-off-24',
    title: 'I Played Royal Birkdale Off 24. Here\'s What Happened.',
    image: '/images/courses/royal-birkdale.jpg',
    excerpt:
      'I live three miles from Royal Birkdale. I built a website about it. And until last October, I\'d never actually played it. Here\'s the honest account of what happens when a 24-handicapper takes on one of the world\'s greatest links courses.',
    categorySlug: 'course-reviews',
    date: '3 Feb 2026',
    readingTime: '8 min read',
    content: [
      { type: 'p', text: "I\'ll be upfront about something: I built SeftonLinks.com: a site dedicated to championship links golf on the Sefton Coast: before I\'d actually played Royal Birkdale. I know. I know. In my defence, I\'d walked the course as a spectator during the 2017 Open, I\'d researched it obsessively, and I genuinely believed I understood what the course was like. I did not understand what the course was like." },
      { type: 'h2', text: 'Getting on the course' },
      { type: 'p', text: 'Booking a visitor tee time at Royal Birkdale is not simple. There\'s no casual phone call on a Wednesday morning. You need a handicap certificate, you need to book well in advance, and you need to accept that the green fee: £320 when I went: is not for the faint-hearted. I booked three months ahead. Got a Tuesday morning slot, which is about as good as it gets for visitors.' },
      { type: 'p', text: 'I drove there from Churchtown, which took about eight minutes. I\'ve driven past the gates hundreds of times. Walking through them as a player feels genuinely different. The clubhouse is exactly what you\'d expect: old, oak-panelled, photographs of Open champions on every wall. There\'s a framed photograph of Arnold Palmer\'s famous 1961 recovery shot from a gorse bush on the 15th. They\'re very proud of that photograph.' },
      { type: 'callout', text: 'Practical note: the dress code is strict. Smart/casual only. No denim, no trainers, no collarless shirts. Check the club website before you go. They will turn you away.' },
      { type: 'h2', text: 'The first few holes' },
      { type: 'p', text: 'The opening holes at Birkdale run through the valleys between the dunes rather than over the tops of them: this is what makes it unusual compared to most links courses. The fairways look generous from the tee. They are not as generous as they look. The wind was relatively calm by Southport standards (maybe 15mph), and by the 3rd hole I\'d already found willow scrub twice.' },
      { type: 'p', text: 'Willow scrub is a genuine hazard. At other links courses, rough is rough: you can usually find your ball and hack it back to the fairway. At Birkdale, the willow scrub is a dense, chest-high mass of vegetation that simply swallows golf balls. I lost four balls in willow scrub. Four. My playing partner, a regular Birkdale member, didn\'t find this surprising.' },
      { type: 'h2', text: 'By the back nine' },
      { type: 'p', text: 'I was playing for fun at this point, not score. The back nine at Birkdale is where the course really opens up: the dunes are more dramatic, the holes more exposed to the elements, and the views across to the Irish Sea are genuinely beautiful on a clear day. The 18th green, sitting below the clubhouse, is one of the finest finishing holes in championship golf.' },
      { type: 'p', text: 'My final score was not something I\'m going to publish. Let\'s say I played to my handicap on about six holes. On the other twelve, I did not play to my handicap.' },
      { type: 'h2', text: 'Was it worth £320?' },
      { type: 'p', text: 'Yes. Without hesitation. Royal Birkdale is genuinely one of the great golf courses. The condition was impeccable: fairways firm and fast, greens smooth and quick, rough well-maintained. The course management is outstanding. For a golfer who cares about playing courses that matter, this is one of the best you\'ll ever play.' },
      { type: 'p', text: 'Is it the right course for a 24-handicapper who wants a good score? Probably not. You\'ll enjoy it more if you go in expecting to be humbled and come home with stories rather than a card. Which is exactly what happened to me.' },
      { type: 'callout', text: 'For the full course guide: green fees, tee time policy, course data and what to expect: see the Royal Birkdale course guide on SeftonLinks.' },
    ],
  },
  {
    slug: 'links-golf-for-beginners',
    title: 'Links Golf for Beginners: What Nobody Tells You Before Your First Round',
    image: '/images/sefton-coast.jpg',
    excerpt:
      'Playing links golf for the first time? The wind, the bouncing ball, the gorse, the blind shots: none of it works like inland golf. Here\'s what to expect and how to actually enjoy it.',
    categorySlug: 'links-golf-tips',
    date: '10 Feb 2026',
    readingTime: '6 min read',
    content: [
      { type: 'p', text: 'If you\'ve only ever played parkland golf, your first links round will feel like playing a different sport. The same clubs, the same ball, the same basic rules: but almost everything else is different. Here\'s the honest guide to what you\'re walking into.' },
      { type: 'h2', text: 'The wind is not optional' },
      { type: 'p', text: 'Links courses are built on coastal land specifically because there is almost always wind. On the Sefton Coast, a calm day is 10mph. A normal day is 20mph. On an exposed day, you\'ll be hitting into 35mph gusts. Every shot selection changes.' },
      { type: 'p', text: 'The first thing to unlearn is using loft to manage distance. Into the wind on a links, a high lofted shot balloons, stalls and falls well short. The experienced links golfer punches low and runs the ball. That 7-iron you\'d hit 155 yards in normal conditions? It\'s a 120-yard club today. Learn to take more club and swing easier.' },
      { type: 'h2', text: 'The ground game is real' },
      { type: 'p', text: 'Links turf is firm and fast. Shots that would pitch and stop on a parkland green will run 20-30 yards past the hole on a links. Bump and run approaches: landing short of the green and running onto the putting surface: work far better than high, soft approaches.' },
      { type: 'p', text: 'The fairways are the same. Don\'t be surprised when your drive rolls an extra 40 yards in summer. The ball simply runs on firm links turf. Club selection for approach shots becomes more complex when you\'re not sure how far you\'ll actually be.' },
      { type: 'h2', text: 'Course management on links' },
      { type: 'ul', items: [
        'Play for position, not for the flag. Links pins are often tucked behind bunkers. Going for them costs strokes. Miss the bunker, miss the trouble.',
        'Use the slopes. Links greens have pronounced contours and firm surfaces: a well-aimed chip that runs along the slope can be the smarter play than a high pitch.',
        'Check the wind from behind you, not just in your face. Crosswinds are the most dangerous. A 20mph crosswind will push a mid-iron 15-20 yards offline.',
        'Treat gorse as a water hazard. If your ball goes in gorse, declare a penalty drop. Trying to play from gorse is how people injure themselves.',
        'Look up. Seagulls can actually interfere with shots in coastal conditions: if you see one diving, step away.',
      ]},
      { type: 'h2', text: 'What to bring' },
      { type: 'ul', items: [
        'Waterproofs, always. Links weather changes fast.',
        'More balls than you think. Even experienced players lose balls in gorse and rough.',
        'A wind-resistant umbrella (or just accept you\'ll get wet: umbrellas can be a liability in strong winds).',
        'Tees that sit close to the ground: high tees are destroyed by links winds.',
        'Sensible expectations. Your handicap will not protect you your first time.',
      ]},
      { type: 'h2', text: 'The best place to start on the Sefton Coast' },
      { type: 'p', text: 'For your first links round, Southport & Ainsdale or West Lancashire are better choices than Royal Birkdale or Hillside. You\'ll play on genuine links terrain, get used to the conditions, and pay a more manageable green fee. Once you\'ve played links a few times, then book Birkdale or Hillside: you\'ll enjoy it more and embarrass yourself less.' },
    ],
  },
  {
    slug: 'best-value-golf-sefton-coast',
    title: 'The Best Value Links Golf on the Sefton Coast',
    image: '/images/courses/southport-ainsdale.jpg',
    excerpt:
      'Royal Birkdale is £320 a round. Hillside is £150. But you don\'t have to spend £150 to play world-class links golf on the Sefton Coast. Here\'s where the real value is.',
    categorySlug: 'golf-travel',
    date: '17 Feb 2026',
    readingTime: '5 min read',
    content: [
      { type: 'p', text: 'The Sefton Coast has a reputation problem. People hear "Royal Birkdale" and assume the whole area is out of their price range. It isn\'t. Within thirty minutes of Royal Birkdale\'s first tee, you can play genuine championship links golf for between £65 and £130 a round. Here\'s the honest guide to where the value actually is.' },
      { type: 'h2', text: 'Southport & Ainsdale: the best value championship course' },
      { type: 'p', text: 'Green fees: £65–£100. This is the most underrated course on the Sefton Coast. S&A has hosted the Ryder Cup (1933 and 1937) and the Amateur Championship multiple times. The course runs through genuine duneland, the condition is consistently excellent, and visitor access is far better than the headline courses.' },
      { type: 'p', text: 'The layout is traditional links with a good mix of exposed and sheltered holes. The 16th hole: a par 3 across a valley of dunes: is as good as anything on the coast at any price. Green fees include a meal. This alone makes it exceptional value by local standards.' },
      { type: 'h2', text: 'West Lancashire: raw links at a fair price' },
      { type: 'p', text: 'Green fees: £80–£130. West Lancs is the most authentic, unpolished course on the coast. It doesn\'t have Birkdale\'s manicured quality or Hillside\'s striking terrain: what it has is a raw, elemental links test that purists genuinely love.' },
      { type: 'p', text: 'The rough is proper rough. The wind is relentless (it sits right on the Irish Sea). The greens are fast and true. The clubhouse is welcoming and unpretentious. If you want a challenge that doesn\'t break the bank, West Lancs delivers.' },
      { type: 'h2', text: 'What you\'re giving up at the top end' },
      { type: 'p', text: 'Royal Birkdale and Hillside cost more because they\'re better: the conditioning is exceptional, the course management is outstanding, and the heritage is unmatched. A round at Birkdale is worth doing once if you care about golf. But it\'s not the only option, and it\'s not where most people should start.' },
      { type: 'h2', text: 'The value itinerary' },
      { type: 'p', text: 'For a two-day golf trip to the Sefton Coast that won\'t ruin you: Day 1 at Southport & Ainsdale (£65–£100 including lunch), Day 2 at West Lancashire (£80–£130). You\'ll have played two genuine championship links courses, seen what the Sefton Coast is about, and spent less than a single round at Royal Birkdale.' },
      { type: 'p', text: 'If budget allows and you want to add Hillside or Birkdale, book Day 3 and go in with realistic expectations. You\'ll be ready for it after two days of links golf on the coast.' },
      { type: 'callout', text: 'All seven Sefton Coast courses: including green fees, visitor policies and booking info: are covered in the SeftonLinks course guides.' },
    ],
  },
  {
    slug: 'the-open-2026-first-timers-guide',
    title: 'What to Expect at The Open 2026: A First-Timer\'s Complete Guide',
    image: '/images/the-open-2026.jpg',
    excerpt:
      'The Open Championship returns to Royal Birkdale in July 2026. If you\'ve never been to a major championship before, here\'s everything you need to know: tickets, transport, what to bring, and what to expect on the day.',
    categorySlug: 'the-open-2026',
    date: '20 Jan 2026',
    readingTime: '9 min read',
    content: [
      { type: 'p', text: 'The 154th Open Championship takes place at Royal Birkdale, Southport, from 13–19 July 2026. If you\'ve never attended a major golf championship, the scale of it will surprise you. 250,000 people across the week. The world\'s best players. An atmosphere unlike any other sporting event in this country.' },
      { type: 'p', text: 'I live three miles from the course and have been to multiple Opens. Here\'s everything a first-timer needs to know.' },
      { type: 'h2', text: 'Tickets: what you need to know now' },
      { type: 'p', text: 'Championship round tickets (Thursday–Sunday) are in very short supply. If you haven\'t got them yet, check the R&A official site immediately: returns do come up but not often. Practice round tickets (Monday–Wednesday) are significantly easier to get and offer excellent value: you can walk close to players on the driving range and fairways at a fraction of championship-day prices.' },
      { type: 'ul', items: [
        'Practice rounds: typically £25–£45 per day. Get on the driving range early: the atmosphere is informal and player access is excellent.',
        'Championship rounds: £60–£120+ per day. Prices vary by day: Saturday and Sunday cost more.',
        'No gate sales on championship days. You must have a ticket in advance.',
        'Ticket transfers: the R&A app allows transfer to another named person: watch for this on secondary markets.',
      ]},
      { type: 'h2', text: 'Getting there: do not drive' },
      { type: 'p', text: 'Road closures around Birkdale during Open week make driving impractical. Parking near the course is reserved for officials only. The options are:' },
      { type: 'ul', items: [
        'Merseyrail: the direct train from Southport to Birkdale station (10–15 min walk from the course) will be running enhanced services. Coming from Liverpool, take the Northern Line to Birkdale directly.',
        'Park and ride: the R&A operates park-and-ride from multiple sites across Southport. Details published at theopen.com closer to the event.',
        'Stay locally: if you\'re staying in Birkdale village or within a mile of the course, you can walk in every day.',
      ]},
      { type: 'h2', text: 'What to bring' },
      { type: 'ul', items: [
        'Small bag only: there are bag size restrictions at the entrance.',
        'Waterproofs regardless of forecast. Open week weather is unpredictable.',
        'Comfortable walking shoes. You will walk 5–8 miles per day on links terrain.',
        'Binoculars. Useful for watching shots from distance, especially on par 5s and long par 4s.',
        'Portable phone charger. You\'ll be tracking the leaderboard and filming all day.',
        'Cash or card: both accepted, but queues at some food outlets are card-only.',
        'Your ticket on the app: don\'t rely on a screenshot in poor signal.',
      ]},
      { type: 'h2', text: 'The best spots on the course' },
      { type: 'p', text: 'For a first-timer, the area around the 1st tee and 18th green gives you the most atmosphere with the least walking. The 1st tee in the morning is spectacular: you\'ll be close to the players and can follow a group for the first few holes before coming back.' },
      { type: 'p', text: 'The par-3 holes: particularly the 12th: allow you to stand close to the green and watch several shots in quick succession without following a group all round the course. The 18th green is the place to be on Sunday afternoon if you can get there.' },
      { type: 'h2', text: 'Where to stay' },
      { type: 'p', text: 'Accommodation in Southport and Birkdale for Open week is almost entirely booked. If you need somewhere: check Formby first (20 minutes by car from the course), then Ormskirk and Skelmersdale. Airbnb properties within 5 miles of Birkdale are your best option at this stage.' },
      { type: 'callout', text: 'SouthportGuide has a complete Open 2026 visitor hub covering accommodation, restaurants, transport and spectator tips: worth reading before you go.' },
      { type: 'h2', text: 'One final piece of advice' },
      { type: 'p', text: 'Don\'t spend all day staring at your phone tracking the leaderboard. Put it away for an hour, find a spot on a long par 4, and watch golf being played by the best players in the world on one of the great courses. That\'s the thing you came for.' },
    ],
  },

  // ── New posts (Feb 2026) ────────────────────────────────────────────────────

  {
    slug: 'sefton-coast-course-for-your-handicap',
    title: 'Which Sefton Coast Course Is Right for Your Handicap?',
    image: '/images/sefton-coast.jpg',
    excerpt: 'Six championship links courses within ten miles. Very different difficulty levels, visitor policies and price points. Playing the wrong one for your ability is expensive and occasionally humiliating. This is the honest guide to matching yourself to the right course.',
    categorySlug: 'links-golf-tips',
    date: '18 Feb 2026',
    readingTime: '7 min read',
    content: [
      { type: 'p', text: 'I played Royal Birkdale off 24. I\'ve documented what happened. I\'m not going to pretend it was a great advertisement for matching golfer to course. The Sefton Coast has six championship links courses and the gap in difficulty between the most forgiving and the most punishing is substantial. Here\'s how to make the right choice: and avoid ending up like me on the 9th at Birkdale, three balls down and already wondering why I thought this was a good idea.' },
      { type: 'h2', text: 'Handicap 0–10: all six courses: start with Birkdale or Hillside' },
      { type: 'p', text: 'If you\'re a single-figure or low-handicap golfer, the full range of the Sefton Coast is available to you. Start with Royal Birkdale if you can get on: it\'s one of the world\'s great courses and you\'ll be able to appreciate and compete on it in a way that higher handicappers genuinely can\'t. Hillside is the better value equivalent: same dune system, same standard of design, significantly lower green fee.' },
      { type: 'p', text: 'West Lancashire is worth adding: it will test ball-striking in a way that nothing else on the coast quite does. The rough is proper rough and the wind exposure is relentless. For a complete low-handicap experience, play Birkdale, Hillside, West Lancashire, and Southport & Ainsdale. That\'s four courses, four different characters, and one of the best golf itineraries in Britain.' },
      { type: 'h2', text: 'Handicap 11–18: Hillside, S&A, and Formby first' },
      { type: 'p', text: 'Mid-handicap golfers should approach the Sefton Coast by building up rather than starting at the top. Hillside over Royal Birkdale is the right call: comparable links experience at a difficulty level where you\'ll have a round rather than just a survival exercise. Southport & Ainsdale is the strongest recommendation at this handicap range: slightly shorter than the headline courses, genuinely excellent links design, green fee includes a meal.' },
      { type: 'p', text: 'Formby Golf Club has a different character to the pure coastal courses. It mixes heathland with links in a way that plays slightly more predictably than the fully exposed courses: a good choice for a mid-handicapper who wants quality golf without the full punishment of an open coastal course in a stiff westerly.' },
      { type: 'h2', text: 'Handicap 19–28: S&A, Southport Old Links, and be realistic about Birkdale' },
      { type: 'p', text: 'Southport & Ainsdale is the standout recommendation at this handicap range. The course is manageable, the design rewards reasonable golf, and the experience of playing a course with genuine Ryder Cup history doesn\'t require you to be a scratch golfer. You\'ll have a competitive round and not lose six balls.' },
      { type: 'p', text: 'Southport Old Links is the underrated option for higher handicappers. Green fees under £50, genuine links terrain, good visitor access. You can play it twice in a day for less than a single round at West Lancashire. It\'s not on the championship circuit, but it\'s proper links golf and you\'ll enjoy it.' },
      { type: 'p', text: 'Royal Birkdale and West Lancashire at 20+ handicap are experiences rather than rounds. You\'ll enjoy them for the environment and the history. Manage your expectations about the score, especially at Birkdale: the willow scrub is simply a ball collector at higher handicaps.' },
      { type: 'h2', text: 'The quick reference' },
      { type: 'ul', items: [
        'Royal Birkdale: best at 0–15. Championship conditioning, unforgiving rough and willow scrub. £320.',
        'Hillside: best all-round value for 0–20. Same dunes as Birkdale at a third of the price. £75–£110.',
        'Southport & Ainsdale: the all-handicap recommendation. 0–28 can enjoy it properly. Meal included. £65–£100.',
        'Formby GC: good at 0–22. Heathland-links mix, slightly more forgiving than the exposed coastal courses. £75–£110.',
        'West Lancashire: best at 0–18. Exposed and punishing. Rewarding if you can manage it. £80–£130.',
        'Southport Old Links: best for 15–28. Accessible, affordable, proper links. Under £50.',
      ] },
      { type: 'callout', text: 'All six courses are covered in detail on SeftonLinks: green fees, visitor policies, course data and booking links. The itineraries page has multi-day plans at different budget levels.' },
    ],
  },

  {
    slug: 'west-lancashire-golf-club-review',
    title: 'West Lancashire Golf Club: Raw Links, No Pretension',
    image: '/images/courses/west-lancashire.jpg',
    excerpt: 'West Lancashire is not manicured. It is not concerned with your enjoyment. It is a proper links course on an exposed piece of coastline and it will test you in ways that more polished courses won\'t. I played it in 18mph wind and shot my worst score in two years. I\'d go back tomorrow.',
    categorySlug: 'course-reviews',
    date: '19 Feb 2026',
    readingTime: '7 min read',
    content: [
      { type: 'p', text: 'There is a type of links golf course that exists before tourism and hospitality discovered that golf clubs could be businesses. West Lancashire Golf Club feels like that. The clubhouse is functional rather than grand. The welcome is warm but not effusive. The course asks nothing of you except to play golf, and when you don\'t, the wind and the rough and the firm greens make you pay for it with a clarity that more accommodating courses don\'t.' },
      { type: 'h2', text: 'The course' },
      { type: 'p', text: 'West Lancashire is the most exposed course on the Sefton Coast. It sits right on the shoreline north of Formby: when the prevailing westerly comes in off the Irish Sea, there is nothing to stop it. The course runs along the coast rather than into the dunes, which means fewer dramatic changes in elevation but more consistent wind exposure on nearly every hole.' },
      { type: 'p', text: 'The opening holes lull you into thinking it might be manageable. A couple of medium-length par 4s running slightly downwind. Then you turn, and the wind is in your face, and the holes suddenly play 30 yards longer than the card says. The back nine at West Lancs, into the prevailing wind, is one of the genuine tests on the Sefton Coast.' },
      { type: 'h2', text: 'The rough' },
      { type: 'p', text: 'I want to say something specific about the rough at West Lancashire. It is real rough: not the slightly-longer-grass-you-can-hack-a-7-iron-through rough of many championship courses. It is long, heavy, seaside rough that closes around a golf ball and makes full swings difficult. Off the fairway at West Lancs, your realistic outcome is a punched recovery shot back to the short grass. Plan for it before the first tee, not after the fourth hole.' },
      { type: 'p', text: 'My score on the day I played: 93 in 18mph wind. I\'d like to say that\'s above my expected score, but at West Lancs in those conditions, it\'s about right for a 24-handicapper who thought he was playing better than he was.' },
      { type: 'h2', text: 'The practical details' },
      { type: 'ul', items: [
        'Green fees: £80–£130. One of the better-value serious tests on the Sefton Coast.',
        'Visitor access: good. Weekdays most accessible. Weekend visitors welcome with advance booking.',
        'Handicap certificate: not always required but bring one: it\'s the kind of club that takes it seriously.',
        'Dress code: smart/casual as you\'d expect. Traditional club atmosphere.',
        'Location: Hall Road East, Blundellsands, Liverpool. L23 8SZ. North of Formby, south of Southport.',
      ] },
      { type: 'h2', text: 'Who should play West Lancashire' },
      { type: 'p', text: 'Golfers who have played links before and want a genuine test. Golfers who\'ve done Birkdale and Hillside and want to understand what the less-celebrated end of the Sefton Coast offers. Golfers who read "exposed" and "raw" as compliments rather than warnings.' },
      { type: 'p', text: 'If you want a polished experience with a full hospitality package, this isn\'t your course. If you want to find out what you\'re actually made of on a links, come to West Lancashire and leave the scorecard in your bag for the first few holes.' },
      { type: 'callout', text: 'Full visitor information: green fees, booking policy, tee time availability and contact details: on the West Lancashire course page at SeftonLinks.' },
    ],
  },

  {
    slug: 'southport-ainsdale-golf-club-review',
    title: 'Southport & Ainsdale: The Ryder Cup Course Nobody Talks About',
    image: '/images/courses/southport-ainsdale.jpg',
    excerpt: 'Southport & Ainsdale has hosted the Ryder Cup twice. It ranks in the top 50 courses in England. Green fees start at £65 and include a meal. I genuinely don\'t understand why it\'s not the first stop on every serious Sefton Coast golf trip.',
    categorySlug: 'course-reviews',
    date: '20 Feb 2026',
    readingTime: '7 min read',
    content: [
      { type: 'p', text: 'In 1933 and 1937, Great Britain played the United States in the Ryder Cup at Southport & Ainsdale Golf Club. The 1933 match: won by Great Britain 6.5 to 5.5: was watched by the Prince of Wales and is one of the celebrated moments in British golf history. The course hasn\'t been forgotten by golf historians. It has been somewhat forgotten by everyone else. This is, in blunt terms, an under-played championship links course, and the people who know about it like it that way.' },
      { type: 'h2', text: 'What the course is actually like' },
      { type: 'p', text: 'S&A runs through genuine duneland: not flat parkland with sand hazards, but proper coastal dune terrain with the elevation changes and blind shots that make links golf interesting. The course is slightly shorter than Royal Birkdale (approximately 6,600 yards from the back tees) but plays longer than the card suggests because of wind exposure and the firmness of the turf.' },
      { type: 'p', text: 'The par 3s are the highlight. There are four of them and each one presents a different challenge: different wind exposure, different green shapes, different natural surroundings. The 16th is the best hole on the course: a par 3 across a natural valley between dunes that plays differently every single time depending on wind direction. I\'ve hit a 6-iron and a 4-iron to the same flag. Same distance marker, different day.' },
      { type: 'h2', text: 'Visitor access: why this is the right starting course' },
      { type: 'p', text: 'S&A has better visitor access than any of the headline courses on the Sefton Coast. Weekday tee times are available most of the year without significant advance notice. The club is welcoming, the pro shop staff are helpful, and the clubhouse has the feel of a traditional golf club rather than a hotel reception.' },
      { type: 'p', text: 'Green fees run from £65 on a quiet winter weekday to around £100 at peak summer weekend. The green fee includes a meal: soup and sandwiches or similar clubhouse lunch: which is both genuine value and a custom that more clubs should maintain.' },
      { type: 'h2', text: 'The practical notes' },
      { type: 'ul', items: [
        'Green fees: £65–£100. Meal included: worth factoring into the value comparison.',
        'Handicap: no certificate required for most visitor rounds.',
        'Dress code: smart/casual. No denim, no collarless shirts on the course.',
        'Booking: advance booking recommended for weekends, same-week usually possible for weekdays.',
        'Location: Shore Road, Ainsdale, Southport. PR8 2LQ. Adjacent to Hillside GC and five minutes from the Birkdale area.',
      ] },
      { type: 'h2', text: 'The verdict' },
      { type: 'p', text: 'If you\'re making a first trip to the Sefton Coast and you want to understand what this stretch of coastline is about as a golf destination, S&A is the right starting point. Championship links golf at a price that doesn\'t require justification, on a course with genuine history, with a meal included and staff who are pleased to see you. And if you end up wanting more, Hillside and Birkdale are a mile up the road.' },
      { type: 'callout', text: 'Full visitor information for Southport & Ainsdale: green fees, tee time booking and what to expect: on the course page at SeftonLinks.' },
    ],
  },

  {
    slug: 'watching-the-open-2026-without-a-ticket',
    title: 'Watching The Open 2026 Without a Ticket',
    image: '/images/the-open-2026.jpg',
    excerpt: 'Championship round tickets for The Open 2026 are gone or eye-wateringly expensive on secondary markets. But you don\'t need a championship ticket to experience Open week at Royal Birkdale. Here\'s what\'s actually possible: and what isn\'t.',
    categorySlug: 'the-open-2026',
    date: '21 Feb 2026',
    readingTime: '5 min read',
    content: [
      { type: 'p', text: 'Let me be direct: if you don\'t have a championship round ticket for The Open 2026 and you\'re hoping to find one at face value, that window has probably closed. Championship day tickets are sold out through official channels and secondary market prices are significant. But Open week at Royal Birkdale is not entirely gated. There are legitimate ways to be part of it.' },
      { type: 'h2', text: 'Practice round tickets: the better spectator experience' },
      { type: 'p', text: 'Practice round tickets (Monday, Tuesday, Wednesday of Open week) are significantly cheaper and usually still available. They are, in many ways, a better spectator experience than a championship day.' },
      { type: 'p', text: 'On a practice day, you can stand within a few metres of the world\'s best players on the driving range. You can follow a group around the course without the crush of 50,000 championship-day spectators. Players are more relaxed: testing equipment, experimenting with shots, sometimes stopping to talk in a way they don\'t during competition. You\'ll see more golf more closely than on any championship day.' },
      { type: 'p', text: 'I attended a practice day at the 2017 Open at Birkdale. It was worth every penny. Stood within arm\'s reach of Jordan Spieth on the 18th green while he chipped from various angles testing his lines. Championship day crowds don\'t give you that.' },
      { type: 'h2', text: 'The Open fan zone: no ticket required' },
      { type: 'p', text: 'The R&A operates a public fan zone during Open week, located near the course entrance but outside the ticketed perimeter. This includes live tournament coverage on large screens, merchandise, food, and atmosphere. Entry to the fan zone does not require a ticket. On a championship day, if you\'re local or staying nearby, it\'s genuinely worth going to: you\'re part of Open week without paying championship day prices.' },
      { type: 'h2', text: 'Hillside Golf Club: the legal alternative' },
      { type: 'p', text: 'Hillside Golf Club sits immediately adjacent to Royal Birkdale. From several holes on the Hillside course, you can see the Birkdale dunes and hear the crowd during championship rounds. Playing golf at Hillside during Open week is the closest most people will legally get to the action without a ticket. Book a morning tee time, play your round, and you\'re on the same dune system as The Open Championship.' },
      { type: 'h2', text: 'What you actually can\'t do' },
      { type: 'p', text: 'I want to be clear about what isn\'t possible. Royal Birkdale is enclosed by high dunes and perimeter fencing during The Open. You cannot stand on the public road and see the course. You cannot enter the venue without a ticket on championship days. Any claims about public vantage points with views of play are largely mythological: the dunes that make Birkdale great also make it impossible to see from outside. Don\'t waste your afternoon driving around looking for a gap in the fence.' },
      { type: 'callout', text: 'Practice round tickets for The Open 2026 at Royal Birkdale are available at theopen.com. They\'re good value and they sell out: buy early.' },
    ],
  },

  {
    slug: 'staying-in-formby-for-the-open-2026',
    title: 'Staying in Formby for The Open 2026',
    image: '/images/sefton-coast.jpg',
    excerpt: 'Southport accommodation is effectively gone for Open week. The Birkdale area is gone. Ormskirk is filling up. The place most people haven\'t thought of yet is Formby: 20 minutes from the course, significantly quieter, and with its own good restaurants and beach. Here\'s the honest case for Formby as your base.',
    categorySlug: 'the-open-2026',
    date: '22 Feb 2026',
    readingTime: '5 min read',
    content: [
      { type: 'p', text: 'I\'ll tell you where I\'d stay for The Open 2026 if I wasn\'t already local. Not Southport: that\'s been booked solid since the tournament was confirmed. Not Birkdale itself: there are maybe 200 hotel rooms within walking distance of the course and every one of them was gone before the ink dried on the hosting announcement. Not Ormskirk: fine place, but you\'re adding a train connection. Formby.' },
      { type: 'h2', text: 'Why Formby works' },
      { type: 'p', text: 'Formby is about eight miles south of Royal Birkdale. By car on a normal day that\'s 20 minutes. During Open week with road closures, the sensible move is to drive to Formby station and take Merseyrail directly to Birkdale: one stop, four minutes. From Birkdale station to the course on foot is 12–15 minutes. The total journey is completely manageable and you skip the chaos of Southport town centre entirely.' },
      { type: 'p', text: 'Formby itself is a proper village: National Trust pinewoods, a genuinely good beach, decent restaurants, a Waitrose. It has the feel of somewhere people actually live rather than a resort that exists purely to service visitors. The accommodation options are a mix of B&Bs, holiday lets, and Airbnbs, and at this point there\'s still availability at prices that aren\'t completely unreasonable.' },
      { type: 'h2', text: 'The commute to the course' },
      { type: 'p', text: 'Merseyrail Northern Line: Formby station direct to Birkdale. No changes. Four minutes. A day ticket allows you to come and go freely: useful if you want to return to your accommodation between morning golf and afternoon spectating, or to avoid the end-of-play crowds at the course.' },
      { type: 'h2', text: 'Formby is worth visiting in its own right' },
      { type: 'p', text: 'If you\'re making a multi-day trip to The Open, Formby makes the non-golf days worthwhile. The National Trust red squirrel trail at Formby is one of the most accessible places to see red squirrels in England: there\'s a population of 1,000–1,500 in the pinewoods and a morning walk the day before the championship would be a genuinely good start to the trip. Formby Beach has wide sands and proper dunes and on a July morning it\'s a fine place to be.' },
      { type: 'callout', text: 'FormbyGuide.co.uk has the complete guide to Formby: restaurants, the beach, the red squirrel trail at the National Trust pinewoods, and where to eat after The Open.' },
      { type: 'h2', text: 'Practical notes' },
      { type: 'p', text: 'Airbnb in Formby is the best option at this stage. Search within a mile of Formby station for easy rail access to Birkdale. Check cancellation policies carefully: Open week accommodation is non-refundable in most cases. One more thing: the weather in July on the Sefton Coast is genuinely unpredictable. You might be watching golf in 24-degree sunshine. You might be watching it in a 20mph westerly and driving rain. Open week in Lancashire has seen both within the same afternoon. Pack accordingly.' },
    ],
  },

  {
    slug: 'hillside-golf-club-review',
    title: 'Hillside Golf Club: The Course Next to Birkdale',
    image: '/images/courses/hillside.jpg',
    excerpt: 'Hillside sits on the same dune system as Royal Birkdale. Same wind. Same type of golf. Visitor green fees are less than a third of the price and you can get a tee time this week. I\'ve played it twice. Here\'s the honest account.',
    categorySlug: 'course-reviews',
    date: '24 Feb 2026',
    readingTime: '8 min read',
    content: [
      { type: 'p', text: 'Let me tell you where Hillside Golf Club is: it is next to Royal Birkdale. Not nearby. Not in the same general area. Immediately next to it: the boundary fence between the two courses is visible from several holes on each side. They share the same dune system, the same prevailing wind, the same type of links terrain. One charges £320 for a visitor round. The other charges under £110.' },
      { type: 'h2', text: 'A course that nearly hosted The Open' },
      { type: 'p', text: 'Hillside has been on the Open Championship rota. The R&A inspected it seriously and the course has hosted European Tour events including the British Masters. It sits around 40th in England in most credible course rankings: comfortably in the top tier of British links golf. The reason it hasn\'t hosted The Open comes down to infrastructure capacity around the venue, not course quality. The course itself is more than good enough.' },
      { type: 'p', text: 'When I played Hillside for the first time, what struck me was the back nine. The front nine runs through a more sheltered part of the duneland: good golf, well-designed, but relatively contained by championship links standards. Then the back nine opens onto higher, more exposed dunes and the course becomes something else entirely. The 16th is a long par 4 across a ridge of dunes into a prevailing crosswind that I have never managed to play well. I\'ve tried twice.' },
      { type: 'h2', text: 'Getting on: visitor access' },
      { type: 'p', text: 'Visitor access at Hillside is meaningfully better than at Royal Birkdale. You still need to book in advance, but the process is simpler and same-week bookings are sometimes possible in off-peak periods. Weekday mornings are easiest. Weekends require more notice but are usually achievable. A handicap certificate is required.' },
      { type: 'p', text: 'Green fees run from around £75 on a midweek winter day to around £110 at peak summer weekends. For what you\'re playing, this represents exceptional value by any standard of serious links golf.' },
      { type: 'h2', text: 'How it compares to Royal Birkdale' },
      { type: 'p', text: 'Birkdale\'s conditioning is slightly better: it should be at twice the price. The greens at Birkdale in peak season are the fastest and most consistent I\'ve played on a links. Hillside\'s greens are excellent but not quite at that level. The overall design at Birkdale is marginally more satisfying: the hole routing through the dunes is a masterpiece of course architecture. But the gap is considerably smaller than the green fee difference suggests. For most golfers, Hillside is the more appropriate and more enjoyable round.' },
      { type: 'h2', text: 'Hillside during Open week' },
      { type: 'p', text: 'Hillside during Open week 2026 is a genuinely special situation. The course shares boundary fencing with Royal Birkdale. During championship rounds you\'ll finish a hole on Hillside and be able to hear the crowd at Birkdale. Some caddies warm up on the Hillside practice ground. If you\'re being strategic about Open week golf, there is no better combination than a Hillside morning round followed by an afternoon in the Birkdale fan zone or at a practice session.' },
      { type: 'h2', text: 'Summary' },
      { type: 'ul', items: [
        'Green fee: £75–£110. Royal Birkdale is £320.',
        'Visitor availability: significantly easier to book than Birkdale.',
        'Course quality: top-40 in England. Legitimately in the same conversation as Birkdale.',
        'Conditioning: excellent, marginally behind Birkdale in peak season.',
        'Open week atmosphere: as close to The Open as you\'ll get while actually playing golf.',
      ] },
      { type: 'callout', text: 'Full visitor information for Hillside: green fees, tee time booking and what to expect: on the course page at SeftonLinks.' },
    ],
  },

  {
    slug: 'getting-to-royal-birkdale-for-the-open-2026',
    title: 'Getting to Royal Birkdale for The Open 2026',
    image: '/images/the-open-2026.jpg',
    excerpt: 'The roads around Birkdale during Open week are essentially unusable for normal traffic. I live three miles from the course and I won\'t be driving. Here is every transport option for The Open 2026, honestly explained.',
    categorySlug: 'the-open-2026',
    date: '25 Feb 2026',
    readingTime: '6 min read',
    content: [
      { type: 'p', text: 'I\'m going to start with the only piece of transport advice that actually matters: do not drive to Royal Birkdale during Open week. I live three miles from the course. I will not be driving. The road network around Birkdale simply cannot cope with 250,000 people attending a major championship, and the R&A and Sefton Council implement road closures that make it impractical anyway. Start planning around Merseyrail and work backwards from there.' },
      { type: 'h2', text: 'Merseyrail: the right answer for most people' },
      { type: 'p', text: 'Birkdale station is on the Merseyrail Northern Line (Southport branch). From Liverpool Central, the journey to Birkdale takes around 45–50 minutes with frequent direct trains. From the station it\'s approximately a 12–15 minute walk to the Royal Birkdale clubhouse: the route is signposted and stewarded during Open week.' },
      { type: 'ul', items: [
        'From Liverpool Central: Merseyrail Northern Line direct to Birkdale. 45–50 minutes.',
        'From Manchester: train to Liverpool Lime Street, cross to Liverpool Central, then Merseyrail to Birkdale. Allow 90 minutes minimum.',
        'From Southport: Birkdale is one stop on the same Northern Line. Three minutes by train.',
        'From London: Avanti West Coast to Liverpool Euston/Lime Street, then Merseyrail to Birkdale. Allow 3 hours from Euston.',
        'From Formby: one stop direct to Birkdale. Four minutes. The best Open base for this reason.',
      ] },
      { type: 'h2', text: 'Park and ride' },
      { type: 'p', text: 'The R&A operates official park-and-ride from multiple sites during Open week. Full details will be published on theopen.com closer to the event. Park-and-ride coaches connect the venue from car parks around Southport and surrounding areas. Pre-book as soon as park-and-ride details become available: they fill up.' },
      { type: 'h2', text: 'Staying locally and walking in' },
      { type: 'p', text: 'If your accommodation is in Birkdale village or within a mile of the course, you can walk each morning. This is the best Open week logistics setup. Birkdale village has decent restaurants and pubs within five minutes of the course, and walking to The Open Championship is an experience worth paying for in accommodation costs.' },
      { type: 'h2', text: 'If you\'re combining golf and spectating' },
      { type: 'p', text: 'The other Sefton Coast courses: Hillside, Southport & Ainsdale, Formby GC, West Lancashire: all have their own car parks and are reachable by car without Open week restrictions. Road closures are specific to the Birkdale/Waterloo Road area. Drive to your golf course normally on your golf days. Use Merseyrail for your Open spectating days. Don\'t try to drive between the two.' },
      { type: 'callout', text: 'Formby is the best accommodation base for combining golf and Open spectating: 4 minutes by train to Birkdale station, good Airbnb availability, and Hillside Golf Club nearby. FormbyGuide.co.uk has the full area guide.' },
      { type: 'h2', text: 'One final thing' },
      { type: 'p', text: 'Book your return journey before you go in. Birkdale station at the end of a championship day is crowded. If you\'re on a pre-booked train, that\'s fine. If you\'re on a park-and-ride coach, know your departure point before you walk through the entrance gate in the morning. After eight miles of walking a links course in the sun, you\'ll thank yourself for having sorted this out the night before.' },
    ],
  },

  // ── Mar 2026 posts ──────────────────────────────────────────────────────────

  {
    slug: 'formby-golf-club-review',
    title: 'Formby Golf Club: The Sefton Coast Course That Plays by Different Rules',
    image: '/images/courses/formby.jpg',
    excerpt: 'Formby Golf Club is not a pure links. It\'s a heathland-links mix, with maritime pines, silver birch and narrower fairways than anything else on the Sefton Coast. That difference is the whole point. I\'ve played it twice and it rewarded thinking over hitting.',
    categorySlug: 'course-reviews',
    date: '14 Mar 2026',
    readingTime: '7 min read',
    content: [
      { type: 'p', text: 'The Sefton Coast is known for its open, exposed, wind-battered links golf. Royal Birkdale, Hillside, West Lancashire: courses built on coastal duneland where the sea is visible and the wind arrives uninterrupted from the Irish Sea. Formby Golf Club is not that. It sits about a mile inland from Formby Beach, runs through pinewoods and silver birch, and on a calm day it feels like a completely different discipline of golf to its neighbours up the coast. That is not a weakness. It\'s the reason to go.' },
      { type: 'h2', text: 'What makes Formby different' },
      { type: 'p', text: 'The course mixes genuine links terrain: sandy subsoil, firm turf, elevated greens: with tree-lined corridors that compress landing zones and change wind behaviour entirely. You\'re still playing links golf in the sense that matters: the ground game is real, the greens are firm, and the turf runs fast. But the trees mean you can\'t always see the flag, the drives need to be placed rather than bombed, and the course rewards patience and course management in a way that open links courses don\'t.' },
      { type: 'p', text: 'The pines at Formby are a significant feature. Maritime pines border several fairways on the back nine and provide both a visual backdrop and a very practical wind block. On a day when the exposed courses are being battered by a westerly, Formby can be genuinely sheltered in sections: which can either help you or mess with your club selection, depending on how well you read it.' },
      { type: 'h2', text: 'The course data' },
      { type: 'ul', items: [
        'Par 72. 6,701 yards from the back tees.',
        'Green fees: approximately £75–£110 depending on season and day.',
        'Handicap certificate required.',
        'Visitor days: restricted on certain Saturdays and competition days: check the club website before booking.',
        'Location: Golf Road, Formby, L37 1LQ. Follow Golf Road from the village; sat-nav is unreliable on the final approach.',
      ]},
      { type: 'h2', text: 'The holes worth knowing about' },
      { type: 'p', text: 'The front nine runs through more open ground: longer carries, wider views, closer to the typical Sefton Coast links feel. It\'s a good introduction. Then the back nine tightens. The pines close in. The angles become more precise. The 13th is a long par 4 into a slightly elevated green guarded on both sides by tree encroachment: if you\'ve been riding a draw all day, you\'ll stop here.' },
      { type: 'p', text: 'The short holes are excellent across the board. The par 3 16th is the one I\'d pick out: a green set against a backdrop of mature pines with a slope that feeds the ball away to the left if you miss the right portion of the putting surface. I\'ve hit it straight and still three-putted. I didn\'t begrudge it.' },
      { type: 'h2', text: 'Visitor experience' },
      { type: 'p', text: 'The clubhouse at Formby is traditional and well-run. The pro shop staff are helpful and the facilities are what you\'d expect from a well-established private club that takes visitors seriously. Don\'t expect the same ease of access as Southport & Ainsdale: Formby is fussier about visitor days and will turn you away if you haven\'t checked ahead. But if you\'ve booked properly, the welcome is good.' },
      { type: 'h2', text: 'Who should play Formby' },
      { type: 'p', text: 'Golfers who have already played the more exposed Sefton Coast courses and want to understand the full range of what\'s available. Golfers who prefer target golf: placing a drive rather than trying to overpower a hole. Golfers who want high quality at a green fee that doesn\'t require apology. And golfers visiting during the Formby Ladies\': held here every year, one of the oldest women\'s amateur championships in England.' },
      { type: 'p', text: 'If you\'re only playing one Sefton Coast course and you want the full coastal links experience, Hillside or S&A is the right call. If you\'re playing three courses over a trip and you want variety, put Formby in your itinerary. It genuinely plays differently and you\'ll use different parts of your game.' },
      { type: 'callout', text: 'Full visitor information for Formby Golf Club: green fees, tee time booking, visitor policy: on the Formby course page at SeftonLinks.' },
    ],
  },

  {
    slug: 'southport-old-links-review',
    title: 'Southport Old Links: Proper Links Golf at a Price That Makes Sense',
    image: '/images/courses/southport-old-links.jpg',
    excerpt: 'Southport Old Links is the most accessible and affordable course on the Sefton Coast. Under £50, genuine links terrain, no handicap certificate required. It\'s not in anyone\'s top-50 list. It doesn\'t need to be.',
    categorySlug: 'course-reviews',
    date: '14 Mar 2026',
    readingTime: '5 min read',
    content: [
      { type: 'p', text: 'Every golf destination on this level has a version of the same course: the affordable one, the accessible one, the one where you can just turn up and play without a handicap certificate and a three-month booking window. On the Sefton Coast, that course is Southport Old Links. It is not a championship venue. It has not hosted the Ryder Cup. It does not feature in the top-100 course rankings that people use to justify large green fees. What it is, is proper links golf at a price that doesn\'t need justifying.' },
      { type: 'h2', text: 'The basics' },
      { type: 'ul', items: [
        'Par 71. Approximately 6,100 yards from the back tees: shorter than the championship courses.',
        'Green fees: under £50 on most days. One of the best-value rounds in the northwest.',
        'No handicap certificate required for most visitor rounds.',
        'Visitor access: excellent. Weekday walk-ins possible. Weekends require some advance notice but nothing like the championship courses.',
        'Location: Moss Lane, Southport, PR9 7QS.',
      ]},
      { type: 'h2', text: 'What the golf is actually like' },
      { type: 'p', text: 'Southport Old Links sits on genuine links terrain: sandy subsoil, firm turf, undulating ground with the kind of natural movement that designed courses try to replicate. The views across to the Irish Sea are real on the higher holes. The wind is as much of a factor here as anywhere else on the coast. When it blows from the west, the exposed holes on the back nine are a proper test for any handicap.' },
      { type: 'p', text: 'The course is shorter than its neighbours and the conditioning is a level below the championship clubs. That\'s the accurate description. But "shorter and a level below" Royal Birkdale still means you\'re playing links golf on the Sefton Coast with a fair course that rewards decent shot-making and punishes casual play.' },
      { type: 'h2', text: 'The honest comparison' },
      { type: 'p', text: 'You\'re not choosing between Southport Old Links and Royal Birkdale. You\'re choosing between a £45 round of proper links golf and staying home. For that comparison, Old Links wins comfortably.' },
      { type: 'p', text: 'If you\'re building a Sefton Coast itinerary at any budget level, Old Links deserves a half-day. The green fee is low enough that you could play it twice in a day for less than a single round at West Lancashire. Many golfers visiting the coast for a week treat it as a practice round or a late-afternoon knockabout after a morning at one of the championship courses. That\'s a sensible use of it.' },
      { type: 'h2', text: 'The clubhouse and welcome' },
      { type: 'p', text: 'Traditional northern golf club. Not grand. Not trying to be. The bar does what it needs to do and the welcome is straightforward. The pro shop staff know the course well and will give you honest advice about conditions if you ask. The kind of club where you feel like a guest rather than a customer.' },
      { type: 'h2', text: 'Who should play here' },
      { type: 'p', text: 'Higher-handicap golfers who want links terrain without the willow scrub at Royal Birkdale or the uncompromising rough at West Lancashire. Budget-conscious golfers on a multi-day trip who want to stretch their itinerary further. Junior golfers getting their first experience of links conditions. Anyone who has an afternoon to fill and doesn\'t want to spend £100 filling it.' },
      { type: 'callout', text: 'Full visitor information for Southport Old Links on the course page at SeftonLinks: green fees, booking contacts and what to expect.' },
    ],
  },

  {
    slug: 'the-open-2026-day-by-day-guide',
    title: 'The Open 2026: What Happens Each Day and When to Be There',
    image: '/images/the-open-2026.jpg',
    excerpt: 'The Open Championship at Royal Birkdale runs 13–19 July 2026. Each day of the week is different: different access, different atmosphere, different crowds. Here\'s what happens on each day and how to make the most of your time there.',
    categorySlug: 'the-open-2026',
    date: '15 Mar 2026',
    readingTime: '6 min read',
    content: [
      { type: 'p', text: 'The Open Championship at Royal Birkdale runs from 13–19 July 2026. Seven days. Very different days. The mistake most first-timers make is treating all of them as equivalent: they\'re not. A Monday practice round and a Sunday championship round are completely different events at the same venue. Here\'s what actually happens each day and how to choose when to go.' },
      { type: 'h2', text: 'Monday 13 July: Practice Day 1' },
      { type: 'p', text: 'The first practice day is the most relaxed atmosphere of the week. The crowds are genuinely light by Open standards. Players are on the course in dribs and drabs: some doing full practice rounds, some working specific holes, some on the driving range for hours. You can get close to players in a way that championship days simply don\'t allow. This is the day to be on the range early. Show up by 8am and you\'ll watch world-class players warm up from a few feet away.' },
      { type: 'h2', text: 'Tuesday 14 July: Practice Day 2' },
      { type: 'p', text: 'Practice Day 2 sees fuller practice rounds as players finalise their game plans. The 18th green area gets busier in the afternoon. Tuesday is often when player pairings and specific practice matches happen: occasionally you\'ll see two players you recognise competing informally. Still manageable crowds compared to championship days. Practice round tickets are typically £25–£40 and usually still available if you haven\'t bought them.' },
      { type: 'h2', text: 'Wednesday 15 July: Practice Day 3 and Pro-Am' },
      { type: 'p', text: 'The R&A runs a Pro-Am on Wednesday afternoon, pairing elite amateurs with tour professionals. The atmosphere is noticeably more relaxed: players are looser, the gallery is friendly, and there\'s a lot of incidental conversation on the course. The final practice round also means players are making last decisions about course management. Good day to follow one specific group for a full round.' },
      { type: 'h2', text: 'Thursday 17 July: First Round' },
      { type: 'p', text: 'Wait: the championship actually starts Thursday 16 July based on the official schedule. Early morning tee times in Round 1 give you the quietest experience of a championship day. The front 9 in the first few hours is almost calm by later-in-week standards. If you\'re attending a championship round for the first time, Thursday morning is the most manageable version of it. Get to the 1st tee area between 7–8am and follow the early starters: you\'ll be close to the players and moving freely around the course.' },
      { type: 'h2', text: 'Friday: Second Round and the cut' },
      { type: 'p', text: 'Friday is where The Open starts to sharpen. The cut looms. Players who are inside the cut line are competing harder; players outside it are struggling visibly. Crowds build through the afternoon as the cut line becomes clearer. The 18th green on Friday afternoon: watching players react to knowing whether they\'ve made the weekend: is one of the more interesting spectator spots of the week.' },
      { type: 'h2', text: 'Saturday: Moving Day' },
      { type: 'p', text: 'The biggest crowds of the week arrive on Saturday. Players in contention are making their moves. The leaderboard is forming. You\'ll wait longer for food, longer at train stations, longer at most choke points around the course. Book your travel in and out in advance. The 14th through 18th on Saturday afternoon, when the leaders come through, is where Open Championships are decided in terms of narrative. Position yourself there early.' },
      { type: 'h2', text: 'Sunday: Final Round' },
      { type: 'p', text: 'The 18th green on Sunday afternoon is the reason people travel from the other side of the world to attend The Open. If you have a Sunday ticket and a position anywhere near that green, you\'re watching one of the great sporting events at one of its great moments. Don\'t spend Sunday tracking the leaderboard on your phone. Watch the golf.' },
      { type: 'callout', text: 'Practice round tickets and any remaining championship day tickets are available at theopen.com. Practice rounds are significantly better value and still usually available closer to the event.' },
    ],
  },

  {
    slug: 'how-to-book-tee-times-sefton-coast',
    title: 'How to Book a Tee Time on the Sefton Coast: What Actually Works',
    image: '/images/sefton-coast.jpg',
    excerpt: 'Six courses. Six different booking processes. Some you can call on a Tuesday for the same week. Others need three months and a handicap certificate. Here\'s the honest guide to getting on each of the Sefton Coast courses.',
    categorySlug: 'links-golf-tips',
    date: '15 Mar 2026',
    readingTime: '5 min read',
    content: [
      { type: 'p', text: 'I get asked about this more than almost anything else on SeftonLinks: how do you actually book a tee time on the Sefton Coast? The generic answer: "contact the club directly": is accurate but not helpful. Each club has its own visitor policy, its own advance notice requirements, and its own approach to how welcome visitors actually are. Here\'s the specific reality for each course.' },
      { type: 'h2', text: 'Royal Birkdale: plan months ahead' },
      { type: 'p', text: 'The most restricted visitor access on the coast. You will need a handicap certificate. You will need to book well in advance: three months is a sensible minimum for popular dates, more if you have a specific date in mind. Visitors are not accepted on competition days or certain weekends. The green fee is £320. Contact the club by email through their official website; don\'t expect a fast response. This is not a course you can decide to play on a whim and then find a slot for.' },
      { type: 'callout', text: 'Royal Birkdale closes to all visitor play approximately 6–8 weeks before The Open 2026 (13 July). If you want to play it, book well before May 2026.' },
      { type: 'h2', text: 'Hillside: easier than Birkdale, still advance booking' },
      { type: 'p', text: 'Hillside is meaningfully more accessible than Royal Birkdale. Weekday tee times can sometimes be had with a week or two\'s notice in quieter months. Weekends need more advance planning. Handicap certificate is required. Green fees £75–£110. The club\'s website has a visitor enquiry form: use it with specific dates rather than open-ended requests. Mentioning you\'re building a multi-day itinerary on the Sefton Coast tends to get a warmer response.' },
      { type: 'h2', text: 'Southport & Ainsdale: the easiest of the championship courses' },
      { type: 'p', text: 'The best visitor access of the big four. Same-week bookings are regularly possible on weekdays outside peak season. Call the pro shop directly: they\'re helpful and will tell you honestly what\'s available. No handicap certificate required for most visitor rounds. Green fee £65–£100 including a meal. If you\'re arriving in the area without a fixed plan and want to play a championship course, call S&A first.' },
      { type: 'h2', text: 'Formby Golf Club: check for visitor days first' },
      { type: 'p', text: 'Formby has more restricted visitor days than some of its neighbours: certain Saturdays and competition days are closed entirely. Before you book anything, check the visitor calendar on their website. On open visitor days, advance booking of at least a week is sensible. Handicap certificate required. Green fee £75–£110. The pro shop handles visitor bookings; email tends to work faster than phone here.' },
      { type: 'h2', text: 'West Lancashire: weekdays are fine, weekends need notice' },
      { type: 'p', text: 'West Lancashire is welcoming to visitors on weekdays with reasonable advance notice: a week to ten days is usually enough. Weekends are harder and require more lead time. Handicap certificate: expected rather than always enforced: bring one. Green fee £80–£130. Contact the secretary\'s office for visitor bookings; the website has direct contact details. Worth noting that West Lancs is the most exposed course on the coast: check the weather forecast before you commit.' },
      { type: 'h2', text: 'Southport Old Links: the easiest booking on the coast' },
      { type: 'p', text: 'Walk-in possible on quiet weekdays. No handicap certificate required. Under £50. Call the pro shop. That\'s the whole booking process. If every other course on the coast has let you down on availability, Southport Old Links will not.' },
      { type: 'h2', text: 'General advice' },
      { type: 'ul', items: [
        'Always call or email directly: no Sefton Coast championship course books through third-party tee time platforms.',
        'Specify your handicap in any enquiry. It demonstrates you\'re a serious visitor.',
        'Weekday morning is universally easier than weekend, especially in summer.',
        'During Open week (13–19 July), Royal Birkdale is closed and the other courses will be busier than usual: book earlier.',
        'If you\'re planning a multi-course trip, book all courses before you commit to travel. Visitor days occasionally clash.',
      ]},
    ],
  },

  {
    slug: 'sefton-coast-golf-trip-from-manchester',
    title: 'A Golf Trip to the Sefton Coast from Manchester: Planning It Properly',
    image: '/images/sefton-coast-morning.jpg',
    excerpt: 'Manchester to the Sefton Coast is about an hour. That\'s close enough for a day trip and very manageable for a two or three-day break. Here\'s how to plan it so you\'re not wasting time driving the wrong roads or paying the wrong green fees.',
    categorySlug: 'golf-travel',
    date: '16 Mar 2026',
    readingTime: '6 min read',
    content: [
      { type: 'p', text: 'The Sefton Coast gets a lot of visitors from Manchester and the surrounding area. With good reason: you have five championship links courses and one excellent lower-tier links within about an hour of the city centre, and the full Royal Birkdale Open Championship experience in July 2026. Here\'s how to plan the trip without making the mistakes most people make on their first run.' },
      { type: 'h2', text: 'Getting there' },
      { type: 'p', text: 'By train: Manchester Victoria direct to Southport, Northern Rail. Journey time approximately 55 minutes to 1 hour 10, depending on service. Southport station is about 15 minutes by taxi from the main courses in Birkdale and Ainsdale. For Hillside, Royal Birkdale and S&A, the Birkdale station stop (one stop south of Southport) is closer: change at Southport and take Merseyrail one stop.' },
      { type: 'p', text: 'By car: M60 to M61 to M58 into Skelmersdale, then A570 into Southport. Allow an hour from Manchester city centre on a normal weekday morning, closer to 90 minutes on a Friday afternoon or summer weekend. There\'s no clever alternative: the roads around Southport are what they are. If you\'re playing multiple courses over multiple days, a car makes sense. For a one-course day trip, the train is more relaxing and removes the problem of finding parking near whichever course you\'re at.' },
      { type: 'h2', text: 'The one-day version' },
      { type: 'p', text: 'A single day from Manchester is realistic. Leave Manchester Victoria on the 7am train, arrive Southport around 8am, taxi to Southport & Ainsdale for a 9am tee time. Eighteen holes takes about 4 hours with a reasonable pace of play. Lunch in the clubhouse (included in the S&A green fee). Train back from Southport, home by 5pm. That\'s a full day of championship links golf for around £80–£100 all in including travel: better value than most of the golf on offer within an hour of Manchester.' },
      { type: 'h2', text: 'The two-day itinerary' },
      { type: 'p', text: 'Two days opens up the best combination: Day 1 at Southport & Ainsdale (morning) and Southport Old Links (afternoon if you have the legs for it). Day 2 at Hillside. That\'s three rounds of links golf covering the full range from affordable-and-accessible to one of the best courses in England.' },
      { type: 'p', text: 'Stay in Birkdale village if you can: it\'s five minutes from both Hillside and S&A, has decent restaurants and pubs, and during Open week in July it\'s the base that makes everything simple. The Bold Hotel on Lord Street in Southport is the town\'s best option if you want a proper hotel. For self-catering, Airbnb in the Birkdale area is reliable.' },
      { type: 'h2', text: 'The three-day version: adding Royal Birkdale' },
      { type: 'p', text: 'A three-day trip justifies booking Royal Birkdale. The logic: you play two days on the other courses first, get your links legs under you, understand what conditions are like, and then go to Birkdale on Day 3 when you\'re not a complete passenger. A 24-handicapper playing Birkdale cold off an inland parkland background is not going to enjoy it the way someone who\'s spent two days on genuine links turf will. Book S&A, Hillside, Birkdale in that order.' },
      { type: 'h2', text: 'Coming for The Open 2026' },
      { type: 'p', text: 'Manchester is the natural base for a lot of Open week visitors: train to Liverpool, cross to Liverpool Central, then Merseyrail to Birkdale in about 80 minutes door-to-door from Manchester. Alternatively, stay in the Southport/Formby area for the week and use Merseyrail daily. Formby is the better accommodation option at this stage: Southport is largely booked for Open week. From Formby station to Birkdale is four minutes on the train.' },
      { type: 'callout', text: 'The SeftonLinks itineraries page has pre-built two-day, three-day and five-day Sefton Coast golf break plans: with course combinations, timing notes and accommodation guidance.' },
    ],
  },

  {
    slug: 'can-i-play-royal-birkdale-during-open-week',
    title: 'Can I Play Royal Birkdale During The Open 2026?',
    image: '/images/courses/royal-birkdale.jpg',
    excerpt: 'Royal Birkdale closes to visitors well before The Open Championship starts. But the rest of the Sefton Coast golf corridor doesn\'t. If you\'re planning a golf trip around the 2026 Open, here\'s what you can actually play: and when.',
    categorySlug: 'the-open-2026',
    date: '26 Feb 2026',
    readingTime: '5 min read',
    content: [
      { type: 'p', text: 'The most common question I get asked about The Open 2026, once someone finds out Royal Birkdale is hosting it, is: "Can I book a tee time while I\'m there?" The answer is no: and the sooner you know that, the better your trip planning will be.' },
      { type: 'h2', text: 'Royal Birkdale closes to visitors before The Open starts' },
      { type: 'p', text: 'Royal Birkdale stops taking visitor tee times in the months leading up to a hosting Open Championship. Course preparation: overseeding, bunker reconstruction, rough growing, infrastructure installation for the tournament: begins long before the week itself. Based on previous Opens, visitor access typically ends around 6–8 weeks before the championship starts.' },
      { type: 'p', text: 'With The Open beginning on 13 July 2026, you should assume no visitor play from roughly late May onwards. If you want to play Royal Birkdale, book before May 2026. Green fees are £320. A handicap certificate is required and you\'ll need to book well in advance under any circumstances.' },
      { type: 'callout', text: 'Royal Birkdale visitor enquiries and tee time booking: royalbirkdale.com. Current green fee: £320. Handicap certificate required.' },
      { type: 'h2', text: 'What you can actually play during Open week' },
      { type: 'p', text: 'The other five championship courses on the Sefton Coast remain open during Open week. That\'s remarkable: within ten miles of The Open Championship, you can play five other courses that have collectively hosted the Ryder Cup, the Amateur Championship, and multiple European Tour events. Most visitors to The Open don\'t realise this.' },
      { type: 'ul', items: [
        'Hillside Golf Club: sits immediately adjacent to Royal Birkdale. Same dune system, same wind. From certain holes you can hear the Open crowd. The obvious first choice for golfers during Open week. £75–£110.',
        'Southport & Ainsdale: Ryder Cup host (1933 and 1937). Top-50 course in England. Green fee includes a meal. £65–£100.',
        'Formby Golf Club: a heathland-links mix with a different character. 20 minutes from the Open venue. £75–£110.',
        'West Lancashire Golf Club: the most exposed course on the coast. Raw links golf at its most honest. £80–£130.',
        'Southport Old Links: less well known but genuine links terrain. The most accessible and affordable option. Under £50.',
      ] },
      { type: 'h2', text: 'The Hillside factor' },
      { type: 'p', text: 'Hillside during Open week is genuinely special. The course shares boundary fencing with Royal Birkdale. During championship rounds, you\'ll finish a Hillside hole and hear the crowd reaction at Birkdale from the fairway. If you\'re strategic about Open week golf, there\'s no better plan than a Hillside morning tee time followed by an afternoon at The Open as a spectator.' },
      { type: 'h2', text: 'Planning the full trip' },
      { type: 'p', text: 'The itinerary that works for most serious golfers: two or three days playing Sefton Coast courses, one or two days at The Open as a spectator. The courses are good enough that you don\'t want to miss them for spectating every day: and the atmosphere at The Open is something that watching on television genuinely cannot replicate.' },
      { type: 'callout', text: 'The SeftonLinks itineraries page has curated multi-day golf break plans: including Open week options with course combinations, timing and accommodation guidance.' },
    ],
  },

  {
    slug: 'hillside-golf-club-review',
    title: 'Hillside Golf Club: The Course They Put Next to Royal Birkdale for a Reason',
    image: '/images/blog-hillside-golf-review.jpg',
    excerpt: 'Hillside sits immediately next to Royal Birkdale and gets treated as the supporting act. It isn\'t. It\'s a world-class links course in its own right: with better visitor access, lower green fees, and terrain that rivals anything on the coast. Here\'s the honest review.',
    categorySlug: 'course-reviews',
    date: '17 Mar 2026',
    readingTime: '8 min read',
    content: [
      { type: 'p', text: 'There is a version of the Hillside Golf Club story that goes like this: "It\'s the one next to Royal Birkdale." That framing is understandable: the two clubs share a boundary fence, Birkdale is the Open Championship venue, and Hillside will always live in that shadow in the minds of people who haven\'t played it. People who have played it tend to tell the story differently.' },
      { type: 'p', text: 'I played Hillside for the first time in November. I\'d been twice before as a spectator, walking the boundary during practice rounds at the 2017 Open. Walking it and playing it are different experiences entirely. By the back nine, I\'d stopped thinking about Birkdale at all.' },
      { type: 'h2', text: 'What Hillside actually is' },
      { type: 'p', text: 'Hillside Golf Club was founded in 1911. The current course was redesigned by Fred Hawtree in 1967 and extended again in the 1970s, taking it to its current form of 6,850 yards from the championship tees. It has hosted the PGA Championship multiple times, the British Masters, and numerous tour events. It is ranked in the top 30 courses in England by most credible rankings.' },
      { type: 'p', text: 'The course runs through one of the most dramatic sections of the Sefton Coast dune system. The back nine, in particular, sits in a landscape of high, angular dunes that feel completely different from the valleys and ridges of Birkdale next door. The 12th hole: a par 4 through a narrow dune corridor: is one of the finest examples of strategic links design on the entire coast.' },
      { type: 'h2', text: 'The terrain' },
      { type: 'p', text: 'What separates Hillside from most courses on the coast is the drama of the setting. The front nine is more traditional links: open fairways, gorse-lined rough, greens that reward bump-and-run approaches. By the 10th, the terrain opens into the elevated back nine and the views across the dune system become extraordinary. On a clear day, you can see the Blackpool Tower and the Lake District fells from the higher tees.' },
      { type: 'p', text: 'The elevated holes are also the most exposed. The 14th tee sits on one of the highest points of the course, and into a westerly wind it is a completely different shot from the same hole downwind. Plan accordingly.' },
      { type: 'h2', text: 'Playing it off a mid-handicap' },
      { type: 'p', text: 'I play off 24. On a calm day at Hillside, I\'d probably manage something close to my handicap. On the November day I played: 20mph southwest wind, firm greens, rough that was doing its job: I did not manage something close to my handicap. That is not a criticism. That is the contract.' },
      { type: 'p', text: 'The key strategic requirement at Hillside is accurate driving. The rough is genuine rough: not rough that tolerates a mistake and gives you a reasonable exit. If you miss fairways consistently at Hillside, the course will punish you in a way that accumulates quickly. I play a mid-handicap and I was humbled. The experience was worth every stroke.' },
      { type: 'h2', text: 'Practical notes' },
      { type: 'ul', items: [
        'Green fees: £130–£165 depending on season and day. More expensive than S&A, significantly less than Birkdale.',
        'Visitor access: good for weekdays, restricted weekends. Book at least two to three weeks in advance for a Saturday.',
        'Handicap certificate: required. The club takes this seriously.',
        'Dress code: smart/casual. No collarless shirts, no denim. Check the club website: they enforce it.',
        'Location: Hastings Road, Hillside, Southport. PR8 2LU. Adjacent to Royal Birkdale.',
        'Practice facilities: excellent. Full driving range, putting green, chipping area. Worth arriving 30 minutes early.',
      ] },
      { type: 'h2', text: 'Compared to Birkdale' },
      { type: 'p', text: 'People ask me this question. Here is the honest answer: Royal Birkdale is the better golf course. It is also £155 more expensive, significantly harder to book, and more formal in its visitor experience. Hillside is an exceptional course at a price point where the value is easy to justify. If you\'re making a Sefton Coast golf trip and budget is a consideration, Hillside is a straightforward decision. If budget isn\'t a factor and you want the best, play both.' },
      { type: 'callout', text: 'Full course data for Hillside: yardages, par, slope rating and visitor booking information: on the Hillside course page at SeftonLinks.' },
    ],
  },

  {
    slug: 'reading-links-greens',
    title: 'Reading Links Greens: Why Everything You Know About Putting Doesn\'t Apply',
    image: '/images/blog-reading-links-greens.jpg',
    excerpt: 'Links greens are fast, firm, sloped in ways that aren\'t always visible from the fairway, and affected by wind in ways that inland greens aren\'t. Most golfers arriving from parkland courses take at least a full round to adjust. Here\'s how to shorten that learning curve.',
    categorySlug: 'links-golf-tips',
    date: '18 Mar 2026',
    readingTime: '6 min read',
    content: [
      { type: 'p', text: 'The first time I played Royal Birkdale, I three-putted six greens. I had been playing golf for twenty years. I understood putting. What I did not understand: not until I started spending real time on links courses: was that links greens are a different problem. Here is what I\'ve learned.' },
      { type: 'h2', text: 'Speed' },
      { type: 'p', text: 'Links greens run fast. In summer conditions on a well-prepared course, you\'re looking at Stimpmeter readings of 10–12 feet. More relevant than the number is the feel: a putt that looks like a four-footer hits the putter face and keeps going. The first day on a links course, every golfer hits their putts too hard. Every single one. It\'s not a skill deficiency: it\'s a calibration problem. The only solution is to get on the practice green for 15 minutes before your round and commit to hitting putts softer than feels natural.' },
      { type: 'p', text: 'The other consequence of fast greens is that three-foot putts become seriously threatening. A three-footer on a sloped links green going downhill is not the formality it is on an inland course. Treat every putt under five feet with respect until you\'ve earned the right to relax.' },
      { type: 'h2', text: 'Firmness and bounce' },
      { type: 'p', text: 'Links greens are firm. Not hard: a well-maintained links green is firm and true. But the firmness means that the ball doesn\'t bite and stop the way it does on a soft inland green. A high approach shot with backspin that would check and hold on a parkland green will pitch, bounce twice, and run off the back of a links green in summer conditions.' },
      { type: 'p', text: 'The adaptation: land the ball on the green with less spin and let it run to the hole, or use the back fringe as a backboard and land just past the flag. Both approaches require accepting a mental shift from "I\'m going to spin this back" to "I\'m going to land this and let it release." Bump-and-run approaches from the fringe of the green are often the smarter play entirely.' },
      { type: 'h2', text: 'Wind on the green' },
      { type: 'p', text: 'This is the one that surprises golfers most. On a 25mph day, wind affects putts on exposed links greens. Not subtly: meaningfully. A crosswind of 25mph will push a rolling ball offline by several inches on a 20-foot putt. The higher the ball is rolling (early in the roll), the more it\'s affected.' },
      { type: 'p', text: 'The practical response: aim slightly into a crosswind on longer putts. Not enough that you\'re thinking about it mechanically, but enough that you\'ve accounted for it. Also: crouch lower on exposed greens in strong wind. Standing upright in 30mph gusts and trying to make a smooth stroke is difficult. Get down, get stable.' },
      { type: 'h2', text: 'Reading the slopes' },
      { type: 'p', text: 'Links greens have more subtle, complex slope than most inland greens. The undulations follow the natural topography of the duneland rather than being engineered in. This means the slope you can see from behind the ball is often not the whole story: there are secondary slopes that only reveal themselves when you walk the line from both sides.' },
      { type: 'ul', items: [
        'Always read from both sides, not just from behind the ball. The view from behind the hole often shows the slope more clearly.',
        'Read the last six feet. The ball slows as it approaches the hole and the final movement is determined by what\'s immediately around the hole. A putt that breaks right for most of its length can break back left at the end if the ground tilts that way.',
        'Watch your playing partners\' putts carefully: not to slow down play, but because every putt on the same green from a different position gives you useful information.',
        'Look at the grain if conditions are dry. Links greens in summer can develop grain: the grass growing slightly in the direction of prevailing wind or drainage. This affects the roll direction of short putts especially.',
      ] },
      { type: 'h2', text: 'The adjustment period' },
      { type: 'p', text: 'Accept that you will not putt well on your first links round. This is not a character flaw. The adjustment takes time and the only way to accelerate it is deliberate practice: more time on the practice green, more attention to your playing partners\' putts, and a willingness to go through the discomfort of recalibrating something that felt automatic.' },
      { type: 'p', text: 'By my third round at Hillside, I was three-putting about once per round. That\'s still more than I\'d like, but it\'s manageable. The reading skills transferred. The speed calibration became instinctive. It just took repetition.' },
      { type: 'callout', text: 'For all six Sefton Coast courses: green speeds, course management notes and what to expect from each layout: see the course guides on SeftonLinks.' },
    ],
  },

  {
    slug: 'open-2026-practice-rounds-guide',
    title: 'The Open 2026 Practice Rounds: Why They\'re Better Than the Championship Days',
    image: '/images/blog-open-2026-practice-rounds.jpg',
    excerpt: 'If you have practice round tickets for The Open 2026 and you\'re treating them as the consolation prize for missing out on championship days, reconsider. Practice days at Birkdale are a different experience: and in some ways a better one. Here\'s the inside guide.',
    categorySlug: 'the-open-2026',
    date: '19 Mar 2026',
    readingTime: '7 min read',
    content: [
      { type: 'p', text: 'I attended the 2017 Open at Royal Birkdale as both a practice day visitor (Tuesday) and a championship day spectator (Friday). I have walked this course in both contexts. The honest assessment: if I had to choose one, I would choose the practice day. I am aware this is not a popular opinion. I will defend it.' },
      { type: 'h2', text: 'What actually happens on practice days' },
      { type: 'p', text: 'Practice rounds at The Open are not the diluted warm-up they might sound like. The world\'s best players use practice days to prepare seriously: testing conditions, walking specific hole locations, calibrating their distance to the carries over the Birkdale bunkers. The golf itself is purposeful. But the difference is the access.' },
      { type: 'p', text: 'On a practice day at Birkdale, you can stand on the edge of the driving range and watch the best players in the world hitting balls from 10 feet away. You can stand by the 18th green and watch Rory McIlroy chipping from different angles while his caddie takes notes. You can follow a group for the full 18 holes without fighting through a crowd of 50,000 people or getting stuck behind a grandstand. The physical closeness is genuinely remarkable. Championship days don\'t give you that.' },
      { type: 'h2', text: 'The driving range: the best hour in golf' },
      { type: 'p', text: 'If you do nothing else on your practice day, spend an hour at the driving range. You will be close enough to hear the ball compress. The contrast in swing sounds between a 25-handicapper and a professional: even on a practice swing: is something you cannot understand until you\'ve stood next to it.' },
      { type: 'p', text: 'Arrive early. The range gets busy from 9am as groups begin their pre-round routines. Get there at 7:30–8am and you\'ll have the run of it for the first players warming up. By midday when groups have gone out, numbers thin again.' },
      { type: 'h2', text: 'Following a group' },
      { type: 'p', text: 'You can follow any group in a practice round. There is no gallery management system sorting spectators onto specific holes. If you want to walk with Scottie Scheffler for 18 holes, start at the 1st tee, follow at a reasonable distance, and you\'re there for the whole round.' },
      { type: 'p', text: 'My recommendation: pick a group of two or three players you\'re interested in and follow them from the first tee. You\'ll learn more about how links golf is played at elite level by watching the same player manage 18 holes than by bouncing between holes trying to catch famous names.' },
      { type: 'h2', text: 'Practical preparation' },
      { type: 'ul', items: [
        'Wear comfortable shoes. Practice days involve significant walking. Not training shoes: proper waterproof walking shoes. The turf is firm but British weather is unpredictable.',
        'Bring a light rucksack. Water, snacks, a lightweight waterproof. The food inside the venue is fine but queues are long.',
        'Arrive by car before 7am or use the official shuttle buses: parking fills from 7am onwards. Birkdale train station is 12–15 minutes on foot and avoids the parking issue entirely.',
        'Download the R&A Official app before you go. It has live hole-by-hole scoring, player tracker and course map. Useful on practice days to see who is where on the course.',
        'Camera with a decent zoom: you\'re allowed cameras on practice days. This is the day to use it.',
      ] },
      { type: 'h2', text: 'The atmosphere argument' },
      { type: 'p', text: 'Championship day crowds are electric. I\'m not pretending otherwise. When a player makes birdie on 18 in the final round and 20,000 people erupt, there is nothing like it in sport. But if you want to understand links golf, understand how the world\'s best players approach a championship course, and stand close enough to see how they think: the practice day is the classroom and the championship day is the concert.' },
      { type: 'p', text: 'Practice round tickets for The Open 2026 at Royal Birkdale are available at theopen.com. At the time of writing they\'re still available. They will sell out. Buy them before they do.' },
      { type: 'callout', text: 'For the full SeftonLinks Open 2026 guide: transport, accommodation, what to expect, and everything you need to plan your week: see The Open 2026 section.' },
    ],
  },

  // ── April 2026 posts ──────────────────────────────────────────────────────

  {
    slug: 'open-2026-accommodation-guide',
    title: 'The Open 2026 Accommodation Guide: Where to Stay and What\'s Still Available',
    image: '/images/blog-open-accommodation.jpg',
    excerpt: 'Championship week accommodation around Royal Birkdale is almost entirely gone. Here\'s the honest picture of what\'s left, where to look, and why Formby might be the best answer nobody\'s considering.',
    categorySlug: 'the-open-2026',
    date: '3 Apr 2026',
    readingTime: '7 min read',
    content: [
      { type: 'p', text: 'The Open Championship is at Royal Birkdale from 13 to 19 July 2026. I\'m writing this in early April. If you haven\'t booked accommodation yet, here\'s the honest situation: central Southport is essentially sold out for championship week at every normal price point. Birkdale village, the best location for walking to the course, has been gone since January. What\'s left requires looking harder and thinking differently.' },
      { type: 'h2', text: 'What\'s still available and where to look' },
      { type: 'p', text: 'Airbnb is the most productive search right now. The self-catering market took longer to book up than hotels. Search with the course postcode (PR8 2LU) as your centre and expand the radius gradually. Within five miles of the course, covering Birkdale, Southport town centre, and Ainsdale, there are still properties available if you move fast. The better ones go quickly once people realise this.' },
      { type: 'p', text: 'Booking.com and Hotels.com still show availability at some hotels in Southport town centre. These will involve a train ride to Birkdale station, around ten minutes. Not ideal but completely workable, and the town centre hotels have better availability than anything near the course.' },
      { type: 'h2', text: 'The Formby option: worth serious consideration' },
      { type: 'p', text: 'Formby is twenty minutes by Merseyrail from Birkdale station. The village has B&Bs, guest houses, and Airbnb properties that haven\'t fully booked yet, partly because people assume it\'s too far. It isn\'t. You\'re looking at a total journey time of around twenty-five minutes from a Formby property to the course entrance. For reference: a hotel on the far side of Southport town centre offers a similar journey time.' },
      { type: 'p', text: 'Formby also gives you the beach and pinewoods as a non-golf base, relevant if you\'re travelling with people who aren\'t interested in watching golf all day. The village has good restaurants and cafes. It\'s a genuine option, not a fallback.' },
      { type: 'h2', text: 'North of Southport: Ormskirk and Skelmersdale' },
      { type: 'p', text: 'Ormskirk is around twenty-five minutes by car from the course. Not on the Merseyrail, so you\'re driving. The town has hotel availability and is a reasonable option if you have a car and are comfortable with the drive (accounting for Open week traffic, which will be significant on championship days). Skelmersdale is further but similar logic.' },
      { type: 'p', text: 'If you go this route: do not drive directly to the course on championship days. Drive to a park-and-ride site or to a train station, then transfer. Driving all the way to Birkdale during Open week is a significant mistake you will regret by 8am.' },
      { type: 'h2', text: 'Practice days vs championship days on accommodation' },
      { type: 'p', text: 'Practice round days (Monday to Wednesday) have significantly easier transport and slightly more accommodation flexibility. Some properties have shorter minimum stays that coincide with practice days only. If you haven\'t been to The Open before, a two-night stay across practice days gives you an excellent experience at lower accommodation cost and less transport stress.' },
      { type: 'ul', items: [
        'Practice days (Mon–Wed): easier to get into, closer to players, cheaper tickets. Accommodation more available.',
        'Championship days (Thu–Sun): the main event. Higher pressure on everything. Book transport before you need it.',
        'Sunday (final round): the hardest day for everything. Worth it if you\'ve planned properly.',
      ]},
      { type: 'h2', text: 'What to check before booking' },
      { type: 'ul', items: [
        'Minimum stay requirements: many properties now require a full-week booking for Open week. Check the minimum.',
        'Cancellation policy: non-refundable rates will be common. Read before you pay.',
        'Transport access: wherever you book, map the route to the nearest Merseyrail station. That\'s your most important infrastructure.',
        'Parking: if you\'re driving to your accommodation, check there\'s parking. Don\'t assume.',
      ]},
      { type: 'callout', text: 'Full Open 2026 guide on SeftonLinks, tickets, course guide, what to bring, and spectator tips for first-timers.' },
    ],
  },

  {
    slug: 'hillside-golf-club-review',
    title: 'Hillside Golf Club Review: Royal Birkdale\'s Neighbour at a Third of the Price',
    image: '/images/blog-hillside-review.jpg',
    excerpt: 'Hillside sits in the same dune system as Royal Birkdale, shares the same dramatic terrain, and costs £75–£110 a round. It\'s the most underrated course on the Sefton Coast and I genuinely don\'t know why more visitors don\'t play it.',
    categorySlug: 'course-reviews',
    date: '3 Apr 2026',
    readingTime: '7 min read',
    content: [
      { type: 'p', text: 'Hillside Golf Club is the course that sits immediately south of Royal Birkdale, sharing the same dune system and the same coastal character, costing a third of the price. I\'ve played it four times. It\'s the round I recommend to golfers who ask me about the Sefton Coast before they\'ve played any of it.' },
      { type: 'h2', text: 'The course: what you\'re actually playing' },
      { type: 'p', text: 'Hillside was redesigned by Fred Hawtree in 1967 on the modern course layout, and what you get is a sequence of holes through high sand dunes that feels as dramatic as anything on the Sefton Coast. The elevated tees looking out over valleys of marram grass and yellow gorse, with the Irish Sea visible to the west. The holes themselves are a mixture of exposed coastal links and sheltered valley corridors.' },
      { type: 'p', text: 'The back nine at Hillside is where the course really earns its reputation. Holes 13 through 16 form one of the best sequences of holes on the coast, tight, exposed, demanding. The 17th is a long par 4 that plays fully into the prevailing westerly on most days. By the time you reach 18, you know you\'ve played a proper links course.' },
      { type: 'h2', text: 'How it compares to Royal Birkdale' },
      { type: 'p', text: 'The honest answer: they share the same dune system and similar terrain, but Birkdale is the better course. The design is more refined, the conditioning is impeccable, and the history adds something tangible. But, and this is the important point, Hillside is genuinely excellent rather than just Birkdale\'s inferior neighbour. It would be among the top five or six courses in any other part of England.' },
      { type: 'p', text: 'For a golfer visiting the Sefton Coast for the first time: play Hillside before Birkdale. Hillside is forgiving enough to let you enjoy it at a range of handicaps, and the experience prepares you for what Birkdale will demand. Play Birkdale as the culmination, not the introduction.' },
      { type: 'h2', text: 'Visitor access: the practical details' },
      { type: 'ul', items: [
        'Green fees: £75–£110. Lower rates midweek, higher at weekends.',
        'Visitor access: good. Weekdays strongly preferred. Weekend visitors welcome but book well ahead.',
        'Handicap certificate: required. Maximum handicap 24 for men, 36 for ladies.',
        'Dress code: smart/casual. No jeans, no trainers. Standard for the region.',
        'Booking: direct via the club, at least two to four weeks ahead for weekday visits, longer for weekends.',
        'Address: Hastings Road, Hillside, Southport PR8 2LU, immediately adjacent to Royal Birkdale.',
      ]},
      { type: 'h2', text: 'The round: what to expect' },
      { type: 'p', text: 'The front nine plays relatively straightforward by Sefton Coast standards. You\'ll be lulled into thinking this is manageable. The back nine corrects that impression. Wind becomes the primary factor on the exposed holes, and club selection becomes difficult in anything above 15mph.' },
      { type: 'p', text: 'My last round was played in a moderate southwesterly. I bogeyed the first eight holes, which for me, off 24, felt like good golf, then proceeded to double the 9th and make a mess of three of the first four back-nine holes before settling into something resembling a scorecard. The 16th redeemed everything: a par 3 across a valley of dunes where I hit a 6-iron to twelve feet and somehow held the putt. The walk off that green felt disproportionately satisfying. That\'s what Hillside does.' },
      { type: 'h2', text: 'Is it worth it?' },
      { type: 'p', text: 'Yes. Hillside is one of the best-value serious rounds of golf in England. The conditioning is excellent, visitor access is good, the course is genuinely great, and you leave having played links golf as it\'s meant to be played. It doesn\'t have Birkdale\'s history or price tag. That\'s not a weakness.' },
      { type: 'callout', text: 'Full course data for Hillside, green fees, course statistics, visitor policy and booking information, on the SeftonLinks Hillside course page.' },
    ],
  },

  {
    slug: 'formby-golf-club-review',
    title: 'Formby Golf Club Review: Heathland Meets Links on the Sefton Coast',
    image: '/images/blog-formby-golf-review.jpg',
    excerpt: 'Formby Golf Club is the outlier on the Sefton Coast: pines and heathland alongside links terrain, a very different character to Birkdale and Hillside. Worth playing if you want to understand the full range of what this stretch of coast offers.',
    categorySlug: 'course-reviews',
    date: '4 Apr 2026',
    readingTime: '6 min read',
    content: [
      { type: 'p', text: 'Every course on the Sefton Coast is links. Formby Golf Club is an exception, or rather, it\'s a hybrid. The course runs through mature pine woodland on a property that transitions from inland heathland to duneland as you move toward the coast. The result is a different feel from Birkdale, Hillside, or West Lancashire, and a round that some golfers enjoy more and some find less satisfying. Knowing which camp you\'re in helps.' },
      { type: 'h2', text: 'The course: what makes it different' },
      { type: 'p', text: 'Founded in 1884, Formby Golf Club is one of the oldest on the Sefton Coast. The course runs across varied terrain: some holes play through the pine woodland with trees as the defining hazard rather than dunes and rough, others open out into more traditional links country with gorse, sand, and coastal wind.' },
      { type: 'p', text: 'The woodland holes have a parkland quality: defined corridors, trees penalising missed fairways, more consistent ground conditions than the exposed coastal holes. Then the course opens up, the trees fall back, and you\'re in proper duneland again. It\'s an unusual combination and it works better than you might expect.' },
      { type: 'h2', text: 'The difficulty level: who this course suits' },
      { type: 'p', text: 'Formby is generally considered more forgiving than Hillside or West Lancashire for mid-to-high handicappers. The woodland sections play more predictably, a decent shot goes where you hit it rather than being redirected by a crosswind. The more open sections have the usual links challenges: firm ground, wind, gorse that swallows balls.' },
      { type: 'p', text: 'I\'d recommend Formby to golfers in the 15–24 handicap range who want to play a course with genuine history and character without immediately facing the full punishment of Royal Birkdale or West Lancashire. It\'s a proper challenge that rewards reasonable golf rather than requiring exceptional ball-striking to enjoy.' },
      { type: 'h2', text: 'The practical details' },
      { type: 'ul', items: [
        'Green fees: £75–£110. Check current rates directly with the club as they vary by season.',
        'Visitor access: limited. This is a members-focused club. Midweek is significantly easier than weekends.',
        'Handicap certificate: required. Men to 24, ladies to 36.',
        'Dress code: smart/casual as you\'d expect. The club takes dress standards seriously.',
        'Location: Golf Road, Formby, Liverpool L37 1LQ. About 10 miles south of Royal Birkdale.',
        'Booking: recommended well in advance, the club doesn\'t have the visitor infrastructure of Birkdale or S&A.',
      ]},
      { type: 'h2', text: 'The character of the place' },
      { type: 'p', text: 'Formby Golf Club has a quieter, more private feel than the higher-profile courses on the coast. The clubhouse is traditional and welcoming without the grand scale of Birkdale. The course is in excellent condition. The staff are helpful about visitor access. It\'s a club that likes golfers who are there to play golf rather than to tick a bucket-list item.' },
      { type: 'p', text: 'My round was played on a calm Tuesday morning in autumn, too calm for links golf, honestly, but revealing for a first visit. The pine holes surprised me. There\'s a sequence around the middle of the back nine that plays through mature woodland that feels completely unlike anything else on the Sefton Coast. Quiet, sheltered, the ground underfoot different. Then the course pushes you back out into the coastal terrain for the closing holes and you remember where you are.' },
      { type: 'h2', text: 'A note on Formby Ladies Golf Club' },
      { type: 'p', text: 'Formby Ladies Golf Club is a separate entity and one of the few clubs in England with a dedicated ladies-only championship course. Worth researching separately if you\'re planning a visit, green fees and visitor policy differ from Formby Golf Club.' },
      { type: 'callout', text: 'Full visitor information for Formby Golf Club, green fees, course data, and the Sefton Coast golf itineraries, on SeftonLinks.' },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return [...BLOG_POSTS]
    .filter((p) => p.categorySlug === categorySlug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getSortedBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

function toIso(dateStr: string): string {
  const MONTHS: Record<string, string> = {
    Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
    Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12',
  };
  const [day, mon, year] = dateStr.split(' ');
  return `${year}-${MONTHS[mon] ?? '01'}-${day.padStart(2, '0')}`;
}

export function getIsoDate(post: BlogPost): string {
  return toIso(post.date);
}
