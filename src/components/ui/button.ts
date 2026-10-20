import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "outline" | "inverse";
type Size = "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2.5 rounded-full font-medium whitespace-nowrap transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-leaf text-ink hover:bg-olive hover:text-paper",
  dark: "bg-ink text-paper hover:bg-olive",
  outline: "border border-ink bg-ink text-paper hover:bg-paper hover:text-ink",
  inverse: "border border-paper/30 text-paper hover:border-paper hover:bg-paper hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-13 px-7 text-base",
};

/**
 * Class builder shared by <Link>, <a> and <button> so every CTA looks identical.
 * `className` must not change `display` (the base is `inline-flex`) — toggle visibility on a wrapper.
 */
export function buttonClass({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

/** Arrow that nudges right on hover — pair with an icon inside a buttonClass element. */
export const buttonArrowClass =
  "size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5";
