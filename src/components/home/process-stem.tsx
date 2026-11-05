"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { PROCESS_READING_LINE } from "@/lib/scroll";
import { cn } from "@/lib/utils";

/**
 * One continuous stem from the first chapter marker to the last. It fills up to the reading
 * line and tags each chapter `data-state="upcoming|passed|current"` for the marker styles.
 * Without JS the full stem shows and no chapter is dimmed.
 */
export function ProcessStem({ children, className }: { children: ReactNode; className?: string }) {
  const listRef = useRef<HTMLOListElement>(null);
  const trackRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!list || !track || !fill) return;

    const chapters = Array.from(list.querySelectorAll<HTMLElement>(":scope > li"));
    const markers = chapters.map((li) => li.querySelector<HTMLElement>("[data-marker]"));
    if (chapters.length < 2 || markers.some((m) => !m)) return;
    const centre = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return r.top + r.height / 2;
    };

    // Stem runs exactly from the first marker's centre to the last one's (the cup).
    const layout = () => {
      const top = centre(markers[0]!) - list.getBoundingClientRect().top;
      const height = centre(markers.at(-1)!) - centre(markers[0]!);
      for (const line of [track, fill]) {
        line.style.top = `${top}px`;
        line.style.height = `${height}px`;
        line.style.bottom = "auto";
      }
    };

    const update = () => {
      const reading = window.innerHeight * PROCESS_READING_LINE;
      const centres = markers.map((m) => centre(m!));
      const span = centres.at(-1)! - centres[0]!;
      const progress = Math.min(1, Math.max(0, (reading - centres[0]!) / span));
      fill.style.transform = `scaleY(${progress})`;
      const current = centres.findLastIndex((c) => c <= reading);
      chapters.forEach((li, i) => {
        li.dataset.state = i < current ? "passed" : i === current ? "current" : "upcoming";
      });
    };

    let frame = 0;
    let visible = false;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const onScroll = () => visible && schedule();

    // Only track scrolling while the section is near the screen.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry!.isIntersecting;
      schedule();
    }, { rootMargin: "50% 0px" });
    const ro = new ResizeObserver(() => {
      layout();
      schedule();
    });
    io.observe(list);
    ro.observe(list);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <ol ref={listRef} className={cn("relative", className)}>
      <span
        ref={trackRef}
        aria-hidden="true"
        className="absolute top-5 bottom-5 left-5 w-px -translate-x-1/2 bg-line"
      />
      <span
        ref={fillRef}
        aria-hidden="true"
        className="absolute top-5 bottom-5 left-5 w-0.5 origin-top -translate-x-1/2 rounded-full bg-leaf transition-transform duration-150 ease-out motion-reduce:transition-none"
      />
      {children}
    </ol>
  );
}
