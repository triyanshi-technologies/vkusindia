import type { PortableTextBlock } from "@portabletext/react";

import type { Locale } from "@/i18n/config";

/** Every translatable content field is a `Localized` object ({ ru, en }). */
export type Localized<T = string> = Record<Locale, T>;

/** Must match the category list in the Sanity product schema (studio/schemaTypes/product.ts). */
export type CategoryId = "chicory" | "rice" | "spices" | "superfoods";

/** Image shipped with the site in /public (layout imagery, category tiles). */
export interface ImageAsset {
  src: string;
  width: number;
  height: number;
}

/** Image hosted on the Sanity CDN — `url` is the base URL, sized per request by the loader. */
export interface CmsImage {
  url: string;
  width: number;
  height: number;
  /** Tiny base64 preview used as the blur placeholder. */
  lqip?: string;
}

/** Categories are fixed site structure, so they live in code; products live in Sanity. */
export interface CategoryDoc {
  id: CategoryId;
  name: Localized;
  description: Localized;
  image: ImageAsset;
}

/* Resolved (single-locale) shapes handed to components. */

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  image: ImageAsset;
}

export interface ProductSummary {
  slug: string;
  category: CategoryId;
  categoryName: string;
  name: string;
  summary: string;
  image: CmsImage;
}

export interface Product extends ProductSummary {
  vegetarian: boolean;
  specs: { label: string; value: string }[];
  body: PortableTextBlock[];
}

export interface CategoryWithProducts extends Category {
  products: ProductSummary[];
}
