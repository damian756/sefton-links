import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { buildAlternates, buildOg } from '@/lib/metadata';
import { DISPLAY_EMAIL } from '@/lib/contact';
import { AD_OPTIONS, AD_SLOTS, FOUNDING_OFFER, NETWORK_BUNDLE, describeSpace, enquiryHref } from '@/lib/ad-slots';

// Title restored to the one the page ranked with (Damian, 11 Nov 2026). With the
// layout template it renders as "Advertise on SeftonLinks | Sefton Coast Network |
// SeftonLinks.com"; og:title is this string without the template, as before. Keep
// both; see docs/freshen-2026-11/REPORT.md, "SEO".
const title = 'Advertise on SeftonLinks | Sefton Coast Network';
const description =
  'Simple advertising options on SeftonLinks, the guide to golf on the Sefton Coast: course page partners, page sponsors, a home page card and sponsored articles, at fixed prices plus VAT.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title,
    description,
    alternates: buildAlternates('/advertise'),
    openGraph: buildOg('/advertise', { title, description }),
  };
}

const RULES = [
  'Every advert is labelled Advertisement, Sponsor or Sponsored.',
  'Paid links are marked as sponsored for search engines.',
  'Adverts never appear inside a review, and paying for a space does not change what we write.',
  'Course page partners and page or post sponsors are hotels, B&Bs, restaurants or golf travel firms, never a golf club.',
];

const STEPS = [
  'Tell us which space you would like through the contact form.',
  'We confirm it is free and send an invoice.',
  'Send a photo and up to 30 words. Your advert goes live within two working days.',
  "After any minimum term, stop with a month's notice.",
];

export default async function AdvertisePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ space?: string | string[] }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const space = typeof query.space === 'string' ? query.space : undefined;
  const spaceTitle = describeSpace(space);
  // An option's button names the space the visitor came from when that space
  // belongs to the option; otherwise it names the option.
  const slotOption = space ? AD_SLOTS[space]?.option : undefined;
  const ask = (id: string) => `${prefix}${enquiryHref(slotOption === id ? space : id)}`;

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      {/* Hero */}
      <section className="bg-[#0D1B2A] relative overflow-hidden">
        <div className="h-0.5 bg-gradient-to-r from-transparent via-[#B8912A] to-transparent" />
        <div className="container mx-auto px-4 max-w-6xl py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="text-[#B8912A] text-xs font-bold uppercase tracking-widest mb-4">Advertising</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Advertise to golfers planning a round on the Sefton Coast
            </h1>
            <p className="text-lg text-white/65 leading-relaxed mb-8">
              Advertising on SeftonLinks puts your business beside our course guides, visitor information and golf travel articles for the Sefton Coast, and the bundle adds the other Sefton Coast Network sites. Simple options at a fixed price. Every advert is clearly labelled, there are no ad networks or tracking cookies, and you deal with us directly.
            </p>
            <Link
              href={`${prefix}${enquiryHref(spaceTitle ? space : undefined)}`}
              className="inline-flex items-center gap-2 bg-[#B8912A] hover:bg-[#D4AE7A] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Ask about a space
            </Link>
          </div>
        </div>
      </section>

      {/* Options */}
      <section className="container mx-auto px-4 max-w-6xl py-14">
        <h2 className="font-display text-3xl font-bold text-[#0D1B2A] mb-2">Ways to advertise</h2>
        <p className="text-[#2C3E50]/60 text-sm mb-8 max-w-2xl">
          All prices are plus VAT. Payment is by invoice; nothing is sold online.
        </p>

        {spaceTitle && (
          <p className="mb-8 rounded-xl border border-[#1A4A30]/20 bg-[#1A4A30]/5 px-5 py-4 text-sm text-[#0D1B2A]">
            You asked about: <strong>{spaceTitle}</strong>
          </p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {AD_OPTIONS.map((o) => (
            <div key={o.id} id={o.id} className="bg-white rounded-2xl border border-[#E8E3D8] p-6 flex flex-col scroll-mt-24">
              <h3 className="font-display text-xl font-bold text-[#0D1B2A] mb-3">{o.name}</h3>
              {o.price ? (
                <p className="mb-1">
                  <span className="text-3xl font-bold text-[#0D1B2A]">{o.price}</span>{' '}
                  <span className="text-sm text-[#2C3E50]/60">{o.per} plus VAT</span>
                </p>
              ) : (
                <p className="mb-1 text-lg font-bold text-[#0D1B2A]">Ask us</p>
              )}
              <p className="text-xs text-[#2C3E50]/50 mb-4">{o.note}</p>
              <ul className="space-y-2 text-sm text-[#2C3E50]/75 mb-5 flex-1">
                {o.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <Check className="w-4 h-4 text-[#1A4A30] flex-none mt-0.5" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
              <p className="text-xs font-semibold text-[#1A4A30] mb-4">{o.term}</p>
              <Link
                href={ask(o.id)}
                className="text-center bg-[#1A4A30] hover:bg-[#0D1B2A] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
              >
                Ask about this space
              </Link>
            </div>
          ))}

          <div id={NETWORK_BUNDLE.id} className="bg-[#0D1B2A] text-white rounded-2xl p-6 flex flex-col scroll-mt-24">
            <p className="text-[#B8912A] text-[10px] font-bold uppercase tracking-widest mb-2">All four sites</p>
            <h3 className="font-display text-xl font-bold mb-3">{NETWORK_BUNDLE.name}</h3>
            <p className="mb-1">
              <span className="text-3xl font-bold">{NETWORK_BUNDLE.price}</span>{' '}
              <span className="text-sm text-white/60">{NETWORK_BUNDLE.per} plus VAT</span>
            </p>
            <p className="text-xs text-white/50 mb-4">{NETWORK_BUNDLE.note}</p>
            <ul className="space-y-2 text-sm text-white/80 mb-5 flex-1">
              {[...NETWORK_BUNDLE.points, NETWORK_BUNDLE.term].map((p) => (
                <li key={p} className="flex gap-2">
                  <Check className="w-4 h-4 text-[#B8912A] flex-none mt-0.5" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <Link
              href={ask(NETWORK_BUNDLE.id)}
              className="text-center bg-[#B8912A] hover:bg-[#D4AE7A] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
            >
              Ask about the bundle
            </Link>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-[#B8912A]/40 bg-[#B8912A]/10 p-6">
          <h3 className="font-display text-lg font-bold text-[#0D1B2A] mb-1">Founding advertisers</h3>
          <p className="text-sm text-[#2C3E50]/75">{FOUNDING_OFFER}</p>
        </div>
      </section>

      {/* How it works and rules */}
      <section className="bg-white border-y border-[#E8E3D8]">
        <div className="container mx-auto px-4 max-w-6xl py-14 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#0D1B2A] mb-4">How it works</h2>
            <ol className="space-y-3 text-sm text-[#2C3E50]/75 list-decimal pl-5">
              {STEPS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <p className="text-sm text-[#2C3E50]/60 mt-5">
              Prefer email? Write to{' '}
              <a href={`mailto:${DISPLAY_EMAIL}`} className="text-[#1A4A30] underline underline-offset-2 hover:text-[#B8912A]">
                {DISPLAY_EMAIL}
              </a>
              .
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-[#0D1B2A] mb-4">Our rules</h2>
            <ul className="space-y-3 text-sm text-[#2C3E50]/75">
              {RULES.map((r) => (
                <li key={r} className="flex gap-2">
                  <Check className="w-4 h-4 text-[#1A4A30] flex-none mt-0.5" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
            <p className="text-sm text-[#2C3E50]/60 mt-5">
              More on how SeftonLinks is paid for:{' '}
              <Link href="/disclosure" className="text-[#1A4A30] underline underline-offset-2 hover:text-[#B8912A]">
                disclosure
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
