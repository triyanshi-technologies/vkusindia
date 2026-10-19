"use client";

import { useState } from "react";

import type { CmsImage as CmsImageData } from "@/content/types";
import { CmsImage } from "@/components/ui/cms-image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: CmsImageData[];
  alt: string;
  /** e.g. "Photo {n}" — label for the thumbnail buttons. */
  thumbLabel: string;
}

/** Main photo with thumbnails underneath (thumbnails only when there is more than one photo). */
export function ProductGallery({ images, alt, thumbLabel }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];
  if (!current) return null;

  return (
    <div>
      <div className="rounded-[2rem] bg-paper p-3 ring-1 ring-line">
        <div className="relative aspect-[3/2] overflow-hidden rounded-[1.5rem] bg-mist">
          <CmsImage
            key={current.url}
            image={current}
            alt={alt}
            fill
            preload={active === 0}
            sizes="(min-width: 1024px) 440px, 92vw"
            className="object-cover"
          />
        </div>
      </div>

      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((image, index) => (
            <li key={image.url}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={thumbLabel.replace("{n}", String(index + 1))}
                aria-current={index === active ? "true" : undefined}
                className={cn(
                  "relative block aspect-[3/2] w-full overflow-hidden rounded-xl bg-mist ring-2 transition-shadow",
                  index === active ? "ring-olive" : "ring-transparent hover:ring-line",
                )}
              >
                <CmsImage image={image} alt="" fill sizes="96px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
