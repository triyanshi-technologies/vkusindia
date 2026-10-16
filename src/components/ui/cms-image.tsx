"use client";

import Image, { type ImageLoader, type ImageProps } from "next/image";

import type { CmsImage as CmsImageData } from "@/content/types";

/**
 * Sanity's image CDN resizes and picks the best format itself (`auto=format`
 * serves AVIF/WebP), so images skip Next's optimizer entirely. `fit=max`
 * never upscales a small source photo.
 */
const sanityLoader: ImageLoader = ({ src, width, quality }) => {
  const params = new URLSearchParams({
    w: String(width),
    q: String(quality ?? 75),
    fit: "max",
    auto: "format",
  });
  return `${src}${src.includes("?") ? "&" : "?"}${params}`;
};

type CmsImageProps = Omit<ImageProps, "src" | "loader" | "width" | "height" | "placeholder"> & {
  image: CmsImageData;
};

export function CmsImage({ image, alt, fill, ...props }: CmsImageProps) {
  return (
    <Image
      loader={sanityLoader}
      src={image.url}
      alt={alt}
      {...(fill ? { fill } : { width: image.width, height: image.height })}
      {...(image.lqip && { placeholder: "blur" as const, blurDataURL: image.lqip })}
      {...props}
    />
  );
}
