import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactBand } from "@/components/sections/contact-band";
import { ProductCard, ProductGrid } from "@/components/product/product-card";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { isLocale } from "@/i18n/config";
import { plural } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { href } from "@/i18n/routing";
import { getCategoriesWithProducts } from "@/lib/content";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/products">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return pageMetadata({
    locale: lang,
    path: "/products",
    title: dict.meta.products.title,
    description: dict.meta.products.description,
  });
}

export default async function ProductsPage({ params }: PageProps<"/[lang]/products">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const [dict, categories] = await Promise.all([
    getDictionary(lang),
    getCategoriesWithProducts(lang),
  ]);
  const all = categories.flatMap((c) => c.products);

  return (
    <>
      <PageHeader
        crumbs={[
          { label: dict.nav.home, href: href(lang) },
          { label: dict.nav.products, href: href(lang, "/products") },
        ]}
        crumbsLabel={dict.nav.breadcrumbs}
        eyebrow={dict.products.eyebrow}
        title={dict.products.title}
      >
        <p>{dict.products.intro}</p>
      </PageHeader>

      {/* Category jump links — sticks under the header while scrolling the catalogue. */}
      <nav
        aria-label={dict.products.jumpTo}
        className="sticky top-[4.5rem] z-20 border-b border-line bg-paper/95 backdrop-blur-md lg:top-20"
      >
        <Container>
          <ul className="-mx-4 scrollbar-none flex gap-2 overflow-x-auto px-4 py-3 sm:mx-0 sm:px-0">
            {categories.map((category) => (
              <li key={category.id} className="shrink-0">
                <a
                  href={`#${category.id}`}
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-[0.9375rem] text-ink transition-colors hover:border-ink"
                >
                  {category.name}
                  <span className="text-sm text-muted-strong tabular-nums">
                    {category.products.length}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <div className="py-16 lg:py-20">
        {categories.map((category) => (
          <section
            key={category.id}
            id={category.id}
            aria-labelledby={`${category.id}-title`}
            className="scroll-mt-40 py-10 lg:py-14"
          >
            <Container>
              <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b border-line pb-6">
                <div>
                  <h2
                    id={`${category.id}-title`}
                    className="font-serif text-3xl text-ink sm:text-[2.25rem]"
                  >
                    {category.name}
                  </h2>
                  <p className="mt-2 text-muted-strong">{category.description}</p>
                </div>
                <p className="text-sm text-muted-strong tabular-nums">
                  {category.products.length}{" "}
                  {plural(lang, category.products.length, dict.common.productCount)}
                </p>
              </div>
              <ProductGrid className="mt-10">
                {category.products.map((product) => (
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
        ))}
      </div>

      <ContactBand locale={lang} dict={dict} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: dict.meta.products.title,
          numberOfItems: all.length,
          itemListElement: all.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: product.name,
            url: absoluteUrl(href(lang, `/products/${product.slug}`)),
          })),
        }}
      />
    </>
  );
}
