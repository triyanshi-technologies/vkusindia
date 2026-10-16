"use client";

import Link from "next/link";
import { useEffect, useId, useState, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";

import { Container } from "@/components/ui/container";
import { buttonClass } from "@/components/ui/button";
import { IconClose, IconMail, IconMenu, IconPhone, IconWhatsApp } from "@/components/ui/icons";

import { NavLink } from "./nav-link";

interface MobileMenuProps {
  items: { href: string; label: string; exact?: boolean }[];
  categories: { href: string; label: string }[];
  contact: { phone: string; phoneHref: string; email: string; whatsappHref: string };
  cta: { href: string; label: string };
  labels: { open: string; close: string; nav: string };
  /** Rendered inside the panel (e.g. the language switcher, which needs server-bound props). */
  children?: ReactNode;
}

export function MobileMenu({ items, categories, contact, cta, labels, children }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    const root = document.documentElement;
    root.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      root.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Close when any link inside the panel is followed.
  const closeOnLink = (event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("a")) setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="grid size-11 place-items-center rounded-full border border-line text-xl text-ink transition-colors hover:border-ink lg:hidden"
      >
        {open ? <IconClose /> : <IconMenu />}
        <span className="sr-only">{open ? labels.close : labels.open}</span>
      </button>

      {/* Portalled to <body>: the header's backdrop-filter would otherwise trap this fixed panel. */}
      {open &&
        createPortal(
          <div
            id={panelId}
            onClick={closeOnLink}
            className="fixed inset-x-0 top-[4.5rem] bottom-0 z-30 overflow-y-auto border-t border-line bg-paper lg:hidden"
          >
            <Container className="flex min-h-full flex-col py-6">
              <nav aria-label={labels.nav}>
                <ul className="divide-y divide-line">
                  {items.map((item) => (
                    <li key={item.href}>
                      <NavLink
                        href={item.href}
                        exact={item.exact}
                        className="block py-4 font-serif text-[1.75rem] leading-tight text-ink aria-[current=page]:text-olive"
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <li key={category.href}>
                      <Link
                        href={category.href}
                        className="inline-flex h-9 items-center rounded-full bg-mist px-4 text-sm text-ink"
                      >
                        {category.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto space-y-3 pt-10 text-[0.9375rem]">
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
          </div>,
          document.body,
        )}
    </>
  );
}
