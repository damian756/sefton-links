import Link from 'next/link';
import Image from 'next/image';
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
  const tm = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: tm('openTitle'),
    description: tm('openDesc'),
    alternates: buildAlternates('/the-open-2026'),
    openGraph: {
      title: 'The Open Championship 2026 — Royal Birkdale',
      description: 'The 155th Open Championship at Royal Birkdale, Southport. July 16–19, 2026. Full visitor guide.',
      url: `${BASE_URL}/the-open-2026`,
    },
  };
}

const PAST_CHAMPIONS = [
  { year: 2017, name: 'Jordan Spieth', country: '🇺🇸 USA', score: '-12' },
  { year: 2008, name: 'Pádraig Harrington', country: '🇮🇪 IRL', score: '-3' },
  { year: 1998, name: "Mark O'Meara", country: '🇺🇸 USA', score: '-9' },
  { year: 1991, name: 'Ian Baker-Finch', country: '🇦🇺 AUS', score: '-8' },
  { year: 1983, name: 'Tom Watson', country: '🇺🇸 USA', score: '-5' },
  { year: 1976, name: 'Johnny Miller', country: '🇺🇸 USA', score: '-9' },
  { year: 1971, name: 'Lee Trevino', country: '🇺🇸 USA', score: '-1' },
  { year: 1965, name: 'Peter Thomson', country: '🇦🇺 AUS', score: '-2' },
  { year: 1961, name: 'Arnold Palmer', country: '🇺🇸 USA', score: '+3' },
  { year: 1954, name: 'Peter Thomson', country: '🇦🇺 AUS', score: '+2' },
];

export default async function OpenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'open' });
  const tp = await getTranslations({ locale, namespace: 'openPage' });
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
        <Image
          src="/images/the-open-2026.jpg"
          alt="The Claret Jug in front of Royal Birkdale clubhouse"
          fill
          priority
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/55 via-[#0D1B2A]/40 to-[#0D1B2A]/80" />
        <div className="relative container mx-auto px-4 max-w-7xl py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-[#B8912A]/20 border border-[#B8912A]/40 rounded-full px-4 py-1.5 mb-6">
            <Trophy size={13} className="text-[#B8912A]" />
            <span className="text-[#D4AE7A] text-xs font-semibold uppercase tracking-widest">{tp('heroBadge')}</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {tp('heroTitle1')}<br />
            <span className="text-[#B8912A]">{tp('heroTitle2')}</span>
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
              <Ticket size={18} /> {tp('heroBtn1')}
            </a>
            <Link
              href={`${prefix}/courses/royal-birkdale`}
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              <Trophy size={18} /> {tp('heroBtn2')}
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
              <h2 className="font-display text-3xl font-bold text-[#0D1B2A] mb-6">{tp('aboutTitle')}</h2>
              <div className="prose prose-slate max-w-none text-[#2C3E50]/80 space-y-4">
                <p>{tp('aboutPara1')}</p>
                <p>{tp('aboutPara2')}</p>
                <p>{tp('aboutPara3')}</p>
                <p>{tp('aboutPara4')}</p>
              </div>
            </section>

            {/* Past Champions */}
            <section>
              <h2 className="font-display text-3xl font-bold text-[#0D1B2A] mb-6">{tp('pastChampionsTitle')}</h2>
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
                      <p className="text-[#2C3E50]/60 text-sm mt-0.5 italic">&ldquo;{tp(`champNote${c.year}`)}&rdquo;</p>
                    </div>
                    {i === 0 && (
                      <div className="bg-[#B8912A] text-white text-xs font-bold px-2 py-1 rounded-full shrink-0">
                        {tp('lastWinnerBadge')}
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
                <p className="text-[#0D1B2A] font-semibold mb-2">{tp('ticketsAlertTitle')}</p>
                <p className="text-[#2C3E50]/70 text-sm leading-relaxed">
                  {tp('ticketsAlertDesc')}
                </p>
              </div>
              <div className="overflow-x-auto rounded-xl border border-[#E8E3D8]">
                <table className="w-full text-sm bg-white">
                  <thead className="bg-[#0D1B2A] text-white">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold">{tp('ticketTableHeaderType')}</th>
                      <th className="text-center px-4 py-3 font-semibold">{tp('ticketTableHeaderPrice')}</th>
                      <th className="text-left px-4 py-3 font-semibold">{tp('ticketTableHeaderNotes')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {([1, 2, 3] as const).map((n, i) => (
                      <tr key={n} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F5EE]'}>
                        <td className="px-4 py-3 font-medium text-[#0D1B2A]">{tp(`ticketType${n}`)}</td>
                        <td className="px-4 py-3 text-center text-[#1A4A30] font-semibold">{tp(`ticketPrice${n}`)}</td>
                        <td className="px-4 py-3 text-[#2C3E50]/65">{tp(`ticketNote${n}`)}</td>
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
                  <Ticket size={15} /> {tp('ticketsBtn')}
                </a>
              </div>
            </section>

            {/* Accommodation */}
            <section>
              <h2 className="font-display text-3xl font-bold text-[#0D1B2A] mb-3">{t('stayTitle')}</h2>
              <p className="text-[#2C3E50]/70 mb-6">
                {tp('stayIntroDesc')}
              </p>
              <div className="space-y-4">
                {([1, 2, 3, 4] as const).map((n) => (
                  <div key={n} className="bg-white border border-[#E8E3D8] rounded-xl p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-[#0D1B2A]">{tp(`accomArea${n}Name`)}</h3>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-[#2C3E50]/50">{tp(`accomArea${n}Distance`)}</span>
                        <span className="text-[#1A4A30] font-semibold">{tp(`accomArea${n}Price`)}</span>
                      </div>
                    </div>
                    <p className="text-[#2C3E50]/65 text-sm leading-relaxed">{tp(`accomArea${n}Desc`)}</p>
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
                  <Bed size={15} /> {tp('southportHotelsBtn')}
                </a>
                <a
                  href="https://www.formbyguide.co.uk/accommodation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#2E6B3E] text-[#2E6B3E] font-semibold px-5 py-2.5 rounded-lg hover:bg-[#2E6B3E] hover:text-white transition-colors text-sm"
                >
                  <Bed size={15} /> {tp('formbyAccomBtn')}
                </a>
              </div>
            </section>

            {/* Visitor guide */}
            <section>
              <h2 className="font-display text-3xl font-bold text-[#0D1B2A] mb-6">{tp('visitorGuideTitle')}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: MapPin,
                    titleKey: 'gettingThereTitle',
                    itemKeys: ['gettingThereItem1', 'gettingThereItem2', 'gettingThereItem3', 'gettingThereItem4', 'gettingThereItem5'],
                  },
                  {
                    icon: Clock,
                    titleKey: 'onTheDayTitle',
                    itemKeys: ['onTheDayItem1', 'onTheDayItem2', 'onTheDayItem3', 'onTheDayItem4', 'onTheDayItem5'],
                  },
                  {
                    icon: Users,
                    titleKey: 'spectatorTipsTitle',
                    itemKeys: ['spectatorTipsItem1', 'spectatorTipsItem2', 'spectatorTipsItem3', 'spectatorTipsItem4', 'spectatorTipsItem5'],
                  },
                  {
                    icon: Trophy,
                    titleKey: 'playCourseTitle',
                    itemKeys: ['playCourseItem1', 'playCourseItem2', 'playCourseItem3', 'playCourseItem4'],
                  },
                ].map(({ icon: Icon, titleKey, itemKeys }) => (
                  <div key={titleKey} className="bg-white border border-[#E8E3D8] rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon size={16} className="text-[#1A4A30]" />
                      <h3 className="font-semibold text-[#0D1B2A]">{tp(titleKey)}</h3>
                    </div>
                    <ul className="space-y-1.5">
                      {itemKeys.map((key) => (
                        <li key={key} className="text-[#2C3E50]/65 text-sm flex items-start gap-2">
                          <span className="text-[#B8912A] mt-1.5 shrink-0">–</span>
                          {tp(key)}
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
              <h3 className="font-display text-lg font-bold text-[#D4AE7A] mb-4">{tp('quickFactsTitle')}</h3>
              <div className="space-y-3 text-sm">
                {[
                  { labelKey: 'factLabelChampNumber', valueKey: 'factValueChampNumber' },
                  { labelKey: 'factLabelVenue', valueKey: 'factValueVenue' },
                  { labelKey: 'factLabelLocation', valueKey: 'factValueLocation' },
                  { labelKey: 'factLabelDates', valueKey: 'factValueDates' },
                  { labelKey: 'factLabelPracticeDays', valueKey: 'factValuePracticeDays' },
                  { labelKey: 'factLabelDefendingChamp', valueKey: 'factValueDefendingChamp' },
                  { labelKey: 'factLabelOrganiser', valueKey: 'factValueOrganiser' },
                  { labelKey: 'factLabelTimesHosted', valueKey: 'factValueTimesHosted' },
                ].map(({ labelKey, valueKey }) => (
                  <div key={labelKey} className="flex justify-between gap-2">
                    <span className="text-white/50 shrink-0">{tp(labelKey)}</span>
                    <span className="text-white font-medium text-right">{tp(valueKey)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Official links */}
            <div className="bg-white border border-[#E8E3D8] rounded-xl p-5">
              <h3 className="font-semibold text-[#0D1B2A] mb-3">{tp('officialLinksTitle')}</h3>
              <div className="space-y-2">
                {[
                  { labelKey: 'officialLink1Label', url: 'https://www.theopen.com' },
                  { labelKey: 'officialLink2Label', url: 'https://www.royalbirkdale.com' },
                  { labelKey: 'officialLink3Label', url: 'https://www.theopen.com/tickets' },
                  { labelKey: 'officialLink4Label', url: 'https://www.southportguide.co.uk/the-open-2026' },
                ].map(({ labelKey, url }) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[#1A4A30] hover:text-[#B8912A] transition-colors py-1"
                  >
                    <ExternalLink size={12} className="shrink-0" />
                    {tp(labelKey)}
                  </a>
                ))}
              </div>
            </div>

            {/* Book accommodation */}
            <div className="bg-[#1A4A30] rounded-xl p-5 text-white">
              <h3 className="font-display text-lg font-bold mb-2">{tp('bookAccomTitle')}</h3>
              <p className="text-white/70 text-sm mb-4">
                {tp('bookAccomDesc')}
              </p>
              <a
                href="https://www.booking.com/searchresults.html?ss=Southport"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex items-center justify-center gap-2 bg-[#B8912A] text-white font-semibold px-4 py-3 rounded-lg hover:bg-[#D4AE7A] transition-colors text-sm w-full"
              >
                <Bed size={15} /> {tp('bookAccomBtn')}
              </a>
              <p className="text-white/35 text-xs mt-2 text-center">{tp('bookAccomAffiliate')}</p>
            </div>

            {/* Course guide link */}
            <div className="bg-white border border-[#E8E3D8] rounded-xl p-5">
              <h3 className="font-semibold text-[#0D1B2A] mb-2 flex items-center gap-2">
                <Trophy size={15} className="text-[#B8912A]" /> {tp('playBirkdaleTitle')}
              </h3>
              <p className="text-[#2C3E50]/60 text-sm mb-3">
                {tp('playBirkdaleDesc')}
              </p>
              <Link
                href={`${prefix}/courses/royal-birkdale`}
                className="text-[#1A4A30] text-sm font-semibold hover:text-[#B8912A] transition-colors flex items-center gap-1"
              >
                {tp('playBirkdaleLink')} <ChevronRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
