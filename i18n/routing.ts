import { defineRouting } from 'next-intl/routing';

export const locales = [
  'en', 'de', 'ja', 'en-US',
  'sv', 'no', 'nl', 'ko',
  'fr', 'es', 'da', 'fi', 'pl', 'zh',
  'pt', 'it', 'ca', 'ar', 'en-AU', 'cy',
] as const;

export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});
