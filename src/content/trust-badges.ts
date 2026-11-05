import type { Localized } from "./types";

export type TrustBadgeId = "vegetarian" | "natural" | "caffeineFree" | "glutenFree";

interface TrustBadgesCopy {
  eyebrow: string;
  title: string;
  badges: { id: TrustBadgeId; label: string }[];
}

/** Product properties stated by the owner, shown as seals on the home page. */
export const trustBadges: Localized<TrustBadgesCopy> = {
  ru: {
    eyebrow: "Свойства продукта",
    title: "Только натуральный цикорий",
    badges: [
      { id: "vegetarian", label: "100 % вегетарианский" },
      { id: "natural", label: "Натуральное происхождение" },
      { id: "caffeineFree", label: "100 % без кофеина" },
      { id: "glutenFree", label: "100 % без глютена" },
    ],
  },
  en: {
    eyebrow: "Product properties",
    title: "Nothing but natural chicory",
    badges: [
      { id: "vegetarian", label: "100% vegetarian" },
      { id: "natural", label: "Naturally originated" },
      { id: "caffeineFree", label: "100% caffeine free" },
      { id: "glutenFree", label: "100% gluten free" },
    ],
  },
};
