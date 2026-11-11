import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { buildAlternates, buildOg } from '@/lib/metadata';
import { DISPLAY_EMAIL } from '@/lib/contact';
import { ADVERTISING_SUBJECT, CONTACT_SUBJECTS } from '@/lib/contact-form';
import { AD_SLOTS, describeSpace, getAdOption } from '@/lib/ad-slots';
import ContactForm from './ContactForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tm = await getTranslations({ locale, namespace: 'meta' });
  const title = tm('contactTitle');
  const description = tm('contactDesc');
  return {
    title,
    description,
    alternates: buildAlternates('/contact'),
    openGraph: buildOg('/contact', { title, description }),
  };
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ topic?: string | string[]; space?: string | string[] }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  const t = await getTranslations({ locale, namespace: 'contactPage' });
  const prefix = locale === 'en' ? '' : `/${locale}`;

  // Links from the advertise page: /contact?topic=advertise&space=<slot or option id>.
  const topic = typeof query.topic === 'string' ? query.topic : '';
  const spaceParam = typeof query.space === 'string' ? query.space : '';
  const spaceTitle = describeSpace(spaceParam);
  const space = spaceTitle && (AD_SLOTS[spaceParam] || getAdOption(spaceParam)) ? spaceParam : null;
  const advertising = topic === 'advertise' || Boolean(space);

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      <div className="bg-[#0D1B2A] py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-white mb-3">{t('pageTitle')}</h1>
          <p className="text-white/65 text-lg">{t('pageDesc')}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-3xl py-14 space-y-8">
        <div className="relative bg-white border border-[#E8E3D8] rounded-2xl p-6 sm:p-8">
          <ContactForm
            labels={{
              formTitle: t('formTitle'),
              nameLabel: t('nameLabel'),
              emailLabel: t('emailLabel'),
              subjectLabel: t('subjectLabel'),
              subjectPlaceholder: t('subjectPlaceholder'),
              messageLabel: t('messageLabel'),
              sendBtn: t('sendBtn'),
              sending: t('sending'),
              sentTitle: t('sentTitle'),
              sentText: t('sentText'),
              errorText: t('errorText', { email: DISPLAY_EMAIL }),
            }}
            subjects={CONTACT_SUBJECTS.map((value) => ({ value, label: t(`subject.${value}`) }))}
            initialSubject={advertising ? ADVERTISING_SUBJECT : ''}
            initialMessage={spaceTitle ? `I'm interested in: ${spaceTitle}\n\n` : ''}
            space={space}
          />
        </div>

        <div className="bg-white border border-[#E8E3D8] rounded-2xl p-6 sm:p-8 space-y-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#0D1B2A] mb-4">{t('getInTouchTitle')}</h2>
            <div className="prose text-[#2C3E50]/70 text-sm leading-relaxed space-y-3">
              <p>
                <strong className="text-[#0D1B2A]">{t('generalEnquiriesLabel')}</strong>{' '}
                <a href={`mailto:${DISPLAY_EMAIL}`} className="text-[#1A4A30] hover:text-[#B8912A] transition-colors">
                  {DISPLAY_EMAIL}
                </a>
              </p>
              <p>
                <strong className="text-[#0D1B2A]">{t('advertisingLabel')}</strong>{' '}
                {t('advertisingText')}{' '}
                <Link href={`${prefix}/advertise`} className="text-[#1A4A30] hover:text-[#B8912A] transition-colors">
                  {t('advertisingLink')}
                </Link>
              </p>
              <p>
                <strong className="text-[#0D1B2A]">{t('dataCorrectionsLabel')}</strong>{' '}
                {t('dataCorrectionsText')}
              </p>
              <p>
                <strong className="text-[#0D1B2A]">{t('pressMediaLabel')}</strong>{' '}
                <a
                  href="https://churchtownmedia.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1A4A30] hover:text-[#B8912A] transition-colors"
                >
                  {t('pressMediaLinkText')}
                </a>
              </p>
            </div>
          </div>

          <div className="border-t border-[#E8E3D8] pt-6">
            <h3 className="font-semibold text-[#0D1B2A] mb-3">{t('beforeContactTitle')}</h3>
            <ul className="space-y-2 text-sm text-[#2C3E50]/70">
              <li>{t('beforeContactItem1')}</li>
              <li>
                {t('beforeContactItem2')}{' '}
                <a
                  href="https://www.theopen.com/tickets"
                  className="text-[#1A4A30] hover:text-[#B8912A] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TheOpen.com
                </a>
                .
              </li>
              <li>{t('beforeContactItem3')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
