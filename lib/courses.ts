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
    tagline: 'Eleven Opens since 1954; Ryan Fox won the 154th here in 2026',
    description: `Royal Birkdale sits among towering sand dunes in Southport. It hosted The Open for the 11th time in July 2026, when Ryan Fox won with a birdie on the 72nd hole.

The club was founded in 1889, and the course was extensively redesigned in 1922 to create the current layout, which winds between sand dunes that tower over the fairways. The club offers four tee options, from 4,877 to 6,736 yards, and asks golfers who want to play the longest tees to get approval from its office.

The club says its visitor tee times are fully booked throughout 2026 and 2027, including its Birkdale Open Experience Package, and asks golfers to check its website for 2028 availability.`,
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
    visitorPolicy: 'The club says visitor tee times are fully booked throughout 2026 and 2027, including its Birkdale Open Experience Package. Check its website for 2028 availability.',
    visitorDays: 'Fully booked for visitors through 2027.',
    advanceBooking: 'Fully booked through 2027. The club asks golfers to check back for 2028 availability.',
    bookingUrl: 'https://www.royalbirkdale.com',
    phone: '01704 552020',
    website: 'https://www.royalbirkdale.com',
    difficulty: 'championship',
    handicapLimit: 24,
    majorHistory: [
      'The Open Championship: 1954, 1961, 1965, 1971, 1976, 1983, 1991, 1998, 2008, 2017, 2026',
      'Ryder Cup: 1965 and 1969, the year of the famous concession',
      'Women\'s Open: six times, from 1982 to 2014',
      'Senior Open: 2013',
      'Walker Cup: 1951',
      'Curtis Cup: 1948',
    ],
    highlights: [
      'Since first hosting The Open in 1954, the most regular Open venue apart from St Andrews',
      'Visitors play as Members for the Day, with use of the clubhouse and practice facilities',
      'Willow scrub in the rough: a Royal Birkdale feature',
      'No two consecutive holes play in the same direction',
      'Arnold Palmer won here in 1961, with a famous 6-iron from the base of a bush at the 15th (now the 16th)',
    ],
    practicalNotes: [
      'Handicap certificate required: men 24, ladies 36',
      'Dress code: collared shirt tucked in and golf shoes; no jeans, tracksuits, round-neck T-shirts or training shoes',
      'Caddies available, advance booking recommended',
      'Buggies only with a medical certificate',
      'In the clubhouse, golf attire is fine on the ground floor; headwear comes off indoors',
    ],
    nearbyDining: [
      'The Bold Hotel, 583 Lord Street: a hotel with a restaurant and bar',
      'The Vincent Hotel, 98 Lord Street: a hotel with the V Café & Restaurant and a cocktail bar',
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
    description: `Hillside sits immediately next to Royal Birkdale and shares the same duneland. The club's green fee table lists its winter rate as closed for maintenance from 19 October 2026 to mid-March 2027. Its spring rate starts in March 2027.

From 1960 the club rebuilt several holes, including the 11th, 16th and 17th, through valleys in the taller dunes. Its practice ground served as the official practice ground for The 154th Open at Royal Birkdale in 2026, and the club has staged DP World Tour events and R&A championships.`,
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
      'Holes including the 11th, 16th and 17th run through valleys in the taller dunes',
      'Immediately adjacent to Royal Birkdale',
      'Its practice ground was the official practice ground for The 154th Open in 2026',
      'Has staged DP World Tour events and R&A championships',
    ],
    practicalNotes: [
      'Handicap certificate required',
      'Smart casual dress, spikeless or soft spikes only',
      'Caddies available on request',
      'Club hire available',
    ],
    nearbyDining: [
      'Royal Birkdale is next door: see its page for two hotels on Lord Street',
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

The club has hosted the Amateur Championship and the PGA Seniors Championship. Its clubhouse has bars and dining, snooker tables and en-suite Dormy accommodation.`,
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
      'Amateur Championship',
      'PGA Seniors Championship',
    ],
    highlights: [
      'Mature sand dunes, undulating fairways and views of the Irish Sea',
      'Founded in 1884',
      'Has hosted the Amateur Championship and the PGA Seniors Championship',
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
      'The clubhouse has bars and dining, according to the club',
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
    tagline: 'Founded in 1873 at Blundellsands, at the southern end of the coast',
    description: `West Lancashire Golf Club was founded in 1873 at Blundellsands, at the southern end of the Sefton Coast. The entrance is 50 yards from Hall Road station, on the line between Liverpool Central and Southport.

The club hosted Final Qualifying for The Open from 2023 to 2026 on behalf of The R&A, and hosts R&A and England Golf competitions. Visitors book online. From November 2026 to February 2027 the weekday green fee is £120 per person, with tea or coffee and a bacon roll on arrival.`,
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
    visitorPolicy: 'Visitors book online. The club publishes weekday and weekend rates for each season.',
    visitorDays: 'Monday–Friday preferred. Check availability for Saturdays.',
    advanceBooking: 'Book online through the club\'s visitor booking page.',
    bookingUrl: 'https://visitors.brsgolf.com/westlancashire',
    phone: '0151 924 1076',
    website: 'https://www.westlancashiregolf.co.uk',
    difficulty: 'challenging',
    handicapLimit: 28,
    majorHistory: [
      'Final Qualifying for The Open: 2023 to 2026',
      'English Amateur: 2001',
    ],
    highlights: [
      'Founded in 1873',
      'Final Qualifying venue for The Open from 2023 to 2026',
      'Hosts R&A and England Golf competitions',
      'Irish Sea views throughout',
      '50 yards from Hall Road station',
    ],
    practicalNotes: [
      'Visitors book online',
      'Handicap certificate required',
      'Further from Southport: factor into multi-day itinerary',
      'Limited buggies: this is a walking course',
    ],
    nearbyDining: [
      'The winter green fee (November 2026 to February 2027) includes tea or coffee and a bacon roll on arrival',
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
    tagline: 'Founded in 1906; Ryder Cup venue in 1933 and 1937',
    description: `Southport & Ainsdale, known locally as S&A, was founded in 1906 and hosted the Ryder Cup in 1933 and 1937. The club says The R&A continues to choose it for the Amateur Championship.

The course sits between Hillside and Formby, among coastal dunes and heathland with gorse and heather. Visitors are welcome all year. The club shows its green fees on its online booking portal, where rates vary with demand, time of day and season.`,
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
    visitorPolicy: 'Visitors welcome all year. Groups of more than 12 contact the club\'s golf coordinator.',
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
      'Used by The R&A for the Amateur Championship',
      'Society packages available',
      'Visitors welcome all year',
    ],
    practicalNotes: [
      'Handicap certificate required (28 men, 36 ladies)',
      'Groups of more than 12 contact the golf coordinator',
      'Catering available in clubhouse',
      'Electric trolleys permitted',
    ],
    nearbyDining: [
      'Southport town centre, to the north',
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
    tagline: 'Nine holes with 18 different tees, in Churchtown, Southport',
    description: `Southport Old Links is in Churchtown, on the northern edge of Southport. It is a nine-hole course with 18 different tees. Golfers can book 18 holes or nine.

The club celebrates its centenary in 2026. Visitors can book tee times on weekdays and Saturdays, online up to seven days ahead. For bookings further ahead, the club asks golfers to contact its office on 01704 228207 (option 5).`,
    founded: 1926,
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
    visitorPolicy: 'Visitors book tee times on weekdays and Saturdays, online up to seven days ahead.',
    visitorDays: 'Weekdays and Saturdays. Phone ahead to check.',
    advanceBooking: 'Online booking opens seven days ahead. For bookings further ahead, call the office on 01704 228207 (option 5).',
    bookingUrl: 'https://solgc.hub.clubv1.com/visitors/booking',
    phone: '01704 228207',
    website: 'https://www.southportoldlinksgolfclub.co.uk',
    difficulty: 'accessible',
    majorHistory: [],
    highlights: [
      'Nine holes with 18 different tees; 18-hole and nine-hole rounds',
      'The club describes the course as a test for golfers of all abilities',
      'Located in Churchtown, on the northern edge of Southport',
    ],
    practicalNotes: [
      'Online booking opens seven days ahead',
      'Tee times on weekdays and Saturdays',
      'For golfers new to the game, the club works with Southport Golf Academy in Mere Brow',
    ],
    nearbyDining: [
      'Churchtown village, around the club',
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
    subtitle: 'Two courses that take visitor bookings online, winter 2026 to 2027',
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
    description: 'All three take visitors in winter 2026 to 2027 and book online. Southport & Ainsdale does not print a fee table: its rates are on its booking portal and vary with demand, time of day and time of year.',
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
