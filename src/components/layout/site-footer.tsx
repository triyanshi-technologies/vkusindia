import { cacheLife } from "next/cache";
import Image from "next/image";
import Link from "next/link";

import { company } from "@/content/company";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { href } from "@/i18n/routing";
import { getCategoriesWithProducts } from "@/lib/content";
import { Container } from "@/components/ui/container";
import {
  IconChevronDown,
  IconMail,
  IconPhone,
  IconPin,
  IconWhatsApp,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface SiteFooterProps {
  locale: Locale;
  dict: Dictionary;
}

const headingClass = "text-sm font-medium tracking-[0.14em] text-paper/45 uppercase";

export async function SiteFooter({ locale, dict }: SiteFooterProps) {
  const categories = await getCategoriesWithProducts(locale);
  const productsHref = href(locale, "/products");

  const productLinks = categories.map((c) => ({ label: c.name, href: `${productsHref}#${c.id}` }));
  const companyLinks = [
    { label: dict.nav.about, href: href(locale, "/about") },
    { label: dict.nav.allProducts, href: productsHref },
    { label: dict.nav.contact, href: href(locale, "/contact") },
    { label: dict.nav.privacy, href: href(locale, "/privacy") },
  ];

  return (
    <footer className="bg-ink text-[0.9375rem] text-paper">
      <Container className="grid py-16 md:grid-cols-2 md:gap-12 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="pb-10 md:pb-0 lg:col-span-4">
          <Link href={href(locale)} className="inline-block">
            <Image
              src="/images/brand/logo.jpeg"
              alt={company.brand[locale]}
              width={236}
              height={105}
              className="h-14 w-auto rounded-xl"
            />
          </Link>
          <p className="mt-6 max-w-xs text-paper/70">{dict.footer.about}</p>
          <p className="mt-6 font-serif text-lg text-leaf italic">{company.tagline[locale]}</p>
        </div>

        <FooterLinks title={dict.footer.products} links={productLinks} className="lg:col-span-3" />
        <FooterLinks
          title={dict.footer.company}
          links={companyLinks}
          className="max-md:border-b max-md:border-paper/10 lg:col-span-2"
        />

        <div className="pt-10 md:pt-0 lg:col-span-3">
          <h2 className={headingClass}>{dict.footer.contacts}</h2>
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

interface FooterLinksProps {
  title: string;
  links: { label: string; href: string }[];
  className?: string;
}

/** Accordion on mobile, plain list from tablet up. */
function FooterLinks({ title, links, className }: FooterLinksProps) {
  const list = (
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className="text-paper/70 transition-colors hover:text-leaf">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <nav aria-label={title} className={cn("max-md:border-t max-md:border-paper/10", className)}>
      <details className="group md:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between py-4 [&::-webkit-details-marker]:hidden">
          <span className={headingClass}>{title}</span>
          <IconChevronDown className="text-paper/45 transition-transform duration-200 group-open:rotate-180" />
        </summary>
        <div className="pb-5">{list}</div>
      </details>
      <div className="hidden md:block">
        <h2 className={headingClass}>{title}</h2>
        <div className="mt-5">{list}</div>
      </div>
    </nav>
  );
}

/** Cached so the footer stays part of the static shell while the year still rolls over. */
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
