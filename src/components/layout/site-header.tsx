import Image from "next/image";
import Link from "next/link";

import { company } from "@/content/company";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { href } from "@/i18n/routing";
import { getCategoriesWithProducts } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { buttonClass } from "@/components/ui/button";
import {
  IconArrowRight,
  IconChevronDown,
  IconMail,
  IconPhone,
  IconPin,
} from "@/components/ui/icons";

import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";
import { NavLink } from "./nav-link";

interface SiteHeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export async function SiteHeader({ locale, dict }: SiteHeaderProps) {
  const categories = await getCategoriesWithProducts(locale);
  const [primaryPhone] = company.phones;

  const items = [
    { href: href(locale), label: dict.nav.home, exact: true },
    { href: href(locale, "/about"), label: dict.nav.about },
    { href: href(locale, "/products"), label: dict.nav.products },
    { href: href(locale, "/contact"), label: dict.nav.contact },
  ];
  const productsHref = href(locale, "/products");
  const enquireHref = `${href(locale, "/contact")}#form`;

  const switcherLabels = { groupLabel: dict.nav.language, switchLabel: dict.nav.switchTo };

  return (
    <>
      <TopBar locale={locale} dict={dict} />

      <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-md supports-[backdrop-filter]:bg-paper/85">
        <Container className="flex h-[4.5rem] items-center gap-6 lg:h-20">
          <Link href={href(locale)} className="shrink-0" aria-label={company.brand[locale]}>
            <Image
              src="/images/brand/logo.jpeg"
              alt={`${company.brand[locale]} — ${company.tagline[locale]}`}
              width={236}
              height={105}
              preload
              className="h-11 w-auto lg:h-[3.25rem]"
            />
          </Link>

          <nav aria-label={dict.nav.primary} className="ml-4 hidden h-full lg:block">
            <ul className="flex h-full items-center">
              {items.map((item) =>
                item.href === productsHref ? (
                  <li key={item.href} className="group flex h-full items-center">
                    <NavLink
                      href={item.href}
                      className="relative flex h-full items-center gap-1 px-4 text-[0.9375rem] font-medium text-ink transition-colors hover:text-olive aria-[current=page]:text-olive"
                    >
                      {item.label}
                      <IconChevronDown className="text-sm transition-transform duration-200 group-focus-within:rotate-180 group-hover:rotate-180" />
                    </NavLink>

                    {/* Mega menu: pure CSS (hover + focus-within), no client JS. */}
                    <div className="invisible absolute inset-x-0 top-full border-b border-line bg-paper opacity-0 shadow-[0_24px_40px_-24px_rgb(34_34_34/0.18)] transition-[opacity,visibility] duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      <Container className="grid grid-cols-4 gap-10 py-10">
                        {categories.map((category) => (
                          <div key={category.id}>
                            <Link
                              href={`${productsHref}#${category.id}`}
                              className="font-serif text-xl text-ink transition-colors hover:text-olive"
                            >
                              {category.name}
                            </Link>
                            <ul className="mt-4 space-y-2.5 border-t border-line pt-4">
                              {category.products.map((product) => (
                                <li key={product.slug}>
                                  <Link
                                    href={href(locale, `/products/${product.slug}`)}
                                    className="text-[0.9375rem] leading-snug text-muted-strong transition-colors hover:text-ink"
                                  >
                                    {product.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Container>
                    </div>
                  </li>
                ) : (
                  <li key={item.href} className="flex h-full items-center">
                    <NavLink
                      href={item.href}
                      exact={item.exact}
                      className="flex h-full items-center px-4 text-[0.9375rem] font-medium text-ink transition-colors hover:text-olive aria-[current=page]:text-olive"
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <LanguageSwitcher locale={locale} {...switcherLabels} className="hidden sm:block" />
            <div className="hidden md:block">
              <Link href={enquireHref} className={buttonClass()}>
                {dict.common.enquire}
                <IconArrowRight className="size-4" />
              </Link>
            </div>
            <MobileMenu
              items={items}
              categories={categories.map((c) => ({
                href: `${productsHref}#${c.id}`,
                label: c.name,
              }))}
              contact={{
                phone: primaryPhone.display,
                phoneHref: primaryPhone.href,
                email: company.email,
                whatsappHref: company.whatsappUrl,
              }}
              cta={{ href: enquireHref, label: dict.common.enquire }}
              labels={{ open: dict.nav.openMenu, close: dict.nav.closeMenu, nav: dict.nav.primary }}
            >
              <LanguageSwitcher locale={locale} {...switcherLabels} className="sm:hidden" />
            </MobileMenu>
          </div>
        </Container>
      </header>
    </>
  );
}

function TopBar({ locale, dict }: SiteHeaderProps) {
  return (
    <div className="hidden bg-ink text-[0.8125rem] text-paper/75 md:block">
      <Container className="flex h-10 items-center justify-between gap-6">
        <p className="flex items-center gap-2">
          <span className="hidden text-paper lg:inline">{dict.topBar.welcome}</span>
          <span aria-hidden="true" className="hidden text-paper/30 lg:inline">
            ·
          </span>
          <IconPin className="text-leaf" />
          {company.address.short[locale]}
        </p>
        <ul className="flex items-center gap-6">
          {company.phones.map((phone) => (
            <li key={phone.href}>
              <a
                href={phone.href}
                className="flex items-center gap-2 transition-colors hover:text-paper"
              >
                <IconPhone className="text-leaf" />
                {phone.display}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${company.email}`}
              className="flex items-center gap-2 transition-colors hover:text-paper"
            >
              <IconMail className="text-leaf" />
              {company.email}
            </a>
          </li>
        </ul>
      </Container>
    </div>
  );
}
