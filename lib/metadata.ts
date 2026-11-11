import { locales } from '@/i18n/routing';

const BASE_URL = 'https://www.seftonlinks.com';

export { BASE_URL };

/** The page's address in one locale: English at the root, others under /<locale>. */
export function localeUrl(pagePath: string, locale = 'en') {
  const path = pagePath === '/' ? '' : pagePath;
  return `${BASE_URL}${locale === 'en' ? '' : `/${locale}`}${path}`;
}

/**
 * hreflang alternates for a page, with the canonical pointing at the page's own
 * locale version (a translated page that names the English page as canonical
 * tells search engines to drop the translation). Pages whose copy is English in
 * every locale (advertise, privacy, terms) leave out `locale`, so their
 * canonical stays the English page.
 */
export function buildAlternates(pagePath: string, locale = 'en') {
  const path = pagePath === '/' ? '' : pagePath;
  const languages: Record<string, string> = {
    'en': `${BASE_URL}${path}`,
    'en-US': `${BASE_URL}${path}`,
    'en-AU': `${BASE_URL}${path}`,
    'en-GB': `${BASE_URL}${path}`,
    'x-default': `${BASE_URL}${path}`,
  };
  for (const locale of locales) {
    if (locale !== 'en') {
      languages[locale] = `${BASE_URL}/${locale}${path}`;
    }
  }
  return {
    canonical: localeUrl(pagePath, locale),
    languages,
  };
}

/**
 * Build a complete Open Graph object for a page.
 * Provides all required and recommended OG fields so pages don't rely on
 * layout inheritance (which Next.js doesn't deep-merge).
 */
export function buildOg(
  pagePath: string,
  overrides?: {
    title?: string;
    description?: string;
    type?: 'website' | 'article';
    images?: { url: string; width: number; height: number; alt: string }[];
    [key: string]: unknown;
  },
  locale = 'en',
) {
  const url = localeUrl(pagePath, locale);
  return {
    url,
    type: 'website' as const,
    siteName: 'SeftonLinks.com',
    images: [
      {
        url: `${BASE_URL}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: 'SeftonLinks: Sefton Coast links golf',
      },
    ],
    ...overrides,
  };
}
