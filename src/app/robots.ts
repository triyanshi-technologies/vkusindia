import type { MetadataRoute } from "next";

import { SITE_URL } from "@/config/site";

// Keep the temporary GitHub Pages demo out of search results.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", disallow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
