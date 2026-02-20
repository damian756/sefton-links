import type { MetadataRoute } from 'next';
import { COURSES } from '@/lib/courses';
import { locales } from '@/i18n/routing';

// All English variants map to the root URL
const ENGLISH_HREFLANG: Record<string, string> = {
  'en': '',
  'en-US': '',
  'en-AU': '',
  'en-GB': '',
};

const BASE_URL = 'https://www.seftonlinks.com';

const STATIC_PAGES = [
  '',
  '/courses',
  '/the-open-2026',
  '/itineraries',
  '/conditions',
  '/scorecard',
  '/tee-times',
  '/accommodation',
  '/contact',
  '/privacy',
  '/terms',
];

const COURSE_PAGES = COURSES.map((c) => `/courses/${c.slug}`);

const ALL_PAGES = [...STATIC_PAGES, ...COURSE_PAGES];

function buildLanguages(page: string): Record<string, string> {
  const path = page || '';
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
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date().toISOString();

  for (const page of ALL_PAGES) {
    const isHome = page === '';
    const isOpenHub = page === '/the-open-2026';
    const isConditions = page === '/conditions';

    const priority = isHome ? 1.0 : isOpenHub ? 0.95 : isConditions ? 0.8 : page.startsWith('/courses/') ? 0.85 : 0.7;
    const changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency'] = isConditions ? 'daily' : isHome ? 'weekly' : 'monthly';
    const languages = buildLanguages(page);

    entries.push({
      url: `${BASE_URL}${page}`,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: { languages },
    });

    for (const locale of locales) {
      if (locale === 'en') continue;
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: now,
        changeFrequency,
        priority: priority * 0.9,
        alternates: { languages },
      });
    }
  }

  return entries;
}
