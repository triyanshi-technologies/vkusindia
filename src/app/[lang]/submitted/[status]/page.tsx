import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { buttonClass } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { IconCheck, IconClose } from "@/components/ui/icons";
import { company } from "@/content/company";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { href } from "@/i18n/routing";

/**
 * Landing page for form posts made without JavaScript - the API redirects here.
 * With JS enabled, forms show inline feedback and never reach this page.
 */
const STATUSES = ["success", "error"] as const;
type Status = (typeof STATUSES)[number];
const isStatus = (value: string): value is Status =>
  (STATUSES as readonly string[]).includes(value);

export function generateStaticParams() {
  return STATUSES.map((status) => ({ status }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/submitted/[status]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.meta.submitted.title, robots: { index: false, follow: false } };
}

export default async function SubmittedPage({ params }: PageProps<"/[lang]/submitted/[status]">) {
  const { lang, status } = await params;
  if (!isLocale(lang) || !isStatus(status)) notFound();
  const dict = await getDictionary(lang);
  const ok = status === "success";

  return (
    <Container className="flex flex-col items-center py-24 text-center lg:py-36">
      <span
        className={
          ok
            ? "grid size-16 place-items-center rounded-full bg-leaf text-3xl text-ink"
            : "grid size-16 place-items-center rounded-full bg-danger/10 text-3xl text-danger"
        }
      >
        {ok ? <IconCheck /> : <IconClose />}
      </span>
      <h1 className="mt-8 font-serif text-4xl text-ink sm:text-5xl">
        {ok ? dict.submitted.successTitle : dict.submitted.errorTitle}
      </h1>
      <p className="mt-5 max-w-lg text-lg text-muted-strong">
        {ok ? dict.submitted.successText : dict.submitted.errorText}
      </p>
      {!ok && (
        <p className="mt-4 text-lg">
          <a
            href={company.phones[0].href}
            className="text-ink underline underline-offset-4 hover:text-olive"
          >
            {company.phones[0].display}
          </a>{" "}
          ·{" "}
          <a
            href={`mailto:${company.email}`}
            className="text-ink underline underline-offset-4 hover:text-olive"
          >
            {company.email}
          </a>
        </p>
      )}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href={href(lang)} className={buttonClass({ size: "lg" })}>
          {dict.common.backHome}
        </Link>
        <Link
          href={href(lang, "/products")}
          className={buttonClass({ variant: "outline", size: "lg" })}
        >
          {dict.common.viewCatalogue}
        </Link>
      </div>
    </Container>
  );
}
