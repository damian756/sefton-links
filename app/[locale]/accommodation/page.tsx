import Image from 'next/image';
import { Bed, MapPin, ExternalLink, CheckCircle2, Clock } from 'lucide-react';
import type { Metadata } from 'next';
import { buildAlternates, buildOg } from '@/lib/metadata';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tm = await getTranslations({ locale, namespace: 'meta' });
  const title = tm('accommodationTitle');
  const description = tm('accommodationDesc');
  return {
    title,
    description,
    alternates: buildAlternates('/accommodation'),
    openGraph: buildOg('/accommodation', { title, description }),
  };
}

const ACCOMMODATION = [
  {
    area: 'Birkdale & Southport Centre',
    distanceFromBirkdale: '< 2 miles',
    options: [
      // Named hotels: only what each hotel's own website says (boldhotel.com,
      // thevincenthotel.com, formbyhallgolfresort.co.uk, read 11 Nov 2026). No rates
      // anywhere on this page: they change, so readers check the hotel's site.
      {
        name: 'The Bold Hotel',
        type: 'Hotel',
        address: '583 Lord Street, Southport, PR9 0BE',
        desc: 'A Grade II listed hotel on Lord Street with a restaurant and bar. Its website lists golf breaks and gym access for guests.',
        golferFriendly: ['Golf breaks listed on its website', 'Restaurant and bar', 'Gym access', 'On Lord Street'],
      },
      {
        name: 'The Vincent Hotel',
        type: 'Hotel',
        address: '98 Lord Street, Southport, PR8 1JR',
        desc: 'A hotel on Lord Street with 59 bedrooms, the V Café & Restaurant, a cocktail bar, a spa and fitness room, and valet parking.',
        golferFriendly: ['V Café & Restaurant and cocktail bar', 'Spa and fitness room', 'Valet parking', 'On Lord Street'],
      },
    ],
  },
  {
    area: 'Formby Village',
    distanceFromBirkdale: '5–6 miles',
    options: [
      {
        name: 'Formby Hall Golf Resort & Spa',
        type: 'Golf Resort',
        address: 'Southport Old Road, Formby, L37 0AB',
        desc: 'A four-star hotel with its own golf course and a PGA golf academy. The spa has a heated indoor swimming pool, and there is a restaurant and a gym. Its website lists golf breaks and society days.',
        golferFriendly: ['Its own golf course', 'Golf breaks and society days', 'Spa and indoor pool', 'Restaurant'],
      },
      {
        name: 'Formby B&Bs (various)',
        type: 'B&B',
        address: 'Formby Village, L37',
        desc: 'B&Bs and holiday lets in and around Formby village. FormbyGuide.co.uk lists places to stay and eat in the village.',
        golferFriendly: ['Village shops and places to eat', 'Close to Formby Golf Club'],
      },
    ],
  },
  {
    area: 'Greater Liverpool',
    distanceFromBirkdale: '18–25 miles',
    options: [
      {
        name: 'Liverpool City Centre Hotels',
        type: 'Hotel (various)',
        address: 'Liverpool City Centre',
        desc: 'Hotels of every kind, from budget chains to boutique hotels. 45–60 min to Birkdale by car, 50 min by train to Southport then taxi. Useful for trips combining golf with Liverpool itself.',
        golferFriendly: ['Wide choice', 'Rail links to Southport', 'City dining'],
      },
    ],
  },
];

export default async function AccommodationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'accommodationPage' });

  const tips = [
    { icon: Clock, tip: t('tip1') },
    { icon: Bed, tip: t('tip2') },
    { icon: MapPin, tip: t('tip3') },
    { icon: CheckCircle2, tip: t('tip4') },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      <div className="bg-[#0D1B2A] py-14 relative overflow-hidden">
        <Image
          src="/images/accommodation.jpg"
          alt="Golf hotel and fairway with lake reflection"
          fill
          priority
          className="object-cover object-center opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/55 via-[#0D1B2A]/35 to-[#0D1B2A]/70" />
        <div className="relative container mx-auto px-4 max-w-7xl">
          <div className="text-[#B8912A] text-sm uppercase tracking-widest font-semibold mb-3">{t('headerBadge')}</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">{t('pageTitle')}</h1>
          <p className="text-white/65 text-lg max-w-2xl leading-relaxed">
            {t('pageDesc')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-12 space-y-12">

        {/* Accommodation areas */}
        {ACCOMMODATION.map((area) => (
          <div key={area.area}>
            <div className="flex items-baseline gap-4 mb-6">
              <h2 className="font-display text-2xl font-bold text-[#0D1B2A]">{area.area}</h2>
              <span className="text-[#2C3E50]/50 text-sm flex items-center gap-1.5">
                <MapPin size={12} /> {area.distanceFromBirkdale} {t('distanceFromBirkdale')}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {area.options.map((opt) => (
                <div key={opt.name} className="bg-white border border-[#E8E3D8] rounded-xl overflow-hidden shadow-sm">
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-display text-xl font-bold text-[#0D1B2A]">{opt.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-[#2C3E50]/50 mt-1">
                          <span className="bg-[#1A4A30]/10 text-[#1A4A30] px-2 py-0.5 rounded-full font-medium">{opt.type}</span>
                          <span>{opt.address}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-[#2C3E50]/70 text-sm leading-relaxed mb-4">{opt.desc}</p>

                    <div>
                      <div className="text-xs text-[#2C3E50]/50 uppercase tracking-wider mb-2">{t('golferFeaturesLabel')}</div>
                      <ul className="space-y-1">
                        {opt.golferFriendly.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-[#2C3E50]/70">
                            <CheckCircle2 size={12} className="text-[#1A4A30] shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Booking tips */}
        <div className="bg-[#1A4A30] rounded-2xl p-8 text-white">
          <h2 className="font-display text-2xl font-bold mb-6">{t('tipsTitle')}</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {tips.map(({ icon: Icon, tip }, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#B8912A]/20 rounded-lg flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-[#D4AE7A]" />
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Network links */}
        <div className="grid sm:grid-cols-2 gap-6">
          <a href="https://www.southportguide.co.uk/hotels" target="_blank" rel="noopener noreferrer" className="group bg-white border border-[#E8E3D8] rounded-xl p-5 flex items-center gap-4 hover:border-[#1A4A30]/30 transition-all card-hover">
            <Bed size={20} className="text-[#1A4A30] shrink-0" />
            <div>
              <div className="font-semibold text-[#0D1B2A] group-hover:text-[#1A4A30] transition-colors">{t('southportHotelsLinkTitle')}</div>
              <div className="text-[#2C3E50]/55 text-sm">{t('southportHotelsLinkDesc')}</div>
            </div>
            <ExternalLink size={14} className="text-[#2C3E50]/30 ml-auto shrink-0" />
          </a>
          <a href="https://www.formbyguide.co.uk/accommodation" target="_blank" rel="noopener noreferrer" className="group bg-white border border-[#E8E3D8] rounded-xl p-5 flex items-center gap-4 hover:border-[#2E6B3E]/30 transition-all card-hover">
            <Bed size={20} className="text-[#2E6B3E] shrink-0" />
            <div>
              <div className="font-semibold text-[#0D1B2A] group-hover:text-[#1A4A30] transition-colors">{t('formbyAccomLinkTitle')}</div>
              <div className="text-[#2C3E50]/55 text-sm">{t('formbyAccomLinkDesc')}</div>
            </div>
            <ExternalLink size={14} className="text-[#2C3E50]/30 ml-auto shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
}
