"use client";

import Link from "next/link";
import { useId, useState, type FocusEvent, type MouseEvent } from "react";

import { Container } from "@/components/ui/container";
import { IconChevronDown } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

import { NavLink } from "./nav-link";

export interface ProductGroup {
  label: string;
  href: string;
  products: { label: string; href: string }[];
}

interface ProductsMenuProps {
  label: string;
  href: string;
  groups: ProductGroup[];
}

/** Desktop mega menu: opens on hover/focus, closes on link click, Escape or leaving it. */
export function ProductsMenu({ label, href, groups }: ProductsMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const close = () => {
    setOpen(false);
    (document.activeElement as HTMLElement | null)?.blur();
  };

  const onBlur = (event: FocusEvent<HTMLLIElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
  };

  const onPanelClick = (event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("a")) close();
  };

  return (
    <li
      className="flex h-full items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={onBlur}
      onKeyDown={(event) => event.key === "Escape" && close()}
    >
      <NavLink
        href={href}
        onClick={close}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex h-full items-center gap-1 px-4 text-[0.9375rem] font-medium text-ink transition-colors hover:text-olive aria-[current=page]:text-olive"
      >
        {label}
        <IconChevronDown
          className={cn("text-sm transition-transform duration-200", open && "rotate-180")}
        />
      </NavLink>

      <div
        id={panelId}
        onClick={onPanelClick}
        className={cn(
          "absolute inset-x-0 top-full border-b border-line bg-paper shadow-[0_24px_40px_-24px_rgb(34_34_34/0.18)] transition-[opacity,visibility] duration-200",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <Container className="grid grid-cols-3 gap-10 py-10">
          {groups.map((group) => (
            <div key={group.href}>
              <Link
                href={group.href}
                className="font-serif text-xl text-ink transition-colors hover:text-olive"
              >
                {group.label}
              </Link>
              <ul className="mt-4 space-y-2.5 border-t border-line pt-4">
                {group.products.map((product) => (
                  <li key={product.href}>
                    <Link
                      href={product.href}
                      className="text-[0.9375rem] leading-snug text-muted-strong transition-colors hover:text-ink"
                    >
                      {product.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Container>
      </div>
    </li>
  );
}
