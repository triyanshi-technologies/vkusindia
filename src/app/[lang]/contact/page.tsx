import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/ui/container";
import {
  IconArrowUpRight,
  IconMail,
  IconPhone,
  IconPin,
  IconUser,
  IconWhatsApp,
} from "@/components/ui/icons";
import { PageHeader } from "@/components/ui/page-header";
import { company, mapLinks } from "@/content/company";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { href } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return pageMetadata({
    locale: lang,
    path: "/contact",
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
  });
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.contact;
  const maps = mapLinks(company.address.mapQuery);

  const cardClass = "rounded-3xl border border-line p-6 sm:p-7";
  const labelClass = "text-sm font-medium tracking-[0.14em] text-muted-strong uppercase";
  const linkClass =
    "inline-flex items-center gap-3 text-lg text-ink transition-colors hover:text-olive";

  return (
    <>
      <PageHeader
        crumbs={[
          { label: dict.nav.home, href: href(lang) },
          { label: dict.nav.contact, href: href(lang, "/contact") },
        ]}
        crumbsLabel={dict.nav.breadcrumbs}
        eyebrow={t.eyebrow}
        title={t.title}
      >
        <p>{t.intro}</p>
      </PageHeader>

      <section className="py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-4 lg:col-span-5">
            <div className={cardClass}>
              <h2 className={labelClass}>{dict.common.phone}</h2>
              <ul className="mt-4 space-y-3">
                {company.phones.map((phone) => (
                  <li key={phone.href}>
                    <a href={phone.href} className={linkClass}>
                      <IconPhone className="text-olive" /> {phone.display}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={company.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    <IconWhatsApp className="text-olive" /> {dict.common.writeWhatsapp}
                  </a>
                </li>
              </ul>
            </div>

            <div className={cardClass}>
              <h2 className={labelClass}>{dict.common.email}</h2>
              <ul className="mt-4 space-y-3">
                {[company.email, ...company.extraEmails].map((email) => (
                  <li key={email}>
                    <a href={`mailto:${email}`} className={linkClass}>
                      <IconMail className="text-olive" /> {email}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-line pt-4 text-[0.9375rem] text-muted-strong">
                {t.orders}:{" "}
                <a
                  href={`mailto:${company.ordersEmail}`}
                  className="text-ink underline underline-offset-2 hover:text-olive"
                >
                  {company.ordersEmail}
                </a>
              </p>
            </div>

            <div className={cardClass}>
              <h2 className={labelClass}>{t.office}</h2>
              <address className="mt-4 flex gap-3 text-lg leading-relaxed text-ink not-italic">
                <IconPin className="mt-1.5 shrink-0 text-olive" />
                {company.address.full[lang]}
              </address>
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  { href: maps.yandex, label: dict.common.yandexMaps },
                  { href: maps.google, label: dict.common.googleMaps },
                ].map((map) => (
                  <a
                    key={map.href}
                    href={map.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-1.5 rounded-full bg-mist px-4 text-[0.9375rem] text-ink transition-colors hover:bg-leaf"
                  >
                    {map.label}
                    <IconArrowUpRight className="size-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className={cardClass}>
              <h2 className={labelClass}>{t.people}</h2>
              <ul className="mt-4 space-y-4">
                {company.people.map((person) => (
                  <li key={person.name.en} className="flex items-center gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mist text-lg text-olive">
                      <IconUser />
                    </span>
                    <span>
                      <span className="block font-medium text-ink">{person.name[lang]}</span>
                      <span className="block text-sm text-muted-strong">{person.role[lang]}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div id="form" className="scroll-mt-28 lg:col-span-7">
            <div className="rounded-[2rem] bg-mist p-6 sm:p-10 lg:sticky lg:top-28 lg:p-12">
              <h2 className="font-serif text-3xl text-ink">{t.formTitle}</h2>
              <div className="mt-8">
                <ContactForm
                  locale={lang}
                  labels={dict.form}
                  privacyHref={href(lang, "/privacy")}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
