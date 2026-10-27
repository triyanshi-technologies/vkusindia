import Link from "next/link";

import { company } from "@/content/company";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { href } from "@/i18n/routing";
import { buttonArrowClass, buttonClass } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { IconArrowRight, IconPhone, IconWhatsApp } from "@/components/ui/icons";

/** Closing call-to-action used at the bottom of most pages. */
export function ContactBand({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [primaryPhone] = company.phones;

  return (
    <section aria-labelledby="contact-band-title" className="pb-20 lg:pb-28">
      <Container>
        <div className="relative grid items-center gap-10 overflow-hidden rounded-[2rem] bg-surface-dark px-6 py-12 sm:px-12 lg:grid-cols-12 lg:px-16 lg:py-16">
          <LeafMark className="pointer-events-none absolute -right-16 -bottom-24 w-[26rem] text-leaf/[0.12] lg:right-[38%]" />

          <div className="relative lg:col-span-7">
            <h2
              id="contact-band-title"
              className="font-serif text-3xl leading-tight text-paper sm:text-[2.75rem]"
            >
              {dict.home.ctaTitle}
            </h2>
            <p className="mt-4 max-w-lg text-lg text-paper/70">{dict.home.ctaText}</p>
          </div>

          <div className="relative flex flex-col gap-3 lg:col-span-5">
            <a
              href={primaryPhone.href}
              className="group flex items-center justify-between gap-4 rounded-2xl bg-paper px-5 py-4 text-ink transition-colors hover:bg-leaf"
            >
              <span>
                <span className="block text-[0.8125rem] text-muted-strong group-hover:text-ink/70">
                  {dict.common.callUs}
                </span>
                <span className="font-serif text-xl">{primaryPhone.display}</span>
              </span>
              <IconPhone className="text-xl text-olive group-hover:text-ink" />
            </a>
            <a
              href={company.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-2xl bg-paper px-5 py-4 text-ink transition-colors hover:bg-leaf"
            >
              <span>
                <span className="block text-[0.8125rem] text-muted-strong group-hover:text-ink/70">
                  {dict.common.whatsapp}
                </span>
                <span className="font-serif text-xl">{dict.common.writeWhatsapp}</span>
              </span>
              <IconWhatsApp className="text-xl text-olive group-hover:text-ink" />
            </a>
            <Link
              href={`${href(locale, "/contact")}#form`}
              className={buttonClass({ size: "lg" })}
            >
              {dict.common.enquire}
              <IconArrowRight className={buttonArrowClass} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

function LeafMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="10"
      aria-hidden="true"
      className={className}
    >
      <path d="M30 175C30 95 80 35 175 25c-6 96-62 150-145 150Z" />
      <path d="M30 175 115 90" />
    </svg>
  );
}
