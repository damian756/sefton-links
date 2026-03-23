import { locales } from '@/i18n/routing';

const BASE_URL = 'https://www.seftonlinks.com';

export { BASE_URL };

export function buildAlternates(pagePath: string) {
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
    canonical: `${BASE_URL}${path}`,
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
) {
  const url = `${BASE_URL}${pagePath === '/' ? '' : pagePath}`;
  return {
    url,
    type: 'website' as const,
    siteName: 'SeftonLinks.com',
    images: [
      {
        url: `${BASE_URL}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: 'SeftonLinks — Sefton Coast links golf',
      },
    ],
    ...overrides,
  };
}
