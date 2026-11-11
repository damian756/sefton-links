import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import en from '../messages/en.json';

type Messages = { [key: string]: string | Messages };

// Lay a locale's messages over English, so any key a locale file does not have
// (for example one whose English facts changed and has not been re-translated)
// shows the English text instead of an error or a stale translation.
function mergeOverEnglish(base: Messages, override: Messages): Messages {
  const out: Messages = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const current = out[key];
    out[key] =
      value && typeof value === 'object' && current && typeof current === 'object'
        ? mergeOverEnglish(current, value)
        : value;
  }
  return out;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as never)) {
    locale = routing.defaultLocale;
  }

  if (locale === 'en') {
    return { locale, messages: en };
  }

  let localeMessages: Messages = {};
  try {
    localeMessages = (await import(`../messages/${locale}.json`)).default;
  } catch {
    localeMessages = {};
  }

  return { locale, messages: mergeOverEnglish(en as Messages, localeMessages) };
});
