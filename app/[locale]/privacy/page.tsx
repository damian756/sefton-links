import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildAlternates } from '@/lib/metadata';
import { DISPLAY_EMAIL } from '@/lib/contact';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return {
    title: 'Privacy Policy | SeftonLinks',
    robots: { index: false, follow: false },
    alternates: buildAlternates('/privacy'),
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalPage' });

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      <div className="bg-[#0D1B2A] py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-white mb-3">{t('privacyTitle')}</h1>
          <p className="text-white/55 text-sm">{t('lastUpdated')}</p>
        </div>
      </div>
      <div className="container mx-auto px-4 max-w-3xl py-14">
        <div className="bg-white border border-[#E8E3D8] rounded-2xl p-8 prose prose-slate max-w-none text-sm leading-relaxed text-[#2C3E50]/75 space-y-4">
          <p>{t('privacyIntro')}</p>
          <h2 className="font-display text-xl font-bold text-[#0D1B2A]">{t('analyticsTitle')}</h2>
          <p>{t('analyticsDesc')}</p>
          <p>{t('cookiesDesc')}</p>
          <p>{t('pageCountsDesc')}</p>
          <p>{t('contactFormDesc')}</p>
          <h2 className="font-display text-xl font-bold text-[#0D1B2A]">{t('privacyContactTitle')}</h2>
          <p>
            {t('privacyContactText')}{' '}
            <a href={`mailto:${DISPLAY_EMAIL}`} className="text-[#1A4A30]">
              {DISPLAY_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
