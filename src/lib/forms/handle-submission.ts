import "server-only";

import { NextResponse } from "next/server";
import type { z } from "zod";

import { isLocale, type Locale } from "@/i18n/config";
import { href } from "@/i18n/routing";

import { sendMail, type Mail } from "./mailer";
import { toFieldErrors } from "./schemas";
import { HONEYPOT_FIELD, type FieldErrors, type FormResponse } from "./shared";

/**
 * Shared POST handler for every form: parse → honeypot → validate with Zod → (optional check) → email.
 *
 * Works with and without JavaScript: fetch() callers get JSON, plain HTML form
 * posts get a 303 redirect to a localized status page.
 */
export async function handleFormSubmission<S extends z.ZodType>(
  request: Request,
  {
    kind,
    schema,
    validate,
    mail,
  }: {
    kind: string;
    schema: S;
    /** Checks that need data (e.g. the CMS); return field errors to reject. */
    validate?: (data: z.output<S>) => Promise<FieldErrors | null>;
    /** The notification sent to the company inbox for an accepted submission. */
    mail: (data: z.output<S>) => Mail | Promise<Mail>;
  },
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

  // Repeated fields (e.g. one `variant` per group) become lists; schemas decide what they accept.
  const input: Record<string, string | string[]> = {};
  for (const [key, value] of form) {
    if (typeof value !== "string") continue;
    const previous = input[key];
    input[key] = previous === undefined ? value : [previous, value].flat();
  }
  if (isLocale(input.locale)) locale = input.locale;

  // Answer a bot as if it succeeded, so it has no reason to adapt.
  if (input[HONEYPOT_FIELD]) {
    console.info(`[forms] ${kind} dropped (honeypot)`);
    return respond(200, { ok: true });
  }

  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return respond(422, {
      ok: false,
      error: "invalid",
      errors: toFieldErrors(parsed.error, input),
    });
  }

  const rejected = await validate?.(parsed.data);
  if (rejected) return respond(422, { ok: false, error: "invalid", errors: rejected });

  try {
    if (await sendMail(await mail(parsed.data))) {
      console.info(`[forms] ${kind} sent`);
      return respond(200, { ok: true });
    }
  } catch (error) {
    // Tell the visitor, so the enquiry is not silently lost.
    console.error(`[forms] ${kind} email failed`, error);
    return respond(502, { ok: false, error: "failed" });
  }

  // SMTP not configured (local development): keep the submission visible in the log.
  console.info(`[forms] ${kind} received`, parsed.data);
  return respond(200, { ok: true });
}
