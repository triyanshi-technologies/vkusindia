"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type MouseEvent, type ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { buttonClass } from "@/components/ui/button";
import {
  IconChevronDown,
  IconClose,
  IconMail,
  IconMenu,
  IconPhone,
  IconWhatsApp,
} from "@/components/ui/icons";

import { NavLink } from "./nav-link";
import type { ProductGroup } from "./products-menu";

interface MobileMenuProps {
  items: { href: string; label: string; exact?: boolean }[];
  /** The nav item rendered as an accordion of `productGroups`. */
  productsHref: string;
  productGroups: ProductGroup[];
  contact: { phone: string; phoneHref: string; email: string; whatsappHref: string };
  cta: { href: string; label: string };
  labels: { open: string; close: string; nav: string; allProducts: string };
  /** Rendered inside the panel (e.g. the language switcher). */
  children?: ReactNode;
}

const topLinkClass =
  "block py-4 font-serif text-[1.75rem] leading-tight text-ink aria-[current=page]:text-olive";

export function MobileMenu({
  items,
  productsHref,
  productGroups,
  contact,
  cta,
  labels,
  children,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [panelTop, setPanelTop] = useState(0);
  const panelId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    const onViewportChange = () => {
      const header = menuButtonRef.current?.closest("header");
      setPanelTop(header?.getBoundingClientRect().bottom ?? 0);
    };
    const root = document.documentElement;
    root.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onViewportChange);
    window.addEventListener("scroll", onViewportChange, true);
    return () => {
      root.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onViewportChange);
      window.removeEventListener("scroll", onViewportChange, true);
    };
  }, [open]);

  const closeOnLink = (event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("a")) setOpen(false);
  };

  return (
    <>
      <button
        ref={menuButtonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          if (!open) {
            const header = menuButtonRef.current?.closest("header");
            setPanelTop(header?.getBoundingClientRect().bottom ?? 0);
          }
          setOpen((value) => !value);
        }}
        className="grid size-11 place-items-center rounded-full border border-line text-xl text-ink transition-colors hover:border-ink lg:hidden"
      >
        {open ? <IconClose /> : <IconMenu />}
        <span className="sr-only">{open ? labels.close : labels.open}</span>
      </button>

      <div
        id={panelId}
        hidden={!open}
        onClick={closeOnLink}
        style={{ top: panelTop }}
        className="fixed inset-x-0 bottom-0 z-30 overflow-y-auto border-t border-line bg-paper lg:hidden"
      >
        <Container className="flex min-h-full flex-col py-6">
          <nav aria-label={labels.nav}>
            <ul className="divide-y divide-line">
              {items.map((item) => (
                <li key={item.href}>
                  {item.href === productsHref ? (
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-serif text-[1.75rem] leading-tight text-ink [&::-webkit-details-marker]:hidden">
                        {item.label}
                        <IconChevronDown className="text-xl transition-transform duration-200 group-open:rotate-180" />
                      </summary>
                      <div className="space-y-5 pb-5">
                        <Link
                          href={productsHref}
                          className="block text-[0.9375rem] font-medium text-olive"
                        >
                          {labels.allProducts}
                        </Link>
                        {productGroups.length === 1 ? (
                          <ul className="space-y-3 border-l border-line pl-4">
                            {productGroups[0]!.products.map((product) => (
                              <li key={product.href}>
                                <Link href={product.href} className="font-serif text-lg text-ink">
                                  {product.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          productGroups.map((group) => (
                            <div key={group.href}>
                              <Link href={group.href} className="font-serif text-lg text-ink">
                                {group.label}
                              </Link>
                              <ul className="mt-2 space-y-2 border-l border-line pl-4">
                                {group.products.map((product) => (
                                  <li key={product.href}>
                                    <Link
                                      href={product.href}
                                      className="text-[0.9375rem] text-muted-strong"
                                    >
                                      {product.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))
                        )}
                      </div>
                    </details>
                  ) : (
                    <NavLink href={item.href} exact={item.exact} className={topLinkClass}>
                      {item.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3 text-[0.9375rem]">
            <a href={contact.phoneHref} className="flex items-center gap-3">
              <IconPhone className="text-olive" /> {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-3">
              <IconMail className="text-olive" /> {contact.email}
            </a>
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3"
            >
              <IconWhatsApp className="text-olive" /> WhatsApp
            </a>
            <div className="flex items-center justify-between gap-4 pt-4">
              {children}
              <Link href={cta.href} className={buttonClass({ className: "flex-1" })}>
                {cta.label}
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
