import type { Localized, ProcessRoute } from "./types";

export type ProcessChapterId = "field" | "drying" | "roasting" | "dispatch";

interface ProcessFact {
  value: string;
  label: string;
}

interface ProcessBranch {
  title: string;
  text: string;
  route: ProcessRoute;
}

export interface ProcessChapter {
  id: ProcessChapterId;
  title: string;
  period?: string;
  notes: string[];
  facts: ProcessFact[];
  /** Products of this route leave the process at this chapter. */
  output?: ProcessRoute;
  /** Roasting splits into two product routes. */
  branches?: ProcessBranch[];
}

interface ChicoryProcessCopy {
  eyebrow: string;
  title: string;
  intro: string;
  navLabel: string;
  outputLabel: string;
  chapters: ProcessChapter[];
  usesTitle: string;
  uses: string[];
}

/** Home page "seed to cup" section, condensed from the manufacturer's process sheet. */
export const chicoryProcess: Localized<ChicoryProcessCopy> = {
  ru: {
    eyebrow: "От семени до чашки",
    title: "Путь цикория",
    intro:
      "Цикорий - холодостойкое растение семейства астровых с характерной горчинкой и высоким содержанием инулина, полезной пребиотической клетчатки. Листовые сорта выращивают ради зелени, корневые - для обжарки и переработки.",
    navLabel: "Этапы производства",
    outputLabel: "Продукция этого этапа",
    chapters: [
      {
        id: "field",
        title: "Поле",
        period: "сентябрь - май",
        notes: [
          "Семена из Европы, сорт Orchis",
          "Посев в лёгкую супесчаную почву",
          "Посев: разбросом 1,7 кг/га или рядами 1 кг/га",
          "Сбор урожая: март - май, выкапывание и удаление кроны",
        ],
        facts: [
          { value: "15 дней", label: "интервал полива" },
          { value: "1 раз", label: "прополка и прореживание" },
        ],
      },
      {
        id: "drying",
        title: "Приёмка и сушка",
        notes: [
          "Механическая мойка и нарезка, 5 т/ч",
          "Сушка на чёрных листах HDPE, переворачивание дважды в день",
          "Хранение в джутовых мешках, сортировка по ситам 2, 7, 15 мм и крупнее",
        ],
        facts: [
          { value: "13×13×10 мм", label: "кубики" },
          { value: "35-45 °C", label: "сушка на солнце" },
          { value: "2-3 дня", label: "сушка" },
          { value: "9-10 %", label: "влажность" },
        ],
        output: "dried",
      },
      {
        id: "roasting",
        title: "Обжарка",
        notes: [],
        facts: [
          { value: "140 ± 5 °C", label: "температура" },
          { value: "80-95 мин", label: "время обжарки" },
          { value: "400 кг/ч", label: "производительность" },
        ],
        branches: [
          { title: "Обжаренный цикорий", text: "Охлаждение и упаковка", route: "roasted" },
          {
            title: "Жидкий цикорий",
            text: "Экстракт сушат распылением, в вакууме или сублимацией",
            route: "extract",
          },
        ],
      },
      {
        id: "dispatch",
        title: "Контроль и отгрузка",
        notes: [
          "Лабораторный анализ (COA): редуцирующие сахара, цвет, экстрактивные вещества, влажность, ситовый анализ",
          "Упаковка в мешки HDPE 300 мкм: порошок 25 кг, кубики 35 кг",
          "Оформление документов и отгрузка покупателю в России и за рубежом",
        ],
        facts: [],
      },
    ],
    usesTitle: "Где применяют",
    uses: [
      "Кофейные напитки и добавки к кофе",
      "Горячие напитки без кофеина",
      "Хлебопечение",
      "Кондитерские изделия",
      "Шоколадные вкусы",
    ],
  },
  en: {
    eyebrow: "From seed to cup",
    title: "The journey of chicory",
    intro:
      "Chicory is a cool-weather plant of the daisy family (Asteraceae), known for its distinct bitter taste and high inulin content, a healthy prebiotic fibre. Leafy varieties are grown for their greens, root varieties for roasting and processing.",
    navLabel: "Production stages",
    outputLabel: "Products from this stage",
    chapters: [
      {
        id: "field",
        title: "Field",
        period: "Sept - May",
        notes: [
          "Seeds from Europe, variety Orchis",
          "Sown in light sandy loam",
          "Broadcast 1.7 kg/ha or line sowing 1 kg/ha",
          "Harvest Mar - May, uprooting and crown removal",
        ],
        facts: [
          { value: "15 days", label: "irrigation interval" },
          { value: "Once", label: "weeding and thinning" },
        ],
      },
      {
        id: "drying",
        title: "Reception and drying",
        notes: [
          "Mechanical washing and dicing, 5 t/h",
          "Dried on black HDPE sheets, turned twice a day",
          "Stored in jute bags, graded by sieve: 2, 7, 15 mm and above",
        ],
        facts: [
          { value: "13×13×10 mm", label: "cubes" },
          { value: "35-45 °C", label: "sun drying" },
          { value: "2-3 days", label: "drying" },
          { value: "9-10%", label: "moisture" },
        ],
        output: "dried",
      },
      {
        id: "roasting",
        title: "Roasting",
        notes: [],
        facts: [
          { value: "140 ± 5 °C", label: "temperature" },
          { value: "80-95 min", label: "roasting time" },
          { value: "400 kg/h", label: "capacity" },
        ],
        branches: [
          { title: "Roasted chicory", text: "Cooling and packing", route: "roasted" },
          {
            title: "Liquid chicory",
            text: "The extract is spray, vacuum or freeze dried",
            route: "extract",
          },
        ],
      },
      {
        id: "dispatch",
        title: "Quality and dispatch",
        notes: [
          "Lab analysis (COA): reducing sugars, colour, extractable matter, moisture, sieve test",
          "Packed in 300-micron HDPE bags: powder 25 kg, cubes 35 kg",
          "Documentation and dispatch to buyers, domestic and international",
        ],
        facts: [],
      },
    ],
    usesTitle: "Where it's used",
    uses: [
      "Coffee drinks and coffee additive",
      "Caffeine-free hot drinks",
      "Bakery",
      "Confectionery",
      "Chocolate flavours",
    ],
  },
};
