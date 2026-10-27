/**
 * URL registry used by the proxy. Kept free of page content so the proxy bundle stays tiny.
 */
export const LEGACY_PRODUCT_IDS: Record<string, string> = {
  "1": "instant-chicory-powder",
  "2": "liquid-chicory-extract",
  "3": "roasted-chicory-cubes",
};

const LEGACY_PAGES: Record<string, string> = {
  "/index.php": "/",
  "/index.html": "/",
  "/about.php": "/about",
  "/about.html": "/about",
  "/contact.php": "/contact",
  "/contact.html": "/contact",
  "/cookie-policy": "/privacy",
  "/cookie-policy.html": "/privacy",
  "/cookie-policy.php": "/privacy",
};

/**
 * Old vkusindia.ru URLs (Russian-only site) → new path without locale prefix.
 * Plain paths like `/about` are not legacy: they get a locale redirect instead,
 * so a cached 301 never pins visitors to one language.
 */
export function resolveLegacyPath(pathname: string, search: URLSearchParams): string | null {
  if ((pathname === "/products" || pathname === "/products.php") && search.has("prid")) {
    const slug = LEGACY_PRODUCT_IDS[search.get("prid") ?? ""];
    return slug ? `/products/${slug}` : "/products";
  }
  return LEGACY_PAGES[pathname] ?? null;
}
