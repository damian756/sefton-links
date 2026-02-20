import type { MetadataRoute } from 'next';
import { COURSES } from '@/lib/courses';
import { locales } from '@/i18n/routing';

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

    // Build alternates
    const alternates: Record<string, string> = {};
    for (const locale of locales) {
      const localePath = locale === 'en' ? page : `/${locale}${page}`;
      alternates[locale] = `${BASE_URL}${localePath}`;
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
