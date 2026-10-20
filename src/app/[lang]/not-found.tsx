import Link from "next/link";
import { lang } from "next/root-params";

import { buttonClass } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { href } from "@/i18n/routing";

/** Shown when a page calls notFound() (e.g. unknown product slug) - inside the localized layout. */
export default async function NotFound() {
  const value = await lang();
  const locale = isLocale(value) ? value : DEFAULT_LOCALE;
  const dict = await getDictionary(locale);

  return (
    <Container className="flex flex-col items-center py-24 text-center lg:py-36">
      <p className="font-serif text-[7rem] leading-none text-leaf">404</p>
      <h1 className="mt-6 font-serif text-4xl text-ink sm:text-5xl">{dict.notFound.title}</h1>
      <p className="mt-5 max-w-lg text-lg text-muted-strong">{dict.notFound.text}</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href={href(locale, "/products")} className={buttonClass({ size: "lg" })}>
          {dict.common.viewCatalogue}
        </Link>
        <Link href={href(locale)} className={buttonClass({ variant: "outline", size: "lg" })}>
          {dict.common.backHome}
        </Link>
      </div>
    </Container>
  );
}
