import { cacheLife } from "next/cache";
import Image from "next/image";
import Link from "next/link";

import { company } from "@/content/company";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { href } from "@/i18n/routing";
import { getCategoriesWithProducts } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { IconMail, IconPhone, IconPin, IconWhatsApp } from "@/components/ui/icons";

interface SiteFooterProps {
  locale: Locale;
  dict: Dictionary;
}

export async function SiteFooter({ locale, dict }: SiteFooterProps) {
  const categories = await getCategoriesWithProducts(locale);
  const linkClass = "text-paper/70 transition-colors hover:text-leaf";

  return (
    <footer className="bg-ink text-[0.9375rem] text-paper">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-4">
          <Link href={href(locale)} className="inline-block rounded-2xl bg-paper px-4 py-3">
            <Image
              src="/images/brand/logo.jpeg"
              alt={company.brand[locale]}
              width={236}
              height={105}
              className="h-12 w-auto"
            />
          </Link>
          <p className="mt-6 max-w-xs text-paper/70">{dict.footer.about}</p>
          <p className="mt-6 font-serif text-lg text-leaf italic">{company.tagline[locale]}</p>
        </div>

        <nav aria-labelledby="footer-products" className="lg:col-span-3">
          <h2
            id="footer-products"
            className="text-sm font-medium tracking-[0.14em] text-paper/45 uppercase"
          >
            {dict.footer.products}
          </h2>
          <ul className="mt-5 space-y-3">
            {categories.map((category) => (
              <li key={category.id}>
                <Link href={`${href(locale, "/products")}#${category.id}`} className={linkClass}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-company" className="lg:col-span-2">
          <h2
            id="footer-company"
            className="text-sm font-medium tracking-[0.14em] text-paper/45 uppercase"
          >
            {dict.footer.company}
          </h2>
          <ul className="mt-5 space-y-3">
            <li>
              <Link href={href(locale, "/about")} className={linkClass}>
                {dict.nav.about}
              </Link>
            </li>
            <li>
              <Link href={href(locale, "/products")} className={linkClass}>
                {dict.nav.allProducts}
              </Link>
            </li>
            <li>
              <Link href={href(locale, "/contact")} className={linkClass}>
                {dict.nav.contact}
              </Link>
            </li>
            <li>
              <Link href={href(locale, "/privacy")} className={linkClass}>
                {dict.nav.privacy}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="text-sm font-medium tracking-[0.14em] text-paper/45 uppercase">
            {dict.footer.contacts}
          </h2>
          <address className="mt-5 space-y-3.5 not-italic">
            {company.phones.map((phone) => (
              <a
                key={phone.href}
                href={phone.href}
                className="flex items-center gap-3 transition-colors hover:text-leaf"
              >
                <IconPhone className="shrink-0 text-leaf" /> {phone.display}
              </a>
            ))}
            <a
              href={company.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 transition-colors hover:text-leaf"
            >
              <IconWhatsApp className="shrink-0 text-leaf" /> WhatsApp
            </a>
            <a
              href={`mailto:${company.email}`}
              className="flex items-center gap-3 transition-colors hover:text-leaf"
            >
              <IconMail className="shrink-0 text-leaf" /> {company.email}
            </a>
            <p className="flex gap-3 text-paper/70">
              <IconPin className="mt-1 shrink-0 text-leaf" />
              <span>{company.address.full[locale]}</span>
            </p>
          </address>
        </div>
      </Container>

      <div className="border-t border-paper/10">
        <Container className="flex flex-col gap-2 py-6 text-[0.8125rem] text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {company.brand[locale]}. {dict.footer.rights}
          </p>
          <p>{company.legalName[locale]}</p>
        </Container>
      </div>
    </footer>
  );
}

/** Cached so the footer stays part of the static shell while the year still rolls over. */
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
