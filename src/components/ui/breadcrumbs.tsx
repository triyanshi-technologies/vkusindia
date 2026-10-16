import Link from "next/link";

import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl } from "@/lib/seo";

export interface Crumb {
  label: string;
  href: string;
}

/** Visible breadcrumb trail + matching BreadcrumbList structured data. The last crumb is the current page. */
export function Breadcrumbs({ items, label }: { items: Crumb[]; label: string }) {
  return (
    <nav aria-label={label}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-strong">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-ink">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link href={item.href} className="transition-colors hover:text-olive">
                    {item.label}
                  </Link>
                  <span aria-hidden="true" className="text-line">
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
