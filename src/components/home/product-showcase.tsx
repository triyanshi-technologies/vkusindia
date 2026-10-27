import Image from "next/image";
import Link from "next/link";

import { showcaseImage } from "@/content/pages";
import type { ProductSummary } from "@/content/types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { href } from "@/i18n/routing";
import { publicPath } from "@/lib/public-path";
import { CmsImage } from "@/components/ui/cms-image";
import { Container } from "@/components/ui/container";
import {
  IconArrowUpRight,
  IconCup,
  IconGlobe,
  IconLeaf,
  IconNoCaffeine,
} from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";

import { ShowcaseCarousel } from "./showcase-carousel";

/** Same order as `home.featuredPerks` in the dictionaries. */
const perkIcons = [IconLeaf, IconNoCaffeine, IconCup, IconGlobe];

interface ProductShowcaseProps {
  locale: Locale;
  dict: Dictionary;
  products: ProductSummary[];
}

/** Photo + product carousel; from tablet up it is sized to fit one screen under the sticky header. */
export function ProductShowcase({ locale, dict, products }: ProductShowcaseProps) {
  const t = dict.home;

  return (
    <section
      aria-labelledby="featured-title"
      className="flex py-10 sm:py-14 md:h-[min(calc(100svh-4.5rem),52rem)] md:min-h-[38rem] md:py-8 lg:h-[min(calc(100svh-5rem),54rem)] lg:py-10"
    >
      <Container className="grid gap-8 md:grid-cols-12 md:grid-rows-[minmax(0,1fr)] lg:gap-12">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-mist sm:aspect-[16/9] sm:rounded-[2rem] md:col-span-5 md:aspect-auto lg:col-span-6">
          <Image
            src={publicPath(showcaseImage.src)}
            alt={showcaseImage.alt[locale]}
            fill
            unoptimized
            sizes="(min-width: 1024px) 50vw, (min-width: 768px) 42vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex min-h-0 min-w-0 flex-col md:col-span-7 lg:col-span-6">
          <SectionHeading
            eyebrow={t.featuredEyebrow}
            title={t.featuredTitle}
            id="featured-title"
            className="md:short:[&>div]:mt-3"
          >
            <p>{t.featuredText}</p>
          </SectionHeading>

          <ul className="mt-6 grid grid-cols-4 gap-2 border-y border-line py-4 sm:gap-4 md:short:mt-4 md:short:py-3">
            {t.featuredPerks.map((perk, index) => {
              const Icon = perkIcons[index]!;
              return (
                <li
                  key={perk}
                  className="flex flex-col items-center gap-2 text-center text-xs leading-snug text-ink sm:text-[0.8125rem]"
                >
                  <span className="grid size-10 place-items-center rounded-full bg-leaf/20 text-xl text-olive">
                    <Icon />
                  </span>
                  {perk}
                </li>
              );
            })}
          </ul>

          <ShowcaseCarousel
            labels={{ region: t.featuredTitle, ...t.carousel }}
            className="mt-6 min-h-0 flex-1 md:short:mt-4"
          >
            {products.map((product) => (
              <li
                key={product.slug}
                className="flex w-[78%] shrink-0 snap-start sm:w-[46%] md:w-[85%] lg:w-[calc((100%-1.5rem)/2)]"
              >
                <ShowcaseCard
                  product={product}
                  href={href(locale, `/products/${product.slug}`)}
                  detailsLabel={dict.common.details}
                />
              </li>
            ))}
          </ShowcaseCarousel>
        </div>
      </Container>
    </section>
  );
}

function ShowcaseCard({
  product,
  href,
  detailsLabel,
}: {
  product: ProductSummary;
  href: string;
  detailsLabel: string;
}) {
  return (
    <article className="group relative flex w-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-paper md:aspect-auto md:min-h-36 md:flex-1">
        <CmsImage
          image={product.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 300px, (min-width: 768px) 50vw, 78vw"
          className="object-contain p-3 transition-transform duration-500 ease-soft group-hover:scale-[1.04]"
        />
      </div>
      <h3 className="mt-4 font-serif text-lg leading-snug text-ink transition-colors group-hover:text-olive">
        <Link href={href} className="after:absolute after:inset-0 after:rounded-2xl">
          {product.name}
        </Link>
      </h3>
      <span
        aria-hidden="true"
        className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-medium text-ink"
      >
        {detailsLabel}
        <IconArrowUpRight className="size-4 text-olive transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </article>
  );
}
