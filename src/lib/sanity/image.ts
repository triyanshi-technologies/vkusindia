import "server-only";

import { createImageUrlBuilder } from "@sanity/image-url";

import type { CmsImage } from "@/content/types";

import { sanityConfig } from "./env";
import type { SanityImageField } from "./queries";

const builder = createImageUrlBuilder({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
});

/**
 * Resolves a Sanity image field to a base CDN URL (crop applied) plus its real
 * dimensions. Sizing/format params are added per request by the client-side loader.
 */
export function toCmsImage(image: SanityImageField): CmsImage {
  const { width, height } = image.dimensions;
  const crop = image.crop ?? { top: 0, bottom: 0, left: 0, right: 0 };

  return {
    url: builder.image(image).url(),
    width: Math.round(width * (1 - crop.left - crop.right)),
    height: Math.round(height * (1 - crop.top - crop.bottom)),
    lqip: image.lqip,
  };
}

/** Absolute URL at a fixed width - for Open Graph and structured data. */
export function cmsImageUrl(image: CmsImage, width = 1200): string {
  return withParams(image.url, { w: width, fit: "max", auto: "format" });
}

export function withParams(url: string, params: Record<string, string | number>): string {
  const query = new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)]));
  return `${url}${url.includes("?") ? "&" : "?"}${query}`;
}
