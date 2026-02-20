import Link from 'next/link';
import { Phone, ExternalLink, AlertCircle, CheckCircle2, Clock, Users, ChevronRight } from 'lucide-react';
import { COURSES } from '@/lib/courses';
import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/metadata';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tm = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: tm('teeTimesTitle'),
    description: tm('teeTimesDesc'),
    alternates: buildAlternates('/tee-times'),
  };
}

export default async function TeeTimesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const t = await getTranslations({ locale, namespace: 'teeTimesPage' });

  const sortedCourses = [...COURSES].sort((a, b) => b.greenFeeFrom - a.greenFeeFrom);

  const tips = [
    { title: t('tip1Title'), text: t('tip1Text') },
    { title: t('tip2Title'), text: t('tip2Text') },
    { title: t('tip3Title'), text: t('tip3Text') },
    { title: t('tip4Title'), text: t('tip4Text') },
    { title: t('tip5Title'), text: t('tip5Text') },
    { title: t('tip6Title'), text: t('tip6Text') },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      <div className="bg-[#0D1B2A] py-14">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-[#B8912A] text-sm uppercase tracking-widest font-semibold mb-3">{t('headerBadge')}</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">{t('pageTitle')}</h1>
          <p className="text-white/65 text-lg max-w-2xl leading-relaxed">
            {t('pageDesc')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-12 space-y-10">

        {/* Formby special callout */}
        <div className="bg-[#B8912A]/10 border border-[#B8912A]/30 rounded-2xl p-6 md:p-8">
          <div className="flex gap-3 mb-4">
            <AlertCircle size={22} className="text-[#B8912A] shrink-0 mt-0.5" />
            <div>
              <h2 className="font-display text-xl font-bold text-[#0D1B2A]">{t('formbyCalloutTitle')}</h2>
              <p className="text-[#2C3E50]/70 mt-2 leading-relaxed text-sm">
                {t('formbyCalloutIntro')}
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 pl-8">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <AlertCircle size={14} className="text-[#B8912A] mt-0.5 shrink-0" />
                <p className="text-sm text-[#2C3E50]/75"><strong className="text-[#0D1B2A]">{t('formbyPoint1Title')}</strong> {t('formbyPoint1Text')}</p>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle size={14} className="text-[#B8912A] mt-0.5 shrink-0" />
                <p className="text-sm text-[#2C3E50]/75"><strong className="text-[#0D1B2A]">{t('formbyPoint2Title')}</strong> {t('formbyPoint2Text')}</p>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle size={14} className="text-[#B8912A] mt-0.5 shrink-0" />
                <p className="text-sm text-[#2C3E50]/75"><strong className="text-[#0D1B2A]">{t('formbyPoint3Title')}</strong> {t('formbyPoint3Text')}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#1A4A30] mt-0.5 shrink-0" />
                <p className="text-sm text-[#2C3E50]/75"><strong className="text-[#0D1B2A]">{t('formbyPoint4Title')}</strong> {t('formbyPoint4Text')}</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#1A4A30] mt-0.5 shrink-0" />
                <p className="text-sm text-[#2C3E50]/75"><strong className="text-[#0D1B2A]">{t('formbyPoint5Title')}</strong> {t('formbyPoint5Text')}</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#1A4A30] mt-0.5 shrink-0" />
                <p className="text-sm text-[#2C3E50]/75"><strong className="text-[#0D1B2A]">{t('formbyPoint6Title')}</strong> {t('formbyPoint6Text')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* All courses tee time guide */}
        <div className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-[#0D1B2A]">{t('allCoursesTitle')}</h2>
          {sortedCourses.map((course) => (
            <div key={course.slug} className="bg-white border border-[#E8E3D8] rounded-xl overflow-hidden">
              <div className={`h-1 ${course.openChampionship ? 'bg-[#B8912A]' : 'bg-[#1A4A30]'}`} />
              <div className="p-5 md:p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#0D1B2A]">{course.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-[#2C3E50]/50 mt-1">
                      <span>{course.postcode}</span>
                      <span>·</span>
                      <span>{course.greenFeeRange}</span>
                      <span>·</span>
                      <span className={`font-semibold ${
                        course.difficulty === 'championship' || course.difficulty === 'challenging' ? 'text-amber-700' : 'text-green-700'
                      }`}>
                        {course.difficulty === 'championship'
                          ? t('difficultyRestricted')
                          : course.difficulty === 'challenging'
                          ? t('difficultyByArrangement')
                          : t('difficultyWelcome')}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {course.phone && (
                      <a href={`tel:${course.phone}`} className="flex items-center gap-1 border border-[#E8E3D8] px-3 py-1.5 rounded-lg text-sm text-[#2C3E50] hover:border-[#0D1B2A]/30 transition-colors">
                        <Phone size={12} /> {t('callBtn')}
                      </a>
                    )}
                    <a href={course.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 border border-[#E8E3D8] px-3 py-1.5 rounded-lg text-sm text-[#2C3E50] hover:border-[#0D1B2A]/30 transition-colors">
                      <ExternalLink size={12} /> {t('websiteBtn')}
                    </a>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-[#2C3E50]/50 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Users size={11} /> {t('visitorPolicyLabel')}
                    </div>
                    <p className="text-sm text-[#2C3E50]/75 leading-relaxed">{course.visitorPolicy}</p>
                  </div>
                  <div>
                    <div className="text-xs text-[#2C3E50]/50 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Clock size={11} /> {t('bestDaysLabel')}
                    </div>
                    <p className="text-sm text-[#2C3E50]/75 leading-relaxed">{course.visitorDays}</p>
                  </div>
                  <div>
                    <div className="text-xs text-[#2C3E50]/50 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <CheckCircle2 size={11} /> {t('bookingLabel')}
                    </div>
                    <p className="text-sm text-[#2C3E50]/75 leading-relaxed">{course.advanceBooking}</p>
                  </div>
                </div>

                {course.handicapLimit && (
                  <div className="mt-4 flex items-start gap-2 bg-[#B8912A]/8 rounded-lg px-4 py-3">
                    <AlertCircle size={14} className="text-[#B8912A] mt-0.5 shrink-0" />
                    <p className="text-sm text-[#2C3E50]/75">
                      <strong className="text-[#0D1B2A]">{t('handicapRequirementLabel')}</strong>{' '}
                      {t('handicapRequirementText', { limit: course.handicapLimit })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* General tips */}
        <div className="bg-[#1A4A30] rounded-2xl p-8 text-white">
          <h2 className="font-display text-2xl font-bold mb-6">{t('generalTipsTitle')}</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {tips.map(({ title, text }) => (
              <div key={title} className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-[#D4AE7A] mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-white mb-1">{title}</div>
                  <p className="text-white/65 text-sm leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
