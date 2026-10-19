import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EnquiryForm } from "@/components/forms/enquiry-form";
import { ProductCard, ProductGrid } from "@/components/product/product-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { RichText } from "@/components/product/rich-text";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { buttonClass } from "@/components/ui/button";
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
    title: `${product.name} — ${product.categoryName}`,
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

      <section id="enquiry" aria-labelledby="enquiry-title" className="py-16 lg:py-24">
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
          description: product.excerpt,
          image: product.images.map((image) => cmsImageUrl(image)),
          url: absoluteUrl(productHref),
          category: product.categoryName,
          brand: { "@type": "Brand", name: company.brand[lang] },
        }}
      />
    </>
  );
}
