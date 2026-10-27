import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContactBand } from "@/components/sections/contact-band";
import { Hero } from "@/components/home/hero";
import { PhotoMosaic } from "@/components/home/photo-mosaic";
import { Principles } from "@/components/sections/principles";
import { ProcessSteps } from "@/components/home/process-steps";
import { ProductCard, ProductGrid } from "@/components/product/product-card";
import { buttonArrowClass, buttonClass } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { IconArrowRight } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { about, welcome } from "@/content/pages";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { href } from "@/i18n/routing";
import { getListedProducts, getProductPhotos } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return pageMetadata({
    locale: lang,
    path: "/",
    title: dict.meta.home.title,
    description: dict.meta.home.description,
    absoluteTitle: true,
  });
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const [dict, products, photos] = await Promise.all([
    getDictionary(lang),
    getListedProducts(lang),
    getProductPhotos(lang, 4),
  ]);
  const t = dict.home;

  return (
    <>
      <Hero locale={lang} dict={dict} productCount={products.length} inset={photos[0]} />

      <section aria-labelledby="featured-title" className="border-t border-line py-20 lg:py-28">
        <Container>
          <SectionHeading eyebrow={t.featuredEyebrow} title={t.featuredTitle} id="featured-title" />
          <ProductGrid className="mt-12 lg:mt-14">
            {products.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                href={href(lang, `/products/${product.slug}`)}
                detailsLabel={dict.common.details}
              />
            ))}
          </ProductGrid>
        </Container>
      </section>

      <section aria-labelledby="about-title" className="pb-20 lg:pb-28">
        <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <PhotoMosaic photos={photos}className="pb-8 lg:col-span-5" />
          <div className="lg:col-span-7">
            <SectionHeading eyebrow={t.aboutEyebrow} title={t.aboutTitle} id="about-title" />
            <p className="mt-6 max-w-2xl text-lg text-muted-strong">{welcome[lang]}</p>
            <blockquote className="mt-8 max-w-xl border-l-2 border-leaf pl-6 font-serif text-xl leading-relaxed text-ink italic">
              {about.closing[lang]}
            </blockquote>
            <Link
              href={href(lang, "/about")}
              className={buttonClass({ variant: "outline", className: "mt-9" })}
            >
              {dict.common.readMore}
              <IconArrowRight className={buttonArrowClass} />
            </Link>
          </div>
        </Container>
      </section>

      <Principles locale={lang} eyebrow={t.approachEyebrow} title={t.approachTitle} />
      <ProcessSteps eyebrow={t.processEyebrow} title={t.processTitle} steps={t.processSteps} />
      <ContactBand locale={lang} dict={dict} />
    </>
  );
}
