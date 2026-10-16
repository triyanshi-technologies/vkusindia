import "server-only";

import { cacheLife, cacheTag } from "next/cache";

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
 */

/** Cache tag refreshed by the Sanity publish webhook (`/api/revalidate`). */
export const PRODUCTS_TAG = "products";

const categoryById = new Map(categories.map((c) => [c.id, c]));

/** The single Sanity request — cached until a publish webhook invalidates it. */
async function fetchProducts(): Promise<ProductRow[]> {
  "use cache";
  cacheLife("max");
  cacheTag(PRODUCTS_TAG);

  const rows = await sanityClient.fetch<ProductRow[]>(PRODUCTS_QUERY);
  // Ignore documents whose category isn't one the site knows about.
  return rows.filter((row) => categoryById.has(row.category));
}

function toSummary(row: ProductRow, locale: Locale): ProductSummary {
  return {
    slug: row.slug,
    category: row.category,
    categoryName: categoryById.get(row.category)?.name[locale] ?? "",
    name: row.name[locale],
    summary: row.summary[locale],
    image: toCmsImage(row.image),
  };
}

export async function getCategoriesWithProducts(locale: Locale): Promise<CategoryWithProducts[]> {
  const rows = await fetchProducts();
  return categories.map((category) => ({
    id: category.id,
    name: category.name[locale],
    description: category.description[locale],
    image: category.image,
    products: rows.filter((r) => r.category === category.id).map((r) => toSummary(r, locale)),
  }));
}

export async function getFeaturedProducts(locale: Locale): Promise<ProductSummary[]> {
  const rows = await fetchProducts();
  return rows.filter((r) => r.featured).map((r) => toSummary(r, locale));
}

export async function getProduct(locale: Locale, slug: string): Promise<Product | null> {
  const row = (await fetchProducts()).find((r) => r.slug === slug);
  if (!row) return null;

  return {
    ...toSummary(row, locale),
    vegetarian: row.vegetarian ?? false,
    specs: (row.specs ?? []).map((s) => ({ label: s.label[locale], value: s.value[locale] })),
    body: row.body?.[locale] ?? [],
  };
}

export async function getRelatedProducts(
  locale: Locale,
  category: CategoryId,
  excludeSlug: string,
  limit = 4,
): Promise<ProductSummary[]> {
  const rows = await fetchProducts();
  return rows
    .filter((r) => r.category === category && r.slug !== excludeSlug)
    .slice(0, limit)
    .map((r) => toSummary(r, locale));
}

export async function getProductSlugs(): Promise<string[]> {
  return (await fetchProducts()).map((r) => r.slug);
}

export async function getCatalogStats(): Promise<{ products: number; categories: number }> {
  return { products: (await fetchProducts()).length, categories: categories.length };
}
