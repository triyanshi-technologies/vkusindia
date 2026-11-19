import type { Localized } from "./types";

const PRIMARY_PHONE = "+919825077622";

const RUSSIA = { ru: "Россия", en: "Russia" } satisfies Localized;
const INDIA = { ru: "Индия", en: "India" } satisfies Localized;

export const company = {
  brand: { ru: "Вкусы Индии", en: "VKUS India" } satisfies Localized,
  tagline: { ru: "Лучшее для вас", en: "The best for you" } satisfies Localized,

  /** Every listed number opens a WhatsApp chat; only `callPhone` dials. */
  phones: [
    { display: "+91 81977 77533", href: "https://wa.me/918197777533", country: INDIA },
    { display: "+91 98250 77622", href: "https://wa.me/919825077622", country: INDIA },
    { display: "+7 925 500 12 54", href: "https://wa.me/79255001254", country: RUSSIA },
  ],
  /** Number behind the "call" buttons. */
  callPhone: { display: "+91 98250 77622", href: `tel:${PRIMARY_PHONE}` },
  whatsappUrl: `https://wa.me/${PRIMARY_PHONE.slice(1)}`,

  email: "info@vkusindia.com",

  /** Registered (Moscow) office: legal details, privacy policy and structured data. */
  address: {
    city: { ru: "Москва", en: "Moscow" } satisfies Localized,
    country: RUSSIA,
    countryCode: "RU",
    full: {
      ru: "Москва, Киевское шоссе 22-й км, 4с5кЕ, 12/22, 4 этаж",
      en: "22nd km Kievskoye Highway, 4 bld. 5 block E, office 12/22, 4th floor, Moscow",
    } satisfies Localized,
    street: {
      ru: "Киевское шоссе 22-й км, 4с5кЕ, 12/22, 4 этаж",
      en: "22nd km Kievskoye Highway, 4 bld. 5 block E, office 12/22, 4th floor",
    } satisfies Localized,
    mapQuery: "Москва, Киевское шоссе 22-й км, 4с5",
  },

  people: [
    {
      country: RUSSIA,
      members: [
        {
          name: { ru: "Елена Ульянова", en: "Elena Ulyanova" } satisfies Localized,
          role: { ru: "Директор", en: "Director" } satisfies Localized,
        },
        { name: { ru: "Алагаппан", en: "Alagappan" } satisfies Localized },
      ],
    },
    {
      country: INDIA,
      members: [
        { name: { ru: "Бирджу Патель", en: "Birju Patel" } satisfies Localized },
        { name: { ru: "Канхай Чавда", en: "Kanhai Chavda" } satisfies Localized },
      ],
    },
  ],
} as const;

export type ContactPerson = { name: Localized; role?: Localized };

/** Phone numbers grouped by country, India first. */
export const phoneGroups = [INDIA, RUSSIA].map((country) => ({
  country,
  phones: company.phones.filter((phone) => phone.country === country),
}));

/** Offices in the order they are listed; `map` picks the service that knows the area best. */
export const offices = [
  { country: RUSSIA, full: company.address.full, mapQuery: company.address.mapQuery, map: "yandex" },
  {
    country: INDIA,
    full: {
      ru: "Madhuli Empire, 1-й этаж, Ройал-парк 6, Калавад-роуд, Раджкот, Гуджарат, Индия",
      en: "Madhuli Empire, First Floor, 6 - Royal Park, Kalawad Road, Rajkot, Gujarat, India",
    } satisfies Localized,
    mapQuery: "Madhuli Empire, Royal Park, Kalawad Road, Rajkot, Gujarat, India",
    map: "google",
  },
] as const;

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
