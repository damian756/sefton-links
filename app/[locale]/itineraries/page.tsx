import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Calendar, Trophy, MapPin, Bed, Utensils, ChevronRight } from 'lucide-react';
import GolfBreakPlanner from '@/components/GolfBreakPlanner';
import { SEFTON_ITINERARIES } from '@/lib/courses';
import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tm = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: tm('itinerariesTitle'),
    description: tm('itinerariesDesc'),
    alternates: buildAlternates('/itineraries'),
  };
}

const COURSE_NAMES: Record<string, string> = {
  'royal-birkdale': 'Royal Birkdale',
  'hillside': 'Hillside GC',
  'formby': 'Formby GC',
  'west-lancashire': 'West Lancashire',
  'southport-ainsdale': 'Southport & Ainsdale',
  'southport-old-links': 'Southport Old Links',
};

export default async function ItinerariesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const t = await getTranslations({ locale, namespace: 'itinerariesPage' });

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

      <div className="container mx-auto px-4 max-w-7xl py-14">
        {/* Interactive planner */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-[#0D1B2A] mb-2">{t('plannerTitle')}</h2>
          <p className="text-[#2C3E50]/65 mb-8">{t('plannerDesc')}</p>
          <GolfBreakPlanner locale={locale} />
        </section>

        {/* Pre-built itineraries */}
        <section>
          <h2 className="font-display text-2xl font-bold text-[#0D1B2A] mb-8">{t('allItinerariesTitle')}</h2>
          <div className="space-y-8">
            {SEFTON_ITINERARIES.map((it) => (
              <div key={it.id} className="bg-white rounded-2xl border border-[#E8E3D8] overflow-hidden shadow-sm">
                <div className="h-1.5 bg-gradient-to-r from-[#1A4A30] via-[#B8912A] to-[#1A4A30]" />
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-[#0D1B2A]">{it.title}</h3>
                      <p className="text-[#1A4A30] font-medium mt-1">{it.subtitle}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-[#0D1B2A]">{it.days} {it.days === 1 ? t('dayLabel') : t('daysLabel')}</div>
                      <div className="text-[#2C3E50]/50 text-sm">
                        {it.budget === 'premium' ? t('budgetPremium') : it.budget === 'standard' ? t('budgetStandard') : t('budgetValue')}
                      </div>
                    </div>
                  </div>

                  <p className="text-[#2C3E50]/70 mb-6 leading-relaxed">{it.description}</p>

                  <div className="grid sm:grid-cols-3 gap-4 mb-6">
                    {/* Courses */}
                    <div className="sm:col-span-1">
                      <div className="text-xs font-semibold text-[#2C3E50]/50 uppercase tracking-wider mb-2">{t('courseOrderLabel')}</div>
                      <div className="space-y-1.5">
                        {it.courses.map((slug, i) => (
                          <div key={slug} className="flex items-center gap-2">
                            <span className="w-5 h-5 bg-[#0D1B2A] rounded-full text-white text-xs flex items-center justify-center font-bold shrink-0">
                              {i + 1}
                            </span>
                            <Link
                              href={`${prefix}/courses/${slug}`}
                              className="text-sm text-[#1A4A30] font-medium hover:text-[#B8912A] transition-colors"
                            >
                              {COURSE_NAMES[slug]}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stay */}
                    <div>
                      <div className="text-xs font-semibold text-[#2C3E50]/50 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Bed size={12} /> {t('whereToStayLabel')}
                      </div>
                      <p className="text-sm text-[#2C3E50]/70 leading-relaxed">{it.accommodation}</p>
                    </div>

                    {/* Eat */}
                    <div>
                      <div className="text-xs font-semibold text-[#2C3E50]/50 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Utensils size={12} /> {t('diningLabel')}
                      </div>
                      <p className="text-sm text-[#2C3E50]/70 leading-relaxed">{it.dining}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F8F5EE] rounded-xl p-4">
                    <div>
                      <div className="text-xs text-[#2C3E50]/50 uppercase tracking-wider mb-0.5">{t('estimatedGreenFeesLabel')}</div>
                      <div className="font-bold text-[#0D1B2A]">{it.estimatedCost}</div>
                    </div>
                    <a
                      href="https://www.golfbreaks.com/en-gb/united-kingdom/england/lancashire/"
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="flex items-center gap-2 bg-[#1A4A30] text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-[#2A6A45] transition-colors text-sm shrink-0"
                    >
                      <Trophy size={14} />
                      {t('bookViaGolfBreaksBtn')}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial */}
        <section className="mt-14 bg-white border border-[#E8E3D8] rounded-2xl p-8">
          <h2 className="font-display text-2xl font-bold text-[#0D1B2A] mb-5">{t('howToPlanTitle')}</h2>
          <div className="prose prose-slate max-w-none text-[#2C3E50]/75 space-y-4 text-sm leading-relaxed">
            <p>{t('howToPlanPara1')}</p>
            <p>{t('howToPlanPara2')}</p>
            <p>{t('howToPlanPara3')}</p>
            <p>{t('howToPlanPara4')}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
