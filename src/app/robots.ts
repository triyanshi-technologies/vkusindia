import type { MetadataRoute } from "next";

import { SITE_URL } from "@/config/site";

// Live: everything is crawlable except the form API and the form status pages.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/ru/submitted/", "/en/submitted/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
