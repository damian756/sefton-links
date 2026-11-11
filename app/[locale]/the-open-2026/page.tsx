import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Trophy, MapPin, ChevronRight, ExternalLink, Flag } from 'lucide-react';
import type { Metadata } from 'next';
import { BASE_URL, buildAlternates, buildOg } from '@/lib/metadata';

// The Open at Royal Birkdale: a record of The 154th Open (12 to 19 July 2026) and of
// Birkdale's Opens since 1954, plus what a visitor can do now. The URL stays
// /the-open-2026 so existing links keep working.
// Sources (read 11 Nov 2026): theopen.com (venues/royal-birkdale,
// previous-opens/royal-birkdale-154th-open, latest/ryan-fox-royal-birkdale-2026-story),
// royalbirkdale.com (history, visitors) and members.royalbirkdale.com/visitorbooking.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tm = await getTranslations({ locale, namespace: 'meta' });
  const title = tm('openTitle');
  const description = tm('openDesc');
  return {
    title,
    description,
    alternates: buildAlternates('/the-open-2026', locale),
    openGraph: buildOg('/the-open-2026', { title, description }, locale),
  };
}

// score: the champion's 72-hole total, from each year's results on theopen.com/previous-opens.
const PAST_CHAMPIONS = [
  { year: 2026, name: 'Ryan Fox', country: '🇳🇿 NZL', score: '270' },
  { year: 2017, name: 'Jordan Spieth', country: '🇺🇸 USA', score: '268' },
  { year: 2008, name: 'Pádraig Harrington', country: '🇮🇪 IRL', score: '283' },
  { year: 1998, name: "Mark O'Meara", country: '🇺🇸 USA', score: '280' },
  { year: 1991, name: 'Ian Baker-Finch', country: '🇦🇺 AUS', score: '272' },
  { year: 1983, name: 'Tom Watson', country: '🇺🇸 USA', score: '275' },
  { year: 1976, name: 'Johnny Miller', country: '🇺🇸 USA', score: '279' },
  { year: 1971, name: 'Lee Trevino', country: '🇺🇸 USA', score: '278' },
  { year: 1965, name: 'Peter Thomson', country: '🇦🇺 AUS', score: '285' },
  { year: 1961, name: 'Arnold Palmer', country: '🇺🇸 USA', score: '284' },
  { year: 1954, name: 'Peter Thomson', country: '🇦🇺 AUS', score: '283' },
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
                '@type': 'WebPage',
                '@id': `${BASE_URL}/the-open-2026`,
                url: `${BASE_URL}/the-open-2026`,
                name: 'The Open at Royal Birkdale',
                description:
                  'Ryan Fox won The 154th Open at Royal Birkdale in July 2026 with 270, 10 under par. Royal Birkdale has hosted The Open 11 times since 1954.',
                inLanguage: 'en-GB',
                about: {
                  '@type': 'GolfCourse',
                  name: 'Royal Birkdale Golf Club',
                  url: 'https://www.royalbirkdale.com',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Waterloo Road',
                    addressLocality: 'Southport',
                    postalCode: 'PR8 2LX',
                    addressCountry: 'GB',
                  },
                  geo: { '@type': 'GeoCoordinates', latitude: 53.6095, longitude: -3.0428 },
                },
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
                  { '@type': 'ListItem', position: 2, name: 'The Open at Royal Birkdale', item: `${BASE_URL}/the-open-2026` },
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

          <p className="text-white/70 text-xl mb-3 max-w-2xl mx-auto">{t('summary')}</p>
          <p className="text-white/50 text-sm mb-10 flex items-center justify-center gap-2">
            <MapPin size={13} /> {t('venue')}
          </p>

          <div className="mb-10 inline-block bg-white/8 border border-white/15 rounded-xl px-6 py-4 max-w-xl">
            <p className="text-[#D4AE7A] text-xs uppercase tracking-widest mb-1.5 font-medium">{tp('resultLabel')}</p>
            <p className="text-white text-base md:text-lg font-semibold">{tp('resultValue')}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${prefix}/courses/royal-birkdale`}
              className="inline-flex items-center justify-center gap-2 bg-[#B8912A] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#D4AE7A] transition-colors"
            >
              <Trophy size={18} /> {tp('heroBtn2')}
            </Link>
            <Link
              href={`${prefix}/courses`}
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              <Flag size={18} /> {tp('heroBtnCourses')}
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-7xl py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-14">

            {/* The Open at Birkdale */}
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
              <h2 className="font-display text-3xl font-bold text-[#0D1B2A] mb-2">{tp('pastChampionsTitle')}</h2>
              <p className="text-[#2C3E50]/55 text-sm mb-6">{tp('pastChampionsScoreNote')}</p>
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
                      <p className="text-[#2C3E50]/60 text-sm mt-0.5">{tp(`champNote${c.year}`)}</p>
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

            {/* Visiting now */}
            <section>
              <h2 className="font-display text-3xl font-bold text-[#0D1B2A] mb-3">{tp('visitTitle')}</h2>
              <p className="text-[#2C3E50]/70 mb-6">{tp('visitIntro')}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white border border-[#E8E3D8] rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Trophy size={16} className="text-[#1A4A30]" />
                    <h3 className="font-semibold text-[#0D1B2A]">{tp('playCourseTitle')}</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {(['playCourseItem1', 'playCourseItem2', 'playCourseItem4', 'playCourseAddress'] as const).map((key) => (
                      <li key={key} className="text-[#2C3E50]/65 text-sm flex items-start gap-2">
                        <span className="text-[#B8912A] mt-1.5 shrink-0">–</span>
                        {tp(key)}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white border border-[#E8E3D8] rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Flag size={16} className="text-[#1A4A30]" />
                    <h3 className="font-semibold text-[#0D1B2A]">{tp('otherCoursesTitle')}</h3>
                  </div>
                  <p className="text-[#2C3E50]/65 text-sm leading-relaxed mb-4">{tp('otherCoursesDesc')}</p>
                  <div className="flex flex-col gap-2">
                    <Link
                      href={`${prefix}/courses`}
                      className="text-[#1A4A30] text-sm font-semibold hover:text-[#B8912A] transition-colors flex items-center gap-1"
                    >
                      {tp('otherCoursesLink')} <ChevronRight size={13} />
                    </Link>
                    <Link
                      href={`${prefix}/tee-times`}
                      className="text-[#1A4A30] text-sm font-semibold hover:text-[#B8912A] transition-colors flex items-center gap-1"
                    >
                      {tp('teeTimesLink')} <ChevronRight size={13} />
                    </Link>
                  </div>
                </div>
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
                  { labelKey: 'factLabelDefendingChamp', valueKey: 'factValueDefendingChamp' },
                  { labelKey: 'factLabelScore', valueKey: 'factValueScore' },
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
                  { labelKey: 'officialLinkResultsLabel', url: 'https://www.theopen.com/previous-opens/royal-birkdale-154th-open' },
                  { labelKey: 'officialLinkVenueLabel', url: 'https://www.theopen.com/venues/royal-birkdale' },
                  { labelKey: 'officialLink2Label', url: 'https://www.royalbirkdale.com' },
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
