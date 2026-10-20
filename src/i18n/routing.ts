import { isLocale, type Locale } from "./config";

/** Prefixes an app path with the locale: ("en", "/about") → "/en/about". */
export function href(locale: Locale, path = "/"): string {
  if (path === "/" || path === "") return `/${locale}`;
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Removes the locale prefix: "/en/about" → "/about". */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split("/");
  if (!isLocale(first)) return pathname || "/";
  return rest.length ? `/${rest.join("/")}` : "/";
}

/** Same page in another language: ("/en/about", "ru") → "/ru/about". */
export function switchLocalePath(pathname: string, locale: Locale): string {
  return href(locale, stripLocale(pathname));
}

/** Only same-origin, plain paths are allowed - guards redirects against open-redirect abuse. */
export function isSafeInternalPath(path: unknown): path is string {
  return typeof path === "string" && /^\/(?!\/)[\w\-/]*$/.test(path) && path.length < 200;
}
