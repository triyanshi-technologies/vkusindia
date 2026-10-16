export const LOCALES = ["ru", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ru";
export const LOCALE_COOKIE = "NEXT_LOCALE";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** Open Graph locale codes. */
export const OG_LOCALE: Record<Locale, string> = { ru: "ru_RU", en: "en_US" };

/** Countries where visitors are served Russian by default (ISO 3166-1 alpha-2). */
const RUSSIAN_SPEAKING_COUNTRIES = new Set([
  "RU",
  "BY",
  "KZ",
  "KG",
  "TJ",
  "UZ",
  "TM",
  "AM",
  "AZ",
  "MD",
]);

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

export function localeFromCountry(country: string | null | undefined): Locale | null {
  if (!country) return null;
  return RUSSIAN_SPEAKING_COUNTRIES.has(country.toUpperCase()) ? "ru" : "en";
}

/** Picks the first supported language from an Accept-Language header. */
export function localeFromAcceptLanguage(header: string | null | undefined): Locale | null {
  if (!header) return null;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag = "", q] = part.trim().split(";q=");
      return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  const match = ranked.find((entry) => isLocale(entry.lang))?.lang;
  return isLocale(match) ? match : null;
}
