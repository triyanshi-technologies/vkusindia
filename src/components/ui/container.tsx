import type { ComponentProps, ElementType } from "react";

import { cn } from "@/lib/utils";

type ContainerProps<T extends ElementType> = { as?: T } & ComponentProps<T>;

export function Container<T extends ElementType = "div">({
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Tag = as ?? "div";
  return (
    <Tag
      className={cn("mx-auto w-full max-w-[84rem] px-4 sm:px-6 lg:px-10", className)}
      {...props}
    />
  );
}
