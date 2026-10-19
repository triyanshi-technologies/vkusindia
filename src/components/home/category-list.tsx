import Image from "next/image";
import Link from "next/link";

import type { CategoryWithProducts } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { plural, type PluralForms } from "@/i18n/format";
import { IconArrowUpRight } from "@/components/ui/icons";

interface CategoryListProps {
  locale: Locale;
  categories: CategoryWithProducts[];
  productsHref: string;
  countForms: PluralForms;
}

export function CategoryList({ locale, categories, productsHref, countForms }: CategoryListProps) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, index) => (
        <li key={category.id}>
          <Link
            href={`${productsHref}#${category.id}`}
            className="group grid grid-cols-[6.5rem_1fr_auto] items-center gap-4 rounded-3xl bg-paper p-3 pr-5 ring-1 ring-line transition-shadow duration-300 hover:ring-ink/25 sm:grid-cols-[10rem_1fr_auto] sm:gap-6 sm:pr-7"
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-mist">
              <Image
                src={category.image.src}
                alt=""
                fill
                sizes="(min-width: 640px) 160px, 104px"
                className="object-cover transition-transform duration-500 ease-soft group-hover:scale-105"
              />
            </div>
            <div className="py-1">
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
            <span className="grid size-10 place-items-center rounded-full border border-line text-ink transition-colors group-hover:border-leaf group-hover:bg-leaf">
              <IconArrowUpRight className="size-4" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
