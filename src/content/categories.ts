import type { CategoryDoc, ImageAsset } from "./types";

/**
 * Categories the site shows. They are fixed site structure (navigation, catalogue
 * sections), so they live in code; products are managed in Sanity and point here by
 * `category` id. Products of categories not listed here are hidden.
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
];
