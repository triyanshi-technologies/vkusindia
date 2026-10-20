import type { MetadataRoute } from "next";

import { SITE_URL } from "@/config/site";

// Demo phase: crawling is blocked so the preview doesn't compete with the live vkusindia.ru.
// At launch, replace the rule with:
// { userAgent: "*", allow: "/", disallow: ["/api/", "/ru/submitted/", "/en/submitted/"] }
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", disallow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
