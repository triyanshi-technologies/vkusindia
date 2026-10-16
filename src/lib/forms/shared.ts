/** Form contract shared by the browser (constraint attributes, error display) and the API. */

export const FIELD_LIMITS = {
  name: { min: 2, max: 80 },
  phone: { min: 6, max: 25 },
  email: { max: 120 },
  country: { min: 2, max: 60 },
  quantity: { min: 1, max: 10_000_000 },
  subject: { min: 2, max: 120 },
  message: { min: 10, max: 3000 },
  comment: { max: 2000 },
} as const;

/** Allowed phone characters: digits, spaces, +, -, (, ). Also used as an HTML `pattern`. */
export const PHONE_PATTERN = "[+\\d\\s()\\-]+";

/** Each code maps to a `form.errors.*` dictionary key. */
export type FieldErrorCode = "required" | "invalid" | "tooShort" | "tooLong" | "consent";
export type FieldErrors = Partial<Record<string, FieldErrorCode>>;

export type FormResponse = { ok: true } | { ok: false; error: "invalid"; errors?: FieldErrors };
