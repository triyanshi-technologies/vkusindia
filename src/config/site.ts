/** Public origin used for canonical URLs, sitemap, robots and Open Graph. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://vkusindia.ru").replace(
  /\/$/,
  "",
);

/** Last update of the content kept in code — used for sitemap `lastModified`. */
export const CONTENT_UPDATED_AT = "2026-10-15";
