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
  const [view, setView] = useState({ first: 1, last: 1, atStart: true, atEnd: false, scrollable: false });

  const step = useCallback(() => {
    const track = trackRef.current!;
    const slide = track.firstElementChild as HTMLElement | null;
    return slide ? slide.offsetWidth + parseFloat(getComputedStyle(track).columnGap) : track.clientWidth;
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Counter reflects the slides fully in view, measured only once scrolling settles.
    const measure = () => {
      const box = track.getBoundingClientRect();
      const visible = Array.from(track.children).flatMap((slide, i) => {
        const rect = slide.getBoundingClientRect();
        return rect.left >= box.left - 2 && rect.right <= box.right + 2 ? [i + 1] : [];
      });
      const nearest = Math.round(track.scrollLeft / step()) + 1;
      const max = track.scrollWidth - track.clientWidth;
      setView({
        first: visible[0] ?? nearest,
        last: visible.at(-1) ?? nearest,
        atStart: track.scrollLeft <= 2,
        atEnd: track.scrollLeft >= max - 2,
        scrollable: max > 2,
      });
    };

    // Safari has no `scrollend` yet, so fall back to a short debounce there.
    let timer = 0;
    const debounced = () => {
      clearTimeout(timer);
      timer = window.setTimeout(measure, 120);
    };
    const [event, onScroll] = "onscrollend" in window ? ["scrollend", measure] : ["scroll", debounced];

    const resize = new ResizeObserver(measure);
    resize.observe(track);
    track.addEventListener(event, onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      resize.disconnect();
      track.removeEventListener(event, onScroll);
    };
  }, [step]);

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
          {view.first === view.last ? view.first : `${view.first}-${view.last}`} / {count}
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
