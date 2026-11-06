import Link from "next/link";
import type { ComponentType, SVGProps } from "react";

import {
  chicoryProcess,
  type ProcessChapter,
  type ProcessChapterId,
  type ProcessUseId,
} from "@/content/chicory-process";
import type { ProcessRoute, ProductSummary } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routing";
import { PROCESS_READING_LINE } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import {
  IconArrowUpRight,
  IconBread,
  IconChocolate,
  IconCup,
  IconCupcake,
  IconFlame,
  IconLeaf,
  IconNoCaffeine,
  IconSun,
} from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { TocNav } from "@/components/ui/toc-nav";

import { ProcessStem } from "./process-stem";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const chapterIcons: Record<ProcessChapterId, Icon> = {
  field: IconLeaf,
  drying: IconSun,
  roasting: IconFlame,
  dispatch: IconCup,
};

const useIcons: Record<ProcessUseId, Icon> = {
  coffee: IconCup,
  caffeineFree: IconNoCaffeine,
  bakery: IconBread,
  confectionery: IconCupcake,
  chocolate: IconChocolate,
};

/** Each chapter's content card; dark tones switch the text inside to light. */
const chapterTones: Record<ProcessChapterId, { card: string; dark: boolean }> = {
  field: { card: "bg-leaf/20", dark: false },
  drying: { card: "bg-paper ring-1 ring-line", dark: false },
  roasting: { card: "bg-surface-dark", dark: true },
  // Olive darkened so light text stays readable on it.
  dispatch: { card: "bg-[color-mix(in_oklab,var(--color-olive)_75%,black)]", dark: true },
};

const anchor = (id: ProcessChapterId) => `process-${id}`;

type ProductLink = { label: string; href: string };

interface ChicoryProcessProps {
  locale: Locale;
  /** Listed products; each appears at the chapter where its `processRoute` leaves the process. */
  products: ProductSummary[];
}

/** "Seed to cup": one stem through four chapters, with roasting forking into two product routes. */
export function ChicoryProcess({ locale, products }: ChicoryProcessProps) {
  const t = chicoryProcess[locale];
  const linksFor = (route?: ProcessRoute): ProductLink[] =>
    route
      ? products
          .filter((product) => product.processRoute === route)
          .map((product) => ({ label: product.name, href: href(locale, `/products/${product.slug}`) }))
      : [];

  return (
    <section aria-labelledby="process-title" className="section-y bg-mist">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading eyebrow={t.eyebrow} title={t.title} id="process-title">
              <p>{t.intro}</p>
            </SectionHeading>
            <nav aria-label={t.navLabel} className="mt-10 hidden lg:block">
              <TocNav
                items={t.chapters.map((c) => ({ id: anchor(c.id), label: c.title }))}
                readingLine={PROCESS_READING_LINE}
              />
            </nav>
          </div>
        </div>

        <ProcessStem className="lg:col-span-8">
          {t.chapters.map((chapter, index) => (
            <Chapter
              key={chapter.id}
              chapter={chapter}
              number={String(index + 1).padStart(2, "0")}
              outputLabel={t.outputLabel}
              linksFor={linksFor}
            />
          ))}
        </ProcessStem>
      </Container>

      <Container className="mt-12 lg:mt-14">
        {/* Dark band so the uses stand out between the light process and the white seals. */}
        {/* From xl the title sits in its own column beside the items, so the band is one row. */}
        <div className="rounded-[2rem] bg-surface-dark px-6 py-7 text-paper sm:px-10 lg:px-12 lg:py-8 xl:flex xl:items-center xl:gap-8">
          <h3 className="eyebrow text-paper/60 xl:w-40 xl:shrink-0 xl:self-stretch xl:border-r xl:border-paper/15 xl:pr-6 xl:font-serif xl:text-[1.375rem] xl:leading-tight xl:tracking-normal xl:text-paper xl:normal-case xl:before:hidden">
            {t.usesTitle}
          </h3>
          <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 sm:gap-x-6 xl:mt-0 xl:flex-1 xl:grid-cols-5 xl:gap-0 xl:divide-x xl:divide-paper/15">
            {t.uses.map((use) => {
              const Icon = useIcons[use.id];
              return (
                <li
                  key={use.id}
                  className="flex min-w-0 items-center gap-2.5 sm:gap-3 xl:px-4 xl:first:pl-0 xl:last:pr-0"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-leaf/15 text-lg text-leaf ring-1 ring-leaf/30 sm:size-11 sm:text-xl xl:size-10 xl:text-lg">
                    <Icon />
                  </span>
                  <span className="min-w-0 text-sm leading-snug font-medium sm:text-[0.9375rem] xl:text-sm">{use.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}

interface ChapterProps {
  chapter: ProcessChapter;
  number: string;
  outputLabel: string;
  linksFor: (route?: ProcessRoute) => ProductLink[];
}

function Chapter({ chapter, number, outputLabel, linksFor }: ChapterProps) {
  const Icon = chapterIcons[chapter.id];
  const tone = chapterTones[chapter.id];
  const { dark } = tone;

  return (
    <li id={anchor(chapter.id)} className="group/chapter relative pb-12 pl-14 last:pb-0 sm:pl-20">
      {/* State comes from ProcessStem: passed = filled, current = filled + halo, upcoming = outline. */}
      <span
        data-marker
        className={cn(
          "absolute top-0 left-0 z-10 grid size-10 place-items-center rounded-full bg-paper text-xl text-olive ring-1 ring-line",
          "transition-[background-color,color,box-shadow,scale] duration-300 ease-soft motion-reduce:transition-none",
          "group-data-[state=passed]/chapter:bg-leaf group-data-[state=passed]/chapter:text-ink group-data-[state=passed]/chapter:ring-leaf",
          "group-data-[state=current]/chapter:scale-110 group-data-[state=current]/chapter:bg-leaf group-data-[state=current]/chapter:text-ink group-data-[state=current]/chapter:ring-leaf group-data-[state=current]/chapter:shadow-[0_0_0_7px_rgb(165_200_59/0.28)]",
        )}
      >
        <Icon />
      </span>

      <p className="flex flex-wrap items-baseline gap-x-3 pt-2.5 text-[0.8125rem] font-medium tracking-[0.14em] text-muted-strong uppercase">
        <span className="text-olive tabular-nums">{number}</span>
        {chapter.period && <span>{chapter.period}</span>}
      </p>
      <h3 className="mt-2 font-serif text-3xl leading-tight text-ink transition-colors duration-300 group-data-[state=upcoming]/chapter:text-ink/45 motion-reduce:transition-none sm:text-[2.25rem]">
        {chapter.title}
      </h3>

      <div className={cn("mt-6 rounded-[1.75rem] p-5 sm:p-8", tone.card, dark && "text-paper")}>
        {chapter.notes.length > 0 && (
          <ul className={cn("space-y-2 text-[0.9375rem]", dark ? "text-paper/80" : "text-muted-strong")}>
            {chapter.notes.map((note) => (
              <li key={note} className="relative pl-5">
                <span
                  aria-hidden="true"
                  className={cn("absolute top-[0.6em] left-0 size-1.5 rounded-full", dark ? "bg-leaf" : "bg-olive")}
                />
                {note}
              </li>
            ))}
          </ul>
        )}

        {chapter.facts.length > 0 && (
          // Two per row inside the card; a set of three fits one row on wide screens.
          <dl
            className={cn(
              "mt-6 grid grid-cols-2 gap-x-4 gap-y-5 first:mt-0 sm:gap-x-6",
              chapter.facts.length === 3 && "xl:grid-cols-3",
            )}
          >
            {chapter.facts.map((fact) => (
              <div
                key={fact.label}
                className={cn("flex flex-col gap-1 border-t pt-3", dark ? "border-paper/15" : "border-ink/10")}
              >
                <dt className={cn("order-last text-sm", dark ? "text-paper/60" : "text-muted-strong")}>
                  {fact.label}
                </dt>
                <dd
                  className={cn(
                    "font-serif text-xl whitespace-nowrap xs:text-[1.75rem] sm:text-3xl",
                    dark ? "text-leaf" : "text-ink",
                  )}
                >
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {chapter.branches && (
          <div className="mt-8">
            {/* The stem forks into the two routes on wider screens. */}
            <svg
              aria-hidden="true"
              viewBox="0 0 100 40"
              preserveAspectRatio="none"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="hidden h-10 w-full text-leaf sm:block"
            >
              <path
                d="M50 0V12C50 24 25 18 25 40M50 12C50 24 75 18 75 40"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {chapter.branches.map((branch) => (
                <div key={branch.route} className="rounded-2xl border border-paper/15 p-5">
                  <h4 className="font-serif text-xl text-paper">{branch.title}</h4>
                  <p className="mt-1.5 text-sm text-paper/70">{branch.text}</p>
                  <ProductLinks links={linksFor(branch.route)} dark className="mt-4" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <ProductLinks links={linksFor(chapter.output)} label={outputLabel} className="mt-6" />
    </li>
  );
}

function ProductLinks({
  links,
  label,
  dark = false,
  className,
}: {
  links: ProductLink[];
  label?: string;
  dark?: boolean;
  className?: string;
}) {
  if (!links.length) return null;
  return (
    <div className={className}>
      {label && (
        <p className="text-xs font-medium tracking-[0.12em] text-muted-strong uppercase">{label}</p>
      )}
      <ul className={cn("flex flex-wrap gap-2", label && "mt-2.5")}>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm transition-colors",
                dark
                  ? "bg-paper/10 text-paper hover:bg-leaf hover:text-ink"
                  : "border border-line bg-paper text-ink hover:border-olive hover:text-olive",
              )}
            >
              {link.label}
              <IconArrowUpRight className="size-3.5" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
