import type { MetadataRoute } from "next";

import { CONTENT_UPDATED_AT } from "@/content/company";
import { LOCALES } from "@/i18n/config";
import { href } from "@/i18n/routing";
import { getProductSlugs } from "@/lib/content";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

const STATIC_PAGES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/products", priority: 0.9 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.7 },
  { path: "/privacy", priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = [
    ...STATIC_PAGES,
    ...(await getProductSlugs()).map((slug) => ({ path: `/products/${slug}`, priority: 0.8 })),
  ];

  return pages.flatMap(({ path, priority }) => {
    const languages = Object.fromEntries(
      Object.entries(languageAlternates(path)).map(([lang, url]) => [lang, absoluteUrl(url)]),
    );
    return LOCALES.map((locale) => ({
      url: absoluteUrl(href(locale, path)),
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages },
    }));
  });
}
