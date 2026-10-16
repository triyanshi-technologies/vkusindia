"use client";

import Link from "next/link";
import {
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";

import { IconCheck } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

import type { StatusMessage } from "./use-form-submission";

const controlClass =
  "block w-full rounded-xl border border-line bg-paper px-4 text-base text-ink transition-[border-color,box-shadow] placeholder:text-muted hover:border-ink/30 focus:border-olive focus:ring-4 focus:ring-leaf/25 focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-danger aria-[invalid=true]:focus:ring-danger/15";

interface FieldShellProps {
  id: string;
  label: string;
  optionalLabel?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

function FieldShell({ id, label, optionalLabel, error, className, children }: FieldShellProps) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-2 flex items-baseline justify-between gap-3 text-sm font-medium text-ink"
      >
        {label}
        {optionalLabel && (
          <span className="text-[0.8125rem] font-normal text-muted-strong">{optionalLabel}</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  optionalLabel?: string;
  error?: string;
};

export function TextField({ label, optionalLabel, error, className, ...props }: TextFieldProps) {
  const id = useId();
  return (
    <FieldShell
      id={id}
      label={label}
      optionalLabel={optionalLabel}
      error={error}
      className={className}
    >
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(controlClass, "h-12")}
        {...props}
      />
    </FieldShell>
  );
}

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  label: string;
  optionalLabel?: string;
  error?: string;
};

export function TextAreaField({
  label,
  optionalLabel,
  error,
  className,
  ...props
}: TextAreaFieldProps) {
  const id = useId();
  return (
    <FieldShell
      id={id}
      label={label}
      optionalLabel={optionalLabel}
      error={error}
      className={className}
    >
      <textarea
        id={id}
        rows={4}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(controlClass, "resize-y py-3")}
        {...props}
      />
    </FieldShell>
  );
}

interface ConsentFieldProps {
  text: string;
  linkLabel: string;
  href: string;
  error?: string;
}

/** Explicit consent to personal data processing (Federal Law 152-FZ). */
export function ConsentField({ text, linkLabel, href, error }: ConsentFieldProps) {
  const id = useId();
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          name="consent"
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-5 shrink-0 accent-olive"
        />
        <label htmlFor={id} className="text-sm leading-snug text-muted-strong">
          {text}{" "}
          <Link
            href={href}
            target="_blank"
            className="text-ink underline underline-offset-2 hover:text-olive"
          >
            {linkLabel}
          </Link>
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

interface FormStatusProps {
  message: StatusMessage | null;
  labels: Record<StatusMessage, string>;
}

export function FormStatusMessage({ message, labels }: FormStatusProps) {
  return (
    <p role="status" aria-live="polite" className="min-h-6 text-[0.9375rem]">
      {message === "success" ? (
        <span className="flex items-start gap-2 text-olive">
          <IconCheck className="mt-1 shrink-0" /> {labels.success}
        </span>
      ) : message ? (
        <span className="text-danger">{labels[message]}</span>
      ) : null}
    </p>
  );
}
