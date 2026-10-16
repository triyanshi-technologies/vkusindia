import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EnquiryForm } from "@/components/forms/enquiry-form";
import { ProductCard, ProductGrid } from "@/components/product/product-card";
import { RichText } from "@/components/product/rich-text";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { buttonClass } from "@/components/ui/button";
import { CmsImage } from "@/components/ui/cms-image";
import { Container } from "@/components/ui/container";
import { IconArrowRight, IconMail, IconPhone, IconWhatsApp } from "@/components/ui/icons";
import { company, whatsappLink } from "@/content/company";
import { isLocale } from "@/i18n/config";
import { interpolate } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { href } from "@/i18n/routing";
import { getProduct, getProductSlugs, getRelatedProducts } from "@/lib/content";
import { cmsImageUrl } from "@/lib/sanity/image";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

type Props = PageProps<"/[lang]/products/[slug]">;

const OG_WIDTH = 1200;

/**
 * Pre-builds every product published at build time. Products published later
 * render on their first request and are cached from then on.
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

  return pageMetadata({
    locale: lang,
    path: `/products/${slug}`,
    title: `${product.name} — ${product.categoryName}`,
    description: product.summary,
    image: {
      url: cmsImageUrl(product.image, OG_WIDTH),
      width: Math.min(OG_WIDTH, product.image.width),
      height: Math.round(
        (Math.min(OG_WIDTH, product.image.width) * product.image.height) / product.image.width,
      ),
      alt: product.name,
    },
  });
}

export default async function ProductPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const [dict, product] = await Promise.all([getDictionary(lang), getProduct(lang, slug)]);
  if (!product) notFound();
  const related = await getRelatedProducts(lang, product.category, product.slug);

  const productsHref = href(lang, "/products");
  const productHref = href(lang, `/products/${product.slug}`);
  const [primaryPhone] = company.phones;

  return (
    <>
      <div className="border-b border-line bg-mist/70">
        <Container className="pt-8 pb-16 lg:pt-10 lg:pb-20">
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
            <div className="lg:col-span-5">
              <div className="rounded-[2rem] bg-paper p-3 ring-1 ring-line">
                <div className="relative aspect-[3/2] overflow-hidden rounded-[1.5rem] bg-mist">
                  <CmsImage
                    image={product.image}
                    alt={interpolate(dict.product.imageAlt, { product: product.name })}
                    fill
                    preload
                    sizes="(min-width: 1024px) 440px, 92vw"
                    className="object-cover"
                  />
                </div>
              </div>
              {product.vegetarian && (
                <p className="mt-4 flex items-center gap-2.5 text-sm text-muted-strong">
                  <VegMark /> {dict.common.vegetarian}
                </p>
              )}
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
              <p className="mt-5 max-w-2xl text-lg text-muted-strong">{product.summary}</p>

              {product.specs.length > 0 && (
                <section aria-labelledby="specs-title" className="mt-10">
                  <h2 id="specs-title" className="sr-only">
                    {dict.product.specs}
                  </h2>
                  <dl className="grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
                    {product.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex items-baseline justify-between gap-4 border-b border-line py-3.5"
                      >
                        <dt className="text-[0.9375rem] text-muted-strong">{spec.label}</dt>
                        <dd className="text-right font-medium text-ink">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
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
                  <IconWhatsApp className="text-lg text-olive group-hover/btn:text-leaf" />
                  {dict.common.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {product.body.length > 0 ? (
        <section aria-labelledby="description-title" className="py-16 lg:py-24">
          <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <h2 id="description-title" className="font-serif text-3xl text-ink lg:col-span-4">
              {dict.product.description}
            </h2>
            <RichText value={product.body} className="text-lg lg:col-span-8" />
          </Container>
        </section>
      ) : (
        <div className="pt-16 lg:pt-24" />
      )}

      <section id="enquiry" aria-labelledby="enquiry-title" className="pb-16 lg:pb-24">
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
                labels={dict.form}
                privacyHref={href(lang, "/privacy")}
              />
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-line py-16 lg:py-24">
          <Container>
            <h2 id="related-title" className="font-serif text-3xl text-ink">
              {dict.product.related}
            </h2>
            <ProductGrid className="mt-10">
              {related.map((item) => (
                <ProductCard
                  key={item.slug}
                  product={item}
                  href={href(lang, `/products/${item.slug}`)}
                  detailsLabel={dict.common.details}
                />
              ))}
            </ProductGrid>
          </Container>
        </section>
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.summary,
          image: cmsImageUrl(product.image),
          url: absoluteUrl(productHref),
          category: product.categoryName,
          brand: { "@type": "Brand", name: company.brand[lang] },
        }}
      />
    </>
  );
}

/** Indian FSSAI vegetarian mark — a green square with a dot. */
function VegMark() {
  return (
    <span
      aria-hidden="true"
      className="grid size-4 place-items-center rounded-[3px] border-[1.5px] border-olive"
    >
      <span className="size-1.5 rounded-full bg-olive" />
    </span>
  );
}
