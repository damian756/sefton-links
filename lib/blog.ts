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
  bio: "Damian lives in Churchtown, Southport — about three miles from the first tee at Royal Birkdale. He plays off 24 on a good day, has personally donated more golf balls to the willow scrub than he'd like to admit, and built SeftonLinks because he couldn't find a decent guide to the courses on his own doorstep. He founded Churchtown Media and runs the Sefton Coast Network. His golf is genuinely a work in progress.",
  url: 'https://www.churchtownmedia.co.uk/about',
  schemaId: 'https://www.churchtownmedia.co.uk/about#founder',
};

// ── Categories ────────────────────────────────────────────────────────────────

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: 'course-reviews',
    label: 'Course Reviews',
    description: 'First-hand accounts of playing the Sefton Coast links — honest, practical, and written from the fairway.',
  },
  {
    slug: 'links-golf-tips',
    label: 'Links Golf Tips',
    description: 'Practical advice for playing links golf — shot selection, course management, and surviving the wind.',
  },
  {
    slug: 'the-open-2026',
    label: 'The Open 2026',
    description: 'Everything you need to know about The Open Championship at Royal Birkdale, July 2026.',
  },
  {
    slug: 'golf-travel',
    label: 'Golf Travel',
    description: 'Planning a golf trip to the Sefton Coast — itineraries, value courses, and where to stay.',
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
    excerpt:
      'I live three miles from Royal Birkdale. I built a website about it. And until last October, I\'d never actually played it. Here\'s the honest account of what happens when a 24-handicapper takes on one of the world\'s greatest links courses.',
    categorySlug: 'course-reviews',
    date: '3 Feb 2026',
    readingTime: '8 min read',
    content: [
      { type: 'p', text: "I\'ll be upfront about something: I built SeftonLinks.com — a site dedicated to championship links golf on the Sefton Coast — before I\'d actually played Royal Birkdale. I know. I know. In my defence, I\'d walked the course as a spectator during the 2017 Open, I\'d researched it obsessively, and I genuinely believed I understood what the course was like. I did not understand what the course was like." },
      { type: 'h2', text: 'Getting on the course' },
      { type: 'p', text: 'Booking a visitor tee time at Royal Birkdale is not simple. There\'s no casual phone call on a Wednesday morning. You need a handicap certificate, you need to book well in advance, and you need to accept that the green fee — £320 when I went — is not for the faint-hearted. I booked three months ahead. Got a Tuesday morning slot, which is about as good as it gets for visitors.' },
      { type: 'p', text: 'I drove there from Churchtown, which took about eight minutes. I\'ve driven past the gates hundreds of times. Walking through them as a player feels genuinely different. The clubhouse is exactly what you\'d expect — old, oak-panelled, photographs of Open champions on every wall. There\'s a framed photograph of Arnold Palmer\'s famous 1961 recovery shot from a gorse bush on the 15th. They\'re very proud of that photograph.' },
      { type: 'callout', text: 'Practical note: the dress code is strict. Smart/casual only. No denim, no trainers, no collarless shirts. Check the club website before you go. They will turn you away.' },
      { type: 'h2', text: 'The first few holes' },
      { type: 'p', text: 'The opening holes at Birkdale run through the valleys between the dunes rather than over the tops of them — this is what makes it unusual compared to most links courses. The fairways look generous from the tee. They are not as generous as they look. The wind was relatively calm by Southport standards (maybe 15mph), and by the 3rd hole I\'d already found willow scrub twice.' },
      { type: 'p', text: 'Willow scrub is a genuine hazard. At other links courses, rough is rough — you can usually find your ball and hack it back to the fairway. At Birkdale, the willow scrub is a dense, chest-high mass of vegetation that simply swallows golf balls. I lost four balls in willow scrub. Four. My playing partner, a regular Birkdale member, didn\'t find this surprising.' },
      { type: 'h2', text: 'By the back nine' },
      { type: 'p', text: 'I was playing for fun at this point, not score. The back nine at Birkdale is where the course really opens up — the dunes are more dramatic, the holes more exposed to the elements, and the views across to the Irish Sea are genuinely beautiful on a clear day. The 18th green, sitting below the clubhouse, is one of the finest finishing holes in championship golf.' },
      { type: 'p', text: 'My final score was not something I\'m going to publish. Let\'s say I played to my handicap on about six holes. On the other twelve, I did not play to my handicap.' },
      { type: 'h2', text: 'Was it worth £320?' },
      { type: 'p', text: 'Yes. Without hesitation. Royal Birkdale is genuinely one of the great golf courses. The condition was impeccable — fairways firm and fast, greens smooth and quick, rough well-maintained. The course management is outstanding. For a golfer who cares about playing courses that matter, this is one of the best you\'ll ever play.' },
      { type: 'p', text: 'Is it the right course for a 24-handicapper who wants a good score? Probably not. You\'ll enjoy it more if you go in expecting to be humbled and come home with stories rather than a card. Which is exactly what happened to me.' },
      { type: 'callout', text: 'For the full course guide — green fees, tee time policy, course data and what to expect — see the Royal Birkdale course guide on SeftonLinks.' },
    ],
  },
  {
    slug: 'links-golf-for-beginners',
    title: 'Links Golf for Beginners — What Nobody Tells You Before Your First Round',
    excerpt:
      'Playing links golf for the first time? The wind, the bouncing ball, the gorse, the blind shots — none of it works like inland golf. Here\'s what to expect and how to actually enjoy it.',
    categorySlug: 'links-golf-tips',
    date: '10 Feb 2026',
    readingTime: '6 min read',
    content: [
      { type: 'p', text: 'If you\'ve only ever played parkland golf, your first links round will feel like playing a different sport. The same clubs, the same ball, the same basic rules — but almost everything else is different. Here\'s the honest guide to what you\'re walking into.' },
      { type: 'h2', text: 'The wind is not optional' },
      { type: 'p', text: 'Links courses are built on coastal land specifically because there is almost always wind. On the Sefton Coast, a calm day is 10mph. A normal day is 20mph. On an exposed day, you\'ll be hitting into 35mph gusts. Every shot selection changes.' },
      { type: 'p', text: 'The first thing to unlearn is using loft to manage distance. Into the wind on a links, a high lofted shot balloons, stalls and falls well short. The experienced links golfer punches low and runs the ball. That 7-iron you\'d hit 155 yards in normal conditions? It\'s a 120-yard club today. Learn to take more club and swing easier.' },
      { type: 'h2', text: 'The ground game is real' },
      { type: 'p', text: 'Links turf is firm and fast. Shots that would pitch and stop on a parkland green will run 20-30 yards past the hole on a links. Bump and run approaches — landing short of the green and running onto the putting surface — work far better than high, soft approaches.' },
      { type: 'p', text: 'The fairways are the same. Don\'t be surprised when your drive rolls an extra 40 yards in summer. The ball simply runs on firm links turf. Club selection for approach shots becomes more complex when you\'re not sure how far you\'ll actually be.' },
      { type: 'h2', text: 'Course management on links' },
      { type: 'ul', items: [
        'Play for position, not for the flag. Links pins are often tucked behind bunkers. Going for them costs strokes. Miss the bunker, miss the trouble.',
        'Use the slopes. Links greens have pronounced contours and firm surfaces — a well-aimed chip that runs along the slope can be the smarter play than a high pitch.',
        'Check the wind from behind you, not just in your face. Crosswinds are the most dangerous. A 20mph crosswind will push a mid-iron 15-20 yards offline.',
        'Treat gorse as a water hazard. If your ball goes in gorse, declare a penalty drop. Trying to play from gorse is how people injure themselves.',
        'Look up. Seagulls can actually interfere with shots in coastal conditions — if you see one diving, step away.',
      ]},
      { type: 'h2', text: 'What to bring' },
      { type: 'ul', items: [
        'Waterproofs, always. Links weather changes fast.',
        'More balls than you think. Even experienced players lose balls in gorse and rough.',
        'A wind-resistant umbrella (or just accept you\'ll get wet — umbrellas can be a liability in strong winds).',
        'Tees that sit close to the ground — high tees are destroyed by links winds.',
        'Sensible expectations. Your handicap will not protect you your first time.',
      ]},
      { type: 'h2', text: 'The best place to start on the Sefton Coast' },
      { type: 'p', text: 'For your first links round, Southport & Ainsdale or West Lancashire are better choices than Royal Birkdale or Hillside. You\'ll play on genuine links terrain, get used to the conditions, and pay a more manageable green fee. Once you\'ve played links a few times, then book Birkdale or Hillside — you\'ll enjoy it more and embarrass yourself less.' },
    ],
  },
  {
    slug: 'best-value-golf-sefton-coast',
    title: 'The Best Value Links Golf on the Sefton Coast',
    excerpt:
      'Royal Birkdale is £320 a round. Hillside is £150. But you don\'t have to spend £150 to play world-class links golf on the Sefton Coast. Here\'s where the real value is.',
    categorySlug: 'golf-travel',
    date: '17 Feb 2026',
    readingTime: '5 min read',
    content: [
      { type: 'p', text: 'The Sefton Coast has a reputation problem. People hear "Royal Birkdale" and assume the whole area is out of their price range. It isn\'t. Within thirty minutes of Royal Birkdale\'s first tee, you can play genuine championship links golf for between £65 and £130 a round. Here\'s the honest guide to where the value actually is.' },
      { type: 'h2', text: 'Southport & Ainsdale — the best value championship course' },
      { type: 'p', text: 'Green fees: £65–£100. This is the most underrated course on the Sefton Coast. S&A has hosted the Ryder Cup (1933 and 1937) and the Amateur Championship multiple times. The course runs through genuine duneland, the condition is consistently excellent, and visitor access is far better than the headline courses.' },
      { type: 'p', text: 'The layout is traditional links with a good mix of exposed and sheltered holes. The 16th hole — a par 3 across a valley of dunes — is as good as anything on the coast at any price. Green fees include a meal. This alone makes it exceptional value by local standards.' },
      { type: 'h2', text: 'West Lancashire — raw links at a fair price' },
      { type: 'p', text: 'Green fees: £80–£130. West Lancs is the most authentic, unpolished course on the coast. It doesn\'t have Birkdale\'s manicured quality or Hillside\'s striking terrain — what it has is a raw, elemental links test that purists genuinely love.' },
      { type: 'p', text: 'The rough is proper rough. The wind is relentless (it sits right on the Irish Sea). The greens are fast and true. The clubhouse is welcoming and unpretentious. If you want a challenge that doesn\'t break the bank, West Lancs delivers.' },
      { type: 'h2', text: 'What you\'re giving up at the top end' },
      { type: 'p', text: 'Royal Birkdale and Hillside cost more because they\'re better — the conditioning is exceptional, the course management is outstanding, and the heritage is unmatched. A round at Birkdale is worth doing once if you care about golf. But it\'s not the only option, and it\'s not where most people should start.' },
      { type: 'h2', text: 'The value itinerary' },
      { type: 'p', text: 'For a two-day golf trip to the Sefton Coast that won\'t ruin you: Day 1 at Southport & Ainsdale (£65–£100 including lunch), Day 2 at West Lancashire (£80–£130). You\'ll have played two genuine championship links courses, seen what the Sefton Coast is about, and spent less than a single round at Royal Birkdale.' },
      { type: 'p', text: 'If budget allows and you want to add Hillside or Birkdale, book Day 3 and go in with realistic expectations. You\'ll be ready for it after two days of links golf on the coast.' },
      { type: 'callout', text: 'All seven Sefton Coast courses — including green fees, visitor policies and booking info — are covered in the SeftonLinks course guides.' },
    ],
  },
  {
    slug: 'the-open-2026-first-timers-guide',
    title: 'What to Expect at The Open 2026 — A First-Timer\'s Complete Guide',
    excerpt:
      'The Open Championship returns to Royal Birkdale in July 2026. If you\'ve never been to a major championship before, here\'s everything you need to know — tickets, transport, what to bring, and what to expect on the day.',
    categorySlug: 'the-open-2026',
    date: '20 Jan 2026',
    readingTime: '9 min read',
    content: [
      { type: 'p', text: 'The 154th Open Championship takes place at Royal Birkdale, Southport, from 13–19 July 2026. If you\'ve never attended a major golf championship, the scale of it will surprise you. 250,000 people across the week. The world\'s best players. An atmosphere unlike any other sporting event in this country.' },
      { type: 'p', text: 'I live three miles from the course and have been to multiple Opens. Here\'s everything a first-timer needs to know.' },
      { type: 'h2', text: 'Tickets — what you need to know now' },
      { type: 'p', text: 'Championship round tickets (Thursday–Sunday) are in very short supply. If you haven\'t got them yet, check the R&A official site immediately — returns do come up but not often. Practice round tickets (Monday–Wednesday) are significantly easier to get and offer excellent value: you can walk close to players on the driving range and fairways at a fraction of championship-day prices.' },
      { type: 'ul', items: [
        'Practice rounds: typically £25–£45 per day. Get on the driving range early — the atmosphere is informal and player access is excellent.',
        'Championship rounds: £60–£120+ per day. Prices vary by day — Saturday and Sunday cost more.',
        'No gate sales on championship days. You must have a ticket in advance.',
        'Ticket transfers: the R&A app allows transfer to another named person — watch for this on secondary markets.',
      ]},
      { type: 'h2', text: 'Getting there — do not drive' },
      { type: 'p', text: 'Road closures around Birkdale during Open week make driving impractical. Parking near the course is reserved for officials only. The options are:' },
      { type: 'ul', items: [
        'Merseyrail: the direct train from Southport to Birkdale station (10–15 min walk from the course) will be running enhanced services. Coming from Liverpool, take the Northern Line to Birkdale directly.',
        'Park and ride: the R&A operates park-and-ride from multiple sites across Southport. Details published at theopen.com closer to the event.',
        'Stay locally: if you\'re staying in Birkdale village or within a mile of the course, you can walk in every day.',
      ]},
      { type: 'h2', text: 'What to bring' },
      { type: 'ul', items: [
        'Small bag only — there are bag size restrictions at the entrance.',
        'Waterproofs regardless of forecast. Open week weather is unpredictable.',
        'Comfortable walking shoes. You will walk 5–8 miles per day on links terrain.',
        'Binoculars. Useful for watching shots from distance, especially on par 5s and long par 4s.',
        'Portable phone charger. You\'ll be tracking the leaderboard and filming all day.',
        'Cash or card — both accepted, but queues at some food outlets are card-only.',
        'Your ticket on the app — don\'t rely on a screenshot in poor signal.',
      ]},
      { type: 'h2', text: 'The best spots on the course' },
      { type: 'p', text: 'For a first-timer, the area around the 1st tee and 18th green gives you the most atmosphere with the least walking. The 1st tee in the morning is spectacular — you\'ll be close to the players and can follow a group for the first few holes before coming back.' },
      { type: 'p', text: 'The par-3 holes — particularly the 12th — allow you to stand close to the green and watch several shots in quick succession without following a group all round the course. The 18th green is the place to be on Sunday afternoon if you can get there.' },
      { type: 'h2', text: 'Where to stay' },
      { type: 'p', text: 'Accommodation in Southport and Birkdale for Open week is almost entirely booked. If you need somewhere: check Formby first (20 minutes by car from the course), then Ormskirk and Skelmersdale. Airbnb properties within 5 miles of Birkdale are your best option at this stage.' },
      { type: 'callout', text: 'SouthportGuide has a complete Open 2026 visitor hub covering accommodation, restaurants, transport and spectator tips — worth reading before you go.' },
      { type: 'h2', text: 'One final piece of advice' },
      { type: 'p', text: 'Don\'t spend all day staring at your phone tracking the leaderboard. Put it away for an hour, find a spot on a long par 4, and watch golf being played by the best players in the world on one of the great courses. That\'s the thing you came for.' },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.categorySlug === categorySlug);
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
