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

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of ALL_PAGES) {
    // Determine priority and changeFreq
    const isHome = page === '';
    const isOpenHub = page === '/the-open-2026';
    const isConditions = page === '/conditions';

    const priority = isHome ? 1.0 : isOpenHub ? 0.95 : isConditions ? 0.8 : page.startsWith('/courses/') ? 0.85 : 0.7;
    const changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency'] = isConditions ? 'daily' : isHome ? 'weekly' : 'monthly';

    // Build alternates — all English variants point to the root URL
    const alternates: Record<string, string> = {
      'en': `${BASE_URL}${page}`,
      'en-US': `${BASE_URL}${page}`,
      'en-AU': `${BASE_URL}${page}`,
      'en-GB': `${BASE_URL}${page}`,
    };
    for (const locale of locales) {
      if (locale === 'en') continue;
      alternates[locale] = `${BASE_URL}/${locale}${page}`;
    }

    entries.push({
      url: `${BASE_URL}${page}`,
      lastModified: new Date().toISOString(),
      changeFrequency,
      priority,
      alternates: {
        languages: alternates,
      },
    });
  }

  return entries;
}
