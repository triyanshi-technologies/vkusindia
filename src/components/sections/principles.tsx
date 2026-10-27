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
      className="border-y border-line bg-surface-tint py-20 text-ink lg:py-28"
    >
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <p className="eyebrow">{eyebrow}</p>
          <h2
            id="principles-title"
            className="mt-4 font-serif text-3xl leading-[1.15] sm:text-[2.5rem]"
          >
            {title}
          </h2>
        </div>
        <ol className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-8">
          {principles[locale].map((item, index) => (
            <li key={item.title} className="border-t border-line pt-6">
              <span className="font-serif text-lg text-olive tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-serif text-2xl leading-snug">{item.title}</h3>
              <p className="mt-3 text-muted-strong">{item.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
