import type { Localized } from "./types";

const PRIMARY_PHONE = "+919825077622";

export const company = {
  brand: { ru: "Вкусы Индии", en: "VKUS India" } satisfies Localized,
  tradeName: "Indo Russian Trade",
  tagline: { ru: "Лучшее для вас", en: "The best for you" } satisfies Localized,
  legalName: {
    ru: "ООО «Индорашен трейд энд инвестмент форум»",
    en: "Indo Russian Trade and Investment Forum LLC",
  } satisfies Localized,

  phones: [
    { display: "+91 98250 77622", href: `tel:${PRIMARY_PHONE}`, whatsapp: true },
    { display: "+91 88667 77622", href: "tel:+918866777622", whatsapp: false },
  ],
  whatsappUrl: `https://wa.me/${PRIMARY_PHONE.slice(1)}`,

  email: "info@vkusindia.com",

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
