import Link from "next/link";

import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  label: string;
  tone?: "light" | "dark";
}

/** Visible breadcrumb trail + matching BreadcrumbList structured data. The last crumb is the current page. */
export function Breadcrumbs({ items, label, tone = "light" }: BreadcrumbsProps) {
  const dark = tone === "dark";
  return (
    <nav aria-label={label}>
      <ol
        className={cn(
          "flex flex-wrap items-center gap-x-2 gap-y-1 text-sm",
          dark ? "text-paper/60" : "text-muted-strong",
        )}
      >
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className={dark ? "text-paper" : "text-ink"}>
                  {item.label}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className={cn("transition-colors", dark ? "hover:text-leaf" : "hover:text-olive")}
                  >
                    {item.label}
                  </Link>
                  <span aria-hidden="true" className={dark ? "text-paper/25" : "text-line"}>
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            item: absoluteUrl(item.href),
          })),
        }}
      />
    </nav>
  );
}
