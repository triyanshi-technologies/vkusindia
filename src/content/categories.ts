import type { CategoryDoc, ImageAsset } from "./types";

/**
 * Product categories are fixed site structure (navigation, catalogue sections),
 * so they live in code. Products themselves are managed in Sanity and point here
 * by `category` id.
 */
const photo = (file: string): ImageAsset => ({
  src: `/images/products/${file}`,
  width: 300,
  height: 200,
});

export const categories: CategoryDoc[] = [
  {
    id: "chicory",
    name: { ru: "Цикорий", en: "Chicory" },
    description: {
      ru: "Растворимый порошок, жидкий экстракт и кубики цикория.",
      en: "Instant powder, liquid extract and chicory cubes.",
    },
    image: photo("instant.jpg"),
  },
  {
    id: "rice",
    name: { ru: "Рис басмати", en: "Basmati rice" },
    description: {
      ru: "Сорта 1121 и Pusa: Steam, Sella и Raw.",
      en: "1121 and Pusa varieties — Steam, Sella and Raw.",
    },
    image: photo("1121_steam.jpg"),
  },
  {
    id: "spices",
    name: { ru: "Специи", en: "Spices" },
    description: {
      ru: "Куркума, имбирь, чили, паприка, чёрный перец и моринга.",
      en: "Turmeric, ginger, chili, paprika, black pepper and moringa.",
    },
    image: photo("turmeric.jpg"),
  },
  {
    id: "superfoods",
    name: { ru: "Суперфуды и чай", en: "Superfoods & tea" },
    description: {
      ru: "Псиллиум, семена чиа, киноа и индийский чай «Ассам».",
      en: "Psyllium, chia seeds, quinoa and Indian Assam tea.",
    },
    image: photo("chia.jpg"),
  },
];
