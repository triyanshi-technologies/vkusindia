import type { Locale } from "./config";

export type PluralForms = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string };

const rules: Record<Locale, Intl.PluralRules> = {
  ru: new Intl.PluralRules("ru"),
  en: new Intl.PluralRules("en"),
};

/** plural("ru", 3, forms) → "позиции" — handles Russian one/few/many correctly. */
export function plural(locale: Locale, count: number, forms: PluralForms): string {
  return forms[rules[locale].select(count)] ?? forms.other;
}

/** Fills "{name}" placeholders in a dictionary string. */
export function interpolate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
