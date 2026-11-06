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
  /** Shown next to the details link when the product has variants. */
  variantsLabel?: string;
  headingLevel?: "h2" | "h3";
  className?: string;
}

/** Product teaser; the whole card is one link target. */
export function ProductCard({
  product,
  href,
  detailsLabel,
  variantsLabel,
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
      </div>

      <Heading className="mt-5 font-serif text-xl leading-snug text-ink transition-colors group-hover:text-olive">
        <Link href={href} className="after:absolute after:inset-0 after:rounded-2xl">
          {product.name}
        </Link>
      </Heading>
      <CardMeta detailsLabel={detailsLabel} variantsLabel={product.hasVariants ? variantsLabel : undefined} className="mt-3" />
    </article>
  );
}

interface ProductTileProps {
  product: ProductSummary;
  href: string;
  detailsLabel: string;
  variantsLabel?: string;
  sizes: string;
}

/** Showcase card: whole photo on white (cut-out product shots), one link target. */
export function ProductTile({
  product,
  href,
  detailsLabel,
  variantsLabel,
  sizes,
}: ProductTileProps) {
  return (
    <article className="group relative flex w-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-paper">
        <CmsImage
          image={product.image}
          alt=""
          fill
          sizes={sizes}
          className="object-contain p-3 transition-transform duration-500 ease-soft group-hover:scale-[1.04]"
        />
      </div>
      <h3 className="mt-4 font-serif text-lg leading-snug text-ink transition-colors group-hover:text-olive">
        <Link href={href} className="after:absolute after:inset-0 after:rounded-2xl">
          {product.name}
        </Link>
      </h3>
      <CardMeta
        detailsLabel={detailsLabel}
        variantsLabel={product.hasVariants ? variantsLabel : undefined}
        className="mt-1.5"
      />
    </article>
  );
}

/** "Details ↗" plus an optional "options available" note on the same line, so cards keep equal heights. */
export function CardMeta({
  detailsLabel,
  variantsLabel,
  className,
}: {
  detailsLabel: string;
  variantsLabel?: string;
  className?: string;
}) {
  return (
    <p className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 text-sm", className)}>
      <span aria-hidden="true" className="inline-flex items-center gap-1.5 font-medium text-ink">
        {detailsLabel}
        <IconArrowUpRight className="size-4 text-olive transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
      {variantsLabel && (
        <span className="inline-flex items-center gap-1.5 text-muted-strong">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-leaf" />
          {variantsLabel}
        </span>
      )}
    </p>
  );
}

export function ProductGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
