import Image from "next/image";

import { showcaseImage } from "@/content/pages";
import type { ProductSummary } from "@/content/types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { href } from "@/i18n/routing";
import { publicPath } from "@/lib/public-path";
import { ProductTile } from "@/components/product/product-card";
import { Container } from "@/components/ui/container";
import {
  IconCup,
  IconGlobe,
  IconLeaf,
  IconNoCaffeine,
} from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";

/** Same order as `home.featuredPerks` in the dictionaries. */
const perkIcons = [IconLeaf, IconNoCaffeine, IconCup, IconGlobe];

interface ProductShowcaseProps {
  locale: Locale;
  dict: Dictionary;
  products: ProductSummary[];
}

/** From tablet up the intro column stays pinned while the products scroll past in a two-column grid. */
export function ProductShowcase({ locale, dict, products }: ProductShowcaseProps) {
  const t = dict.home;

  return (
    <section aria-labelledby="featured-title" className="section-y">
      <Container className="grid gap-10 md:grid-cols-12 md:items-start lg:gap-12">
        {/* Capped to the screen under the sticky header; on short screens the photo gives up the height. */}
        <div className="flex flex-col md:sticky md:top-24 md:col-span-5 md:max-h-[calc(100svh-7.5rem)] lg:top-26 lg:max-h-[calc(100svh-8rem)]">
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

          <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-mist sm:aspect-[16/9] sm:rounded-[2rem] md:aspect-[4/3] md:min-h-32 md:shrink md:short:mt-4">
            <Image
              src={publicPath(showcaseImage.src)}
              alt={showcaseImage.alt[locale]}
              fill
              unoptimized
              sizes="(min-width: 1280px) 520px, (min-width: 768px) 42vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 md:col-span-7 lg:gap-x-8">
          {products.map((product) => (
            <li key={product.slug} className="flex">
              <ProductTile
                product={product}
                href={href(locale, `/products/${product.slug}`)}
                detailsLabel={dict.common.details}
                variantsLabel={dict.common.hasVariants}
                sizes="(min-width: 1280px) 340px, (min-width: 768px) 28vw, 46vw"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
