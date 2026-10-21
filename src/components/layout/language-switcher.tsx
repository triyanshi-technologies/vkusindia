"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { LOCALES, type Locale } from "@/i18n/config";
import { switchLocalePath } from "@/i18n/routing";
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

/** Static-host compatible locale links; the URL, rather than a cookie, keeps the language choice. */
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
      /* storage unavailable - default scroll */
    }
  };

  return (
    <div
      role="group"
      aria-label={groupLabel}
      className={cn(
        "flex flex-row flex-nowrap items-center rounded-full border p-0.5 text-[0.8125rem] font-medium transition-opacity",
        tone === "light" ? "border-line" : "border-paper/25",
        className,
      )}
    >
      {LOCALES.map((option) => {
        const current = option === locale;
        return (
          <Link
            key={option}
            href={switchLocalePath(pathname, option)}
            onClick={current ? undefined : saveScroll}
            lang={option}
            aria-current={current ? "page" : undefined}
            aria-label={
              current
                ? LANGUAGE_NAMES[option]
                : switchLabel.replace("{language}", LANGUAGE_NAMES[option])
            }
            className={cn(
              "grid h-8 min-w-10 place-items-center rounded-full px-2.5 uppercase transition-colors",
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
          </Link>
        );
      })}
    </div>
  );
}
