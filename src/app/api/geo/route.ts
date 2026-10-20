import { NextResponse, type NextRequest } from "next/server";

import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  isLocale,
  localeFromAcceptLanguage,
  localeFromCountry,
} from "@/i18n/config";

// TEMPORARY diagnostic: shows what Vercel detects and which language the proxy would pick.
export function GET(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country");
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value ?? null;
  const acceptLanguage = request.headers.get("accept-language");

  const decidedBy = isLocale(cookie)
    ? "cookie"
    : localeFromCountry(country)
      ? "country"
      : localeFromAcceptLanguage(acceptLanguage)
        ? "browserLanguage"
        : "default";
  const locale = isLocale(cookie)
    ? cookie
    : (localeFromCountry(country) ?? localeFromAcceptLanguage(acceptLanguage) ?? DEFAULT_LOCALE);

  return NextResponse.json(
    {
      country,
      region: request.headers.get("x-vercel-ip-country-region"),
      city: request.headers.get("x-vercel-ip-city"),
      cookie,
      browserLanguage: acceptLanguage,
      wouldRedirectTo: `/${locale}`,
      decidedBy,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
