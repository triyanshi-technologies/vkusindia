import "server-only";

import type en from "./dictionaries/en.json";
import type { Locale } from "./config";

export type Dictionary = typeof en;

// Typing both loaders as `Dictionary` makes the build fail if ru.json drifts from en.json.
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  ru: () => import("./dictionaries/ru.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
};

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
