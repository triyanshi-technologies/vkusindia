"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type FocusEvent, type MouseEvent } from "react";

import { Container } from "@/components/ui/container";
import { IconChevronDown } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export interface ProductGroup {
  label: string;
  href: string;
  products: { label: string; href: string }[];
}

interface ProductsMenuProps {
  label: string;
  href: string;
  allProductsLabel: string;
  groups: ProductGroup[];
}

/** Desktop mega menu: opens by click or keyboard and closes on outside click, Escape, or navigation. */
export function ProductsMenu({ label, href, allProductsLabel, groups }: ProductsMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const pathname = usePathname();
  const rootRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const active = pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    if (!open) return;
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [open]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onBlur = (event: FocusEvent<HTMLLIElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
  };

  const onPanelClick = (event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("a")) close();
  };

  return (
    <li
      ref={rootRef}
      className="flex h-full items-center"
      onBlur={onBlur}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          close();
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-current={active ? "page" : undefined}
        className="flex h-full items-center gap-1 whitespace-nowrap px-2 text-sm font-medium text-ink transition-colors hover:text-olive aria-[current=page]:text-olive xl:px-4 xl:text-[0.9375rem]"
      >
        {label}
        <IconChevronDown
          className={cn("text-sm transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      <div
        id={panelId}
        onClick={onPanelClick}
        className={cn(
          "absolute inset-x-0 top-full z-50 border-b border-line bg-paper shadow-[0_24px_40px_-24px_rgb(34_34_34/0.18)] transition-[opacity,visibility] duration-200",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <Container className="py-6 xl:py-10">
          <Link href={href} className="text-sm font-medium text-olive hover:text-ink">
            {allProductsLabel}
          </Link>
          {groups.length === 1 ? (
            <ul className="mt-5 grid grid-cols-3 gap-6 xl:gap-10">
              {groups[0]!.products.map((product) => (
                <li key={product.href} className="border-t border-line pt-4">
                  <Link
                    href={product.href}
                    className="font-serif text-xl text-ink transition-colors hover:text-olive"
                  >
                    {product.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-5 grid grid-cols-3 gap-6 xl:gap-10">
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
            </div>
          )}
        </Container>
      </div>
    </li>
  );
}
