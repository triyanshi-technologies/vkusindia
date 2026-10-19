import type { Metadata, Viewport } from "next";
import { Golos_Text, Lora } from "next/font/google";
import { notFound } from "next/navigation";

import "../globals.css";

import { CookieNotice } from "@/components/layout/cookie-notice";
import { FloatingContacts } from "@/components/layout/floating-contacts";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/config/site";
import { company } from "@/content/company";
import { LOCALES, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { href } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo";

// Self-hosted at build time by next/font — no requests to Google from the browser.
const sans = Golos_Text({
  subsets: ["latin", "cyrillic"],
  variable: "--font-golos",
  display: "swap",
});

const serif = Lora({
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: dict.meta.home.title, template: dict.meta.titleTemplate },
    description: dict.meta.home.description,
    applicationName: dict.meta.siteName,
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const organization = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: company.brand[lang],
        alternateName: [company.tradeName, company.brand[lang === "ru" ? "en" : "ru"]],
        legalName: company.legalName.ru,
        url: SITE_URL,
        logo: absoluteUrl("/images/brand/logo.jpeg"),
        email: company.email,
        telephone: company.phones.map((p) => p.display),
        address: {
          "@type": "PostalAddress",
          streetAddress: company.address.street[lang],
          addressLocality: company.address.city[lang],
          postalCode: company.address.postalCode,
          addressCountry: company.address.countryCode,
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: company.phones[0].display,
          email: company.email,
          availableLanguage: ["Russian", "English"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: company.brand[lang],
        inLanguage: lang,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <html lang={lang} className={`${sans.variable} ${serif.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-ink px-5 py-3 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {dict.nav.skipToContent}
        </a>

        <SiteHeader locale={lang} dict={dict} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter locale={lang} dict={dict} />

        <FloatingContacts
          labels={{ whatsapp: dict.common.writeWhatsapp, call: dict.common.callUs }}
        />
        <CookieNotice
          text={dict.cookie.text}
          linkLabel={dict.cookie.link}
          linkHref={href(lang, "/privacy")}
          acceptLabel={dict.cookie.accept}
        />
        <JsonLd data={organization} />
      </body>
    </html>
  );
}
