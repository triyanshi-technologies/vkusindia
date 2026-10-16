import type { Metadata } from "next";
import { Golos_Text } from "next/font/google";
import Link from "next/link";

import "./globals.css";

const sans = Golos_Text({
  subsets: ["latin", "cyrillic"],
  variable: "--font-golos",
  display: "swap",
});

export const metadata: Metadata = {
  title: "404 — Вкусы Индии / VKUS India",
  robots: { index: false },
};

/** Fallback for URLs that match no route at all. Bilingual because the locale is unknown here. */
export default function GlobalNotFound() {
  return (
    <html lang="ru" className={sans.variable}>
      <body className="grid min-h-dvh place-items-center px-4 text-center">
        <main>
          <p className="text-[6rem] leading-none font-medium text-leaf">404</p>
          <h1 className="mt-6 text-3xl text-ink">Страница не найдена</h1>
          <p lang="en" className="mt-2 text-lg text-muted-strong">
            Page not found
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/ru"
              className="inline-flex h-12 items-center rounded-full bg-leaf px-6 font-medium text-ink hover:bg-olive hover:text-paper"
            >
              На главную
            </Link>
            <Link
              href="/en"
              lang="en"
              className="inline-flex h-12 items-center rounded-full border border-ink/20 px-6 font-medium text-ink hover:border-ink"
            >
              Home (English)
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
