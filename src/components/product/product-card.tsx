import Link from "next/link";
import type { ReactNode } from "react";

import type { ProductSummary } from "@/content/types";
import { CmsImage } from "@/components/ui/cms-image";
import { IconArrowUpRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: ProductSummary;
  href: string;
  detailsLabel: string;
  headingLevel?: "h2" | "h3";
  className?: string;
}

/** Product teaser; the whole card is one link target. */
export function ProductCard({
  product,
  href,
  detailsLabel,
  headingLevel: Heading = "h3",
  className,
}: ProductCardProps) {
  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-mist">
        <CmsImage
          image={product.image}
          alt=""
          fill
          sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition-transform duration-500 ease-soft group-hover:scale-[1.04]"
        />
        <span className="absolute top-3 left-3 rounded-full bg-paper/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur">
          {product.categoryName}
        </span>
      </div>

      <Heading className="mt-5 font-serif text-xl leading-snug text-ink transition-colors group-hover:text-olive">
        <Link href={href} className="after:absolute after:inset-0 after:rounded-2xl">
          {product.name}
        </Link>
      </Heading>
      <span
        aria-hidden="true"
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-ink"
      >
        {detailsLabel}
        <IconArrowUpRight className="size-4 text-olive transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </article>
  );
}

export function ProductGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
