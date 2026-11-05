import type { PortableTextBlock } from "@portabletext/react";

import type { CategoryId, Localized, ProcessRoute } from "@/content/types";

/**
 * All products in one request (a few dozen small documents): every page derives
 * what it needs from this single cached result, so there is one cache entry to refresh.
 */
export const PRODUCTS_QUERY = /* groq */ `
  *[_type == "product" && defined(slug.current) && count(images[defined(asset)]) > 0]
    | order(orderRank asc, name.ru asc) {
      "slug": slug.current,
      category,
      "listed": listed != false,
      name,
      "images": images[defined(asset)] {
        asset,
        crop,
        hotspot,
        "dimensions": asset->metadata.dimensions { width, height },
        "lqip": asset->metadata.lqip
      },
      description,
      "specifications": specifications[] { label, value },
      "variants": variants[] { name, options },
      processRoute
    }
`;

export interface SanityImageField {
  asset: { _ref: string };
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number; width: number; height: number };
  dimensions: { width: number; height: number };
  lqip?: string;
}

export interface ProductRow {
  slug: string;
  category: CategoryId;
  listed: boolean;
  name: Localized;
  images: SanityImageField[];
  description: Partial<Localized<PortableTextBlock[] | null>> | null;
  specifications: { label?: Partial<Localized>; value?: Partial<Localized> }[] | null;
  variants: { name?: Partial<Localized>; options?: Partial<Localized>[] | null }[] | null;
  processRoute: ProcessRoute | null;
}
