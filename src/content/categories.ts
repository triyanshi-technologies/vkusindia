import type { CategoryDoc, ImageAsset } from "./types";

/**
 * The three product categories of the live site. They are fixed site structure
 * (navigation, catalogue sections), so they live in code; products are managed in
 * Sanity and point here by `category` id.
 */
const photo = (file: string): ImageAsset => ({
  src: `/images/categories/${file}`,
  width: 300,
  height: 200,
});

export const categories: CategoryDoc[] = [
  {
    id: "chicory",
    name: { ru: "Цикорий", en: "Chicory" },
    description: {
      ru: "Растворимый порошок, жидкий экстракт и жареные кубики цикория.",
      en: "Instant powder, liquid extract and roasted chicory cubes.",
    },
    image: photo("instant.jpg"),
  },
  {
    id: "rice",
    name: { ru: "Рис", en: "Rice" },
    description: {
      ru: "Рис басмати Steam и Sella.",
      en: "Basmati Steam and Sella rice.",
    },
    image: photo("1121_steam.jpg"),
  },
  {
    id: "superfood",
    name: { ru: "Супер фуд", en: "Superfood" },
    description: {
      ru: "Куркума, семена чиа, псиллиум, киноа и чай «Ассам».",
      en: "Turmeric, chia seeds, psyllium, quinoa and Assam tea.",
    },
    image: photo("chia.jpg"),
  },
];
