export interface TeeData {
  name: string;
  yardage: number;
  par: number;
  rating?: number;
  slope?: number;
}

export interface Course {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  founded: number;
  address: string;
  postcode: string;
  latitude: number;
  longitude: number;
  par: number;
  yardage: number; // championship/back tees
  tees: TeeData[];
  courseRating: number;
  slopeRating: number;
  greenFeeRange: string;
  greenFeeFrom: number;
  greenFeeTo: number;
  visitorPolicy: string;
  visitorDays: string;
  advanceBooking: string;
  bookingUrl: string;
  phone?: string;
  email?: string;
  website: string;
  difficulty: 'accessible' | 'moderate' | 'challenging' | 'championship';
  handicapLimit?: number;
  majorHistory?: string[];
  highlights: string[];
  practicalNotes: string[];
  nearbyDining: string[];
  distanceFromBirkdale: string; // in miles
  openChampionship: boolean;
  featured: boolean;
  image?: string; // path relative to /public, e.g. '/images/courses/royal-birkdale.jpg'
}

export const COURSES: Course[] = [
  {
    slug: 'royal-birkdale',
    name: 'Royal Birkdale Golf Club',
    shortName: 'Royal Birkdale',
    tagline: 'Host of The Open Championship 2026 — the pinnacle of links golf',
    description: `Royal Birkdale is the greatest links course most golfers will ever play. Set among towering sand dunes on the Sefton Coast, it has hosted ten Open Championships and ranks consistently among the top five courses in the world. The 2026 Open returns here in July — and if you're planning a golf trip to the Sefton Coast, this is the reason.

The course demands creativity and intelligence. Fairways run between steep dunes that channel the wind in unpredictable ways. The rough is brutal. Greens are fast, subtle and positioned to make you think about every approach. It's not a course you muscle your way around — links experience helps enormously.

Visitor tee times are available, but Royal Birkdale is strict about both availability and etiquette. Pre-book well in advance, respect the dress code, and play to your handicap certificate requirement.`,
    founded: 1889,
    address: 'Waterloo Road, Birkdale, Southport',
    postcode: 'PR8 2LX',
    latitude: 53.6095,
    longitude: -3.0428,
    par: 70,
    yardage: 7156,
    tees: [
      { name: 'Championship', yardage: 7156, par: 70, rating: 76.5, slope: 148 },
      { name: 'Medal', yardage: 6671, par: 70, rating: 73.2, slope: 140 },
      { name: 'White', yardage: 6244, par: 70, rating: 70.8, slope: 134 },
    ],
    courseRating: 76.5,
    slopeRating: 148,
    greenFeeRange: '£300–£350',
    greenFeeFrom: 300,
    greenFeeTo: 350,
    visitorPolicy: 'Visitors welcome subject to availability. Handicap certificate required (men 24, ladies 36). No visitors on competition days.',
    visitorDays: 'Weekdays preferred. Limited weekend availability.',
    advanceBooking: 'Book 3–6 months in advance for peak season. Open week accommodation books 12+ months ahead.',
    bookingUrl: 'https://www.royalbirkdale.com',
    phone: '01704 552261',
    website: 'https://www.royalbirkdale.com',
    difficulty: 'championship',
    handicapLimit: 24,
    majorHistory: [
      'The Open Championship: 1954, 1961, 1965, 1971, 1976, 1983, 1991, 1998, 2008, 2017, 2026',
      'Ryder Cup: 1969 (historic halved match, Jack Nicklaus conceded final putt to Tony Jacklin)',
      'Curtis Cup: 2000',
      'Walker Cup: 2019',
    ],
    highlights: [
      '10 Open Championships — more than almost any other venue',
      'Ranked in world\'s top 5 links courses',
      'Iconic willow scrub rough — a Royal Birkdale signature',
      'No two consecutive holes play in the same direction',
      'Site of Arnold Palmer\'s legendary 1961 Open — he played a 6-iron recovery shot from a bush',
    ],
    practicalNotes: [
      'Handicap certificate required — men 24, ladies 36',
      'Smart/casual dress code — no denim, no trainers',
      'Caddies available, advance booking recommended',
      'Trolleys permitted, buggies restricted',
      'Clubhouse lunch recommended — the bar has Open Championship memorabilia throughout',
    ],
    nearbyDining: [
      'The Bold Hotel, Lord Street — post-round dinner',
      'Bistrot Pierre, Southport — reliable and good value',
      'The Grill Room, Vincent Hotel — fine dining option',
    ],
    distanceFromBirkdale: '0',
    openChampionship: true,
    featured: true,
    image: '/images/courses/royal-birkdale.jpg',
  },
  {
    slug: 'hillside',
    name: 'Hillside Golf Club',
    shortName: 'Hillside',
    tagline: 'The finest links course you\'ve never heard of — until now',
    description: `Hillside is the best-kept secret on the Sefton Coast — though not for much longer. Immediately adjacent to Royal Birkdale, it shares the same dramatic duneland but offers significantly better visitor access at a fraction of the green fee. Golf professionals who play both courses often rate Hillside's back nine among the finest in England.

The course underwent significant redevelopment on its final nine holes, which now run through spectacular ridge-and-valley terrain through the dunes. The routing is logical and the course condition is consistently excellent. If you're building a multi-day itinerary, Hillside the day before Royal Birkdale is a near-perfect combination.`,
    founded: 1911,
    address: 'Hastings Road, Hillside, Southport',
    postcode: 'PR8 2LU',
    latitude: 53.6068,
    longitude: -3.0412,
    par: 72,
    yardage: 6850,
    tees: [
      { name: 'Championship', yardage: 6850, par: 72, rating: 74.2, slope: 142 },
      { name: 'Medal', yardage: 6475, par: 72, rating: 72.0, slope: 136 },
      { name: 'Yellow', yardage: 6020, par: 72, rating: 69.5, slope: 128 },
    ],
    courseRating: 74.2,
    slopeRating: 142,
    greenFeeRange: '£100–£150',
    greenFeeFrom: 100,
    greenFeeTo: 150,
    visitorPolicy: 'Visitors welcome most weekdays and some weekends. Handicap certificate required.',
    visitorDays: 'Tuesdays, Thursdays, Fridays preferred. Phone ahead to confirm.',
    advanceBooking: 'Book 4–8 weeks in advance. More flexible than Royal Birkdale.',
    bookingUrl: 'https://www.hillside-golfclub.co.uk',
    phone: '01704 567169',
    website: 'https://www.hillside-golfclub.co.uk',
    difficulty: 'challenging',
    handicapLimit: 28,
    majorHistory: [
      'PGA Championship: 1982',
      'Brabazon Trophy: multiple times',
      'Final Open qualifying venue',
    ],
    highlights: [
      'Back nine through dramatic duneland — a match for any course in England',
      'Immediately adjacent to Royal Birkdale — combined visits possible',
      'Consistently excellent conditioning',
      'Significantly better visitor value than neighbouring Birkdale',
      'Used as Open Championship qualifying venue',
    ],
    practicalNotes: [
      'Handicap certificate required',
      'Smart casual dress, spikeless or soft spikes only',
      'Caddies available on request',
      'Club hire available',
      'Excellent clubhouse with panoramic views',
    ],
    nearbyDining: [
      'Same recommendations as Royal Birkdale — both clubs are minutes apart',
      'The Waterfront, Southport — casual post-round option',
    ],
    distanceFromBirkdale: '0.3',
    openChampionship: false,
    featured: true,
    image: '/images/courses/hillside.jpg',
  },
  {
    slug: 'formby',
    name: 'Formby Golf Club',
    shortName: 'Formby Golf Club',
    tagline: 'A private gem — one of England\'s finest inland links',
    description: `Formby Golf Club is one of the most exclusive clubs on the Sefton Coast, and its visitor policy reflects that. The club has a reciprocal arrangement with a limited number of clubs and handles visitor requests on a case-by-case basis — you won't simply book a tee time online.

The course itself is exceptional. Set through coastal pinewoods with stretches of pure heathland links, it's a fundamentally different experience to Royal Birkdale or Hillside. The pines offer shelter and a distinctive visual character, while the dune sections are as challenging as anything on the coast. If you can get on, do.

Note: Formby Golf Club is a men-only club. Formby Ladies Golf Club (adjacent, founded 1896) is a separate and equally prestigious club with its own course and a more accessible visitor policy.`,
    founded: 1884,
    address: 'Golf Road, Formby',
    postcode: 'L37 1LQ',
    latitude: 53.5647,
    longitude: -3.0823,
    par: 72,
    yardage: 6893,
    tees: [
      { name: 'Championship', yardage: 6893, par: 72, rating: 74.5, slope: 144 },
      { name: 'Medal', yardage: 6502, par: 72, rating: 72.1, slope: 137 },
    ],
    courseRating: 74.5,
    slopeRating: 144,
    greenFeeRange: '£160–£210',
    greenFeeFrom: 160,
    greenFeeTo: 210,
    visitorPolicy: 'Restricted visitor access. Reciprocal arrangements with approved clubs only. Contact the club secretary directly to enquire.',
    visitorDays: 'Weekdays only, subject to availability and prior approval.',
    advanceBooking: 'Contact club secretary. No online booking. Letter of introduction from your home club required.',
    bookingUrl: 'https://www.formby-golf.co.uk',
    phone: '01704 872164',
    website: 'https://www.formby-golf.co.uk',
    difficulty: 'challenging',
    handicapLimit: 20,
    majorHistory: [
      'English Amateur Championship: multiple times',
      'Curtis Cup: 1974, 1984',
      'Walker Cup: 1995',
    ],
    highlights: [
      'Unique combination of pinewood and heathland links',
      'One of the oldest clubs in the north of England (1884)',
      'Walker Cup venue',
      'Adjacent to red squirrel reserve and National Trust pinewoods',
      'Formby Ladies Golf Club (adjacent) has separate visitor access',
    ],
    practicalNotes: [
      'Men-only club — Formby Ladies GC is a separate club next door',
      'Introduction from member or home club letter typically required',
      'Handicap limit 20 for visitors',
      'No online booking — write or call the club secretary',
      'Formal dress code throughout',
    ],
    nearbyDining: [
      'The Left Bank Brasserie, Formby — closest quality option post-round',
      'The Sparrowhawk, Formby — popular village pub with food',
      'Emily\'s, Formby village — local favourite',
    ],
    distanceFromBirkdale: '5',
    openChampionship: false,
    featured: true,
    image: '/images/courses/formby.jpg',
  },
  {
    slug: 'west-lancashire',
    name: 'West Lancashire Golf Club',
    shortName: 'West Lancashire',
    tagline: 'One of England\'s oldest clubs — links golf at its purest',
    description: `West Lancashire Golf Club, founded in 1873, is among the oldest golf clubs in England and one of the least visited on the Sefton Coast — primarily because it sits slightly further north at Blundellsands, outside the immediate Southport cluster.

This is a shame, because West Lancashire is a serious links test. The course has a raw, unmanicured quality that purists love — the rough is genuine rough, the greens are fast and true, and the wind off the Irish Sea is ever-present. It lacks the manicured polish of Royal Birkdale but delivers a more authentic, elemental links experience at a considerably more accessible green fee.

The club has a long history with Open Championship qualifying. If you want to play a genuinely historic and challenging links without the premium price tag, West Lancashire is a strong choice.`,
    founded: 1873,
    address: 'Hall Road West, Blundellsands, Liverpool',
    postcode: 'L23 8SZ',
    latitude: 53.4892,
    longitude: -3.0621,
    par: 72,
    yardage: 6756,
    tees: [
      { name: 'Championship', yardage: 6756, par: 72, rating: 73.5, slope: 140 },
      { name: 'Medal', yardage: 6338, par: 72, rating: 71.2, slope: 133 },
      { name: 'Yellow', yardage: 5931, par: 72, rating: 68.8, slope: 126 },
    ],
    courseRating: 73.5,
    slopeRating: 140,
    greenFeeRange: '£80–£130',
    greenFeeFrom: 80,
    greenFeeTo: 130,
    visitorPolicy: 'Visitors welcome most weekdays. Weekends limited — phone ahead.',
    visitorDays: 'Monday–Friday preferred. Check availability for Saturdays.',
    advanceBooking: 'Book 2–4 weeks in advance. More flexible visitor access than courses further north.',
    bookingUrl: 'https://www.westlancashiregolf.co.uk',
    phone: '0151 924 1076',
    website: 'https://www.westlancashiregolf.co.uk',
    difficulty: 'challenging',
    handicapLimit: 28,
    majorHistory: [
      'Open Championship qualifying: regular qualifying venue',
      'English Amateur: 2001',
    ],
    highlights: [
      'Founded 1873 — one of England\'s oldest clubs',
      'Raw, authentic links experience',
      'Significantly lower green fee than the Southport courses',
      'Irish Sea views throughout',
      'Regular Open Championship qualifying venue',
    ],
    practicalNotes: [
      'Visitors generally welcome — more relaxed than Southport clubs',
      'Handicap certificate required',
      'Slightly further from Southport — factor into multi-day itinerary',
      'Good value — genuinely underrated',
      'Limited buggies — this is a walking course',
    ],
    nearbyDining: [
      'Crosby area has several good pubs and restaurants',
      'The Blundell Arms, Crosby — traditional pub food',
      'Hall Road train station nearby — Liverpool city dining reachable easily',
    ],
    distanceFromBirkdale: '8',
    openChampionship: false,
    featured: false,
    image: '/images/courses/west-lancashire.jpg',
  },
  {
    slug: 'southport-ainsdale',
    name: 'Southport & Ainsdale Golf Club',
    shortName: 'Southport & Ainsdale',
    tagline: 'Ryder Cup heritage and genuine links character at an accessible price',
    description: `Southport & Ainsdale — known locally as S&A — hosted the Ryder Cup in 1933 and 1937, making it one of a tiny number of non-Royal venues with that distinction. The history alone makes it worth a round, but the course earns its reputation on its own merits too.

S&A sits between Hillside and Formby and shares the coastal dune terrain that characterises the best of the Sefton Coast. The first few holes are relatively benign, which gives visitors a false sense of security — the course stiffens considerably through the middle section, with several holes genuinely exposed to the prevailing westerly.

Green fees are among the most accessible on the coast for what is genuinely a historic and challenging links. For visitors putting together a multi-day trip, S&A pairs well with either Hillside or West Lancashire for a strong two-day itinerary at reasonable cost.`,
    founded: 1906,
    address: 'Bradshaw\'s Lane, Ainsdale, Southport',
    postcode: 'PR8 3LG',
    latitude: 53.5882,
    longitude: -3.0441,
    par: 72,
    yardage: 6612,
    tees: [
      { name: 'Championship', yardage: 6612, par: 72, rating: 72.8, slope: 138 },
      { name: 'Medal', yardage: 6238, par: 72, rating: 70.5, slope: 131 },
      { name: 'Yellow', yardage: 5861, par: 72, rating: 68.2, slope: 124 },
      { name: 'Red', yardage: 5412, par: 73, rating: 71.0, slope: 126 },
    ],
    courseRating: 72.8,
    slopeRating: 138,
    greenFeeRange: '£65–£100',
    greenFeeFrom: 65,
    greenFeeTo: 100,
    visitorPolicy: 'Visitors welcome most weekdays. Weekends by arrangement. Open to societies.',
    visitorDays: 'Tuesdays–Fridays recommended. Phone to check Sunday availability.',
    advanceBooking: 'Book 2–4 weeks in advance. Societies book 3–6 months ahead.',
    bookingUrl: 'https://www.sandagolfclub.co.uk',
    phone: '01704 578000',
    website: 'https://www.sandagolfclub.co.uk',
    difficulty: 'moderate',
    handicapLimit: 28,
    majorHistory: [
      'Ryder Cup: 1933 (GB won), 1937 (USA won)',
      'Ladies British Open Amateur: several times',
    ],
    highlights: [
      'Ryder Cup venue 1933 and 1937 — genuine major history',
      'Excellent value for a historic links',
      'Society packages available',
      'Good variety — accessible but with teeth',
      'Welcoming to visiting golfers',
    ],
    practicalNotes: [
      'Handicap certificate required (28 men, 36 ladies)',
      'Society groups well catered for',
      'Catering available in clubhouse',
      'Electric trolleys permitted',
      'Good locker room facilities',
    ],
    nearbyDining: [
      'The Fisherman\'s Rest, Ainsdale — casual post-round pub',
      'Southport town centre 10 minutes — wide choice',
    ],
    distanceFromBirkdale: '3',
    openChampionship: false,
    featured: false,
    image: '/images/courses/southport-ainsdale.jpg',
  },
  {
    slug: 'southport-old-links',
    name: 'Southport Old Links Golf Club',
    shortName: 'Southport Old Links',
    tagline: 'Hidden value — a genuine links at the most accessible price on the coast',
    description: `Southport Old Links is the quiet one. Tucked away in Churchtown on the northern edge of Southport, it's the kind of club that gets overlooked on bucket-list itineraries — which is exactly why it's worth playing.

Founded in 1901 and set on genuine links terrain, Old Links offers a round that punches above its green fee significantly. The course is shorter than its Sefton Coast neighbours but plays longer than the card in a coastal breeze, and the bunkering is thoughtfully placed to reward proper links shot-making.

For visitors building a high-volume trip — four or five rounds — Old Links provides welcome relief on the wallet while still delivering authentic links golf. It's also the most welcoming to visitors without handicap certificates, making it the natural choice for higher-handicappers or casual players.`,
    founded: 1901,
    address: 'Moss Lane, Churchtown, Southport',
    postcode: 'PR9 7QS',
    latitude: 53.6702,
    longitude: -2.9961,
    par: 71,
    yardage: 6318,
    tees: [
      { name: 'Medal', yardage: 6318, par: 71, rating: 70.8, slope: 130 },
      { name: 'Yellow', yardage: 5892, par: 71, rating: 68.3, slope: 123 },
      { name: 'Red', yardage: 5316, par: 73, rating: 70.2, slope: 122 },
    ],
    courseRating: 70.8,
    slopeRating: 130,
    greenFeeRange: '£40–£60',
    greenFeeFrom: 40,
    greenFeeTo: 60,
    visitorPolicy: 'Very welcoming to visitors most days of the week. Most accessible club on the coast.',
    visitorDays: 'Most days — phone ahead to check.',
    advanceBooking: 'A week in advance is typically sufficient. Walk-ins possible on quieter weekdays.',
    bookingUrl: 'https://www.southportoldlinks.com',
    phone: '01704 228207',
    website: 'https://www.southportoldlinks.com',
    difficulty: 'accessible',
    majorHistory: [],
    highlights: [
      'Most accessible green fee on the Sefton Coast',
      'Genuinely welcoming to all levels',
      'Authentic links terrain without the premium price',
      'Good for high-handicappers or first-time links players',
      'Located in Churchtown — a picturesque village setting',
    ],
    practicalNotes: [
      'No strict handicap requirement — most accessible on the coast',
      'Good starter links for those new to coastal golf',
      'Churchtown village has good pubs nearby',
      'Can often walk on — less advance planning needed',
    ],
    nearbyDining: [
      'The Hesketh Arms, Churchtown — excellent pub right on the doorstep',
      'The Bold Hotel, Lord Street Southport — 10 minutes',
    ],
    distanceFromBirkdale: '4',
    openChampionship: false,
    featured: false,
    image: '/images/courses/southport-old-links.jpg',
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES.find(c => c.slug === slug);
}

export function getFeaturedCourses(): Course[] {
  return COURSES.filter(c => c.featured);
}

export const OPEN_DATE = new Date('2026-07-16T00:00:00Z');

export const SEFTON_ITINERARIES = [
  {
    id: '2-day-highlights',
    title: '2-Day Highlights',
    subtitle: 'The essential Sefton Coast visit',
    days: 2,
    budget: 'premium',
    handicapRange: 'any',
    courses: ['royal-birkdale', 'hillside'],
    estimatedCost: '£450–£550 pp (green fees only)',
    description: 'The classic two-day combination. Hillside on day one to find your links legs, Royal Birkdale on day two when it matters.',
    accommodation: 'The Bold Hotel, Southport — central, golf-friendly, secure club storage',
    dining: 'Dinner at The Vincent Hotel Grill Room between rounds',
  },
  {
    id: '3-day-classic',
    title: '3-Day Classic',
    subtitle: 'Three different courses, three different challenges',
    days: 3,
    budget: 'standard',
    handicapRange: 'any',
    courses: ['southport-ainsdale', 'hillside', 'royal-birkdale'],
    estimatedCost: '£450–£600 pp (green fees only)',
    description: 'Build up through the week. S&A on day one, Hillside on day two, Royal Birkdale as the grand finale.',
    accommodation: 'Fairways Guest House, Birkdale — steps from the first tee at Royal Birkdale',
    dining: 'Post-round at Bistrot Pierre on Lord Street — consistent quality, good value',
  },
  {
    id: '5-day-grand-tour',
    title: '5-Day Grand Tour',
    subtitle: 'Every major course on the Sefton Coast',
    days: 5,
    budget: 'standard',
    handicapRange: 'any',
    courses: ['west-lancashire', 'southport-ainsdale', 'formby', 'hillside', 'royal-birkdale'],
    estimatedCost: '£700–£900 pp (green fees only)',
    description: 'The full corridor. Start at West Lancs, work north through S&A, Formby (if you can get on), Hillside, and finish at Birkdale.',
    accommodation: 'Mix of Southport (nights 1–3) and Birkdale (nights 4–5)',
    dining: 'Ask at each clubhouse — the best post-round meals are often in the clubhouse itself',
  },
  {
    id: '2-day-value',
    title: '2-Day Value Package',
    subtitle: 'Maximum links golf, minimum spend',
    days: 2,
    budget: 'value',
    handicapRange: 'any',
    courses: ['southport-old-links', 'southport-ainsdale'],
    estimatedCost: '£100–£160 pp (green fees only)',
    description: 'Genuinely good links golf without the premium price tags. Ideal for society groups or first-time visitors testing the water.',
    accommodation: 'Travelodge or Premier Inn Southport — functional and central',
    dining: 'The Hesketh Arms, Churchtown — best pub on the circuit at any price',
  },
];
