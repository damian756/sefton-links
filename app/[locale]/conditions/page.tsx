import { getTranslations } from 'next-intl/server';
import ConditionTracker from '@/components/ConditionTracker';
import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tm = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: tm('conditionsTitle'),
    description: tm('conditionsDesc'),
    alternates: buildAlternates('/conditions'),
  };
}

export default async function ConditionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'conditionsPage' });

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      <div className="bg-[#0D1B2A] py-14">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-[#B8912A] text-sm uppercase tracking-widest font-semibold mb-3">{t('headerBadge')}</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            {t('pageTitle')}
          </h1>
          <p className="text-white/65 text-lg max-w-2xl leading-relaxed">
            {t('pageDesc')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-12">
        <ConditionTracker />

        <div className="mt-12 bg-white border border-[#E8E3D8] rounded-xl p-6">
          <h2 className="font-display text-2xl font-bold text-[#0D1B2A] mb-4">{t('aboutLinksTitle')}</h2>
          <div className="prose prose-slate max-w-none text-[#2C3E50]/75 space-y-4 text-sm leading-relaxed">
            <p>{t('aboutLinksPara1')}</p>
            <p>{t('aboutLinksPara2')}</p>
            <p>{t('aboutLinksPara3')}</p>
            <p className="text-[#2C3E50]/45 text-xs">
              {t('conditionsDisclaimer')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
