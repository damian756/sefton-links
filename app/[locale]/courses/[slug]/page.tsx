import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import {
  Trophy, MapPin, Phone, ExternalLink, ChevronRight, Clock, Users,
  AlertCircle, CheckCircle2, Star, Utensils, Wind
} from 'lucide-react';
import { COURSES, getCourseBySlug } from '@/lib/courses';
import type { Metadata } from 'next';

const BASE_URL = 'https://www.seftonlinks.com';

export async function generateStaticParams() {
  return COURSES.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};

  const title = `${course.name} — Visitor Guide, Green Fees & Tee Times`;
  const description = `${course.tagline}. Green fee ${course.greenFeeRange}. Par ${course.par}, ${course.yardage.toLocaleString()} yards. Full visitor policy, how to book and post-round guide.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/courses/${slug}`,
      languages: {
        'en': `${BASE_URL}/courses/${slug}`,
        'de': `${BASE_URL}/de/courses/${slug}`,
        'ja': `${BASE_URL}/ja/courses/${slug}`,
        'x-default': `${BASE_URL}/courses/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/courses/${slug}`,
      type: 'website',
    },
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) notFound();

  const prefix = locale === 'en' ? '' : `/${locale}`;

  const otherCourses = COURSES.filter((c) => c.slug !== slug);

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      {/* Schema.org GolfCourse */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'GolfCourse',
                '@id': `${BASE_URL}/courses/${slug}`,
                name: course.name,
                description: course.tagline,
                url: `${BASE_URL}/courses/${slug}`,
                telephone: course.phone,
                sameAs: [course.website],
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: course.address,
                  postalCode: course.postcode,
                  addressLocality: 'Southport',
                  addressRegion: 'Merseyside',
                  addressCountry: 'GB',
                },
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: course.latitude,
                  longitude: course.longitude,
                },
                amenityFeature: [
                  { '@type': 'LocationFeatureSpecification', name: 'Par', value: course.par },
                  { '@type': 'LocationFeatureSpecification', name: 'Yardage', value: course.yardage },
                  { '@type': 'LocationFeatureSpecification', name: 'Course Rating', value: course.courseRating },
                  { '@type': 'LocationFeatureSpecification', name: 'Slope Rating', value: course.slopeRating },
                ],
                foundingDate: String(course.founded),
                priceRange: course.greenFeeRange,
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
                  { '@type': 'ListItem', position: 2, name: 'Courses', item: `${BASE_URL}/courses` },
                  { '@type': 'ListItem', position: 3, name: course.name, item: `${BASE_URL}/courses/${slug}` },
                ],
              },
            ],
          }),
        }}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E8E3D8]">
        <div className="container mx-auto px-4 max-w-7xl py-3">
          <nav className="flex items-center gap-2 text-sm text-[#2C3E50]/55">
            <Link href={prefix || '/'} className="hover:text-[#1A4A30] transition-colors">Home</Link>
            <ChevronRight size={13} />
            <Link href={`${prefix}/courses`} className="hover:text-[#1A4A30] transition-colors">Courses</Link>
            <ChevronRight size={13} />
            <span className="text-[#0D1B2A] font-medium">{course.shortName}</span>
          </nav>
        </div>
      </div>

      {/* Hero header */}
      <div className="bg-[#0D1B2A] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 70%, #1A4A30 0%, transparent 60%), radial-gradient(circle at 70% 20%, #B8912A 0%, transparent 50%)',
          }}
        />
        <div className="relative container mx-auto px-4 max-w-7xl py-14 md:py-20">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-[#B8912A] text-xs font-semibold uppercase tracking-widest">
                  Est. {course.founded}
                </span>
                {course.openChampionship && (
                  <span className="bg-[#B8912A] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Trophy size={11} /> Open Championship Venue
                  </span>
                )}
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  course.difficulty === 'championship' ? 'bg-red-900/40 text-red-300' :
                  course.difficulty === 'challenging' ? 'bg-orange-900/40 text-orange-300' :
                  course.difficulty === 'moderate' ? 'bg-blue-900/40 text-blue-300' :
                  'bg-green-900/40 text-green-300'
                }`}>
                  {course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}
                </span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
                {course.name}
              </h1>
              <p className="text-[#D4AE7A] text-lg font-medium mb-4">{course.tagline}</p>
              <div className="flex items-center gap-2 text-white/55 text-sm">
                <MapPin size={14} />
                <span>{course.address}, {course.postcode}</span>
              </div>
            </div>

            {/* Quick book panel */}
            <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-xl p-5 min-w-[220px]">
              <div className="text-[#D4AE7A] text-xs uppercase tracking-wider mb-3 font-semibold">Quick Info</div>
              <div className="space-y-2.5 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-white/55">Green Fee</span>
                  <span className="text-white font-semibold">{course.greenFeeRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/55">Par</span>
                  <span className="text-white font-mono">{course.par}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/55">Yards</span>
                  <span className="text-white font-mono">{course.yardage.toLocaleString()}</span>
                </div>
                {course.handicapLimit && (
                  <div className="flex justify-between">
                    <span className="text-white/55">Handicap</span>
                    <span className="text-white font-mono">&le;{course.handicapLimit}</span>
                  </div>
                )}
              </div>
              <a
                href={course.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#B8912A] text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-[#D4AE7A] transition-colors text-sm w-full"
              >
                Book via Club Website <ExternalLink size={13} />
              </a>
              {course.phone && (
                <a
                  href={`tel:${course.phone}`}
                  className="flex items-center justify-center gap-2 text-white/60 hover:text-white transition-colors text-sm mt-2 w-full"
                >
                  <Phone size={13} /> {course.phone}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left: main editorial content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Course description */}
            <section>
              <h2 className="font-display text-2xl font-bold text-[#0D1B2A] mb-4">About {course.shortName}</h2>
              <div className="prose prose-slate max-w-none text-[#2C3E50]/80">
                {course.description.split('\n\n').map((para, i) => (
                  <p key={i} className="mb-4 leading-relaxed">{para}</p>
                ))}
              </div>
            </section>

            {/* Scorecard / tee data */}
            <section>
              <h2 className="font-display text-2xl font-bold text-[#0D1B2A] mb-4">Course Data</h2>
              <div className="overflow-x-auto rounded-xl border border-[#E8E3D8]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#0D1B2A] text-white">
                      <th className="text-left px-4 py-3 font-semibold">Tee</th>
                      <th className="text-center px-4 py-3 font-semibold">Par</th>
                      <th className="text-center px-4 py-3 font-semibold">Yardage</th>
                      <th className="text-center px-4 py-3 font-semibold">Rating</th>
                      <th className="text-center px-4 py-3 font-semibold">Slope</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {course.tees.map((tee, i) => (
                      <tr key={tee.name} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F5EE]'}>
                        <td className="px-4 py-3 font-semibold text-[#0D1B2A]">{tee.name}</td>
                        <td className="px-4 py-3 text-center font-mono text-[#0D1B2A]">{tee.par}</td>
                        <td className="px-4 py-3 text-center font-mono text-[#0D1B2A]">{tee.yardage.toLocaleString()}</td>
                        <td className="px-4 py-3 text-center font-mono text-[#0D1B2A]">{tee.rating ?? '—'}</td>
                        <td className="px-4 py-3 text-center font-mono text-[#0D1B2A]">{tee.slope ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[#2C3E50]/45 text-xs mt-2">Ratings verified to best available data. Verify with club before competition use.</p>
            </section>

            {/* Visitor policy detail */}
            <section>
              <h2 className="font-display text-2xl font-bold text-[#0D1B2A] mb-4">How to Get a Tee Time</h2>
              <div className="bg-white rounded-xl border border-[#E8E3D8] p-6 space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 size={18} className="text-[#1A4A30] mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0D1B2A] mb-1">Visitor Policy</div>
                    <p className="text-[#2C3E50]/70 text-sm">{course.visitorPolicy}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock size={18} className="text-[#1A4A30] mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0D1B2A] mb-1">Best Days to Visit</div>
                    <p className="text-[#2C3E50]/70 text-sm">{course.visitorDays}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Users size={18} className="text-[#1A4A30] mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0D1B2A] mb-1">How Far in Advance</div>
                    <p className="text-[#2C3E50]/70 text-sm">{course.advanceBooking}</p>
                  </div>
                </div>
                {course.handicapLimit && (
                  <div className="flex gap-3">
                    <AlertCircle size={18} className="text-[#B8912A] mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-[#0D1B2A] mb-1">Handicap Requirement</div>
                      <p className="text-[#2C3E50]/70 text-sm">
                        Men's handicap limit: {course.handicapLimit}. Handicap certificate required — bring your club card or EGA handicap card.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Course highlights */}
            <section>
              <h2 className="font-display text-2xl font-bold text-[#0D1B2A] mb-4">Why Play {course.shortName}?</h2>
              <ul className="space-y-3">
                {course.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <Star size={14} className="text-[#B8912A] mt-1 shrink-0" />
                    <span className="text-[#2C3E50]/80 text-sm leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Practical notes */}
            <section>
              <h2 className="font-display text-2xl font-bold text-[#0D1B2A] mb-4">Practical Notes</h2>
              <div className="bg-[#1A4A30]/5 border border-[#1A4A30]/15 rounded-xl p-6">
                <ul className="space-y-3">
                  {course.practicalNotes.map((note) => (
                    <li key={note} className="flex items-start gap-3">
                      <CheckCircle2 size={14} className="text-[#1A4A30] mt-0.5 shrink-0" />
                      <span className="text-[#2C3E50]/80 text-sm">{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Major history */}
            {course.majorHistory && course.majorHistory.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-bold text-[#0D1B2A] mb-4">Major Championship History</h2>
                <div className="space-y-3">
                  {course.majorHistory.map((item) => (
                    <div key={item} className="flex items-start gap-3 bg-[#B8912A]/8 border border-[#B8912A]/20 rounded-lg px-4 py-3">
                      <Trophy size={14} className="text-[#B8912A] mt-0.5 shrink-0" />
                      <span className="text-[#2C3E50]/80 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Post-round dining */}
            <section>
              <h2 className="font-display text-2xl font-bold text-[#0D1B2A] mb-4">After Your Round</h2>
              <div className="space-y-3">
                {course.nearbyDining.map((place) => (
                  <div key={place} className="flex items-start gap-3 bg-white border border-[#E8E3D8] rounded-lg px-4 py-3">
                    <Utensils size={14} className="text-[#1A4A30] mt-0.5 shrink-0" />
                    <span className="text-[#2C3E50]/80 text-sm">{place}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <a
                  href="https://www.southportguide.co.uk/restaurants"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1A4A30] text-sm font-semibold hover:text-[#B8912A] transition-colors flex items-center gap-1"
                >
                  Full restaurant guide — SouthportGuide.co.uk <ExternalLink size={12} />
                </a>
              </div>
            </section>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            {/* Book now */}
            <div className="bg-[#1A4A30] rounded-xl p-6 text-white">
              <h3 className="font-display text-lg font-bold mb-2">Book Your Round</h3>
              <p className="text-white/70 text-sm mb-4">
                Book tee times and golf packages at {course.shortName} via Golf Breaks — the UK's leading golf holiday specialist.
              </p>
              <a
                href="https://www.golfbreaks.com"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex items-center justify-center gap-2 bg-[#B8912A] text-white font-semibold px-4 py-3 rounded-lg hover:bg-[#D4AE7A] transition-colors text-sm w-full"
              >
                <Trophy size={15} />
                View Golf Breaks Packages
              </a>
              <div className="mt-3 text-center">
                <a
                  href={course.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/55 text-xs hover:text-white transition-colors flex items-center justify-center gap-1"
                >
                  Or book direct at {course.shortName} <ExternalLink size={10} />
                </a>
              </div>
            </div>

            {/* Course conditions link */}
            <div className="bg-white border border-[#E8E3D8] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Wind size={16} className="text-[#4A7D9A]" />
                <h3 className="font-semibold text-[#0D1B2A]">Today's Conditions</h3>
              </div>
              <p className="text-[#2C3E50]/60 text-sm mb-3">Check current playing conditions before you go.</p>
              <Link
                href={`${prefix}/conditions`}
                className="text-[#4A7D9A] text-sm font-semibold hover:text-[#1A4A30] transition-colors flex items-center gap-1"
              >
                View course conditions <ChevronRight size={13} />
              </Link>
            </div>

            {/* Getting there */}
            <div className="bg-white border border-[#E8E3D8] rounded-xl p-5">
              <h3 className="font-semibold text-[#0D1B2A] mb-3 flex items-center gap-2">
                <MapPin size={16} className="text-[#1A4A30]" />
                Getting There
              </h3>
              <div className="space-y-2 text-sm text-[#2C3E50]/70">
                <p><strong className="text-[#0D1B2A]">Postcode:</strong> {course.postcode}</p>
                <p><strong className="text-[#0D1B2A]">From Liverpool Airport:</strong> ~45 min by car</p>
                <p><strong className="text-[#0D1B2A]">From Manchester Airport:</strong> ~70 min by car</p>
                <p><strong className="text-[#0D1B2A]">By train:</strong> Merseyrail to Southport, then taxi</p>
              </div>
            </div>

            {/* Other courses */}
            <div>
              <h3 className="font-semibold text-[#0D1B2A] mb-3 uppercase tracking-wider text-xs">Other Courses</h3>
              <div className="space-y-2">
                {otherCourses.slice(0, 4).map((c) => (
                  <Link
                    key={c.slug}
                    href={`${prefix}/courses/${c.slug}`}
                    className="flex items-center justify-between bg-white border border-[#E8E3D8] rounded-lg px-4 py-3 hover:border-[#B8912A]/40 transition-colors group"
                  >
                    <div>
                      <div className="font-medium text-[#0D1B2A] text-sm group-hover:text-[#1A4A30] transition-colors">
                        {c.shortName}
                      </div>
                      <div className="text-[#2C3E50]/50 text-xs">{c.greenFeeRange}</div>
                    </div>
                    <ChevronRight size={13} className="text-[#2C3E50]/30 group-hover:text-[#B8912A] transition-colors" />
                  </Link>
                ))}
              </div>
              <Link
                href={`${prefix}/courses`}
                className="text-[#1A4A30] text-sm font-semibold hover:text-[#B8912A] transition-colors flex items-center gap-1 mt-3"
              >
                Compare all courses <ChevronRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
