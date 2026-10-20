"use client";

import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

interface TocNavProps {
  items: { id: string; label: string }[];
  className?: string;
}

/** Table of contents with the section in view highlighted (used on the privacy page). */
export function TocNav({ items, className }: TocNavProps) {
  const [active, setActive] = useActiveSection(items.map((item) => item.id));

  return (
    <ol className={cn("space-y-2 border-l border-line text-[0.9375rem]", className)}>
      {items.map((item) => {
        const current = item.id === active;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={() => setActive(item.id)}
              aria-current={current ? "true" : undefined}
              className={cn(
                "-ml-px block border-l-2 py-1 pl-5 transition-colors",
                current
                  ? "border-leaf font-medium text-ink"
                  : "border-transparent text-muted-strong hover:border-olive hover:text-ink",
              )}
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
