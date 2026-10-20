"use client";

import { useEffect, useState } from "react";

/**
 * Scrollspy: returns the id of the section being read (and a setter for instant
 * feedback on click). The active section is the last one whose top has passed a
 * reading line just below the sticky header; at the page bottom it is the last one.
 * The observer only watches that line, so it fires on crossings — no scroll listener.
 */
export function useActiveSection(ids: string[], readingLine = 180) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    const elements = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!elements.length) return;

    const update = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      const passed = elements.filter((el) => el.getBoundingClientRect().top <= readingLine);
      setActive(atBottom ? elements.at(-1)!.id : (passed.at(-1)?.id ?? null));
    };

    const observer = new IntersectionObserver(update, {
      rootMargin: `-${readingLine}px 0px -${Math.max(0, window.innerHeight - readingLine - 1)}px 0px`,
    });
    elements.forEach((el) => observer.observe(el));
    update();
    return () => observer.disconnect();
  }, [key, readingLine]);

  return [active, setActive] as const;
}
