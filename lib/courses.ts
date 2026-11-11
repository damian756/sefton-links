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
  /** What the club publishes, for display. Not a number when the club publishes no visitor rate. */
  greenFeeRange: string;
  /** Lowest published per-person rate, or null when the club publishes none for this season. */
  greenFeeFrom: number | null;
  greenFeeTo: number | null;
  /** The months or condition the published range covers. */
  greenFeeNote?: string;
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
    tagline: 'Host of The 154th Open in 2026, won by Ryan Fox',
    description: `Royal Birkdale sits among towering sand dunes in Southport. It hosted The Open for the 11th time in July 2026, when Ryan Fox won with a birdie on the 72nd hole.

The course demands creativity and intelligence. Fairways run between steep dunes that channel the wind in unpredictable ways. The rough is brutal. Greens are fast, subtle and positioned to make you think about every approach. It's not a course you muscle your way around: links experience helps enormously.

The club says its visitor tee times are fully booked throughout 2026 and 2027, and asks golfers to check its website for 2028 availability.`,
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
    greenFeeRange: 'Not published',
    greenFeeFrom: null,
    greenFeeTo: null,
    greenFeeNote: 'Fully booked for visitors through 2027',
    visitorPolicy: 'The club says visitor tee times are fully booked throughout 2026 and 2027. Check its website for 2028 availability.',
    visitorDays: 'Fully booked for visitors through 2027.',
    advanceBooking: 'Fully booked through 2027. The club asks golfers to check back for 2028 availability.',
    bookingUrl: 'https://www.royalbirkdale.com',
    phone: '01704 552020',
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
      'Since first hosting The Open in 1954, the most regular Open venue apart from St Andrews',
      'Ranked in world\'s top 5 links courses',
      'Iconic willow scrub rough: a Royal Birkdale signature',
      'No two consecutive holes play in the same direction',
      'Arnold Palmer won here in 1961, with a famous 6-iron from the base of a bush at the 15th (now the 16th)',
    ],
    practicalNotes: [
      'Handicap certificate required: men 24, ladies 36',
      'Dress code: collared shirt tucked in and golf shoes; no jeans, tracksuits, round-neck T-shirts or training shoes',
      'Caddies available, advance booking recommended',
      'Trolleys permitted, buggies restricted',
      'Clubhouse lunch recommended: the bar has Open Championship memorabilia throughout',
    ],
    nearbyDining: [
      'The Bold Hotel, Lord Street: post-round dinner',
      'Bistrot Pierre, Southport: reliable and good value',
      'The Grill Room, Vincent Hotel: fine dining option',
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
    tagline: 'Links golf next door to Royal Birkdale',
    description: `Hillside sits immediately adjacent to Royal Birkdale and shares the same dramatic duneland. The club's green fee table lists its winter rate as closed for maintenance from 19 October 2026 to mid-March 2027. Its spring rate starts in March 2027.

The course underwent significant redevelopment on its final nine holes, which now run through spectacular ridge-and-valley terrain through the dunes. The routing is logical and the course condition is consistently excellent.`,
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
    greenFeeRange: '£195–£352',
    greenFeeFrom: 195,
    greenFeeTo: 352,
    greenFeeNote: '2027 rates; closed to visitors until mid-March 2027',
    visitorPolicy: 'Closed to visitors for winter maintenance from 19 October 2026 to mid-March 2027. Visitor enquiries go to the Secretary\'s Office.',
    visitorDays: 'Closed to visitors until mid-March 2027. Ask the Secretary\'s Office about dates after that.',
    advanceBooking: "Contact the Secretary's Office on 01704 567169. The spring visitor rate starts in March 2027.",
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
      'Back nine through dramatic duneland, a match for any course in England',
      'Immediately adjacent to Royal Birkdale',
      'Consistently excellent conditioning',
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
      'Same recommendations as Royal Birkdale: both clubs are minutes apart',
      'The Waterfront, Southport: casual post-round option',
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
    tagline: 'Founded in 1884: a championship links among dunes and pine trees',
    description: `Formby Golf Club was founded in 1884 and describes itself as a true championship links, with mature sand dunes, undulating fairways, well-protected greens and views of the Irish Sea. Visitors can book online. Saturday and Sunday are members' competition days.

The course itself is exceptional. Set through coastal pinewoods with stretches of pure heathland links, it's a fundamentally different experience to Royal Birkdale or Hillside. The pines offer shelter and a distinctive visual character, while the dune sections are as challenging as anything on the coast.`,
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
    greenFeeRange: '£155–£350',
    greenFeeFrom: 155,
    greenFeeTo: 350,
    greenFeeNote: 'November 2026 to September 2027',
    visitorPolicy: 'Visitors welcome. A current recognised handicap certificate is requested: maximum 28 for men and 36 for women.',
    visitorDays: 'Saturday and Sunday are members\' competition days. Check the online tee sheet for availability.',
    advanceBooking: 'Book online, call 01704 872164 or email teetimes@formbygolfclub.co.uk.',
    bookingUrl: 'https://www.brsgolf.com/formby/visitor_home.php',
    phone: '01704 872164',
    website: 'https://www.formbygolfclub.co.uk',
    difficulty: 'challenging',
    handicapLimit: 28,
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
      'Saturday and Sunday are members\' competition days',
      'Handicap certificate requested: maximum 28 for men, 36 for women',
      'Visitor tee times can be booked online',
      'Buggies for hire on medical grounds only, with a medical certificate',
      'Formal dress code throughout',
    ],
    nearbyDining: [
      'The Left Bank Brasserie, Formby: closest quality option post-round',
      'The Sparrowhawk, Formby: popular village pub with food',
      'Emily\'s, Formby village: local favourite',
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
    tagline: 'One of England\'s oldest clubs: links golf at its purest',
    description: `West Lancashire Golf Club, founded in 1873, is among the oldest golf clubs in England and one of the least visited on the Sefton Coast, partly because it sits further south at Blundellsands, outside the Southport cluster.

This is a shame, because West Lancashire is a serious links test. The course has a raw, unmanicured quality that purists love: the rough is genuine rough, the greens are fast and true, and the wind off the Irish Sea is ever-present. It lacks the manicured polish of Royal Birkdale but delivers a more authentic, elemental links experience at a considerably more accessible green fee.

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
    greenFeeRange: '£120–£250',
    greenFeeFrom: 120,
    greenFeeTo: 250,
    greenFeeNote: 'November 2026 to April 2027',
    visitorPolicy: 'Visitors welcome most weekdays. Weekends limited: phone ahead.',
    visitorDays: 'Monday–Friday preferred. Check availability for Saturdays.',
    advanceBooking: 'Book 2–4 weeks in advance. More flexible visitor access than courses further north.',
    bookingUrl: 'https://visitors.brsgolf.com/westlancashire',
    phone: '0151 924 1076',
    website: 'https://www.westlancashiregolf.co.uk',
    difficulty: 'challenging',
    handicapLimit: 28,
    majorHistory: [
      'Open Championship qualifying: regular qualifying venue',
      'English Amateur: 2001',
    ],
    highlights: [
      'Founded 1873: one of England\'s oldest clubs',
      'Raw, authentic links experience',
      'Significantly lower green fee than the Southport courses',
      'Irish Sea views throughout',
      'Regular Open Championship qualifying venue',
    ],
    practicalNotes: [
      'Visitors generally welcome: more relaxed than Southport clubs',
      'Handicap certificate required',
      'Further from Southport: factor into multi-day itinerary',
      'Good value',
      'Limited buggies: this is a walking course',
    ],
    nearbyDining: [
      'Crosby area has several good pubs and restaurants',
      'The Blundell Arms, Crosby: traditional pub food',
      'Hall Road station is 50 yards from the club entrance, on the line between Liverpool Central and Southport',
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
    description: `Southport & Ainsdale, known locally as S&A, hosted the Ryder Cup in 1933 and 1937, making it one of a tiny number of non-Royal venues with that distinction. The history alone makes it worth a round, but the course earns its reputation on its own merits too.

S&A sits between Hillside and Formby and shares the coastal dune terrain that characterises the best of the Sefton Coast. The first few holes are relatively benign, which gives visitors a false sense of security: the course stiffens considerably through the middle section, with several holes genuinely exposed to the prevailing westerly.

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
    greenFeeRange: 'On booking portal',
    greenFeeFrom: null,
    greenFeeTo: null,
    greenFeeNote: 'Rates vary with demand, time of day and season',
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
      'Ryder Cup venue 1933 and 1937',
      'Excellent value for a historic links',
      'Society packages available',
      'Good variety: accessible but with teeth',
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
      'The Fisherman\'s Rest, Ainsdale: casual post-round pub',
      'Southport town centre 10 minutes away: wide choice',
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
    tagline: 'Hidden value: a genuine links at the most accessible price on the coast',
    description: `Southport Old Links is the quiet one. Tucked away in Churchtown on the northern edge of Southport, it's the kind of club that gets overlooked on bucket-list itineraries, which is exactly why it's worth playing.

Founded in 1901 and set on genuine links terrain, Old Links offers a round that punches above its green fee significantly. The course is shorter than its Sefton Coast neighbours but plays longer than the card in a coastal breeze, and the bunkering is thoughtfully placed to reward proper links shot-making.

For visitors building a high-volume trip of four or five rounds, Old Links provides welcome relief on the wallet while still delivering authentic links golf. It's also the most welcoming to visitors without handicap certificates, making it the natural choice for higher-handicappers or casual players.`,
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
    greenFeeRange: 'Ask the club',
    greenFeeFrom: null,
    greenFeeTo: null,
    greenFeeNote: 'Call 01704 228207 (option 5) for this season\'s rates',
    visitorPolicy: 'Very welcoming to visitors most days of the week. Most accessible club on the coast.',
    visitorDays: 'Weekdays and Saturdays. Phone ahead to check.',
    advanceBooking: 'A week in advance is typically sufficient. Walk-ins possible on quieter weekdays.',
    bookingUrl: 'https://solgc.hub.clubv1.com/visitors/booking',
    phone: '01704 228207',
    website: 'https://www.southportoldlinksgolfclub.co.uk',
    difficulty: 'accessible',
    majorHistory: [],
    highlights: [
      'Most accessible green fee on the Sefton Coast',
      'Genuinely welcoming to all levels',
      'Authentic links terrain without the premium price',
      'Good for high-handicappers or first-time links players',
      'Located in Churchtown, on the northern edge of Southport',
    ],
    practicalNotes: [
      'No strict handicap requirement: most accessible on the coast',
      'Good starter links for those new to coastal golf',
      'Churchtown village has good pubs nearby',
      'Can often walk on: less advance planning needed',
    ],
    nearbyDining: [
      'The Hesketh Arms, Churchtown: excellent pub right on the doorstep',
      'The Bold Hotel, Lord Street Southport: 10 minutes away',
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

export interface Itinerary {
  id: string;
  title: string;
  subtitle: string;
  days: 2 | 3 | 5;
  budget: 'value' | 'standard' | 'premium';
  handicapRange: 'any' | 'mid-high' | 'low';
  courses: string[];
  /** Headline green fee per person, worked out from the clubs' own published rates. */
  estimatedCost: string;
  /** What the figure covers: courses, days and months. */
  costNote: string;
  description: string;
  accommodation: string;
  dining: string;
}

// Re-planned 11 Nov 2026 around what visitors can book: Royal Birkdale is fully booked for
// visitors through 2027 and Hillside is closed to visitors until mid-March 2027. Costs are
// sums of each club's published per-person rates; S&A (booking portal) and Old Links
// (2025-26 table only) publish no figure for this season, so they are named, not priced.
export const SEFTON_ITINERARIES: Itinerary[] = [
  {
    id: '2-day-winter',
    title: '2-Day Winter Links',
    subtitle: 'Two courses that take visitor bookings online this winter',
    days: 2,
    budget: 'standard',
    handicapRange: 'any',
    courses: ['west-lancashire', 'formby'],
    estimatedCost: '£275 pp',
    costNote: 'Weekday green fees at both clubs, November 2026 to February 2027',
    description: "West Lancashire and Formby both publish winter visitor rates and take bookings online. Saturday and Sunday are members' competition days at Formby, so a midweek pair of rounds is the easier booking.",
    accommodation: 'Formby or Crosby are the nearest towns to these two courses. Southport has the widest choice of hotels.',
    dining: "Ask at each clubhouse what food is served on the day you play. West Lancashire's winter green fee includes tea or coffee and a bacon roll on arrival.",
  },
  {
    id: '3-day-coast',
    title: '3-Day Classic',
    subtitle: 'Three courses between Blundellsands and Ainsdale',
    days: 3,
    budget: 'standard',
    handicapRange: 'any',
    courses: ['west-lancashire', 'formby', 'southport-ainsdale'],
    estimatedCost: '£275 pp plus S&A',
    costNote: 'West Lancashire and Formby on weekdays, November 2026 to February 2027. S&A shows its rates on its booking portal.',
    description: 'All three take visitors this winter and book online. Southport & Ainsdale does not print a fee table: its rates are on its booking portal and vary with demand, time of day and time of year.',
    accommodation: 'Southport for the widest choice, or Formby, which sits between the three courses.',
    dining: 'Ask at each clubhouse what food is served on the day you play.',
  },
  {
    id: '5-day-tour',
    title: '5-Day Coast Tour',
    subtitle: 'Five courses, from mid-March 2027',
    days: 5,
    budget: 'premium',
    handicapRange: 'any',
    courses: ['west-lancashire', 'formby', 'southport-ainsdale', 'hillside', 'southport-old-links'],
    estimatedCost: '£510 pp plus S&A and Old Links',
    costNote: 'West Lancashire, Formby and Hillside on weekdays in late March 2027. Ask S&A and Old Links for their rates.',
    description: 'Royal Birkdale is fully booked for visitors through 2027, so this tour covers the other five courses and works north from Blundellsands to Churchtown. Hillside is closed to visitors until mid-March 2027, so plan it for late March or later.',
    accommodation: 'Southport, which is closest to Hillside, Southport & Ainsdale and Old Links.',
    dining: 'Ask at each clubhouse what food is served on the day you play.',
  },
  {
    id: '2-day-value',
    title: '2-Day Value',
    subtitle: 'Two courses at either end of the coast',
    days: 2,
    budget: 'value',
    handicapRange: 'any',
    courses: ['southport-old-links', 'west-lancashire'],
    estimatedCost: '£120 pp plus Old Links',
    costNote: "West Lancashire on a weekday, November 2026 to February 2027. Ask Old Links for this season's rates.",
    description: "Southport Old Links, nine holes with 18 different tees in Churchtown, takes visitors on weekdays and Saturdays. West Lancashire's winter weekday rate is £120 per person, with tea or coffee and a bacon roll on arrival.",
    accommodation: 'Southport is closest to Old Links; Crosby is closest to West Lancashire.',
    dining: 'Ask at each clubhouse what food is served on the day you play.',
  },
];
