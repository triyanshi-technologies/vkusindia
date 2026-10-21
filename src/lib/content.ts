import "server-only";

import { toPlainText, type PortableTextBlock } from "@portabletext/react";
import { categories } from "@/content/categories";
import type {
  CategoryId,
  CategoryWithProducts,
  Product,
  ProductSummary,
} from "@/content/types";
import type { Locale } from "@/i18n/config";
import { sanityClient } from "@/lib/sanity/client";
import { toCmsImage } from "@/lib/sanity/image";
import { PRODUCTS_QUERY, type ProductRow } from "@/lib/sanity/queries";

/**
 * Data access layer. Products come from Sanity; categories are fixed site
 * structure in code. Pages read content only through these functions.
 *
 * "Listed" products appear in the menu, home page and catalogue. Unlisted ones
 * (as on the old site) keep a working page that is only reachable by its link.
 */

const EXCERPT_LENGTH = 160;
const categoryById = new Map(categories.map((c) => [c.id, c]));

// Static demo builds have no runtime cache, so share the single CMS request
// while Next prerenders catalogue, product, metadata, and sitemap routes.
let productRowsPromise: Promise<ProductRow[]> | undefined;

/** The single Sanity request shared by prerendered routes during this build. */
async function fetchProducts(): Promise<ProductRow[]> {
  productRowsPromise ??= sanityClient.fetch<ProductRow[]>(PRODUCTS_QUERY);
  const rows = await productRowsPromise;
  // Ignore documents whose category isn't one the site knows about.
  return rows.filter((row) => categoryById.has(row.category));
}

async function fetchListed(): Promise<ProductRow[]> {
  return (await fetchProducts()).filter((row) => row.listed);
}

function toSummary(row: ProductRow, locale: Locale): ProductSummary {
  return {
    slug: row.slug,
    category: row.category,
    categoryName: categoryById.get(row.category)?.name[locale] ?? "",
    name: row.name[locale],
    image: toCmsImage(row.images[0]!),
  };
}

/** First sentences of the description as plain text, cut at a word boundary. */
function toExcerpt(blocks: PortableTextBlock[]): string {
  const text = toPlainText(blocks).replace(/\s+/g, " ").trim();
  if (text.length <= EXCERPT_LENGTH) return text;
  return `${text.slice(0, text.lastIndexOf(" ", EXCERPT_LENGTH)).replace(/[,.;:-]+$/, "")}…`;
}

export async function getCategoriesWithProducts(locale: Locale): Promise<CategoryWithProducts[]> {
  const rows = await fetchListed();
  return categories.map((category) => ({
    id: category.id,
    name: category.name[locale],
    description: category.description[locale],
    image: category.image,
    products: rows.filter((r) => r.category === category.id).map((r) => toSummary(r, locale)),
  }));
}

export async function getListedProducts(locale: Locale): Promise<ProductSummary[]> {
  return (await fetchListed()).map((r) => toSummary(r, locale));
}

/** Any product, listed or not - unlisted pages stay reachable by direct link. */
export async function getProduct(locale: Locale, slug: string): Promise<Product | null> {
  const row = (await fetchProducts()).find((r) => r.slug === slug);
  if (!row) return null;

  const description = row.description?.[locale] ?? [];
  return {
    ...toSummary(row, locale),
    images: row.images.map(toCmsImage),
    description,
    excerpt: toExcerpt(description) || row.name[locale],
  };
}

export async function getRelatedProducts(
  locale: Locale,
  category: CategoryId,
  excludeSlug: string,
  limit = 4,
): Promise<ProductSummary[]> {
  return (await fetchListed())
    .filter((r) => r.category === category && r.slug !== excludeSlug)
    .slice(0, limit)
    .map((r) => toSummary(r, locale));
}

/** Every product page (listed and unlisted) - for static params and the sitemap. */
export async function getProductSlugs(): Promise<string[]> {
  return (await fetchProducts()).map((r) => r.slug);
}

export async function getCatalogStats(): Promise<{ products: number; categories: number }> {
  return { products: (await fetchListed()).length, categories: categories.length };
}
