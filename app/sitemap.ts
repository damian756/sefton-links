import type { MetadataRoute } from 'next';
import { COURSES, SCORECARDS_READ } from '@/lib/courses';
import { BLOG_POSTS, BLOG_CATEGORIES, getIsoModified } from '@/lib/blog';
import { locales } from '@/i18n/routing';

const BASE_URL = 'https://www.seftonlinks.com';

// Pages with a translated copy in every locale. Each locale version is self-canonical
// with reciprocal hreflang (lib/metadata.ts buildAlternates), so each one gets its own
// <url> entry here, carrying the same alternates.
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
];

const COURSE_PAGES = COURSES.map((c) => `/courses/${c.slug}`);

const TRANSLATED_PAGES = [...STATIC_PAGES, ...COURSE_PAGES];

const MONTHS: Record<string, string> = {
  January: '01', February: '02', March: '03', April: '04', May: '05', June: '06',
  July: '07', August: '08', September: '09', October: '10', November: '11', December: '12',
};

/** '11 November 2026' -> '2026-11-11' */
function isoFromLongDate(s: string): string | undefined {
  const [day, month, year] = s.split(' ');
  return MONTHS[month] ? `${year}-${MONTHS[month]}-${day.padStart(2, '0')}` : undefined;
}

// lastmod only where the page has a real date of its own. Course guides: the day
// the course data was read from the clubs (shown under each table). Blog pages: the
// post's own date, or its `updated` date. Other pages have no date, so no lastmod.
const COURSES_LASTMOD = isoFromLongDate(SCORECARDS_READ);

function languagesFor(page: string): Record<string, string> {
  const languages: Record<string, string> = {
    'en': `${BASE_URL}${page}`,
    'en-US': `${BASE_URL}${page}`,
    'en-AU': `${BASE_URL}${page}`,
    'en-GB': `${BASE_URL}${page}`,
    'x-default': `${BASE_URL}${page}`,
  };
  for (const locale of locales) {
    if (locale !== 'en') languages[locale] = `${BASE_URL}/${locale}${page}`;
  }
  return languages;
}

function newest(dates: string[]): string | undefined {
  return dates.length ? dates.reduce((a, b) => (a > b ? a : b)) : undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of TRANSLATED_PAGES) {
    const isHome = page === '';
    const isCourse = page.startsWith('/courses/');
    const priority = isHome ? 1.0 : page === '/conditions' ? 0.8 : isCourse ? 0.85 : 0.7;
    const changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] =
      page === '/conditions' ? 'daily' : isHome ? 'weekly' : 'monthly';
    const languages = languagesFor(page);
    const lastModified = isCourse ? COURSES_LASTMOD : undefined;

    for (const locale of locales) {
      entries.push({
        url: locale === 'en' ? `${BASE_URL}${page}` : `${BASE_URL}/${locale}${page}`,
        ...(lastModified ? { lastModified } : {}),
        changeFrequency,
        priority,
        alternates: { languages },
      });
    }
  }

  // ── English-only pages (no translated copy, so no hreflang alternates) ───────
  const postDates = BLOG_POSTS.map(getIsoModified);

  entries.push({
    url: `${BASE_URL}/blog`,
    lastModified: newest(postDates),
    changeFrequency: 'weekly',
    priority: 0.75,
  });

  entries.push({
    url: `${BASE_URL}/advertise`,
    changeFrequency: 'monthly',
    priority: 0.7,
  });
  entries.push({
    url: `${BASE_URL}/disclosure`,
    changeFrequency: 'yearly',
    priority: 0.3,
  });

  for (const cat of BLOG_CATEGORIES) {
    const lastModified = newest(BLOG_POSTS.filter((p) => p.categorySlug === cat.slug).map(getIsoModified));
    entries.push({
      url: `${BASE_URL}/blog/category/${cat.slug}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  }

  for (const post of BLOG_POSTS) {
    entries.push({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: getIsoModified(post),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  return entries;
}
