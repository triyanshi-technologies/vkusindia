import { z } from "zod";

import { LOCALES } from "@/i18n/config";

import { FIELD_LIMITS, PHONE_PATTERN, type FieldErrors } from "./shared";

/**
 * Server-side source of truth for validation. The same limits are mirrored as
 * HTML constraint attributes in the form components, so both layers agree.
 */
const text = (min: number, max: number) => z.string().trim().min(min).max(max);
const email = z.string().trim().max(FIELD_LIMITS.email.max).pipe(z.email());
const consent = z.literal("on", { error: "consent" });
const locale = z.enum(LOCALES).catch("ru");

export const enquirySchema = z.object({
  locale,
  product: z
    .string()
    .trim()
    .max(80)
    .regex(/^[a-z0-9-]*$/)
    .optional(),
  name: text(FIELD_LIMITS.name.min, FIELD_LIMITS.name.max),
  phone: text(FIELD_LIMITS.phone.min, FIELD_LIMITS.phone.max).regex(
    new RegExp(`^${PHONE_PATTERN}$`),
  ),
  email,
  country: text(FIELD_LIMITS.country.min, FIELD_LIMITS.country.max),
  quantity: z.coerce.number().int().min(FIELD_LIMITS.quantity.min).max(FIELD_LIMITS.quantity.max),
  comment: z.string().trim().max(FIELD_LIMITS.comment.max).optional(),
  consent,
});

export const contactSchema = z.object({
  locale,
  name: text(FIELD_LIMITS.name.min, FIELD_LIMITS.name.max),
  email,
  subject: text(FIELD_LIMITS.subject.min, FIELD_LIMITS.subject.max),
  message: text(FIELD_LIMITS.message.min, FIELD_LIMITS.message.max),
  consent,
});

export function toFieldErrors(error: z.ZodError, input: Record<string, unknown>): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? "");
    if (!field || errors[field]) continue;
    const value = input[field];
    const empty = value === undefined || value === null || String(value).trim() === "";

    if (field === "consent") errors[field] = "consent";
    else if (empty) errors[field] = "required";
    else if (issue.code === "too_small") errors[field] = "tooShort";
    else if (issue.code === "too_big") errors[field] = "tooLong";
    else errors[field] = "invalid";
  }
  return errors;
}
