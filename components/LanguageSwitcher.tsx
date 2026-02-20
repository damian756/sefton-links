'use client';

import { usePathname } from 'next/navigation';

const LANGUAGES = [
  ['EN', 'en'],
  ['DE', 'de'],
  ['JA', 'ja'],
  ['FR', 'fr'],
  ['ES', 'es'],
  ['NL', 'nl'],
  ['SV', 'sv'],
  ['DA', 'da'],
  ['NO', 'no'],
  ['FI', 'fi'],
  ['KO', 'ko'],
  ['ZH', 'zh'],
  ['PT', 'pt'],
  ['IT', 'it'],
  ['PL', 'pl'],
  ['CA', 'ca'],
  ['CY', 'cy'],
  ['AR', 'ar'],
] as const;

const NON_EN_LOCALES = new Set<string>(LANGUAGES.filter(([, c]) => c !== 'en').map(([, c]) => c));

export default function LanguageSwitcher() {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = NON_EN_LOCALES.has(segments[0]) ? segments[0] : 'en';
  const pagePath = currentLocale === 'en' ? pathname : '/' + segments.slice(1).join('/') || '/';

  function buildHref(locale: string) {
    if (locale === 'en') return pagePath || '/';
    return `/${locale}${pagePath === '/' ? '' : pagePath}`;
  }

  return (
    <div className="flex flex-wrap gap-2 text-xs">
      {LANGUAGES.map(([label, locale]) => (
        <a
          key={locale}
          href={buildHref(locale)}
          className={`px-2 py-1 rounded transition ${
            locale === currentLocale
              ? 'bg-[#B8912A]/40 text-white font-semibold'
              : 'bg-white/10 text-white/60 hover:bg-[#B8912A]/30 hover:text-white'
          }`}
        >
          {label}
        </a>
      ))}
    </div>
  );
}
