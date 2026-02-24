import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Trophy, Wind, MapPin, Calendar, ChevronRight, Star, Flag, Clock, Users } from 'lucide-react';
import OpenCountdown from '@/components/OpenCountdown';
import { COURSES } from '@/lib/courses';
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
    title: { absolute: `${tm('homeTitle')} | SeftonLinks.com` },
    description: tm('homeDesc'),
    alternates: buildAlternates('/'),
  };
}

const PAST_CHAMPIONS = [
  { year: 2017, name: 'Jordan Spieth', country: 'USA', score: '-12' },
  { year: 2008, name: 'Pádraig Harrington', country: 'IRL', score: '-3' },
  { year: 1998, name: "Mark O'Meara", country: 'USA', score: '-9' },
  { year: 1991, name: 'Ian Baker-Finch', country: 'AUS', score: '-8' },
  { year: 1983, name: 'Tom Watson', country: 'USA', score: '-5' },
  { year: 1976, name: 'Johnny Miller', country: 'USA', score: '-9' },
  { year: 1971, name: 'Lee Trevino', country: 'USA', score: '-1' },
  { year: 1965, name: 'Peter Thomson', country: 'AUS', score: '-2' },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  const tc = await getTranslations({ locale, namespace: 'courses' });
  const th = await getTranslations({ locale, namespace: 'homePage' });
  const tcd = await getTranslations({ locale, namespace: 'courseData' });
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <div className="min-h-screen">
      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebSite',
                '@id': `${BASE_URL}/#website`,
                url: BASE_URL,
                name: 'SeftonLinks.com',
                description: 'The definitive links golf guide to Royal Birkdale and the Sefton Coast.',
                publisher: { '@id': `${BASE_URL}/#organization` },
                inLanguage: 'en-GB',
                potentialAction: {
                  '@type': 'ReadAction',
                  target: `${BASE_URL}/courses`,
                },
              },
              {
                '@type': 'Organization',
                '@id': `${BASE_URL}/#organization`,
                name: 'SeftonLinks.com',
                url: BASE_URL,
                logo: {
                  '@type': 'ImageObject',
                  url: `${BASE_URL}/og-default.jpg`,
                  width: 1200,
                  height: 630,
                },
                sameAs: [
                  'https://www.southportguide.co.uk',
                  'https://www.formbyguide.co.uk',
                  'https://seftoncoastwildlife.co.uk',
                  'https://seftoncoast.network',
                  'https://www.linkedin.com/company/churchtownmedia',
                  'https://churchtownmedia.co.uk',
                ],
              },
              {
                '@type': 'SportsEvent',
                name: 'The 155th Open Championship',
                startDate: '2026-07-16',
                endDate: '2026-07-19',
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
                },
                organizer: {
                  '@type': 'Organization',
                  name: 'The R&A',
                  url: 'https://www.theopen.com',
                },
              },
            ],
          }),
        }}
      />

      {/* ═══════════════════════════════════════════
          OPEN CHAMPIONSHIP ANNOUNCEMENT BANNER
      ═══════════════════════════════════════════ */}
      <div className="bg-[#B8912A] text-white text-center py-2.5 px-4 text-sm font-medium">
        <Link href={`${prefix}/the-open-2026`} className="flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          <Trophy size={14} className="shrink-0" />
          <span>{th('bannerText')}</span>
          <span className="hidden sm:inline">{th('bannerLink')}</span>
        </Link>
      </div>

      {/* ═══════════════════════════════════════════
          HERO — NAVY LINKS LANDSCAPE
      ═══════════════════════════════════════════ */}
      <section className="relative bg-[#0D1B2A] overflow-hidden">
        <Image
          src="/hero-golf.jpg"
          alt={th('heroImageAlt')}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-[#0D1B2A]/50" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 60%, #1A4A30 0%, transparent 50%), radial-gradient(circle at 75% 30%, #B8912A 0%, transparent 45%)`,
          }}
        />

        <div className="relative container mx-auto px-4 max-w-7xl py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#B8912A]/20 border border-[#B8912A]/40 rounded-full px-4 py-1.5 mb-8">
              <Flag size={12} className="text-[#B8912A]" />
              <span className="text-[#D4AE7A] text-xs font-semibold uppercase tracking-widest">
                {th('heroBadge')}
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.08]">
              {t('heroTitle')}
            </h1>

            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              {t('heroSubtitle')}
            </p>

            {/* Countdown */}
            <div className="mb-10">
              <p className="text-[#D4AE7A] text-sm uppercase tracking-widest mb-5 font-medium">
                {t('openCountdownLabel')}
              </p>
              <OpenCountdown variant="hero" />
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`${prefix}/courses`}
                className="inline-flex items-center justify-center gap-2 bg-[#1A4A30] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#2A6A45] transition-colors text-base"
              >
                <MapPin size={18} />
                {t('heroCtaCourses')}
              </Link>
              <Link
                href={`${prefix}/the-open-2026`}
                className="inline-flex items-center justify-center gap-2 bg-[#B8912A] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#D4AE7A] transition-colors text-base"
              >
                <Trophy size={18} />
                {t('heroCtaOpen')}
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-white/10">
          <div className="container mx-auto px-4 max-w-7xl py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="px-4 py-2">
                <div className="font-display text-2xl md:text-3xl font-bold text-[#B8912A]">6</div>
                <div className="text-white/50 text-xs mt-1">{th('statChampionshipCoursesLabel')}</div>
              </div>
              <div className="px-4 py-2">
                <div className="font-display text-2xl md:text-3xl font-bold text-[#B8912A]">10</div>
                <div className="text-white/50 text-xs mt-1">{th('statOpenChampionshipsLabel')}</div>
              </div>
              <div className="px-4 py-2">
                <div className="font-display text-2xl md:text-3xl font-bold text-[#B8912A]">1873</div>
                <div className="text-white/50 text-xs mt-1">{th('statOldestClubLabel')}</div>
              </div>
              <div className="px-4 py-2">
                <div className="font-display text-2xl md:text-3xl font-bold text-[#B8912A]">~£40–£350</div>
                <div className="text-white/50 text-xs mt-1">{th('statGreenFeeRangeLabel')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          THE OPEN CHAMPIONSHIP FEATURE BLOCK
      ═══════════════════════════════════════════ */}
      <section className="bg-[#1A4A30] py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#B8912A]/25 border border-[#B8912A]/40 rounded-full px-3 py-1 mb-5">
                <Trophy size={12} className="text-[#B8912A]" />
                <span className="text-[#D4AE7A] text-xs font-semibold uppercase tracking-wider">{th('openSectionBadge')}</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5">
                {th('openSectionHeading1')}<br />
                <span className="text-[#B8912A]">{th('openSectionHeading2')}</span>
              </h2>
              <p className="text-white/70 leading-relaxed mb-6">
                {th('openSectionPara1')}
              </p>
              <p className="text-white/70 leading-relaxed mb-8">
                {th('openSectionPara2')}
              </p>
              <Link
                href={`${prefix}/the-open-2026`}
                className="inline-flex items-center gap-2 bg-[#B8912A] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#D4AE7A] transition-colors"
              >
                <Trophy size={16} />
                {th('openSectionCtaBtn')}
              </Link>
            </div>

            <div className="space-y-4">
              <h3 className="text-[#D4AE7A] text-sm uppercase tracking-wider font-semibold mb-4">
                {th('pastChampionsHeading')}
              </h3>
              <div className="space-y-2">
                {PAST_CHAMPIONS.map((c) => (
                  <div key={c.year} className="flex items-center justify-between bg-white/8 rounded-lg px-4 py-3">
                    <div className="flex items-center gap-4">
                      <span className="text-[#B8912A] font-mono font-bold text-sm w-10">{c.year}</span>
                      <span className="text-white font-medium">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-white/50 text-xs">{c.country}</span>
                      <span className="text-[#D4AE7A] font-mono text-sm font-semibold">{c.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          COURSES SECTION
      ═══════════════════════════════════════════ */}
      <section className="py-20 bg-[#F8F5EE]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0D1B2A] mb-4">
              {t('coursesTitle')}
            </h2>
            <p className="text-[#2C3E50]/70 text-lg max-w-2xl mx-auto">
              {t('coursesSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {COURSES.map((course) => (
              <Link
                key={course.slug}
                href={`${prefix}/courses/${course.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-[#E8E3D8] hover:border-[#B8912A]/40 card-hover"
              >
                {/* Course card header */}
                <div className={`h-2 ${course.slug === 'royal-birkdale' ? 'bg-[#B8912A]' : 'bg-[#1A4A30]'}`} />

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-display text-lg font-bold text-[#0D1B2A] group-hover:text-[#1A4A30] transition-colors leading-tight">
                        {course.shortName}
                      </h3>
                      <p className="text-[#B8912A] text-xs font-semibold uppercase tracking-wider mt-1">
                        {th('courseCardEstFounded', { year: course.founded })}
                      </p>
                    </div>
                    {course.openChampionship && (
                      <div className="bg-[#B8912A] text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shrink-0">
                        <Trophy size={10} />
                        <span>{th('courseCardOpenVenueBadge')}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-[#2C3E50]/70 text-sm leading-relaxed mb-5 line-clamp-2">
                    {tcd(`${course.slug}.tagline`)}
                  </p>

                  <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="text-center bg-[#F8F5EE] rounded-lg p-2">
                      <div className="text-[#0D1B2A] font-bold text-lg leading-none">{course.par}</div>
                      <div className="text-[#2C3E50]/50 text-xs mt-1">{th('courseCardParLabel')}</div>
                    </div>
                    <div className="text-center bg-[#F8F5EE] rounded-lg p-2">
                      <div className="text-[#0D1B2A] font-bold text-lg leading-none">
                        {(course.yardage / 1000).toFixed(1)}k
                      </div>
                      <div className="text-[#2C3E50]/50 text-xs mt-1">{th('courseCardYardsLabel')}</div>
                    </div>
                    <div className="text-center bg-[#F8F5EE] rounded-lg p-2">
                      <div className="text-[#0D1B2A] font-bold text-sm leading-none">{course.greenFeeRange.split('–')[0]}</div>
                      <div className="text-[#2C3E50]/50 text-xs mt-1">{th('courseCardFromLabel')}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      course.difficulty === 'championship' ? 'bg-red-50 text-red-700' :
                      course.difficulty === 'challenging' ? 'bg-orange-50 text-orange-700' :
                      course.difficulty === 'moderate' ? 'bg-blue-50 text-blue-700' :
                      'bg-green-50 text-green-700'
                    }`}>
                      {tc(`difficulty.${course.difficulty}`)}
                    </div>
                    <div className="ml-auto text-[#1A4A30] text-sm font-semibold group-hover:text-[#B8912A] transition-colors flex items-center gap-1">
                      {th('courseCardFullGuideLink')} <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href={`${prefix}/courses`}
              className="inline-flex items-center gap-2 border-2 border-[#0D1B2A] text-[#0D1B2A] font-semibold px-8 py-3 rounded-lg hover:bg-[#0D1B2A] hover:text-white transition-colors"
            >
              {th('compareAllCoursesBtn')} <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          INTERACTIVE TOOLS SECTION
      ═══════════════════════════════════════════ */}
      <section className="py-20 bg-[#0D1B2A]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              {th('toolsSectionTitle')}
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              {th('toolsSectionSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tool 1 — Course Conditions */}
            <Link
              href={`${prefix}/conditions`}
              className="group bg-white/6 border border-white/10 rounded-xl p-6 hover:border-[#B8912A]/40 hover:bg-white/10 transition-all card-hover"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: '#4A7D9A25', border: '1px solid #4A7D9A40' }}
              >
                <Wind size={20} style={{ color: '#4A7D9A' }} />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-[#D4AE7A] transition-colors">
                {th('tool1Title')}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed mb-5">{th('tool1Desc')}</p>
              <span className="text-[#B8912A] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                {th('tool1Cta')} <ChevronRight size={14} />
              </span>
            </Link>

            {/* Tool 2 — Golf Break Planner */}
            <Link
              href={`${prefix}/itineraries`}
              className="group bg-white/6 border border-white/10 rounded-xl p-6 hover:border-[#B8912A]/40 hover:bg-white/10 transition-all card-hover"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: '#1A4A3025', border: '1px solid #1A4A3040' }}
              >
                <Calendar size={20} style={{ color: '#1A4A30' }} />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-[#D4AE7A] transition-colors">
                {th('tool2Title')}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed mb-5">{th('tool2Desc')}</p>
              <span className="text-[#B8912A] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                {th('tool2Cta')} <ChevronRight size={14} />
              </span>
            </Link>

            {/* Tool 3 — Tee Time Guide */}
            <Link
              href={`${prefix}/tee-times`}
              className="group bg-white/6 border border-white/10 rounded-xl p-6 hover:border-[#B8912A]/40 hover:bg-white/10 transition-all card-hover"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: '#B8912A25', border: '1px solid #B8912A40' }}
              >
                <Flag size={20} style={{ color: '#B8912A' }} />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-[#D4AE7A] transition-colors">
                {th('tool3Title')}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed mb-5">{th('tool3Desc')}</p>
              <span className="text-[#B8912A] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                {th('tool3Cta')} <ChevronRight size={14} />
              </span>
            </Link>

            {/* Tool 4 — Scorecard Database */}
            <Link
              href={`${prefix}/scorecard`}
              className="group bg-white/6 border border-white/10 rounded-xl p-6 hover:border-[#B8912A]/40 hover:bg-white/10 transition-all card-hover"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: '#B8912A25', border: '1px solid #B8912A40' }}
              >
                <Trophy size={20} style={{ color: '#B8912A' }} />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-[#D4AE7A] transition-colors">
                {th('tool4Title')}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed mb-5">{th('tool4Desc')}</p>
              <span className="text-[#B8912A] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                {th('tool4Cta')} <ChevronRight size={14} />
              </span>
            </Link>

            {/* Tool 5 — Accommodation for Golfers */}
            <Link
              href={`${prefix}/accommodation`}
              className="group bg-white/6 border border-white/10 rounded-xl p-6 hover:border-[#B8912A]/40 hover:bg-white/10 transition-all card-hover"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: '#4A7D9A25', border: '1px solid #4A7D9A40' }}
              >
                <MapPin size={20} style={{ color: '#4A7D9A' }} />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-[#D4AE7A] transition-colors">
                {th('tool5Title')}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed mb-5">{th('tool5Desc')}</p>
              <span className="text-[#B8912A] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                {th('tool5Cta')} <ChevronRight size={14} />
              </span>
            </Link>

            {/* Tool 6 — Golf Break Itineraries */}
            <Link
              href={`${prefix}/itineraries`}
              className="group bg-white/6 border border-white/10 rounded-xl p-6 hover:border-[#B8912A]/40 hover:bg-white/10 transition-all card-hover"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: '#1A4A3025', border: '1px solid #1A4A3040' }}
              >
                <Clock size={20} style={{ color: '#1A4A30' }} />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-[#D4AE7A] transition-colors">
                {th('tool6Title')}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed mb-5">{th('tool6Desc')}</p>
              <span className="text-[#B8912A] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                {th('tool6Cta')} <ChevronRight size={14} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          GOLF BREAK AFFILIATE CTA
      ═══════════════════════════════════════════ */}
      <section className="py-16 bg-[#F8F5EE] border-t border-[#E8E3D8]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0D1B2A] mb-4">
            {th('affiliateCtaTitle')}
          </h2>
          <p className="text-[#2C3E50]/70 text-lg mb-8 max-w-2xl mx-auto">
            {th('affiliateCtaDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.golfbreaks.com/en-gb/united-kingdom/england/lancashire/"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center justify-center gap-2 bg-[#1A4A30] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#2A6A45] transition-colors text-base"
            >
              <Trophy size={18} />
              {th('affiliateCtaBtn1')}
            </a>
            <Link
              href={`${prefix}/itineraries`}
              className="inline-flex items-center justify-center gap-2 border-2 border-[#0D1B2A] text-[#0D1B2A] font-semibold px-8 py-4 rounded-lg hover:bg-[#0D1B2A] hover:text-white transition-colors text-base"
            >
              <Calendar size={18} />
              {th('affiliateCtaBtn2')}
            </Link>
          </div>
          <p className="text-[#2C3E50]/40 text-xs mt-5">
            {th('affiliateCtaDisclaimer')}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          EDITORIAL — WHY SEFTON COAST?
      ═══════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0D1B2A] mb-8 text-center">
            {th('editorialTitle')}
          </h2>
          <div className="prose prose-lg max-w-none text-[#2C3E50]/80">
            <p>{th('editorialPara1')}</p>
            <p>{th('editorialPara2')}</p>
            <p>{th('editorialPara3')}</p>
            <p>{th('editorialPara4')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-[#F8F5EE] rounded-xl p-6">
              <div className="w-10 h-10 bg-[#1A4A30]/10 rounded-lg flex items-center justify-center mb-4">
                <MapPin size={20} className="text-[#1A4A30]" />
              </div>
              <h3 className="font-semibold text-[#0D1B2A] mb-2">{th('featureCard1Title')}</h3>
              <p className="text-[#2C3E50]/70 text-sm leading-relaxed">{th('featureCard1Text')}</p>
            </div>
            <div className="bg-[#F8F5EE] rounded-xl p-6">
              <div className="w-10 h-10 bg-[#1A4A30]/10 rounded-lg flex items-center justify-center mb-4">
                <Users size={20} className="text-[#1A4A30]" />
              </div>
              <h3 className="font-semibold text-[#0D1B2A] mb-2">{th('featureCard2Title')}</h3>
              <p className="text-[#2C3E50]/70 text-sm leading-relaxed">{th('featureCard2Text')}</p>
            </div>
            <div className="bg-[#F8F5EE] rounded-xl p-6">
              <div className="w-10 h-10 bg-[#1A4A30]/10 rounded-lg flex items-center justify-center mb-4">
                <Star size={20} className="text-[#1A4A30]" />
              </div>
              <h3 className="font-semibold text-[#0D1B2A] mb-2">{th('featureCard3Title')}</h3>
              <p className="text-[#2C3E50]/70 text-sm leading-relaxed">{th('featureCard3Text')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          NETWORK CROSS-LINKS
      ═══════════════════════════════════════════ */}
      <section className="py-12 bg-[#F8F5EE] border-t border-[#E8E3D8]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="https://www.southportguide.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl p-6 border border-[#E8E3D8] hover:border-[#1A4A30]/30 transition-all card-hover flex items-center gap-5"
            >
              <div className="w-14 h-14 bg-[#1A4A30]/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#1A4A30]/20 transition-colors">
                <MapPin size={24} className="text-[#1A4A30]" />
              </div>
              <div>
                <div className="font-display font-bold text-[#0D1B2A] group-hover:text-[#1A4A30] transition-colors">
                  SouthportGuide.co.uk
                </div>
                <div className="text-[#2C3E50]/60 text-sm mt-1">
                  {th('southportGuideDesc')}
                </div>
              </div>
              <ChevronRight size={18} className="text-[#2C3E50]/30 group-hover:text-[#1A4A30] shrink-0 ml-auto transition-colors" />
            </a>
            <a
              href="https://www.formbyguide.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl p-6 border border-[#E8E3D8] hover:border-[#1A4A30]/30 transition-all card-hover flex items-center gap-5"
            >
              <div className="w-14 h-14 bg-[#2E6B3E]/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#2E6B3E]/20 transition-colors">
                <MapPin size={24} className="text-[#2E6B3E]" />
              </div>
              <div>
                <div className="font-display font-bold text-[#0D1B2A] group-hover:text-[#1A4A30] transition-colors">
                  FormbyGuide.co.uk
                </div>
                <div className="text-[#2C3E50]/60 text-sm mt-1">
                  {th('formbyGuideDesc')}
                </div>
              </div>
              <ChevronRight size={18} className="text-[#2C3E50]/30 group-hover:text-[#1A4A30] shrink-0 ml-auto transition-colors" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
