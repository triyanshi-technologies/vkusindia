import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ContactBand } from "@/components/home/contact-band";
import { Principles } from "@/components/home/principles";
import { Container } from "@/components/ui/container";
import { IconCheck, IconUser } from "@/components/ui/icons";
import { PageHeader } from "@/components/ui/page-header";
import { company } from "@/content/company";
import { about, heroImages, welcome } from "@/content/pages";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { href } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return pageMetadata({
    locale: lang,
    path: "/about",
    title: dict.meta.about.title,
    description: dict.meta.about.description,
  });
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <PageHeader
        crumbs={[
          { label: dict.nav.home, href: href(lang) },
          { label: dict.nav.about, href: href(lang, "/about") },
        ]}
        crumbsLabel={dict.nav.breadcrumbs}
        eyebrow={dict.about.eyebrow}
        title={dict.about.title}
      >
        <p>{welcome[lang]}</p>
      </PageHeader>

      <section className="py-20 lg:py-28">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="prose-content text-lg">
              <p>{about.intro[lang]}</p>
              <p>{about.partnership[lang]}</p>
            </div>

            <h2 className="mt-12 font-serif text-2xl text-ink">{dict.about.rangeTitle}</h2>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {about.range[lang].map((line) => (
                <li key={line} className="flex items-center gap-4 py-4 text-lg">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-leaf/25 text-olive">
                    <IconCheck className="size-4" />
                  </span>
                  {line}
                </li>
              ))}
            </ul>

            <p className="mt-12 max-w-xl border-l-2 border-leaf pl-6 font-serif text-2xl leading-relaxed text-ink italic">
              {about.closing[lang]}
            </p>
          </div>

          <aside className="space-y-8 lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-mist">
              <Image
                src={heroImages.inset.src}
                alt={heroImages.inset.alt[lang]}
                fill
                sizes="(min-width: 1024px) 480px, 92vw"
                className="object-cover"
              />
            </div>

            <div className="rounded-3xl border border-line p-7">
              <h2 className="font-serif text-xl text-ink">{dict.about.teamTitle}</h2>
              <ul className="mt-5 space-y-4">
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

            <div className="rounded-3xl border border-line p-7">
              <h2 className="font-serif text-xl text-ink">{dict.about.legalTitle}</h2>
              <dl className="mt-4 space-y-3 text-[0.9375rem]">
                <div>
                  <dt className="text-muted-strong">{company.tradeName}</dt>
                  <dd className="text-ink">{company.legalName[lang]}</dd>
                </div>
                <div>
                  <dt className="text-muted-strong">{dict.common.address}</dt>
                  <dd className="text-ink">{company.address.full[lang]}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </Container>
      </section>

      <Principles
        locale={lang}
        eyebrow={dict.home.approachEyebrow}
        title={dict.home.approachTitle}
      />
      <div className="pt-20 lg:pt-28">
        <ContactBand locale={lang} dict={dict} />
      </div>
    </>
  );
}
