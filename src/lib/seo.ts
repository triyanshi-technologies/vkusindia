import type { Metadata } from "next";

import { SITE_URL } from "@/config/site";
import { company } from "@/content/company";
import { DEFAULT_LOCALE, LOCALES, OG_LOCALE, type Locale } from "@/i18n/config";
import { href } from "@/i18n/routing";

const DEFAULT_OG_IMAGE = { url: "/images/hero/about2.jpg", width: 640, height: 426 };

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

/** hreflang map for one logical page across all locales. */
export function languageAlternates(path: string) {
  return {
    ...Object.fromEntries(LOCALES.map((l) => [l, href(l, path)])),
    "x-default": href(DEFAULT_LOCALE, path),
  };
}

interface PageMetadataInput {
  locale: Locale;
  /** Path without locale prefix, e.g. "/about". */
  path: string;
  title: string;
  description: string;
  /** Use the title as-is instead of applying the "%s - Brand" template. */
  absoluteTitle?: boolean;
  image?: { url: string; width: number; height: number; alt?: string };
  noIndex?: boolean;
}

export function pageMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle,
  image = DEFAULT_OG_IMAGE,
  noIndex,
}: PageMetadataInput): Metadata {
  const url = href(locale, path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: company.brand[locale],
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      images: [{ ...image, alt: image.alt ?? title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
    ...(noIndex && { robots: { index: false, follow: true } }),
  };
}
