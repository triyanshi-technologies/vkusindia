import Image from "next/image";
import Link from "next/link";

import { company } from "@/content/company";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { href } from "@/i18n/routing";
import { getCategoriesWithProducts } from "@/lib/content";
import { publicPath } from "@/lib/public-path";
import { Container } from "@/components/ui/container";
import { buttonClass } from "@/components/ui/button";
import { IconArrowRight, IconMail, IconPhone, IconPin } from "@/components/ui/icons";

import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";
import { NavLink } from "./nav-link";
import { ProductsMenu, type ProductGroup } from "./products-menu";

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
  const productGroups: ProductGroup[] = categories.map((category) => ({
    label: category.name,
    href: `${productsHref}#${category.id}`,
    products: category.products.map((product) => ({
      label: product.name,
      href: href(locale, `/products/${product.slug}`),
    })),
  }));

  const switcherLabels = { groupLabel: dict.nav.language, switchLabel: dict.nav.switchTo };

  return (
    <>
      <TopBar locale={locale} dict={dict} />

      <header className="sticky top-0 z-40 border-b border-line bg-paper">
        <Container className="flex h-[4.5rem] items-center gap-3 lg:gap-3 lg:h-20 xl:gap-6">
          <Link href={href(locale)} className="shrink-0" aria-label={company.brand[locale]}>
            <Image
              src={publicPath("/images/brand/logo.jpeg")}
              alt={`${company.brand[locale]} - ${company.tagline[locale]}`}
              width={236}
              height={105}
              unoptimized
              preload
              className="h-11 w-auto rounded-xl lg:h-[3.25rem]"
            />
          </Link>

          <nav aria-label={dict.nav.primary} className="ml-1 hidden h-full lg:block xl:ml-4">
            <ul className="flex h-full items-center">
              {items.map((item) =>
                item.href === productsHref ? (
                  <ProductsMenu
                    key={item.href}
                    label={item.label}
                    href={item.href}
                    allProductsLabel={dict.nav.allProducts}
                    groups={productGroups}
                  />
                ) : (
                  <li key={item.href} className="flex h-full items-center">
                    <NavLink
                      href={item.href}
                      exact={item.exact}
                      className="flex h-full items-center whitespace-nowrap px-2 text-sm font-medium text-ink transition-colors hover:text-olive aria-[current=page]:text-olive xl:px-4 xl:text-[0.9375rem]"
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <LanguageSwitcher locale={locale} {...switcherLabels} className="hidden lg:grid" />
            <div className="hidden lg:block">
              <Link href={enquireHref} className={buttonClass()}>
                {dict.common.enquire}
                <IconArrowRight className="size-4" />
              </Link>
            </div>
            <MobileMenu
              items={items}
              productsHref={productsHref}
              productGroups={productGroups}
              contact={{
                phone: primaryPhone.display,
                phoneHref: primaryPhone.href,
                email: company.email,
                whatsappHref: company.whatsappUrl,
              }}
              cta={{ href: enquireHref, label: dict.common.enquire }}
              labels={{
                open: dict.nav.openMenu,
                close: dict.nav.closeMenu,
                nav: dict.nav.primary,
                allProducts: dict.nav.allProducts,
              }}
            >
              <LanguageSwitcher locale={locale} {...switcherLabels} className="lg:hidden" />
            </MobileMenu>
          </div>
        </Container>
      </header>
    </>
  );
}

function TopBar({ locale, dict }: SiteHeaderProps) {
  return (
    <div className="hidden bg-ink text-[0.8125rem] text-paper/75 xl:block">
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
