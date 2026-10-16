import type { PortableTextBlock } from "@portabletext/react";

import type { CategoryId, Localized } from "@/content/types";

/**
 * All products in one request (18 small documents): every page derives what it
 * needs from this single cached result, so there is one cache entry to refresh.
 */
export const PRODUCTS_QUERY = /* groq */ `
  *[_type == "product" && defined(slug.current) && defined(image.asset)]
    | order(orderRank asc, name.ru asc) {
      "slug": slug.current,
      category,
      featured,
      vegetarian,
      name,
      summary,
      image {
        asset,
        crop,
        hotspot,
        "dimensions": asset->metadata.dimensions { width, height },
        "lqip": asset->metadata.lqip
      },
      specs[] { label, value },
      body
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
  featured: boolean | null;
  vegetarian: boolean | null;
  name: Localized;
  summary: Localized;
  image: SanityImageField;
  specs: { label: Localized; value: Localized }[] | null;
  body: Localized<PortableTextBlock[] | null> | null;
}
