import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EnquiryForm } from "@/components/forms/enquiry-form";
import { ShowcaseCarousel } from "@/components/home/showcase-carousel";
import { ProductTile } from "@/components/product/product-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { RichText } from "@/components/product/rich-text";
import { VariantPicker, VariantSelectionProvider } from "@/components/product/variant-selection";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { buttonClass } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  IconArrowRight,
  IconChevronDown,
  IconMail,
  IconPhone,
  IconWhatsApp,
} from "@/components/ui/icons";
import { company, whatsappLink } from "@/content/company";
import { isLocale } from "@/i18n/config";
import { interpolate } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { href } from "@/i18n/routing";
import { getProduct, getProductSlugs, getRelatedProducts } from "@/lib/content";
import { cmsImageUrl } from "@/lib/sanity/image";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Props = PageProps<"/[lang]/products/[slug]">;

const OG_WIDTH = 1200;
/** Specification rows shown on phones before "show all". */
const SPEC_PREVIEW_ROWS = 5;

/**
 * Pre-builds every product published at build time (listed or not). Products
 * published later render on their first request and are cached from then on.
 */
export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  // Cache Components needs at least one param; an empty dataset yields a single 404 page.
  return (slugs.length ? slugs : ["__none"]).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const product = await getProduct(lang, slug);
  if (!product) return {};

  const ogWidth = Math.min(OG_WIDTH, product.image.width);
  return pageMetadata({
    locale: lang,
    path: `/products/${slug}`,
    title: `${product.name} - ${product.categoryName}`,
    description: product.excerpt,
    image: {
      url: cmsImageUrl(product.image, OG_WIDTH),
      width: ogWidth,
      height: Math.round((ogWidth * product.image.height) / product.image.width),
      alt: product.name,
    },
  });
}

export default async function ProductPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const [dict, product] = await Promise.all([getDictionary(lang), getProduct(lang, slug)]);
  if (!product) notFound();
  // The carousel takes the whole category, so no artificial cap.
  const related = await getRelatedProducts(lang, product.category, product.slug, Infinity);

  const productsHref = href(lang, "/products");
  const productHref = href(lang, `/products/${product.slug}`);
  const [primaryPhone] = company.phones;

  return (
    <VariantSelectionProvider>
      <div className="border-b border-line bg-mist/70">
        <Container className="pt-8 pb-12 lg:pt-10 lg:pb-14">
          <Breadcrumbs
            label={dict.nav.breadcrumbs}
            items={[
              { label: dict.nav.home, href: href(lang) },
              { label: dict.nav.products, href: productsHref },
              { label: product.categoryName, href: `${productsHref}#${product.category}` },
              { label: product.name, href: productHref },
            ]}
          />

          <div className="mt-10 grid items-start gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:col-span-5">
              <ProductGallery
                images={product.images}
                alt={interpolate(dict.product.imageAlt, { product: product.name })}
                thumbLabel={dict.product.photoLabel}
              />
            </div>

            <div className="lg:col-span-7">
              <Link
                href={`${productsHref}#${product.category}`}
                className="eyebrow transition-colors hover:text-olive"
              >
                {product.categoryName}
              </Link>
              <h1 className="mt-4 font-serif text-[2.25rem] leading-[1.1] tracking-tight text-ink sm:text-5xl">
                {product.name}
              </h1>

              <RichText value={product.description} className="mt-8 text-lg" />

              {product.variants.length > 0 && (
                <VariantPicker
                  groups={product.variants}
                  formHref="#enquiry"
                  labels={{
                    title: dict.product.variants,
                    hint: dict.product.variantsHint,
                    selected: dict.product.variantsSelected,
                    toEnquiry: dict.product.toEnquiry,
                  }}
                />
              )}

              {product.specifications.length > 0 && (
                <section aria-labelledby="specs-title" className="group/specs mt-10">
                  <h2 id="specs-title" className="font-serif text-2xl text-ink">
                    {dict.product.specifications}
                  </h2>
                  {/* Phones show the first rows; the checkbox below reveals the rest (no JS needed). */}
                  <dl className="mt-4 divide-y divide-line border-y border-line text-[0.9375rem]">
                    {product.specifications.map((spec, index) => (
                      <div
                        key={`${index}-${spec.label}`}
                        className={cn(
                          "grid grid-cols-2 gap-4 py-2.5 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-6 sm:py-3",
                          index >= SPEC_PREVIEW_ROWS &&
                            "max-sm:hidden max-sm:group-has-checked/specs:grid",
                        )}
                      >
                        <dt className="text-muted-strong">{spec.label}</dt>
                        <dd className="text-ink">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                  {product.specifications.length > SPEC_PREVIEW_ROWS && (
                    <div className="sm:hidden">
                      <input id="specs-more" type="checkbox" className="peer sr-only" />
                      <label
                        htmlFor="specs-more"
                        className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-olive peer-focus-visible:ring-4 peer-focus-visible:ring-leaf/40"
                      >
                        <span className="group-has-checked/specs:hidden">
                          {interpolate(dict.product.specsMore, { count: product.specifications.length })}
                        </span>
                        <span className="hidden group-has-checked/specs:inline">{dict.product.specsLess}</span>
                        <IconChevronDown className="text-olive transition-transform duration-200 group-has-checked/specs:rotate-180" />
                      </label>
                    </div>
                  )}
                </section>
              )}

              <div className="mt-10 flex flex-wrap gap-3">
                <a href="#enquiry" className={buttonClass({ size: "lg" })}>
                  {dict.common.enquire}
                  <IconArrowRight className="size-4" />
                </a>
                <a
                  href={whatsappLink(
                    interpolate(dict.common.whatsappGreeting, { product: product.name }),
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass({ variant: "outline", size: "lg" })}
                >
                  <IconWhatsApp className="text-lg" />
                  {dict.common.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <section id="enquiry" aria-labelledby="enquiry-title" className="section-y">
        <Container>
          <div className="grid gap-10 rounded-[2rem] border border-line p-6 sm:p-10 lg:grid-cols-12 lg:gap-16 lg:p-14">
            <div className="lg:col-span-4">
              <h2 id="enquiry-title" className="font-serif text-3xl leading-tight text-ink">
                {dict.product.enquiryTitle}
              </h2>
              <p className="mt-4 text-muted-strong">{dict.product.enquiryText}</p>
              <ul className="mt-8 space-y-3 text-[0.9375rem]">
                <li>
                  <a href={primaryPhone.href} className="flex items-center gap-3 hover:text-olive">
                    <IconPhone className="text-olive" /> {primaryPhone.display}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${company.ordersEmail}`}
                    className="flex items-center gap-3 hover:text-olive"
                  >
                    <IconMail className="text-olive" /> {company.ordersEmail}
                  </a>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-8">
              <EnquiryForm
                locale={lang}
                product={{ slug: product.slug, name: product.name }}
                variants={product.variants}
                labels={dict.form}
                privacyHref={href(lang, "/privacy")}
              />
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="section-y border-t border-line">
          <Container>
            <h2 id="related-title" className="font-serif text-3xl text-ink">
              {dict.product.related}
            </h2>
            <ShowcaseCarousel
              labels={{ region: dict.product.related, ...dict.home.carousel }}
              className="mt-10"
            >
              {related.map((item) => (
                <li
                  key={item.slug}
                  className="flex w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[calc((100%-3rem)/3)]"
                >
                  <ProductTile
                    product={item}
                    href={href(lang, `/products/${item.slug}`)}
                    detailsLabel={dict.common.details}
                    variantsLabel={dict.common.hasVariants}
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 44vw, 78vw"
                  />
                </li>
              ))}
            </ShowcaseCarousel>
          </Container>
        </section>
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.excerpt,
          image: product.images.map((image) => cmsImageUrl(image)),
          url: absoluteUrl(productHref),
          category: product.categoryName,
          brand: { "@type": "Brand", name: company.brand[lang] },
          ...(product.specifications.length > 0 && {
            additionalProperty: product.specifications.map((spec) => ({
              "@type": "PropertyValue",
              name: spec.label,
              value: spec.value,
            })),
          }),
        }}
      />
    </VariantSelectionProvider>
  );
}
