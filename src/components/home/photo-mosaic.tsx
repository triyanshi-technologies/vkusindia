import type { CmsImage as CmsImageData } from "@/content/types";
import { CmsImage } from "@/components/ui/cms-image";
import { cn } from "@/lib/utils";

interface PhotoMosaicProps {
  photos: { image: CmsImageData; alt: string }[];
  className?: string;
}

/** 2×2 grid of product photos, offset like prints laid on a table. */
export function PhotoMosaic({ photos, className }: PhotoMosaicProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:gap-4", className)}>
      {photos.slice(0, 4).map((photo, index) => (
        <div
          key={photo.image.url}
          className={cn(
            "relative aspect-[3/2] overflow-hidden rounded-2xl bg-mist",
            index % 2 === 1 && "translate-y-8",
          )}
        >
          <CmsImage
            image={photo.image}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 270px, 46vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
