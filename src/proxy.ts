import { NextResponse, type NextRequest } from "next/server";

import { resolveLegacyPath } from "@/content/legacy";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  isLocale,
  localeFromAcceptLanguage,
  localeFromCountry,
  type Locale,
} from "@/i18n/config";
import { href } from "@/i18n/routing";

/**
 * Locale priority: saved cookie (manual choice) → Vercel geo country → browser
 * language → Russian. Locale-prefixed URLs pass straight through, so every page
 * stays statically prerendered and crawlable in both languages.
 */
function resolveLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(saved)) return saved;

  return (
    localeFromCountry(request.headers.get("x-vercel-ip-country")) ??
    localeFromAcceptLanguage(request.headers.get("accept-language")) ??
    DEFAULT_LOCALE
  );
}

const SUBMITTED_PATH = /^\/(?:ru|en)\/submitted\/([^/]+)\/?$/;

/**
 * Dynamic segments with a closed set of values: answer anything else with a real 404.
 * Product slugs are not checked here — they come from the CMS, so an unknown slug is
 * handled by the page (404 page, marked noindex).
 */
function isUnknownDynamicPath(pathname: string): boolean {
  const submitted = SUBMITTED_PATH.exec(pathname);
  if (submitted) return submitted[1] !== "success" && submitted[1] !== "error";
  return false;
}

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];

  if (isLocale(firstSegment)) {
    if (isUnknownDynamicPath(pathname)) {
      return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 });
    }
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();

  // Old vkusindia.ru URLs — the old site was Russian-only, so they map to /ru permanently.
  const legacyPath = resolveLegacyPath(pathname, searchParams);
  if (legacyPath) {
    url.pathname = href("ru", legacyPath);
    url.search = "";
    return NextResponse.redirect(url, 301);
  }

  url.pathname = href(resolveLocale(request), pathname);
  const response = NextResponse.redirect(url, 307);
  response.headers.set("Vary", "Cookie, Accept-Language");
  return response;
}

export const config = {
  matcher: [
    // Everything except API, Next internals, metadata files and static assets.
    "/((?!api|_next/static|_next/image|images/|products_photos/|favicon\\.ico|icon|apple-icon|manifest\\.webmanifest|robots\\.txt|sitemap\\.xml|.*\\.(?:png|jpe?g|gif|webp|avif|svg|ico|txt|xml|webmanifest|woff2?)$).*)",
  ],
};
