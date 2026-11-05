import type { ComponentType, SVGProps } from "react";

import { trustBadges, type TrustBadgeId } from "@/content/trust-badges";
import type { Locale } from "@/i18n/config";
import { Container } from "@/components/ui/container";
import { IconLeaf, IconNoCaffeine, IconSprout, IconWheatOff } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const badgeIcons: Record<TrustBadgeId, Icon> = {
  vegetarian: IconLeaf,
  natural: IconSprout,
  caffeineFree: IconNoCaffeine,
  glutenFree: IconWheatOff,
};

/** Product properties as round seals: icon in a double ring, label underneath. */
export function TrustBadges({ locale }: { locale: Locale }) {
  const t = trustBadges[locale];

  return (
    <section aria-labelledby="trust-title" className="section-y border-b border-line bg-paper">
      <Container>
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          id="trust-title"
          className="mx-auto text-center"
        />
        <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-x-8 lg:mt-14">
          {t.badges.map((badge) => (
            <li key={badge.id} className="seal-in group flex flex-col items-center text-center">
              <Seal Icon={badgeIcons[badge.id]} />
              <p className="mt-4 max-w-[12rem] text-[0.9375rem] leading-snug font-medium text-ink">
                {badge.label}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function Seal({ Icon }: { Icon: Icon }) {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-square w-full max-w-[8rem] transition-transform duration-500 ease-soft group-hover:-translate-y-1 group-hover:scale-[1.03] motion-reduce:transition-none sm:max-w-[9.5rem] lg:max-w-[11rem]"
    >
      <svg viewBox="0 0 200 200" fill="none" className="absolute inset-0 size-full">
        <circle cx="100" cy="100" r="97" stroke="var(--color-leaf)" strokeWidth="2" />
        <circle
          cx="100"
          cy="100"
          r="76"
          strokeWidth="1.5"
          strokeDasharray="3 5"
          className="stroke-line transition-colors duration-500 group-hover:stroke-leaf motion-reduce:transition-none"
        />
      </svg>
      <span className="absolute inset-[25%] grid place-items-center rounded-full bg-leaf/20 text-[2.25rem] text-olive sm:text-[2.75rem] lg:text-[3.25rem]">
        <Icon />
      </span>
    </div>
  );
}
