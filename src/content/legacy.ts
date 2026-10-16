/**
 * URL registry used by the proxy. Kept free of page content so the proxy bundle stays tiny.
 */
export const LEGACY_PRODUCT_IDS: Record<string, string> = {
  "1": "instant-chicory-powder",
  "2": "liquid-chicory-extract",
  "3": "roasted-chicory-cubes",
  "4": "basmati-1121-steam-rice",
  "5": "basmati-1121-sella-rice",
  "6": "pusa-basmati-steam-rice",
  "7": "pusa-basmati-sella-rice",
  "8": "pusa-basmati-raw-rice",
  "9": "turmeric-powder",
  "10": "ginger-powder",
  "11": "red-chili",
  "12": "paprika",
  "13": "black-pepper",
  "14": "moringa-powder",
  "15": "psyllium-husk",
  "16": "chia-seeds",
  "21": "quinoa",
  "22": "assam-black-tea",
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
