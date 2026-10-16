"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

import { buttonClass } from "@/components/ui/button";

const STORAGE_KEY = "cookie-consent";

const subscribe = (onChange: () => void) => {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
};

function readConsent(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return "unavailable"; // storage blocked — don't nag on every page
  }
}

interface CookieNoticeProps {
  text: string;
  linkLabel: string;
  linkHref: string;
  acceptLabel: string;
}

export function CookieNotice({ text, linkLabel, linkHref, acceptLabel }: CookieNoticeProps) {
  // Server snapshot is "pending" so the banner never flashes in prerendered HTML.
  const stored = useSyncExternalStore(subscribe, readConsent, () => "pending");
  const [dismissed, setDismissed] = useState(false);

  if (stored !== null || dismissed) return null;

  const accept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, `accepted:${new Date().toISOString().slice(0, 10)}`);
    } catch {
      /* storage unavailable — dismiss for this page view only */
    }
    setDismissed(true);
  };

  return (
    <div
      role="region"
      aria-label="Cookie"
      className="fixed inset-x-3 bottom-3 z-50 rounded-2xl bg-ink p-4 text-[0.8125rem] leading-snug text-paper/80 shadow-2xl sm:right-auto sm:bottom-6 sm:left-6 sm:max-w-md sm:p-5 sm:text-sm"
    >
      <p>
        {text}{" "}
        <Link href={linkHref} className="text-leaf underline underline-offset-2 hover:text-paper">
          {linkLabel}
        </Link>
        .
      </p>
      <button
        type="button"
        onClick={accept}
        className={buttonClass({ className: "mt-3 w-full sm:mt-4 sm:w-auto" })}
      >
        {acceptLabel}
      </button>
    </div>
  );
}
