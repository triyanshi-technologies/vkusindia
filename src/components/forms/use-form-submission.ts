"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";

import type { FieldErrorCode, FieldErrors, FormResponse } from "@/lib/forms/shared";

export type FormStatus = "idle" | "submitting" | "success" | "error";
export type StatusMessage = "success" | "invalid" | "network";

const subscribeNoop = () => () => {};

type Validatable = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

function errorCodeFor(el: Validatable): FieldErrorCode {
  const v = el.validity;
  if (v.valueMissing) return el.type === "checkbox" ? "consent" : "required";
  if (v.tooShort) return "tooShort";
  if (v.tooLong) return "tooLong";
  return "invalid";
}

/** Reads the browser's constraint validation (required, type, pattern, min/max…) into error codes. */
function collectErrors(form: HTMLFormElement): FieldErrors {
  const errors: FieldErrors = {};
  for (const el of Array.from(form.elements) as Validatable[]) {
    if (!el.name || !el.willValidate || el.checkValidity()) continue;
    errors[el.name] ??= errorCodeFor(el);
  }
  return errors;
}

function focusFirst(form: HTMLFormElement, errors: FieldErrors) {
  const first = Object.keys(errors)[0];
  if (first) form.querySelector<HTMLElement>(`[name="${CSS.escape(first)}"]`)?.focus();
}

/**
 * Progressive enhancement for a plain `<form action="/api/…" method="post">`:
 * - without JS the browser validates natively and posts the form (server redirects to a status page);
 * - with JS we validate client-side, submit via fetch and render inline, localized feedback.
 */
export function useFormSubmission(endpoint: string) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState<StatusMessage | null>(null);
  const hydrated = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  function fail(form: HTMLFormElement, nextErrors: FieldErrors, nextMessage: StatusMessage) {
    setErrors(nextErrors);
    setMessage(nextMessage);
    setStatus("error");
    focusFirst(form, nextErrors);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    const clientErrors = collectErrors(form);
    if (Object.keys(clientErrors).length) return fail(form, clientErrors, "invalid");

    setStatus("submitting");
    setMessage(null);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      const result = (await response.json()) as FormResponse;

      if (result.ok) {
        form.reset();
        setErrors({});
        setMessage("success");
        setStatus("success");
        return;
      }
      fail(form, result.errors ?? {}, result.error);
    } catch {
      fail(form, {}, "network");
    }
  }

  return {
    status,
    errors,
    message,
    formProps: {
      action: endpoint,
      method: "post",
      // Native validation stays on until hydration, so no-JS visitors still get it.
      noValidate: hydrated,
      onSubmit,
      onInput: (event: FormEvent<HTMLFormElement>) => {
        const name = (event.target as Validatable).name;
        if (name && errors[name]) {
          setErrors((current) => {
            const next = { ...current };
            delete next[name];
            return next;
          });
        }
      },
    },
  };
}
