"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useFormStatus } from "react-dom";

import { switchLocale } from "@/actions/locale";
import { LOCALES, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

const LANGUAGE_NAMES: Record<Locale, string> = { ru: "Русский", en: "English" };

interface LanguageSwitcherProps {
  locale: Locale;
  groupLabel: string;
  /** e.g. "Switch to {language}" */
  switchLabel: string;
  tone?: "light" | "dark";
  className?: string;
}

const SCROLL_KEY = "locale-switch-scroll";
const scrollableHeight = () => document.documentElement.scrollHeight - window.innerHeight;

/**
 * Plain form posting to a Server Action: works before hydration and without JS,
 * saves the choice in a cookie and redirects to the same page in the other language.
 * The other language is a different root layout (full reload), so the scroll
 * position is kept as a fraction of the page height and restored on arrival.
 */
export function LanguageSwitcher({
  locale,
  groupLabel,
  switchLabel,
  tone = "light",
  className,
}: LanguageSwitcherProps) {
  const pathname = usePathname();

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SCROLL_KEY);
      if (saved === null) return;
      sessionStorage.removeItem(SCROLL_KEY);
      const ratio = Number(saved);
      if (ratio > 0) {
        requestAnimationFrame(() =>
          window.scrollTo({ top: ratio * scrollableHeight(), behavior: "instant" }),
        );
      }
    } catch {
      /* storage unavailable - default scroll */
    }
  }, [pathname]);

  const saveScroll = () => {
    try {
      const height = scrollableHeight();
      sessionStorage.setItem(SCROLL_KEY, String(height > 0 ? window.scrollY / height : 0));
    } catch {
      /* storage unavailable */
    }
  };

  return (
    <form action={switchLocale} onSubmit={saveScroll} className={className}>
      <input type="hidden" name="path" value={pathname} />
      <Options locale={locale} groupLabel={groupLabel} switchLabel={switchLabel} tone={tone} />
    </form>
  );
}

function Options({
  locale,
  groupLabel,
  switchLabel,
  tone,
}: Omit<LanguageSwitcherProps, "className">) {
  const { pending } = useFormStatus();

  return (
    <div
      role="group"
      aria-label={groupLabel}
      className={cn(
        "flex items-center rounded-full border p-0.5 text-[0.8125rem] font-medium transition-opacity",
        tone === "light" ? "border-line" : "border-paper/25",
        pending && "opacity-60",
      )}
    >
      {LOCALES.map((option) => {
        const current = option === locale;
        return (
          <button
            key={option}
            type="submit"
            name="locale"
            value={option}
            lang={option}
            aria-pressed={current}
            aria-label={
              current
                ? LANGUAGE_NAMES[option]
                : switchLabel.replace("{language}", LANGUAGE_NAMES[option])
            }
            disabled={pending}
            className={cn(
              "h-8 min-w-10 rounded-full px-2.5 uppercase transition-colors",
              current
                ? tone === "light"
                  ? "bg-ink text-paper"
                  : "bg-paper text-ink"
                : tone === "light"
                  ? "text-muted-strong hover:text-ink"
                  : "text-paper/70 hover:text-paper",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
