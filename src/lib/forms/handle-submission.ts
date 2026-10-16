import "server-only";

import { NextResponse } from "next/server";
import type { z } from "zod";

import { isLocale, type Locale } from "@/i18n/config";
import { href } from "@/i18n/routing";

import { toFieldErrors } from "./schemas";
import type { FormResponse } from "./shared";

/**
 * Shared POST handler for every form: parse → validate with Zod → log.
 *
 * Works with and without JavaScript: fetch() callers get JSON, plain HTML form
 * posts get a 303 redirect to a localized status page.
 */
export async function handleFormSubmission<S extends z.ZodType>(
  request: Request,
  { kind, schema }: { kind: string; schema: S },
): Promise<Response> {
  const wantsJson = request.headers.get("accept")?.includes("application/json") ?? false;
  let locale: Locale = "ru";

  const respond = (status: number, body: FormResponse) => {
    if (wantsJson) return NextResponse.json(body, { status });
    const target = href(locale, `/submitted/${body.ok ? "success" : "error"}`);
    return NextResponse.redirect(new URL(target, request.url), 303);
  };

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return respond(400, { ok: false, error: "invalid" });
  }

  const input: Record<string, string> = {};
  for (const [key, value] of form) if (typeof value === "string") input[key] = value;
  if (isLocale(input.locale)) locale = input.locale;

  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return respond(422, {
      ok: false,
      error: "invalid",
      errors: toFieldErrors(parsed.error, input),
    });
  }

  console.info(`[forms] ${kind} received`, parsed.data);
  return respond(200, { ok: true });
}
