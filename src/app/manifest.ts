import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Вкусы Индии - VKUS India",
    short_name: "Вкусы Индии",
    description: "Натуральный цикорий из Индии.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    lang: "ru",
    icons: [{ src: "/icon.png", sizes: "32x37", type: "image/png" }],
  };
}
