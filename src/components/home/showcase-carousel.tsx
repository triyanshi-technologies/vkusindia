"use client";

import { Children, useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";

import { IconArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface ShowcaseCarouselProps {
  /** `<li>` slides; their widths decide how many are visible. */
  children: ReactNode;
  labels: { region: string; prev: string; next: string };
  className?: string;
}

const arrowClass =
  "grid size-10 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-35";

/** Native scroll-snap track; arrows and counter are an enhancement on top of swipe/scroll. */
export function ShowcaseCarousel({ children, labels, className }: ShowcaseCarouselProps) {
  const trackId = useId();
  const trackRef = useRef<HTMLUListElement>(null);
  const count = Children.count(children);
  const [view, setView] = useState({ index: 1, atStart: true, atEnd: false, scrollable: false });

  const step = useCallback(() => {
    const track = trackRef.current!;
    const slide = track.firstElementChild as HTMLElement | null;
    return slide ? slide.offsetWidth + parseFloat(getComputedStyle(track).columnGap) : track.clientWidth;
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = track.scrollWidth - track.clientWidth;
        const atEnd = track.scrollLeft >= max - 2;
        setView({
          index: atEnd ? count : Math.round(track.scrollLeft / step()) + 1,
          atStart: track.scrollLeft <= 2,
          atEnd,
          scrollable: max > 2,
        });
      });
    };
    const resize = new ResizeObserver(update);
    resize.observe(track);
    track.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      track.removeEventListener("scroll", update);
    };
  }, [count, step]);

  const scroll = (direction: 1 | -1) => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    trackRef.current?.scrollBy({ left: direction * step(), behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <ul
        ref={trackRef}
        id={trackId}
        aria-label={labels.region}
        className="-mx-4 flex min-h-0 flex-1 snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 scrollbar-none sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:scroll-px-0 md:px-0 lg:gap-6"
      >
        {children}
      </ul>

      {/* Space is reserved before hydration so the fixed-height layout never jumps.
          Left-aligned so the fixed contact buttons in the corner never cover it. */}
      <div className={cn("mt-4 flex items-center gap-3 short:mt-3", !view.scrollable && "invisible")}>
        <button
          type="button"
          onClick={() => scroll(-1)}
          disabled={view.atStart}
          aria-label={labels.prev}
          aria-controls={trackId}
          className={arrowClass}
        >
          <IconArrowRight className="rotate-180" />
        </button>
        <p className="min-w-12 text-center text-sm text-muted-strong tabular-nums">
          {view.index} / {count}
        </p>
        <button
          type="button"
          onClick={() => scroll(1)}
          disabled={view.atEnd}
          aria-label={labels.next}
          aria-controls={trackId}
          className={arrowClass}
        >
          <IconArrowRight />
        </button>
      </div>
    </div>
  );
}
