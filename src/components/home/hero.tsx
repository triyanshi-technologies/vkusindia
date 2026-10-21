import Image from "next/image";
import Link from "next/link";

import { company } from "@/content/company";
import { heroImages, heroLead } from "@/content/pages";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { href } from "@/i18n/routing";
import { publicPath } from "@/lib/public-path";
import { buttonArrowClass, buttonClass } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { IconArrowRight } from "@/components/ui/icons";

interface HeroProps {
  locale: Locale;
  dict: Dictionary;
  stats: { products: number; categories: number };
}

export function Hero({ locale, dict, stats: counts }: HeroProps) {
  const t = dict.home;
  const stats = [
    { value: String(counts.products), label: t.stats.products },
    { value: String(counts.categories), label: t.stats.categories },
    { value: "IN → RU", label: t.stats.route },
  ];

  return (
    <section className="overflow-hidden">
      <Container className="grid items-center gap-16 pt-10 pb-20 sm:pt-14 lg:grid-cols-12 lg:gap-10 lg:pt-14 lg:pb-24">
        <div className="lg:col-span-6">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 className="mt-6 font-serif text-[2.5rem] leading-[1.05] tracking-tight text-ink xs:text-5xl sm:text-6xl xl:text-[4rem]">
            {t.titleLead} <em className="text-olive">{t.titleAccent}</em>
          </h1>
          <p className="mt-7 max-w-xl text-lg text-muted-strong">{heroLead[locale]}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={href(locale, "/products")} className={buttonClass({ size: "lg" })}>
              {dict.common.viewCatalogue}
              <IconArrowRight className={buttonArrowClass} />
            </Link>
            <Link
              href={`${href(locale, "/contact")}#form`}
              className={buttonClass({ variant: "outline", size: "lg" })}
            >
              {dict.common.enquire}
            </Link>
          </div>

          <dl className="mt-14 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <dt className="order-last text-sm leading-snug text-muted-strong">{stat.label}</dt>
                <dd className="font-serif text-2xl text-ink sm:text-3xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-6">
          <div className="relative mx-auto max-w-[35rem] pb-10 lg:mr-0 lg:ml-auto">
            <div className="relative aspect-[4/3.3] overflow-hidden rounded-[2rem] bg-mist">
              <Image
                src={publicPath(heroImages.main.src)}
                alt={heroImages.main.alt[locale]}
                fill
                preload
                sizes="(min-width: 1024px) 560px, 92vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 -left-3 aspect-[4/3] w-[46%] overflow-hidden rounded-[1.5rem] border-[6px] border-paper bg-mist shadow-[0_20px_40px_-20px_rgb(34_34_34/0.35)] sm:-left-10">
              <Image
                src={publicPath(heroImages.inset.src)}
                alt={heroImages.inset.alt[locale]}
                fill
                sizes="(min-width: 1024px) 260px, 44vw"
                className="object-cover"
              />
            </div>
            <p className="absolute -top-3 right-3 -rotate-3 rounded-full bg-leaf px-5 py-2 font-serif text-lg text-ink italic shadow-[0_12px_24px_-12px_rgb(34_34_34/0.4)] sm:-right-3">
              {company.tagline[locale]}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
