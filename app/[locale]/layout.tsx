import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import NavMenu from '@/components/NavMenu';
import { routing } from '@/i18n/routing';
import '../globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

const BASE_URL = 'https://www.seftonlinks.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'SeftonLinks — Links Golf Guide to the Sefton Coast',
    template: '%s | SeftonLinks.com',
  },
  description:
    'The definitive links golf guide to Royal Birkdale, Hillside, Formby, West Lancashire and the Sefton Coast. Course guides, tee times, conditions and golf break itineraries.',
  keywords:
    'Royal Birkdale golf, Sefton Coast golf, links golf England, The Open 2026, Hillside Golf Club, Formby Golf Club, West Lancashire Golf Club, golf breaks Southport',
  authors: [{ name: 'SeftonLinks.com', url: BASE_URL }],
  creator: 'SeftonLinks.com',
  publisher: 'SeftonLinks.com',
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: BASE_URL,
    siteName: 'SeftonLinks.com',
    title: 'SeftonLinks — Links Golf Guide to the Sefton Coast',
    description:
      'Royal Birkdale, Hillside, Formby and the Sefton Coast links golf corridor. The Open Championship 2026.',
    images: [
      {
        url: `${BASE_URL}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: 'SeftonLinks — Sefton Coast links golf',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SeftonLinks — Links Golf Guide to the Sefton Coast',
    description: 'Royal Birkdale, Hillside, Formby and The Open Championship 2026.',
    images: [`${BASE_URL}/og-default.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.json',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === 'ar';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <head>
        {/* Plausible analytics */}
        <Script
          src="https://plausible.io/js/pa-7l3psXM9XPdunx6bpHv50.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-init" strategy="afterInteractive">{`
          window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
          plausible.init()
        `}</Script>
        {/* Microsoft Clarity */}
        <Script id="clarity-init" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "CLARITY_PROJECT_ID");
        `}</Script>
      </head>
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-[#F8F5EE]`}>
        <NextIntlClientProvider messages={messages}>
          <Navigation locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

function Navigation({ locale }: { locale: string }) {
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <nav className="relative bg-white/97 backdrop-blur-sm border-b border-[#E8E3D8] sticky top-0 z-50 shadow-sm">
      {/* Top gold accent strip */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#B8912A] to-transparent" />
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <Link href={prefix || '/'} className="flex items-center gap-2 flex-shrink-0 group">
            <span className="font-display text-xl font-bold text-[#0D1B2A] group-hover:text-[#1A4A30] transition-colors">
              Sefton<span className="text-[#B8912A]">Links</span>
            </span>
            <span className="hidden sm:block text-xs text-[#9BA8B0] font-light tracking-widest uppercase mt-0.5">
              .com
            </span>
          </Link>

          <NavMenu locale={locale} />
        </div>
      </div>
    </nav>
  );
}

function Footer({ locale }: { locale: string }) {
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const exploreLinks = [
    ['Courses', `${prefix}/courses`],
    ['The Open 2026', `${prefix}/the-open-2026`],
    ['Golf Breaks', `${prefix}/itineraries`],
    ['Course Conditions', `${prefix}/conditions`],
    ['Scorecards', `${prefix}/scorecard`],
    ['Tee Times', `${prefix}/tee-times`],
    ['Accommodation', `${prefix}/accommodation`],
  ];

  const courseLinks = [
    ['Royal Birkdale', `${prefix}/courses/royal-birkdale`],
    ['Hillside Golf Club', `${prefix}/courses/hillside`],
    ['Formby Golf Club', `${prefix}/courses/formby`],
    ['West Lancashire', `${prefix}/courses/west-lancashire`],
    ['Southport & Ainsdale', `${prefix}/courses/southport-ainsdale`],
    ['Southport Old Links', `${prefix}/courses/southport-old-links`],
  ];

  return (
    <footer className="bg-[#0D1B2A] text-white/80">
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#B8912A] to-transparent" />

      <div className="container mx-auto px-4 py-14 max-w-7xl">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="font-display text-2xl font-bold text-white mb-3">
              Sefton<span className="text-[#B8912A]">Links</span>
              <span className="text-white/30 text-sm font-normal ml-1">.com</span>
            </div>
            <p className="text-sm leading-relaxed text-white/55 mb-5 max-w-xs">
              The definitive links golf guide to the Sefton Coast — Royal Birkdale, Hillside, Formby and the best of English links golf.
            </p>
            <a
              href="https://churchtownmedia.co.uk"
              className="text-xs text-[#B8912A] hover:text-[#D4AE7A] transition"
            >
              Built by Churchtown Media ↗
            </a>
            <div className="mt-5 pt-5 border-t border-white/10">
              <p className="text-white/35 text-xs mb-3 uppercase tracking-wider">Sefton Coast Network</p>
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.southportguide.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-[#B8912A] transition"
                >
                  SouthportGuide.co.uk ↗
                </a>
                <a
                  href="https://www.formbyguide.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-[#B8912A] transition"
                >
                  FormbyGuide.co.uk ↗
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              {exploreLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-white/55 hover:text-[#B8912A] transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Courses</h3>
            <ul className="space-y-2.5 text-sm">
              {courseLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-white/55 hover:text-[#B8912A] transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">The Open 2026</h3>
            <p className="text-sm text-white/55 mb-4 leading-relaxed">
              The Open Championship returns to Royal Birkdale, Southport in July 2026 — the first time since Jordan Spieth's iconic win in 2017.
            </p>
            <Link
              href={`${prefix}/the-open-2026`}
              className="inline-block bg-[#B8912A] text-white text-sm font-semibold px-4 py-2 rounded hover:bg-[#D4AE7A] transition"
            >
              Open 2026 Guide →
            </Link>

            <div className="mt-6">
              <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Languages</h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  ['EN', '/'],
                  ['DE', '/de'],
                  ['JA', '/ja'],
                  ['FR', '/fr'],
                  ['ES', '/es'],
                  ['NL', '/nl'],
                  ['SV', '/sv'],
                  ['KO', '/ko'],
                  ['ZH', '/zh'],
                  ['PT', '/pt'],
                  ['IT', '/it'],
                  ['PL', '/pl'],
                  ['AR', '/ar'],
                ].map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    className="px-2 py-1 rounded bg-white/10 text-white/60 hover:bg-[#B8912A]/30 hover:text-white transition"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/35">
          <p>© 2026 SeftonLinks.com — All rights reserved.</p>
          <div className="flex gap-5">
            <Link href={`${prefix}/privacy`} className="hover:text-white/60 transition">
              Privacy
            </Link>
            <Link href={`${prefix}/terms`} className="hover:text-white/60 transition">
              Terms
            </Link>
            <Link href={`${prefix}/contact`} className="hover:text-white/60 transition">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
