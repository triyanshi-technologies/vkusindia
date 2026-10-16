"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE, isLocale } from "@/i18n/config";
import { isSafeInternalPath, switchLocalePath } from "@/i18n/routing";

/** Saves the visitor's language choice and sends them to the same page in that language. */
export async function switchLocale(formData: FormData): Promise<void> {
  const locale = formData.get("locale");
  const path = formData.get("path");
  if (!isLocale(locale)) return;

  (await cookies()).set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });

  redirect(switchLocalePath(isSafeInternalPath(path) ? path : "/", locale));
}
