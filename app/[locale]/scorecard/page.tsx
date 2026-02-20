import Link from 'next/link';
import { ChevronRight, Trophy } from 'lucide-react';
import { COURSES } from '@/lib/courses';
import type { Metadata } from 'next';
import { BASE_URL, buildAlternates } from '@/lib/metadata';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tm = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: tm('scorecardTitle'),
    description: tm('scorecardDesc'),
    alternates: buildAlternates('/scorecard'),
  };
}

export default async function ScorecardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const t = await getTranslations({ locale, namespace: 'scorecardPage' });

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Dataset',
            name: 'Sefton Coast Golf Course Scorecard Data',
            description: 'Par, yardage, course rating and slope rating for all six Sefton Coast links golf courses.',
            url: `${BASE_URL}/scorecard`,
            includedInDataCatalog: { '@type': 'DataCatalog', name: 'SeftonLinks.com Golf Database' },
            hasPart: COURSES.map((course) => ({
              '@type': 'GolfCourse',
              name: course.name,
              url: `${BASE_URL}/courses/${course.slug}`,
              amenityFeature: course.tees.map((tee) => ({
                '@type': 'LocationFeatureSpecification',
                name: `${tee.name} Tee — ${tee.yardage} yards`,
                value: tee.par,
              })),
            })),
          }),
        }}
      />

      <div className="bg-[#0D1B2A] py-14">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-[#B8912A] text-sm uppercase tracking-widest font-semibold mb-3">{t('headerBadge')}</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">{t('pageTitle')}</h1>
          <p className="text-white/65 text-lg max-w-2xl">
            {t('pageDesc')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-12 space-y-10">
        {COURSES.map((course) => (
          <div key={course.slug} className="bg-white rounded-2xl border border-[#E8E3D8] overflow-hidden shadow-sm">
            <div className={`h-1.5 ${course.openChampionship ? 'bg-[#B8912A]' : 'bg-[#1A4A30]'}`} />
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <h2 className="font-display text-2xl font-bold text-[#0D1B2A] flex items-center gap-2">
                    {course.name}
                    {course.openChampionship && <Trophy size={18} className="text-[#B8912A]" />}
                  </h2>
                  <p className="text-[#2C3E50]/55 text-sm mt-1">{course.postcode} · Est. {course.founded} · Par {course.par} · {course.yardage.toLocaleString()} yards (championship)</p>
                </div>
                <Link
                  href={`${prefix}/courses/${course.slug}`}
                  className="hidden sm:flex items-center gap-1 text-[#1A4A30] text-sm font-semibold hover:text-[#B8912A] transition-colors shrink-0"
                >
                  {t('fullGuideLink')} <ChevronRight size={13} />
                </Link>
              </div>

              {/* Tee table */}
              <div className="overflow-x-auto rounded-xl border border-[#E8E3D8] mb-5">
                <table className="w-full text-sm min-w-[500px]">
                  <thead>
                    <tr className="bg-[#0D1B2A] text-white">
                      <th className="text-left px-4 py-3 font-semibold">{t('tableHeaderTee')}</th>
                      <th className="text-center px-4 py-3 font-semibold">{t('tableHeaderPar')}</th>
                      <th className="text-center px-4 py-3 font-semibold">{t('tableHeaderYardage')}</th>
                      <th className="text-center px-4 py-3 font-semibold">{t('tableHeaderMetres')}</th>
                      <th className="text-center px-4 py-3 font-semibold">{t('tableHeaderRating')}</th>
                      <th className="text-center px-4 py-3 font-semibold">{t('tableHeaderSlope')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {course.tees.map((tee, i) => (
                      <tr key={tee.name} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F5EE]'}>
                        <td className="px-4 py-3 font-semibold text-[#0D1B2A]">{tee.name}</td>
                        <td className="px-4 py-3 text-center font-mono font-bold text-[#0D1B2A]">{tee.par}</td>
                        <td className="px-4 py-3 text-center font-mono text-[#0D1B2A]">{tee.yardage.toLocaleString()}</td>
                        <td className="px-4 py-3 text-center font-mono text-[#2C3E50]/60">
                          {Math.round(tee.yardage * 0.9144).toLocaleString()}m
                        </td>
                        <td className="px-4 py-3 text-center font-mono text-[#0D1B2A]">{tee.rating ?? '—'}</td>
                        <td className="px-4 py-3 text-center font-mono text-[#0D1B2A]">{tee.slope ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary stats */}
              <div className="flex flex-wrap gap-3">
                {[
                  {
                    label: t('statGreenFeeLabel'),
                    value: course.greenFeeRange,
                  },
                  {
                    label: t('statVisitorPolicyLabel'),
                    value:
                      course.difficulty === 'championship'
                        ? t('statVisitorRestricted')
                        : course.difficulty === 'challenging'
                        ? t('statVisitorByArrangement')
                        : t('statVisitorWelcome'),
                  },
                  {
                    label: t('statChampRatingLabel'),
                    value: `${course.courseRating} / ${course.slopeRating}`,
                  },
                  {
                    label: t('statDistanceFromBirkdaleLabel'),
                    value: course.distanceFromBirkdale === '0' ? t('statAdjacentValue') : `~${course.distanceFromBirkdale} miles`,
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[#F8F5EE] rounded-lg px-3 py-2">
                    <div className="text-xs text-[#2C3E50]/50 uppercase tracking-wider">{label}</div>
                    <div className="font-semibold text-[#0D1B2A] text-sm mt-0.5">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Explanation */}
        <div className="bg-white border border-[#E8E3D8] rounded-xl p-6">
          <h2 className="font-display text-xl font-bold text-[#0D1B2A] mb-4">{t('understandingDataTitle')}</h2>
          <div className="grid sm:grid-cols-2 gap-6 text-sm text-[#2C3E50]/70 leading-relaxed">
            <div>
              <h3 className="font-semibold text-[#0D1B2A] mb-2">{t('courseRatingTitle')}</h3>
              <p>{t('courseRatingDesc')}</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#0D1B2A] mb-2">{t('slopeRatingTitle')}</h3>
              <p>{t('slopeRatingDesc')}</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#0D1B2A] mb-2">{t('yardageMetresTitle')}</h3>
              <p>{t('yardageMetresDesc')}</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#0D1B2A] mb-2">{t('dataAccuracyTitle')}</h3>
              <p>{t('dataAccuracyDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
