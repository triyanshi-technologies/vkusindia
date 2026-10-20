import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { TocNav } from "@/components/ui/toc-nav";
import { privacyPolicy } from "@/content/privacy";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { href } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return pageMetadata({
    locale: lang,
    path: "/privacy",
    title: dict.meta.privacy.title,
    description: dict.meta.privacy.description,
  });
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const policy = privacyPolicy[lang];

  return (
    <>
      <PageHeader
        crumbs={[
          { label: dict.nav.home, href: href(lang) },
          { label: dict.nav.privacy, href: href(lang, "/privacy") },
        ]}
        crumbsLabel={dict.nav.breadcrumbs}
        title={policy.title}
      >
        {policy.note && <p className="text-base">{policy.note}</p>}
      </PageHeader>

      <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <nav aria-label={policy.title} className="hidden lg:col-span-4 lg:block">
          <TocNav
            className="sticky top-28"
            items={policy.sections.map((section, index) => ({
              id: `section-${index + 1}`,
              label: section.heading,
            }))}
          />
        </nav>

        <article className="lg:col-span-8">
          {policy.sections.map((section, index) => (
            <section
              key={section.heading}
              id={`section-${index + 1}`}
              className="prose-content border-b border-line py-8 first:pt-0 last:border-0"
            >
              <h2 className="mt-0!">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </article>
      </Container>
    </>
  );
}
