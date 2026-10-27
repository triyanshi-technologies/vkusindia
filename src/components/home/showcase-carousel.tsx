"use client";

import { Children, useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";

import { IconArrowRight } from "@/components/ui/icons";
import { interpolate } from "@/i18n/format";
import { cn } from "@/lib/utils";

interface ShowcaseCarouselProps {
  /** `<li>` slides; their widths decide how many are visible. */
  children: ReactNode;
  /** `slide` takes `{n}` and `{total}` placeholders. */
  labels: { region: string; prev: string; next: string; slide: string };
  className?: string;
}

const MAX_DOTS = 5;

const arrowClass =
  "grid size-10 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-35";

/** Native scroll-snap track; arrows and dots are an enhancement on top of swipe/scroll. */
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
    // Active dots are the slides fully in view, measured only once scrolling settles.
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

  const behavior = (): ScrollBehavior =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

  const scroll = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({ left: direction * step(), behavior: behavior() });
  };

  /** Brings slide `n` (1-based) to the snap start; the browser clamps at the end. */
  const goTo = (n: number) => {
    const track = trackRef.current;
    const slide = track?.children[n - 1];
    if (!track || !slide) return;
    const offset =
      slide.getBoundingClientRect().left -
      track.getBoundingClientRect().left -
      (parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0);
    track.scrollTo({ left: track.scrollLeft + offset, behavior: behavior() });
  };

  // At most MAX_DOTS dots: a window that keeps the visible slides centred, clamped at both ends.
  const centre = Math.round((view.first + view.last) / 2);
  const windowStart = Math.min(
    Math.max(1, centre - Math.floor(MAX_DOTS / 2)),
    Math.max(1, count - MAX_DOTS + 1),
  );
  const windowEnd = Math.min(count, windowStart + MAX_DOTS - 1);
  const dots = Array.from({ length: windowEnd - windowStart + 1 }, (_, i) => windowStart + i);

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
        <ol className="flex items-center">
          {dots.map((n) => {
            const active = n >= view.first && n <= view.last;
            const hint = (n === windowStart && n > 1) || (n === windowEnd && n < count);
            return (
              <li key={n}>
                <button
                  type="button"
                  onClick={() => goTo(n)}
                  aria-label={interpolate(labels.slide, { n, total: count })}
                  aria-current={active ? "true" : undefined}
                  aria-controls={trackId}
                  className="group/dot grid h-8 place-items-center px-1"
                >
                  <span
                    className={cn(
                      "block h-2 rounded-full transition-all duration-300 ease-soft",
                      active ? "w-6 bg-ink" : "w-2 bg-ink/20 group-hover/dot:bg-ink/45",
                      hint && !active && "scale-[0.6]",
                    )}
                  />
                </button>
              </li>
            );
          })}
        </ol>
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
