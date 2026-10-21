"use client";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { FIELD_LIMITS } from "@/lib/forms/shared";
import { buttonClass } from "@/components/ui/button";
import { IconArrowRight } from "@/components/ui/icons";

import { ConsentField, FormStatusMessage, TextAreaField, TextField } from "./fields";
import { useFormSubmission } from "./use-form-submission";

interface ContactFormProps {
  locale: Locale;
  labels: Dictionary["form"];
  privacyHref: string;
}

export function ContactForm({ locale, labels, privacyHref }: ContactFormProps) {
  const { status, errors, message, formProps, hydrated } = useFormSubmission();
  const error = (name: string) => {
    const code = errors[name];
    return code ? labels.errors[code] : undefined;
  };
  const L = FIELD_LIMITS;

  return (
    <form {...formProps} className="relative grid gap-5 sm:grid-cols-2">
      <input type="hidden" name="locale" value={locale} />

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
        name="subject"
        label={labels.subject}
        placeholder={labels.placeholders.subject}
        required
        minLength={L.subject.min}
        maxLength={L.subject.max}
        error={error("subject")}
        className="sm:col-span-2"
      />
      <TextAreaField
        name="message"
        label={labels.message}
        placeholder={labels.placeholders.message}
        required
        minLength={L.message.min}
        maxLength={L.message.max}
        rows={5}
        error={error("message")}
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

      <p role="note" className="text-sm text-muted-strong sm:col-span-2">
        {labels.demoNotice}
      </p>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={!hydrated || status === "submitting"}
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
