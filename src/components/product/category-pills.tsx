"use client";

import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

interface CategoryPillsProps {
  items: { id: string; label: string; count: number }[];
}

/** Catalogue jump links; the category in view is highlighted. */
export function CategoryPills({ items }: CategoryPillsProps) {
  const [active, setActive] = useActiveSection(items.map((item) => item.id));

  return (
    <ul className="-mx-4 scrollbar-none flex gap-2 overflow-x-auto px-4 py-3 sm:mx-0 sm:px-0">
      {items.map((item) => {
        const current = item.id === active;
        return (
          <li key={item.id} className="shrink-0">
            <a
              href={`#${item.id}`}
              onClick={() => setActive(item.id)}
              aria-current={current ? "true" : undefined}
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-[0.9375rem] text-ink transition-colors",
                current ? "border-leaf bg-leaf" : "border-line hover:border-ink",
              )}
            >
              {item.label}
              <span
                className={cn("text-sm tabular-nums", current ? "text-ink/70" : "text-muted-strong")}
              >
                {item.count}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
