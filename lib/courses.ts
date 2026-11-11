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
  /** Town for the postal address in the JSON-LD (the clubs are not all in Southport). */
  locality: string;
  postcode: string;
  latitude: number;
  longitude: number;
  par: number;
  yardage: number; // back tees
  /** Tees as each club publishes them on its own scorecard (see scorecardUrl). */
  tees: TeeData[];
  /** Back-tee course and slope rating, only where the club publishes one for those tees. */
  courseRating?: number;
  slopeRating?: number;
  /** The club page the tee figures were read from, on SCORECARDS_READ. */
  scorecardUrl: string;
  /** Anything a reader should know about the figures, e.g. no rating published. */
  scorecardNote?: string;
  /** What the club publishes, for display. Not a number when the club publishes no visitor rate. */
  greenFeeRange: string;
  /** Lowest published per-person rate, or null when the club publishes none for this season. */
  greenFeeFrom: number | null;
  greenFeeTo: number | null;
  /** The months or condition the published range covers. */
  greenFeeNote?: string;
  visitorPolicy: string;
  /**
   * What the club's own visitor page says now: fully booked, closed to visitors,
   * or taking bookings online. Shown as a label on the home, course, tee time
   * and scorecard pages. Check it whenever the visitor copy is updated.
   */
  visitorStatus: 'booked' | 'closed' | 'online';
  visitorDays: string;
  advanceBooking: string;
  bookingUrl: string;
  phone?: string;
  email?: string;
  website: string;
  /** Maximum men's handicap, only where the club publishes one. */
  handicapLimit?: number;
  majorHistory?: string[];
  highlights: string[];
  practicalNotes: string[];
  nearbyDining: string[];
  distanceFromBirkdale: string; // in miles
  /** The nearest station, only where the club or the rail operator says so. */
  byTrain?: string;
  openChampionship: boolean;
  featured: boolean;
  image?: string; // path relative to /public, e.g. '/images/courses/royal-birkdale.jpg'
}

/** When the tee yardages, pars and ratings below were read from the clubs' own pages. */
export const SCORECARDS_READ = '11 November 2026';

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
    locality: 'Southport',
    postcode: 'PR8 2LX',
    latitude: 53.6095,
    longitude: -3.0428,
    par: 70,
    yardage: 7176,
    // Back tees: the sum of the hole yardages on royalbirkdale.com/the-course (the 6th
    // and 18th are par 4s from there). Visitor tees: the range on royalbirkdale.com/visitors.
    tees: [
      { name: 'Back tees', yardage: 7176, par: 70 },
      { name: 'Longest visitor tee', yardage: 6736, par: 72 },
      { name: 'Shortest visitor tee', yardage: 4877, par: 72 },
    ],
    scorecardUrl: 'https://royalbirkdale.com/the-course/',
    scorecardNote: 'Royal Birkdale lists hole yardages on its course page and four visitor tees, from 4,877 to 6,736 yards, on its visitors page. From the back tees the 6th and 18th are par 4s. The club publishes no course or slope rating.',
    greenFeeRange: 'Not published',
    greenFeeFrom: null,
    greenFeeTo: null,
    greenFeeNote: 'Fully booked for visitors through 2027',
    visitorPolicy: 'The club says visitor tee times are fully booked throughout 2026 and 2027, including its Birkdale Open Experience Package. Check its website for 2028 availability.',
    visitorStatus: 'booked',
    visitorDays: 'Fully booked for visitors through 2027.',
    advanceBooking: 'Fully booked through 2027. The club asks golfers to check back for 2028 availability.',
    bookingUrl: 'https://www.royalbirkdale.com',
    phone: '01704 552020',
    website: 'https://www.royalbirkdale.com',
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
      'Arnold Palmer won here in 1961, with a famous 6-iron from the base of a bush at the 15th (now the 16th)',
    ],
    practicalNotes: [
      'Ask the club about handicap requirements when you book',
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
    // National Rail lists Hillside station on Waterloo Road, PR8 4QR.
    byTrain: 'Hillside station (Merseyrail Northern Line), on Waterloo Road like the club',
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
    locality: 'Southport',
    postcode: 'PR8 2LU',
    latitude: 53.6068,
    longitude: -3.0412,
    par: 72,
    yardage: 7109,
    tees: [
      { name: 'Black', yardage: 7109, par: 72, rating: 75.2, slope: 138 },
      { name: 'White', yardage: 6830, par: 72, rating: 74.2, slope: 137 },
      { name: 'Blue', yardage: 6571, par: 72, rating: 72.6, slope: 136 },
      { name: 'Yellow', yardage: 6151, par: 72, rating: 70.6, slope: 128 },
      { name: 'Red', yardage: 5881, par: 75, rating: 75.3, slope: 140 },
    ],
    courseRating: 75.2,
    slopeRating: 138,
    scorecardUrl: 'https://www.hillside-golfclub.co.uk/the-course/course-overview/',
    greenFeeRange: '£195–£352',
    greenFeeFrom: 195,
    greenFeeTo: 352,
    greenFeeNote: '2027 rates; closed to visitors until mid-March 2027',
    visitorPolicy: 'Closed to visitors for winter maintenance from 19 October 2026 to mid-March 2027. Visitor enquiries go to the Secretary\'s Office.',
    visitorStatus: 'closed',
    visitorDays: 'Closed to visitors until mid-March 2027. Ask the Secretary\'s Office about dates after that.',
    advanceBooking: "Contact the Secretary's Office on 01704 567169. The spring visitor rate starts in March 2027.",
    bookingUrl: 'https://www.hillside-golfclub.co.uk',
    phone: '01704 567169',
    website: 'https://www.hillside-golfclub.co.uk',
    // From the club's tournaments page (hillside-golfclub.co.uk/heritage/tournaments).
    majorHistory: [
      'Piccadilly Tournament: 1962',
      'Sun Alliance PGA Championship: 1982',
      'British Masters: 2019',
      'Cazoo Classic (DP World Tour): 2022',
      'The Amateur Championship: 2023',
      'The 154th Open: official driving range, 2026',
    ],
    highlights: [
      'Holes including the 11th, 16th and 17th run through valleys in the taller dunes',
      'Immediately adjacent to Royal Birkdale',
      'Its practice ground was the official practice ground for The 154th Open in 2026',
      'Has staged DP World Tour events and R&A championships',
    ],
    practicalNotes: [
      'Ask the club what handicap certificate it asks for',
      'Smart casual dress, spikeless or soft spikes only',
      'Caddies available on request',
      'Manual and electric GPS trolleys (£20) from the Professional Shop; two-seater buggies £35 a round, which can be reserved',
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

The club has hosted the Amateur Championship, the Curtis Cup and the PGA Seniors Championship. Its clubhouse has bars and dining, snooker tables and en-suite Dormy accommodation.`,
    founded: 1884,
    address: 'Golf Road, Freshfield, Formby',
    locality: 'Formby',
    postcode: 'L37 1LQ',
    latitude: 53.5647,
    longitude: -3.0823,
    par: 72,
    yardage: 7128,
    tees: [
      { name: 'Blue', yardage: 7128, par: 72, rating: 76.6, slope: 142 },
      { name: 'White', yardage: 6815, par: 72, rating: 74.7, slope: 143 },
      { name: 'Yellow', yardage: 6502, par: 72, rating: 73.4, slope: 136 },
      { name: 'Red', yardage: 5963, par: 72 },
      { name: 'Silver', yardage: 5208, par: 72 },
    ],
    courseRating: 76.6,
    slopeRating: 142,
    scorecardUrl: 'https://www.formbygolfclub.co.uk/the-course/course-overview/',
    scorecardNote: 'Formby publishes separate men\'s and women\'s ratings for the red and silver tees, so none is shown for those here.',
    greenFeeRange: '£155–£350',
    greenFeeFrom: 155,
    greenFeeTo: 350,
    greenFeeNote: 'November 2026 to September 2027',
    visitorPolicy: 'Visitors welcome. A current recognised handicap certificate is requested: maximum 28 for men and 36 for women.',
    visitorStatus: 'online',
    visitorDays: 'Saturday and Sunday are members\' competition days. Check the online tee sheet for availability.',
    advanceBooking: 'Book online, call 01704 872164 or email teetimes@formbygolfclub.co.uk.',
    bookingUrl: 'https://www.brsgolf.com/formby/visitor_home.php',
    phone: '01704 872164',
    website: 'https://www.formbygolfclub.co.uk',
    handicapLimit: 28,
    // From the club's history page (formbygolfclub.co.uk/club/history).
    majorHistory: [
      'Amateur Championship: 1957, 1967, 1984, 2009',
      'Curtis Cup: 2004',
      'Arnold Palmer Cup: 2016',
      'PGA Seniors Championship: 2021, 2022',
    ],
    highlights: [
      'Mature sand dunes, undulating fairways and views of the Irish Sea',
      'Founded in 1884',
      'Has hosted the Amateur Championship four times, the Curtis Cup in 2004 and the PGA Seniors Championship',
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
    locality: 'Blundellsands',
    postcode: 'L23 8SZ',
    latitude: 53.4892,
    longitude: -3.0621,
    par: 72,
    yardage: 7016,
    tees: [
      { name: 'Black', yardage: 7016, par: 72 },
      { name: 'White', yardage: 6706, par: 72 },
      { name: 'Yellow', yardage: 6246, par: 71 },
      { name: 'Blue', yardage: 5460, par: 70 },
      { name: 'Red (women)', yardage: 5849, par: 74 },
    ],
    scorecardUrl: 'https://www.westlancashiregolf.co.uk/the-course/course-overview/',
    scorecardNote: 'West Lancashire publishes its course and slope ratings as a picture of a table on the same page, so they are not copied here.',
    greenFeeRange: '£120–£250',
    greenFeeFrom: 120,
    greenFeeTo: 250,
    greenFeeNote: 'November 2026 to April 2027',
    visitorPolicy: 'Visitors book online. The club publishes weekday and weekend rates for each season.',
    visitorStatus: 'online',
    visitorDays: 'The club says visitors are welcome. Check its online booking page for tee times.',
    advanceBooking: 'Book online through the club\'s visitor booking page.',
    bookingUrl: 'https://visitors.brsgolf.com/westlancashire',
    phone: '0151 924 1076',
    website: 'https://www.westlancashiregolf.co.uk',
    majorHistory: [
      'Final Qualifying for The Open: 2023 to 2026',
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
      'Ask the club what handicap certificate it asks for',
      'Further from Southport: factor into multi-day itinerary',
      'Six buggies for hire at £45 a round, which can be reserved',
    ],
    nearbyDining: [
      'The winter green fee (November 2026 to February 2027) includes tea or coffee and a bacon roll on arrival',
      'Hall Road station is 50 yards from the club entrance, on the line between Liverpool Central and Southport',
    ],
    distanceFromBirkdale: '8',
    // westlancashiregolf.co.uk/contact/how-to-find-us
    byTrain: 'Hall Road station (Merseyrail Northern Line), which the club says is 50 yards from its entrance',
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
    locality: 'Southport',
    postcode: 'PR8 3LG',
    latitude: 53.5882,
    longitude: -3.0441,
    par: 72,
    yardage: 7007,
    tees: [
      { name: 'Black', yardage: 7007, par: 72 },
      { name: 'White', yardage: 6797, par: 72, rating: 74.6, slope: 140 },
      { name: 'Yellow', yardage: 6389, par: 72, rating: 72.5, slope: 134 },
      { name: 'Red', yardage: 5660, par: 71, rating: 68.9, slope: 125 },
      { name: 'Red (women)', yardage: 5637, par: 73, rating: 74.6, slope: 140 },
    ],
    scorecardUrl: 'https://www.sandagolfclub.co.uk/golf/course-overview/',
    scorecardNote: 'The club publishes two ratings for its black tees without saying which matches the black yardage on its scorecard, so none is shown for them here.',
    greenFeeRange: 'On booking portal',
    greenFeeFrom: null,
    greenFeeTo: null,
    greenFeeNote: 'Rates vary with demand, time of day and season',
    visitorPolicy: 'Visitors welcome all year. Groups of more than 12 contact the club\'s golf coordinator.',
    visitorStatus: 'online',
    visitorDays: 'Visitors welcome all year; tee times are hardest to get from late April to late September.',
    advanceBooking: 'Book on the club\'s online booking portal; groups of more than 12 contact the Golf Operations Manager.',
    bookingUrl: 'https://www.sandagolfclub.co.uk',
    phone: '01704 578000',
    website: 'https://www.sandagolfclub.co.uk',
    // From the club's history and Ryder Cup pages (sandagolfclub.co.uk/heritage).
    majorHistory: [
      'Ryder Cup: 1933 and 1937',
      'The Amateur Championship: 1984, 2005 and 2023',
      'British Ladies Amateur Championship: 1936',
    ],
    highlights: [
      'Ryder Cup venue 1933 and 1937',
      'Used by The R&A for the Amateur Championship',
      'Society packages available',
      'Visitors welcome all year',
    ],
    practicalNotes: [
      'Ask the club what handicap certificate it asks for',
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
    locality: 'Southport',
    postcode: 'PR9 7QS',
    latitude: 53.6702,
    longitude: -2.9961,
    par: 72,
    yardage: 6460,
    tees: [
      { name: 'White', yardage: 6460, par: 72, rating: 72.4, slope: 125 },
      { name: 'Gold', yardage: 6327, par: 72, rating: 71.8, slope: 125 },
      { name: 'Black (women)', yardage: 5709, par: 72, rating: 74.6, slope: 128 },
    ],
    courseRating: 72.4,
    slopeRating: 125,
    scorecardUrl: 'https://www.southportoldlinksgolfclub.co.uk/course-guide',
    greenFeeRange: 'Ask the club',
    greenFeeFrom: null,
    greenFeeTo: null,
    greenFeeNote: 'Call 01704 228207 (option 5) for this season\'s rates',
    visitorPolicy: 'Visitors book tee times on weekdays and Saturdays, online up to seven days ahead.',
    visitorStatus: 'online',
    visitorDays: 'Weekdays and Saturdays. Phone ahead to check.',
    advanceBooking: 'Online booking opens seven days ahead. For bookings further ahead, call the office on 01704 228207 (option 5).',
    bookingUrl: 'https://solgc.hub.clubv1.com/visitors/booking',
    phone: '01704 228207',
    website: 'https://www.southportoldlinksgolfclub.co.uk',
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
