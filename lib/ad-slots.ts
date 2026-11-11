// ── Advertising spaces on SeftonLinks ────────────────────────────────────────
// Every advert space on the site, keyed by a stable id. The id appears in the
// "advertise here" link (/advertise?space=<id>#<option>) and in contact-form
// enquiries, so do not rename one once it is live.
//
// To put an advert live (after the invoice is paid): set `sponsor` on the slot.
//   sponsor: {
//     name: 'Business name',
//     url: 'https://their-site.example',
//     text: 'Up to 30 words about them.',
//     image: '/images/their-photo.jpg',  // optional, a file under /public
//     until: '2027-02-28',               // optional, last day shown (UK date)
//   }
// Set it back to null when the booking ends. A sponsor whose `until` date has
// passed shows as the empty "advertise here" card on its own.
//
// Rules: one advert per page at most; adverts are labelled on the card; paid
// links carry rel="sponsored noopener". Course page partners are hotels, B&Bs,
// restaurants or golf travel firms, never a golf club. No adverts on about,
// privacy, terms, disclosure, contact, the advertise page, the 404 page, course
// reviews or posts that name or judge a business. Cards show on the English
// pages only (the other locales have no translation of the card's labels).

export type Sponsor = {
  name: string;
  url: string;
  /** Up to 30 words. */
  text: string;
  /** Optional image path under /public, e.g. '/images/sponsor.jpg'. */
  image?: string;
  /** Optional last day the advert shows, 'YYYY-MM-DD' (UK date). */
  until?: string;
};

export type AdOptionId =
  | 'course-partner'
  | 'page-sponsor'
  | 'post-sponsor'
  | 'home-card'
  | 'golf-season'
  | 'sponsored-article'
  | 'network';

export type AdOption = {
  id: AdOptionId;
  name: string;
  /** Headline price, e.g. '£35'. All prices are plus VAT. */
  price: string;
  /** 'a month', 'one-off', 'a season'. */
  per: string;
  /** Short line under the price. */
  note: string;
  /** Used on the empty card, e.g. 'from £35 a month plus VAT'. */
  from: string;
  term: string;
  points: string[];
};

export const AD_OPTIONS: AdOption[] = [
  {
    id: 'course-partner',
    name: 'Course page partner',
    price: '£35',
    per: 'a month',
    note: '3 months minimum',
    from: 'from £35 a month plus VAT',
    term: 'One partner per course page',
    points: [
      'A "stay or eat near this course" card on one of the six course guides',
      'For hotels, B&Bs, restaurants and golf travel firms. Never a golf club',
      'Your photo, up to 30 words and a link, labelled Advertisement',
    ],
  },
  {
    id: 'page-sponsor',
    name: 'Tee Times or Conditions sponsor',
    price: '£35',
    per: 'a month',
    note: '3 months minimum',
    from: 'from £35 a month plus VAT',
    term: 'One sponsor per page',
    points: [
      'One card on the Tee Times guide or the Course Conditions page',
      'Labelled Sponsor, shown once after the main content',
    ],
  },
  {
    // Not priced in the stage A proposal: set at the course partner price.
    // Damian to confirm.
    id: 'post-sponsor',
    name: 'Post sponsor',
    price: '£35',
    per: 'a month',
    note: '3 months minimum',
    from: 'from £35 a month plus VAT',
    term: 'One sponsor per post',
    points: [
      'A card at the end of one of our golf travel or itinerary posts',
      'Only on posts that do not name or judge a business other than the golf clubs',
      'Labelled Sponsor, shown once after the post',
    ],
  },
  {
    id: 'home-card',
    name: 'Home page card',
    price: '£39',
    per: 'a month',
    note: '3 months minimum',
    from: 'from £39 a month plus VAT',
    term: 'One business at a time',
    points: [
      'A card below the course guides on the SeftonLinks home page',
      'Photo, one line about you and a link, labelled Advertisement',
      'Change the photo and line once a month if you like',
    ],
  },
  {
    id: 'golf-season',
    name: 'Golf season package',
    price: '£249',
    per: 'a season',
    note: 'March to October',
    from: '£249 a season plus VAT',
    term: 'Book before the season starts',
    points: [
      'Your partner card on all six course guides, March to October',
      'Eight months for less than £32 a month, plus VAT',
      'Labelled Advertisement on every page',
    ],
  },
  {
    id: 'sponsored-article',
    name: 'Sponsored article',
    price: '£149',
    per: 'one-off',
    note: 'live for 12 months',
    from: '£149 one-off plus VAT',
    term: 'Labelled Sponsored at the top',
    points: [
      'A useful post about something you run, for example a hotel golf break',
      'Written with you, checked for facts, in plain English',
      'Bylined "Sponsored by" your business, and never presented as a review',
    ],
  },
];

export const NETWORK_BUNDLE: AdOption = {
  id: 'network',
  name: 'Sefton Coast bundle',
  price: '£149',
  per: 'a month',
  note: '3 months minimum',
  from: 'from £149 a month plus VAT',
  term: 'One invoice',
  points: [
    'Home page card on SeftonLinks, FormbyGuide, SouthportGuide and Sefton Coast Wildlife',
    'Featured in your category on FormbyGuide',
    'Pro-level placement on SouthportGuide',
  ],
};

export const FOUNDING_OFFER =
  'Half price for your first three months, and your monthly price held for twelve months, for the first ten advertisers across the Sefton Coast sites.';

type SlotKind = 'home' | 'course' | 'page' | 'post';

export type AdSlotDef = {
  id: string;
  kind: SlotKind;
  option: AdOptionId;
  /** Names the space, e.g. 'Partner on the Royal Birkdale course guide'. */
  title: string;
  sponsor: Sponsor | null;
};

function course(slug: string, name: string): AdSlotDef {
  return { id: `course-${slug}`, kind: 'course', option: 'course-partner', title: `Partner on the ${name} course guide`, sponsor: null };
}

function post(slug: string, name: string): AdSlotDef {
  return { id: `post-${slug}`, kind: 'post', option: 'post-sponsor', title: `Sponsor of the ${name} post`, sponsor: null };
}

const SLOT_LIST: AdSlotDef[] = [
  // Home page: below the course grid.
  { id: 'home-card', kind: 'home', option: 'home-card', title: 'Home page card', sponsor: null },

  // Course pages: one partner each, at the end of the sidebar.
  course('royal-birkdale', 'Royal Birkdale'),
  course('hillside', 'Hillside'),
  course('formby', 'Formby Golf Club'),
  course('west-lancashire', 'West Lancashire'),
  course('southport-ainsdale', 'Southport & Ainsdale'),
  course('southport-old-links', 'Southport Old Links'),

  // Page sponsors: after the main content.
  { id: 'tee-times', kind: 'page', option: 'page-sponsor', title: 'Sponsor of the Tee Times guide', sponsor: null },
  { id: 'conditions', kind: 'page', option: 'page-sponsor', title: 'Sponsor of the Course Conditions page', sponsor: null },

  // End of post: golf travel and itinerary posts that do not name or judge a
  // business other than the golf clubs themselves.
  post('winter-golf-sefton-coast', 'Winter Golf on the Sefton Coast'),
  post('sefton-coast-five-course-itinerary', 'Five-Course Itinerary'),
  post('sefton-coast-links-june-2026', 'Sefton Coast in June'),
  post('sefton-coast-golf-july-august', 'Sefton Coast in July and August'),
  post('sefton-coast-golf-august-2026', 'Sefton Coast in August'),
  post('september-golf-sefton-coast', 'September Golf'),
  post('corporate-golf-days-sefton-coast', 'Corporate Golf Days'),
];

export const AD_SLOTS: Record<string, AdSlotDef> = Object.fromEntries(SLOT_LIST.map((s) => [s.id, s]));

export function getAdOption(id: string): AdOption | undefined {
  if (id === NETWORK_BUNDLE.id) return NETWORK_BUNDLE;
  return AD_OPTIONS.find((o) => o.id === id);
}

/** Today's date in the UK as 'YYYY-MM-DD'. */
function ukToday(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date());
}

/** The slot's sponsor if one is set and its `until` date has not passed. */
export function activeSponsor(slot: AdSlotDef): Sponsor | null {
  const s = slot.sponsor;
  if (!s) return null;
  if (s.until && s.until < ukToday()) return null;
  return s;
}

/** Link from an empty card to the advertise page, naming the space. */
export function advertiseHref(slot: AdSlotDef): string {
  return `/advertise?space=${encodeURIComponent(slot.id)}#${slot.option}`;
}

/** Link from the advertise page to the contact form. */
export function enquiryHref(space?: string): string {
  return `/contact?topic=advertise${space ? `&space=${encodeURIComponent(space)}` : ''}`;
}

/**
 * What a `space` value from a URL refers to: a slot title or an option name.
 * Only known ids are accepted, so nothing typed into a URL is echoed back.
 */
export function describeSpace(space: string | undefined | null): string | null {
  if (!space) return null;
  const slot = AD_SLOTS[space];
  if (slot) return slot.title;
  const option = getAdOption(space);
  return option ? option.name : null;
}
