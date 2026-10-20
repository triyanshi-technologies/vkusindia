"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

type NavLinkProps = ComponentProps<typeof Link> & { href: string; exact?: boolean };

/** Link that marks itself `aria-current="page"` - style the active state with `aria-[current=page]:`. */
export function NavLink({ href, exact, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
  return <Link href={href} aria-current={active ? "page" : undefined} {...props} />;
}
