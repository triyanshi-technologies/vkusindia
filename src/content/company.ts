import type { Localized } from "./types";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://vkusindia.ru").replace(
  /\/$/,
  "",
);

/** Last content update — used for sitemap `lastModified`. */
export const CONTENT_UPDATED_AT = "2026-10-15";

const PRIMARY_PHONE = "+79255001254";

export const company = {
  brand: { ru: "Вкусы Индии", en: "VKUS India" } satisfies Localized,
  tradeName: "Indo Russian Trade",
  tagline: { ru: "Лучшее для вас", en: "The best for you" } satisfies Localized,
  legalName: {
    ru: "ООО «Индорашен трейд энд инвестмент форум»",
    en: "Indo Russian Trade and Investment Forum LLC",
  } satisfies Localized,

  phones: [
    { display: "+7 925 500 12 54", href: `tel:${PRIMARY_PHONE}`, whatsapp: true },
    { display: "+7 926 472 84 42", href: "tel:+79264728442", whatsapp: false },
  ],
  whatsappUrl: `https://wa.me/${PRIMARY_PHONE.slice(1)}`,

  email: "info@vkusindia.ru",
  ordersEmail: "infoirtaif@gmail.com",
  extraEmails: ["info@irtaif.com"],

  address: {
    postalCode: "117342",
    city: { ru: "Москва", en: "Moscow" } satisfies Localized,
    country: { ru: "Россия", en: "Russia" } satisfies Localized,
    countryCode: "RU",
    short: { ru: "Москва, ул. Бутлерова, 17Б", en: "17B Butlerova St, Moscow" } satisfies Localized,
    full: {
      ru: "117342, Россия, Москва, вн. тер. г. муниципальный округ Коньково, ул. Бутлерова, 17Б, помещение 58/11/2",
      en: "Premises 58/11/2, 17B Butlerova St, Konkovo municipal district, Moscow, 117342, Russia",
    } satisfies Localized,
    street: {
      ru: "ул. Бутлерова, 17Б, помещение 58/11/2",
      en: "17B Butlerova St, premises 58/11/2",
    } satisfies Localized,
    mapQuery: "Москва, улица Бутлерова, 17Б",
  },

  people: [
    {
      name: { ru: "Елена Ульянова", en: "Elena Ulyanova" } satisfies Localized,
      role: { ru: "Директор", en: "Director" } satisfies Localized,
    },
    {
      name: { ru: "Прабхакаран В.", en: "Prabhakaran V." } satisfies Localized,
      role: { ru: "Директор по маркетингу", en: "Marketing Director" } satisfies Localized,
    },
  ],
} as const;

export function mapLinks(query: string) {
  const q = encodeURIComponent(query);
  return {
    yandex: `https://yandex.ru/maps/?text=${q}`,
    google: `https://www.google.com/maps/search/?api=1&query=${q}`,
  };
}

export function whatsappLink(text?: string) {
  return text ? `${company.whatsappUrl}?text=${encodeURIComponent(text)}` : company.whatsappUrl;
}
