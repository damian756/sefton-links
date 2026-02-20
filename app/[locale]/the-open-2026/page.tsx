import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Trophy, MapPin, Calendar, Ticket, Bed, ChevronRight, ExternalLink, Users, Clock } from 'lucide-react';
import OpenCountdown from '@/components/OpenCountdown';
import type { Metadata } from 'next';
import { BASE_URL, buildAlternates } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'The Open Championship 2026 — Royal Birkdale Guide | SeftonLinks',
    description:
      'Your complete guide to The 155th Open Championship at Royal Birkdale, Southport, July 16–19 2026. History, past champions, tickets, accommodation, course guide and travel advice.',
    alternates: buildAlternates('/the-open-2026'),
    openGraph: {
      title: 'The Open Championship 2026 — Royal Birkdale',
      description: 'The 155th Open Championship at Royal Birkdale, Southport. July 16–19, 2026. Full visitor guide.',
      url: `${BASE_URL}/the-open-2026`,
    },
  };
}

const PAST_CHAMPIONS = [
  { year: 2017, name: 'Jordan Spieth', country: '🇺🇸 USA', score: '-12', note: 'Wire-to-wire — memorable drop zone escape on 13' },
  { year: 2008, name: 'Pádraig Harrington', country: '🇮🇪 IRL', score: '-3', note: 'Second consecutive Claret Jug' },
  { year: 1998, name: 'Mark O\'Meara', country: '🇺🇸 USA', score: '-9', note: 'First Major at 41' },
  { year: 1991, name: 'Ian Baker-Finch', country: '🇦🇺 AUS', score: '-8', note: 'Front nine 29 in final round' },
  { year: 1983, name: 'Tom Watson', country: '🇺🇸 USA', score: '-5', note: 'Fifth and final Open title' },
  { year: 1976, name: 'Johnny Miller', country: '🇺🇸 USA', score: '-9', note: 'Wire-to-wire victory' },
  { year: 1971, name: 'Lee Trevino', country: '🇺🇸 USA', score: '-1', note: 'Third consecutive Major in six weeks' },
  { year: 1965, name: 'Peter Thomson', country: '🇦🇺 AUS', score: '-2', note: 'Fifth Open Championship' },
  { year: 1961, name: 'Arnold Palmer', country: '🇺🇸 USA', score: '+3', note: 'Palmer\'s legendary iron recovery from a bush on 15' },
  { year: 1954, name: 'Peter Thomson', country: '🇦🇺 AUS', score: '+2', note: 'First of five Open titles' },
];

const TICKET_INFO = [
  { type: 'Practice Rounds (Mon–Wed)', price: 'TBC', note: 'Usually most accessible tickets, good course access' },
  { type: 'Championship Days (Thu–Sun)', price: 'TBC', note: 'Book via TheOpen.com as soon as available' },
  { type: 'Junior Tickets', price: 'Free (under 16)', note: 'Must be accompanied by a valid adult ticket holder' },
];

const ACCOMMODATION_GUIDE = [
  {
    area: 'Birkdale & Southport',
    desc: 'Walking distance or short taxi to Royal Birkdale. The Bold Hotel on Lord Street is the traditional choice. Book 12+ months ahead for Open week.',
    distance: '< 2 miles',
    price: '£££',
  },
  {
    area: 'Formby Village',
    desc: 'B&Bs and holiday lets in a quieter setting, 20 min drive to Birkdale. FormbyGuide.co.uk has local accommodation listings.',
    distance: '~5 miles',
    price: '££',
  },
  {
    area: 'Liverpool City Centre',
    desc: 'Wide hotel choice, 45–60 min by car or train. Better availability but requires daily travel.',
    distance: '~18 miles',
    price: '££',
  },
  {
    area: 'Manchester',
    desc: 'Direct motorway access, 60–75 min. Useful if combining with other travel.',
    distance: '~40 miles',
    price: '££',
  },
];

export default async function OpenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'open' });
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'SportsEvent',
                '@id': `${BASE_URL}/the-open-2026`,
                name: 'The 155th Open Championship',
                alternateName: 'The Open Championship 2026',
                startDate: '2026-07-16',
                endDate: '2026-07-19',
                eventStatus: 'https://schema.org/EventScheduled',
                location: {
                  '@type': 'GolfCourse',
                  name: 'Royal Birkdale Golf Club',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Waterloo Road',
                    addressLocality: 'Southport',
                    postalCode: 'PR8 2LX',
                    addressCountry: 'GB',
                  },
                  geo: { '@type': 'GeoCoordinates', latitude: 53.6095, longitude: -3.0428 },
                },
                organizer: { '@type': 'Organization', name: 'The R&A', url: 'https://www.theopen.com' },
                url: 'https://www.theopen.com',
                description: 'The 155th Open Championship, the oldest Major in golf, returns to Royal Birkdale Golf Club in Southport.',
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
                  { '@type': 'ListItem', position: 2, name: 'The Open 2026', item: `${BASE_URL}/the-open-2026` },
                ],
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'When is The Open Championship 2026?',
                    acceptedAnswer: { '@type': 'Answer', text: 'The 155th Open Championship is scheduled for 16–19 July 2026 at Royal Birkdale Golf Club, Southport.' },
                  },
                  {
                    '@type': 'Question',
                    name: 'Where is The Open Championship 2026?',
                    acceptedAnswer: { '@type': 'Answer', text: 'Royal Birkdale Golf Club, Waterloo Road, Birkdale, Southport, PR8 2LX.' },
                  },
                  {
                    '@type': 'Question',
                    name: 'How do I get tickets for The Open 2026?',
                    acceptedAnswer: { '@type': 'Answer', text: 'Tickets are available via TheOpen.com. Championship day tickets sell out quickly. Practice round tickets are typically more available.' },
                  },
                  {
                    '@type': 'Question',
                    name: 'Where should I stay for The Open Championship at Royal Birkdale?',
                    acceptedAnswer: { '@type': 'Answer', text: 'Hotels in Southport, particularly near Lord Street and Birkdale, are closest to the venue. Book 12+ months in advance. Formby (5 miles south) offers quieter B&B options.' },
                  },
                ],
              },
            ],
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-[#0D1B2A] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 80%, #B8912A 0%, transparent 50%), radial-gradient(circle at 80% 20%, #1A4A30 0%, transparent 60%)',
          }}
        />
        <div className="relative container mx-auto px-4 max-w-7xl py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-[#B8912A]/20 border border-[#B8912A]/40 rounded-full px-4 py-1.5 mb-6">
            <Trophy size={13} className="text-[#B8912A]" />
            <span className="text-[#D4AE7A] text-xs font-semibold uppercase tracking-widest">The 155th Open Championship</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            The Open Championship<br />
            <span className="text-[#B8912A]">Royal Birkdale 2026</span>
          </h1>

          <p className="text-white/70 text-xl mb-3">{t('dates')}</p>
          <p className="text-white/50 text-sm mb-10 flex items-center justify-center gap-2">
            <MapPin size={13} /> {t('venue')}
          </p>

          <div className="mb-10">
            <p className="text-[#D4AE7A] text-sm uppercase tracking-widest mb-5 font-medium">
              {t('countdown')}
            </p>
            <OpenCountdown variant="hero" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.theopen.com/tickets"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#B8912A] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#D4AE7A] transition-colors"
            >
              <Ticket size={18} /> Get Tickets via TheOpen.com ↗
            </a>
            <Link
              href={`${prefix}/courses/royal-birkdale`}
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              <Trophy size={18} /> Royal Birkdale Course Guide
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-7xl py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-14">

            {/* About the event */}
            <section>
              <h2 className="font-display text-3xl font-bold text-[#0D1B2A] mb-6">The Open Championship at Royal Birkdale</h2>
              <div className="prose prose-slate max-w-none text-[#2C3E50]/80 space-y-4">
                <p>
                  The Open Championship — the oldest Major in golf and the only one played outside North America — returns to Royal Birkdale for the 11th time in July 2026. No other venue on the Open rota has hosted more frequently, a record that reflects both the quality of the course and its exceptional logistical suitability for a major championship.
                </p>
                <p>
                  Royal Birkdale is a links in the truest sense. Fairways run between towering sand dunes that funnel the coastal wind in unpredictable ways. The willow scrub rough — a Birkdale signature — is punishing but navigable. Greens are small, fast and subtly contoured. Championship conditions produce scoring that typically ends around level par or better for the winner, but only when the weather cooperates. When it doesn't, Birkdale becomes one of the most demanding tests in world golf.
                </p>
                <p>
                  The 2017 Open delivered one of the most dramatic finishes in recent memory. Jordan Spieth, leading wire-to-wire, made a triple bogey on 13 after pulling his tee shot into an area containing TV equipment. His subsequent decision to take relief under the drop zone rule — combined with a remarkable pitch to within feet of the hole — became one of the defining images of modern Major championship golf.
                </p>
                <p>
                  For golf tourists, The Open at Royal Birkdale represents a unique opportunity: the world's most prestigious golf event, at one of England's greatest links courses, in a compact and accessible setting. Spectator access throughout the course is excellent, the atmosphere is distinctly British, and the food and entertainment village has improved considerably in recent editions.
                </p>
              </div>
            </section>

            {/* Past Champions */}
            <section>
              <h2 className="font-display text-3xl font-bold text-[#0D1B2A] mb-6">Past Champions at Royal Birkdale</h2>
              <div className="space-y-3">
                {PAST_CHAMPIONS.map((c, i) => (
                  <div key={c.year} className={`flex items-start gap-4 rounded-xl p-4 border ${i === 0 ? 'bg-[#B8912A]/8 border-[#B8912A]/25' : 'bg-white border-[#E8E3D8]'}`}>
                    <div className="text-center min-w-[52px]">
                      <div className="font-display font-bold text-[#B8912A] text-lg leading-none">{c.year}</div>
                      <div className="font-mono text-[#0D1B2A] font-bold text-sm mt-1">{c.score}</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3">
                        <span className="font-display font-bold text-[#0D1B2A] text-lg">{c.name}</span>
                        <span className="text-[#2C3E50]/50 text-sm">{c.country}</span>
                      </div>
                      <p className="text-[#2C3E50]/60 text-sm mt-0.5 italic">"{c.note}"</p>
                    </div>
                    {i === 0 && (
                      <div className="bg-[#B8912A] text-white text-xs font-bold px-2 py-1 rounded-full shrink-0">
                        Last winner
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Tickets */}
            <section>
              <h2 className="font-display text-3xl font-bold text-[#0D1B2A] mb-3">{t('ticketsTitle')}</h2>
              <div className="bg-[#B8912A]/8 border border-[#B8912A]/25 rounded-xl p-6 mb-6">
                <p className="text-[#0D1B2A] font-semibold mb-2">Tickets sold via TheOpen.com only</p>
                <p className="text-[#2C3E50]/70 text-sm leading-relaxed">
                  The R&A sells all tickets directly. There is no official third-party seller. Championship day tickets (Thursday–Sunday) sell out quickly — often within hours of release. Register for the R&A waiting list and ballot at TheOpen.com now.
                </p>
              </div>
              <div className="overflow-x-auto rounded-xl border border-[#E8E3D8]">
                <table className="w-full text-sm bg-white">
                  <thead className="bg-[#0D1B2A] text-white">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold">Ticket Type</th>
                      <th className="text-center px-4 py-3 font-semibold">Price</th>
                      <th className="text-left px-4 py-3 font-semibold">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TICKET_INFO.map((t, i) => (
                      <tr key={t.type} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F5EE]'}>
                        <td className="px-4 py-3 font-medium text-[#0D1B2A]">{t.type}</td>
                        <td className="px-4 py-3 text-center text-[#1A4A30] font-semibold">{t.price}</td>
                        <td className="px-4 py-3 text-[#2C3E50]/65">{t.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-5 flex gap-4">
                <a
                  href="https://www.theopen.com/tickets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#B8912A] text-white font-semibold px-5 py-3 rounded-lg hover:bg-[#D4AE7A] transition-colors text-sm"
                >
                  <Ticket size={15} /> Get Tickets — TheOpen.com ↗
                </a>
              </div>
            </section>

            {/* Accommodation */}
            <section>
              <h2 className="font-display text-3xl font-bold text-[#0D1B2A] mb-3">{t('stayTitle')}</h2>
              <p className="text-[#2C3E50]/70 mb-6">
                Accommodation within 10 miles of Royal Birkdale books out 12–18 months before Open week. If you haven't booked yet, look at Liverpool or Formby as alternatives — both are manageable with early planning.
              </p>
              <div className="space-y-4">
                {ACCOMMODATION_GUIDE.map((a) => (
                  <div key={a.area} className="bg-white border border-[#E8E3D8] rounded-xl p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-[#0D1B2A]">{a.area}</h3>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-[#2C3E50]/50">{a.distance}</span>
                        <span className="text-[#1A4A30] font-semibold">{a.price}</span>
                      </div>
                    </div>
                    <p className="text-[#2C3E50]/65 text-sm leading-relaxed">{a.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="https://www.southportguide.co.uk/hotels"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#1A4A30] text-[#1A4A30] font-semibold px-5 py-2.5 rounded-lg hover:bg-[#1A4A30] hover:text-white transition-colors text-sm"
                >
                  <Bed size={15} /> Southport Hotels Guide ↗
                </a>
                <a
                  href="https://www.formbyguide.co.uk/accommodation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#2E6B3E] text-[#2E6B3E] font-semibold px-5 py-2.5 rounded-lg hover:bg-[#2E6B3E] hover:text-white transition-colors text-sm"
                >
                  <Bed size={15} /> Formby Accommodation ↗
                </a>
              </div>
            </section>

            {/* Visitor guide */}
            <section>
              <h2 className="font-display text-3xl font-bold text-[#0D1B2A] mb-6">Visitor Guide — What to Expect</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: MapPin,
                    title: 'Getting There',
                    items: [
                      'Postcode: PR8 2LX (Royal Birkdale main entrance)',
                      'Southport town centre ~2 miles — shuttle buses during Open week',
                      'Liverpool Airport: 45 min by car',
                      'Manchester Airport: 65 min by car',
                      'Merseyrail to Birkdale station: 8-min walk to course',
                    ],
                  },
                  {
                    icon: Clock,
                    title: 'On the Day',
                    items: [
                      'Gates open 2 hours before first tee time',
                      'Dress code: smart casual, flat shoes recommended',
                      'Mobile phones permitted (silent mode, no video)',
                      'Cash and cards accepted throughout',
                      'Official merchandise pavilion — queue early',
                    ],
                  },
                  {
                    icon: Users,
                    title: 'Spectator Tips',
                    items: [
                      'Practice days offer closest course access and photo opportunities',
                      'Holes 17 and 18 pack out — position early for finish',
                      'The 1st and 13th tees give good early views of field size',
                      'Birkdale\'s natural dune grandstands require good shoes',
                      'Check R&A app for real-time leaderboard and player tracking',
                    ],
                  },
                  {
                    icon: Trophy,
                    title: 'Play the Course',
                    items: [
                      'Visitor tee times restart after championship setup is removed',
                      'Post-Open tee times book fast — Royal Birkdale handles direct',
                      'Combine with Hillside or S&A for a full Birkdale area trip',
                      'Caddies available — book well in advance for premium experience',
                    ],
                  },
                ].map(({ icon: Icon, title, items }) => (
                  <div key={title} className="bg-white border border-[#E8E3D8] rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon size={16} className="text-[#1A4A30]" />
                      <h3 className="font-semibold text-[#0D1B2A]">{title}</h3>
                    </div>
                    <ul className="space-y-1.5">
                      {items.map((item) => (
                        <li key={item} className="text-[#2C3E50]/65 text-sm flex items-start gap-2">
                          <span className="text-[#B8912A] mt-1.5 shrink-0">–</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick facts */}
            <div className="bg-[#0D1B2A] rounded-xl p-5 text-white">
              <h3 className="font-display text-lg font-bold text-[#D4AE7A] mb-4">Quick Facts</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: 'Championship Number', value: '155th Open' },
                  { label: 'Venue', value: 'Royal Birkdale GC' },
                  { label: 'Location', value: 'Southport, PR8 2LX' },
                  { label: 'Dates', value: '16–19 July 2026' },
                  { label: 'Practice Days', value: '13–15 July 2026' },
                  { label: 'Defending Champion', value: 'Brian Harman (2023)' },
                  { label: 'Organiser', value: 'The R&A' },
                  { label: 'Times hosted at Birkdale', value: '11 (since 1954)' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-2">
                    <span className="text-white/50 shrink-0">{label}</span>
                    <span className="text-white font-medium text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Official links */}
            <div className="bg-white border border-[#E8E3D8] rounded-xl p-5">
              <h3 className="font-semibold text-[#0D1B2A] mb-3">Official Links</h3>
              <div className="space-y-2">
                {[
                  { label: 'The Open Championship Official Site', url: 'https://www.theopen.com' },
                  { label: 'Royal Birkdale Golf Club', url: 'https://www.royalbirkdale.com' },
                  { label: 'R&A — Ticket Ballot', url: 'https://www.theopen.com/tickets' },
                  { label: 'Southport Visitor Information', url: 'https://www.southportguide.co.uk' },
                ].map(({ label, url }) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[#1A4A30] hover:text-[#B8912A] transition-colors py-1"
                  >
                    <ExternalLink size={12} className="shrink-0" />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Book accommodation */}
            <div className="bg-[#1A4A30] rounded-xl p-5 text-white">
              <h3 className="font-display text-lg font-bold mb-2">Book Accommodation</h3>
              <p className="text-white/70 text-sm mb-4">
                Don't leave it. Open week accommodation books out fast. Book via Booking.com for the widest choice and flexible cancellation.
              </p>
              <a
                href="https://www.booking.com/searchresults.html?ss=Southport"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex items-center justify-center gap-2 bg-[#B8912A] text-white font-semibold px-4 py-3 rounded-lg hover:bg-[#D4AE7A] transition-colors text-sm w-full"
              >
                <Bed size={15} /> Search Southport Hotels ↗
              </a>
              <p className="text-white/35 text-xs mt-2 text-center">Booking.com affiliate link</p>
            </div>

            {/* Course guide link */}
            <div className="bg-white border border-[#E8E3D8] rounded-xl p-5">
              <h3 className="font-semibold text-[#0D1B2A] mb-2 flex items-center gap-2">
                <Trophy size={15} className="text-[#B8912A]" /> Play Royal Birkdale
              </h3>
              <p className="text-[#2C3E50]/60 text-sm mb-3">
                Planning a round before or after The Open? Green fees, visitor policy and booking guide.
              </p>
              <Link
                href={`${prefix}/courses/royal-birkdale`}
                className="text-[#1A4A30] text-sm font-semibold hover:text-[#B8912A] transition-colors flex items-center gap-1"
              >
                Royal Birkdale course guide <ChevronRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
