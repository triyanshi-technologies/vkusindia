"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

import type { VariantGroup } from "@/content/types";
import { SelectField } from "@/components/forms/fields";
import { IconCheck } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/** Chosen option per group name; "" = no preference. */
type Selection = Record<string, string>;

const VariantSelectionContext = createContext<{
  selection: Selection;
  select: (group: string, option: string) => void;
} | null>(null);

/** Shares one selection between the pills on the page and the selects in the enquiry form. */
export function VariantSelectionProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<Selection>({});
  const select = (group: string, option: string) =>
    setSelection((current) => ({ ...current, [group]: option }));
  return <VariantSelectionContext value={{ selection, select }}>{children}</VariantSelectionContext>;
}

interface VariantPickerProps {
  groups: VariantGroup[];
  labels: { title: string; hint: string; selected: string; toEnquiry: string };
  /** Anchor of the enquiry form the choice is copied into. */
  formHref: string;
}

/** Pills toggle an option; pressing the active one clears it. The form below mirrors every change. */
export function VariantPicker({ groups, labels, formHref }: VariantPickerProps) {
  const context = useContext(VariantSelectionContext);
  const chosen = groups.flatMap((group) => context?.selection[group.name] || []);

  return (
    <section aria-labelledby="variants-title" className="mt-10">
      <h2 id="variants-title" className="font-serif text-2xl text-ink">
        {labels.title}
      </h2>
      <p className="mt-1.5 text-sm text-muted-strong">{labels.hint}</p>

      <div className="mt-5 space-y-4">
        {groups.map((group) => (
          <div key={group.name} role="group" aria-label={group.name} className="sm:flex sm:items-start sm:gap-6">
            <p aria-hidden="true" className="mb-2 text-sm text-muted-strong sm:mb-0 sm:w-36 sm:shrink-0 sm:pt-2">
              {group.name}
            </p>
            <ul className="flex flex-wrap gap-2">
              {group.options.map((option) => {
                const active = context?.selection[group.name] === option;
                return (
                  <li key={option}>
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => context?.select(group.name, active ? "" : option)}
                      className={cn(
                        "inline-flex h-9 items-center gap-1.5 rounded-full border px-4 text-[0.9375rem] text-ink transition-colors",
                        active ? "border-leaf bg-leaf" : "border-line bg-paper hover:border-olive",
                      )}
                    >
                      {active && <IconCheck className="size-3.5" />}
                      {option}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <p aria-live="polite" className="mt-4 min-h-5 text-sm">
        {chosen.length > 0 && (
          <>
            <span className="text-muted-strong">{labels.selected}: </span>
            <span className="font-medium text-ink">{chosen.join(", ")}</span>
            <span aria-hidden="true" className="text-muted-strong"> · </span>
            <a href={formHref} className="font-medium text-olive underline-offset-2 hover:underline">
              {labels.toEnquiry} ↓
            </a>
          </>
        )}
      </p>
    </section>
  );
}

/**
 * One select per group inside the enquiry form. Each submits "Group: Option" under the
 * repeated name `variant`; "no preference" submits an empty value. Without JS they work as plain selects.
 */
export function VariantSelects({ groups, noPreference }: { groups: VariantGroup[]; noPreference: string }) {
  const context = useContext(VariantSelectionContext);

  return groups.map((group) => {
    const current = context?.selection[group.name] ?? "";
    return (
      <SelectField
        key={group.name}
        name="variant"
        label={group.name}
        {...(context
          ? {
              value: current && `${group.name}: ${current}`,
              onChange: (event) =>
                context.select(group.name, event.target.value.slice(group.name.length + 2)),
            }
          : { defaultValue: "" })}
      >
        <option value="">{noPreference}</option>
        {group.options.map((option) => (
          <option key={option} value={`${group.name}: ${option}`}>
            {option}
          </option>
        ))}
      </SelectField>
    );
  });
}
