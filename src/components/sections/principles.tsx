import { principles } from "@/content/pages";
import type { Locale } from "@/i18n/config";
import { Container } from "@/components/ui/container";

export function Principles({
  locale,
  eyebrow,
  title,
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
}) {
  return (
    <section
      aria-labelledby="principles-title"
      className="section-y bg-surface-dark text-paper"
    >
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-4">
          <p className="eyebrow text-paper/60">{eyebrow}</p>
          <h2
            id="principles-title"
            className="mt-4 font-serif text-3xl leading-[1.15] sm:text-[2.5rem]"
          >
            {title}
          </h2>
          {/* Only from lg, where the heading column leaves empty space; pinned to the column bottom so it never adds height. */}
          <TradeGlobe className="pointer-events-none absolute bottom-0 left-0 hidden w-60 text-leaf/[0.14] lg:block" />
        </div>
        <ol className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-8">
          {principles[locale].map((item, index) => (
            <li key={item.title} className="border-t border-paper/15 pt-6">
              <span className="font-serif text-lg text-leaf tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-serif text-2xl leading-snug">{item.title}</h3>
              <p className="mt-3 text-paper/70">{item.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** Line globe with a labelled India → Russia route; the route sits brighter than the globe. */
function TradeGlobe({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
      className={className}
    >
      <circle cx="100" cy="100" r="90" />
      <ellipse cx="100" cy="100" rx="42" ry="90" />
      <path d="M100 10v180M10 100h180M22 55h156M22 145h156" />
      <g stroke="var(--color-leaf)" strokeOpacity="0.5">
        <path d="M132 128C176 110 170 58 114 46" strokeWidth="3.5" strokeDasharray="7 8" strokeLinecap="round" />
        <circle cx="132" cy="128" r="6" fill="var(--color-leaf)" fillOpacity="0.5" />
        <circle cx="114" cy="46" r="6" fill="var(--color-leaf)" fillOpacity="0.5" />
      </g>
      <g stroke="none" fill="var(--color-leaf)" fontSize="13" fontWeight="600" letterSpacing="1.5">
        <text x="146" y="133">IN</text>
        <text x="100" y="51" textAnchor="end">
          RU
        </text>
      </g>
    </svg>
  );
}
