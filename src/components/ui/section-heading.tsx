import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  id?: string;
  as?: "h1" | "h2";
  /** `dark` for headings placed on a dark surface. */
  tone?: "light" | "dark";
  className?: string;
  children?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  id,
  as: Tag = "h2",
  tone = "light",
  className,
  children,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && <p className={cn("eyebrow", dark && "text-paper/60")}>{eyebrow}</p>}
      <Tag
        id={id}
        className={cn(
          "font-serif tracking-tight",
          dark ? "text-paper" : "text-ink",
          eyebrow && "mt-4",
          Tag === "h1"
            ? "text-[2.375rem] leading-[1.08] sm:text-5xl lg:text-[3.5rem]"
            : "text-3xl leading-[1.15] sm:text-[2.5rem]",
        )}
      >
        {title}
      </Tag>
      {children && (
        <div className={cn("mt-5 text-lg", dark ? "text-paper/70" : "text-muted-strong")}>
          {children}
        </div>
      )}
    </div>
  );
}
