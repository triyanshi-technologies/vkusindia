import type { Localized } from "./types";

/** Page copy for the home and about pages. */

export const welcome: Localized = {
  ru: "Добро пожаловать в Indo Russian Trade - надёжное имя в мировой индустрии импорта и экспорта продуктов питания. С твёрдой приверженностью качеству, надёжности и удовлетворённости клиентов мы специализируемся на поиске и поставке широкого ассортимента высококачественных продуктов питания на международных рынках.",
  en: "Welcome to Indo Russian Trade - a trusted name in the global food import and export industry. With a firm commitment to quality, reliability and customer satisfaction, we specialise in sourcing and supplying a wide range of high-quality food products across international markets.",
};

export const heroLead: Localized = {
  ru: "Indo Russian Trade ищет и поставляет высококачественные продукты питания из Индии - с упором на качество, надёжность и долгосрочное партнёрство.",
  en: "Indo Russian Trade sources and supplies high-quality food products from India - with a focus on quality, reliability and long-term partnership.",
};

export const heroImage = {
  src: "/images/hero/about.jpg",
  alt: {
    ru: "Цветы цикория и молотый цикорий в чаше",
    en: "Chicory flowers and ground chicory in a bowl",
  } satisfies Localized,
};

export const showcaseImage = {
  src: "/images/home/chicory-showcase.webp",
  alt: {
    ru: "Цветы цикория, растворимый цикорий в чаше, жареные кубики и чашка напитка",
    en: "Chicory flowers, instant chicory in a bowl, roasted cubes and a cup of the drink",
  } satisfies Localized,
};

export const about = {
  intro: {
    ru: "Наша компания заслужила надёжную репутацию, связывая производителей и покупателей по всем континентам. Мы тесно сотрудничаем с фермерами, производителями, дистрибьюторами и розничными торговцами, чтобы обеспечить своевременную доставку безопасных высококачественных продуктов питания, соответствующих мировым стандартам.",
    en: "Our company has earned a solid reputation for connecting producers and buyers across continents. We work closely with farmers, manufacturers, distributors and retailers to ensure the timely delivery of safe, high-quality food products that meet global standards.",
  } satisfies Localized,
  partnership: {
    ru: "В Indo Russian Trade мы верим в развитие долгосрочных партнёрских отношений, основанных на доверии, прозрачности и взаимном росте. Независимо от того, хотите ли вы импортировать высококачественную продукцию или расширить свой экспортный охват, наша команда обеспечивает бесперебойную логистику, надлежащую документацию и бесперебойную трансграничную торговлю.",
    en: "At Indo Russian Trade we believe in building long-term partnerships founded on trust, transparency and mutual growth. Whether you want to import high-quality products or expand your export reach, our dedicated team ensures smooth logistics, proper documentation and seamless cross-border trade.",
  } satisfies Localized,
  closing: {
    ru: "Позвольте нам стать вашим проводником к качественному мировому снабжению продуктами питания и их дистрибуции.",
    en: "Let us be your gateway to quality global food sourcing and distribution.",
  } satisfies Localized,
};

/** Principles distilled from the company's own About text. */
export const principles: Localized<{ title: string; text: string }[]> = {
  ru: [
    {
      title: "Работаем с источником",
      text: "Тесно сотрудничаем с фермерами, производителями, дистрибьюторами и розничными торговцами.",
    },
    {
      title: "Качество по мировым стандартам",
      text: "Поставляем безопасные, высококачественные продукты питания, соответствующие мировым стандартам.",
    },
    {
      title: "Логистика и документы",
      text: "Берём на себя бесперебойную логистику, надлежащую документацию и трансграничную торговлю.",
    },
    {
      title: "Долгосрочное партнёрство",
      text: "Строим отношения на доверии, прозрачности и взаимном росте.",
    },
  ],
  en: [
    {
      title: "Close to the source",
      text: "We work closely with farmers, manufacturers, distributors and retailers.",
    },
    {
      title: "Quality to global standards",
      text: "We deliver safe, high-quality food products that meet global standards.",
    },
    {
      title: "Logistics and paperwork",
      text: "We take care of smooth logistics, proper documentation and cross-border trade.",
    },
    {
      title: "Long-term partnership",
      text: "We build relationships on trust, transparency and mutual growth.",
    },
  ],
};
