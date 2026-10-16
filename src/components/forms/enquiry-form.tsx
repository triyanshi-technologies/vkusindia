"use client";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { FIELD_LIMITS, PHONE_PATTERN } from "@/lib/forms/shared";
import { buttonClass } from "@/components/ui/button";
import { IconArrowRight } from "@/components/ui/icons";

import { ConsentField, FormStatusMessage, TextAreaField, TextField } from "./fields";
import { useFormSubmission } from "./use-form-submission";

interface EnquiryFormProps {
  locale: Locale;
  product: { slug: string; name: string };
  labels: Dictionary["form"];
  privacyHref: string;
}

export function EnquiryForm({ locale, product, labels, privacyHref }: EnquiryFormProps) {
  const { status, errors, message, formProps } = useFormSubmission("/api/enquiry");
  const error = (name: string) => {
    const code = errors[name];
    return code ? labels.errors[code] : undefined;
  };
  const L = FIELD_LIMITS;

  return (
    <form {...formProps} className="relative grid gap-5 sm:grid-cols-2">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="product" value={product.slug} />

      <p className="flex flex-wrap items-baseline gap-x-2 rounded-xl bg-mist px-4 py-3 text-[0.9375rem] sm:col-span-2">
        <span className="text-muted-strong">{labels.product}:</span>
        <span className="font-medium text-ink">{product.name}</span>
      </p>

      <TextField
        name="name"
        label={labels.name}
        placeholder={labels.placeholders.name}
        autoComplete="name"
        required
        minLength={L.name.min}
        maxLength={L.name.max}
        error={error("name")}
      />
      <TextField
        name="phone"
        type="tel"
        label={labels.phone}
        placeholder={labels.placeholders.phone}
        autoComplete="tel"
        inputMode="tel"
        required
        minLength={L.phone.min}
        maxLength={L.phone.max}
        pattern={PHONE_PATTERN}
        error={error("phone")}
      />
      <TextField
        name="email"
        type="email"
        label={labels.email}
        placeholder={labels.placeholders.email}
        autoComplete="email"
        required
        maxLength={L.email.max}
        error={error("email")}
      />
      <TextField
        name="country"
        label={labels.country}
        placeholder={labels.placeholders.country}
        autoComplete="country-name"
        required
        minLength={L.country.min}
        maxLength={L.country.max}
        error={error("country")}
      />
      <TextField
        name="quantity"
        type="number"
        label={labels.quantity}
        placeholder={labels.placeholders.quantity}
        inputMode="numeric"
        required
        min={L.quantity.min}
        max={L.quantity.max}
        step={1}
        error={error("quantity")}
        className="sm:col-span-2"
      />
      <TextAreaField
        name="comment"
        label={labels.comment}
        optionalLabel={labels.optional}
        placeholder={labels.placeholders.comment}
        maxLength={L.comment.max}
        rows={3}
        error={error("comment")}
        className="sm:col-span-2"
      />

      <div className="sm:col-span-2">
        <ConsentField
          text={labels.consent}
          linkLabel={labels.consentLink}
          href={privacyHref}
          error={error("consent")}
        />
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "submitting"}
          className={buttonClass({ size: "lg" })}
        >
          {status === "submitting" ? labels.submitting : labels.submit}
          <IconArrowRight className="size-4" />
        </button>
        <FormStatusMessage message={message} labels={labels.status} />
      </div>
    </form>
  );
}
