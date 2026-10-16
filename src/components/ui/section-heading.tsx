import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  id?: string;
  as?: "h1" | "h2";
  className?: string;
  children?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  id,
  as: Tag = "h2",
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag
        id={id}
        className={cn(
          "font-serif tracking-tight text-ink",
          eyebrow && "mt-4",
          Tag === "h1"
            ? "text-[2.375rem] leading-[1.08] sm:text-5xl lg:text-[3.5rem]"
            : "text-3xl leading-[1.15] sm:text-[2.5rem]",
        )}
      >
        {title}
      </Tag>
      {children && <div className="mt-5 text-lg text-muted-strong">{children}</div>}
    </div>
  );
}
