import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Trophy, MapPin, ChevronRight, Star, Phone, ExternalLink } from 'lucide-react';
import { COURSES } from '@/lib/courses';
import type { Metadata } from 'next';
import { BASE_URL, buildAlternates } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tm = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: tm('coursesTitle'),
    description: tm('coursesDesc'),
    alternates: buildAlternates('/courses'),
  };
}

export default async function CoursesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'courses' });
  const tcp = await getTranslations({ locale, namespace: 'coursesPage' });
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Sefton Coast Golf Courses',
            description: 'Links golf courses on the Sefton Coast, Lancashire',
            numberOfItems: COURSES.length,
            itemListElement: COURSES.map((course, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'GolfCourse',
                '@id': `${BASE_URL}/courses/${course.slug}`,
                name: course.name,
                url: `${BASE_URL}/courses/${course.slug}`,
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: course.address,
                  postalCode: course.postcode,
                  addressCountry: 'GB',
                },
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: course.latitude,
                  longitude: course.longitude,
                },
              },
            })),
          }),
        }}
      />

      {/* Header */}
      <div className="bg-[#0D1B2A] py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-[#B8912A] text-sm uppercase tracking-widest font-semibold mb-3">
            {tcp('headerBadge')}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            {t('pageTitle')}
          </h1>
          <p className="text-white/65 text-lg max-w-2xl leading-relaxed">
            {t('pageDesc')}
          </p>
        </div>
      </div>

      {/* Quick comparison table */}
      <div className="bg-white border-b border-[#E8E3D8] overflow-x-auto">
        <div className="container mx-auto px-4 max-w-7xl py-6">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="text-[#2C3E50]/50 uppercase tracking-wider text-xs border-b border-[#E8E3D8]">
                <th className="text-left py-2 pr-4">{tcp('tableHeaderCourse')}</th>
                <th className="text-center py-2 px-3">{tcp('tableHeaderPar')}</th>
                <th className="text-center py-2 px-3">{tcp('tableHeaderYards')}</th>
                <th className="text-center py-2 px-3">{tcp('tableHeaderRating')}</th>
                <th className="text-center py-2 px-3">{tcp('tableHeaderSlope')}</th>
                <th className="text-center py-2 px-3">{tcp('tableHeaderGreenFee')}</th>
                <th className="text-left py-2 pl-3">{tcp('tableHeaderDifficulty')}</th>
              </tr>
            </thead>
            <tbody>
              {COURSES.map((course) => (
                <tr key={course.slug} className="border-b border-[#F0EDE6] hover:bg-[#F8F5EE] transition-colors">
                  <td className="py-3 pr-4">
                    <Link href={`${prefix}/courses/${course.slug}`} className="font-semibold text-[#0D1B2A] hover:text-[#1A4A30] transition-colors">
                      {course.shortName}
                      {course.openChampionship && (
                        <span className="ml-2 text-[#B8912A]">★</span>
                      )}
                    </Link>
                    <div className="text-[#2C3E50]/50 text-xs">{course.postcode}</div>
                  </td>
                  <td className="text-center py-3 px-3 font-mono font-semibold text-[#0D1B2A]">{course.par}</td>
                  <td className="text-center py-3 px-3 font-mono text-[#0D1B2A]">{course.yardage.toLocaleString()}</td>
                  <td className="text-center py-3 px-3 font-mono text-[#0D1B2A]">{course.courseRating}</td>
                  <td className="text-center py-3 px-3 font-mono text-[#0D1B2A]">{course.slopeRating}</td>
                  <td className="text-center py-3 px-3 font-semibold text-[#1A4A30]">{course.greenFeeRange}</td>
                  <td className="py-3 pl-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      course.difficulty === 'championship' ? 'bg-red-50 text-red-700' :
                      course.difficulty === 'challenging' ? 'bg-orange-50 text-orange-700' :
                      course.difficulty === 'moderate' ? 'bg-blue-50 text-blue-700' :
                      'bg-green-50 text-green-700'
                    }`}>
                      {t(`difficulty.${course.difficulty}`)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[#2C3E50]/40 text-xs mt-3">{tcp('tableFootnote')}</p>
        </div>
      </div>

      {/* Course cards */}
      <div className="container mx-auto px-4 max-w-7xl py-14">
        <div className="space-y-8">
          {COURSES.map((course, index) => (
            <div key={course.slug} className="bg-white rounded-2xl border border-[#E8E3D8] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className={`h-1.5 ${course.openChampionship ? 'bg-[#B8912A]' : 'bg-[#1A4A30]'}`} />

              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Left: info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 bg-[#0D1B2A] rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[#B8912A] font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <h2 className="font-display text-2xl font-bold text-[#0D1B2A]">
                          {course.name}
                          {course.openChampionship && (
                            <Trophy size={18} className="inline ml-2 text-[#B8912A] mb-0.5" />
                          )}
                        </h2>
                        <div className="flex items-center gap-2 text-[#2C3E50]/55 text-sm mt-0.5">
                          <MapPin size={13} />
                          <span>{course.address}, {course.postcode}</span>
                          <span>·</span>
                          <span>{tcp('cardEstFounded', { year: course.founded })}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-[#1A4A30] font-medium text-sm mb-3">{course.tagline}</p>
                    <p className="text-[#2C3E50]/70 text-sm leading-relaxed mb-5 line-clamp-3">
                      {course.description.split('\n\n')[0]}
                    </p>

                    {/* Key stats row */}
                    <div className="flex flex-wrap gap-4 mb-5">
                      {[
                        { label: tcp('cardStatParLabel'), value: String(course.par) },
                        { label: tcp('cardStatYardsLabel'), value: course.yardage.toLocaleString() },
                        { label: tcp('cardStatCourseRatingLabel'), value: String(course.courseRating) },
                        { label: tcp('cardStatSlopeLabel'), value: String(course.slopeRating) },
                        { label: tcp('cardStatGreenFeeLabel'), value: course.greenFeeRange },
                      ].map(({ label, value }) => (
                        <div key={label} className="bg-[#F8F5EE] rounded-lg px-3 py-2 text-center">
                          <div className="font-bold text-[#0D1B2A] text-sm">{value}</div>
                          <div className="text-[#2C3E50]/50 text-xs">{label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Visitor policy */}
                    <div className="bg-[#F8F5EE] rounded-lg p-4 mb-4">
                      <div className="font-semibold text-[#0D1B2A] text-xs uppercase tracking-wider mb-1.5">{tcp('visitorPolicyLabel')}</div>
                      <p className="text-[#2C3E50]/70 text-sm">{course.visitorPolicy}</p>
                    </div>

                    {course.majorHistory && course.majorHistory.length > 0 && (
                      <div className="mb-4">
                        <div className="font-semibold text-[#0D1B2A] text-xs uppercase tracking-wider mb-2">{tcp('majorHistoryLabel')}</div>
                        <ul className="space-y-1">
                          {course.majorHistory.slice(0, 2).map((item) => (
                            <li key={item} className="text-[#2C3E50]/65 text-sm flex items-start gap-2">
                              <Star size={12} className="text-[#B8912A] mt-0.5 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Right: actions */}
                  <div className="md:w-56 shrink-0 flex flex-col gap-3">
                    <Link
                      href={`${prefix}/courses/${course.slug}`}
                      className="flex items-center justify-center gap-2 bg-[#1A4A30] text-white font-semibold px-4 py-3 rounded-lg hover:bg-[#2A6A45] transition-colors text-sm"
                    >
                      {tcp('fullCourseGuideBtn')} <ChevronRight size={14} />
                    </Link>
                    <a
                      href={course.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 border border-[#E8E3D8] text-[#2C3E50] font-medium px-4 py-2.5 rounded-lg hover:border-[#0D1B2A]/30 transition-colors text-sm"
                    >
                      <ExternalLink size={13} />
                      {tcp('clubWebsiteBtn')}
                    </a>
                    {course.phone && (
                      <a
                        href={`tel:${course.phone}`}
                        className="flex items-center justify-center gap-2 border border-[#E8E3D8] text-[#2C3E50] font-medium px-4 py-2.5 rounded-lg hover:border-[#0D1B2A]/30 transition-colors text-sm"
                      >
                        <Phone size={13} />
                        {course.phone}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
