import Image from "next/image";
import Link from "next/link";

import type { CategoryWithProducts } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { plural, type PluralForms } from "@/i18n/format";
import { publicPath } from "@/lib/public-path";
import { IconArrowUpRight } from "@/components/ui/icons";

interface CategoryListProps {
  locale: Locale;
  categories: CategoryWithProducts[];
  productsHref: string;
  countForms: PluralForms;
}

export function CategoryList({ locale, categories, productsHref, countForms }: CategoryListProps) {
  return (
    <ul className="grid gap-4 md:grid-cols-3 lg:gap-6">
      {categories.map((category, index) => (
        <li key={category.id}>
          {/* Horizontal card on phones, vertical (photo on top) from md up. */}
          <Link
            href={`${productsHref}#${category.id}`}
            className="group relative flex h-full items-center gap-4 rounded-3xl bg-paper p-3 pr-5 ring-1 ring-line transition-shadow duration-300 hover:ring-ink/25 sm:gap-6 md:flex-col md:items-stretch md:gap-0 md:pr-3"
          >
            <div className="relative aspect-square w-[6.5rem] shrink-0 overflow-hidden rounded-2xl bg-mist sm:w-40 md:aspect-[3/2] md:w-full">
              <Image
                src={publicPath(category.image.src)}
                alt=""
                fill
                sizes="(min-width: 768px) 30vw, (min-width: 640px) 160px, 104px"
                className="object-cover transition-transform duration-500 ease-soft group-hover:scale-105"
              />
            </div>
            <div className="min-w-0 flex-1 py-1 md:px-3 md:pt-5 md:pb-3">
              <p className="text-[0.8125rem] text-muted-strong tabular-nums">
                {String(index + 1).padStart(2, "0")} · {category.products.length}{" "}
                {plural(locale, category.products.length, countForms)}
              </p>
              <h3 className="mt-1 font-serif text-[1.375rem] leading-snug text-ink sm:text-2xl">
                {category.name}
              </h3>
              <p className="mt-1.5 hidden text-[0.9375rem] leading-snug text-muted-strong xs:block">
                {category.description}
              </p>
            </div>
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-paper text-ink transition-colors group-hover:border-leaf group-hover:bg-leaf md:absolute md:top-6 md:right-6">
              <IconArrowUpRight className="size-4" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
