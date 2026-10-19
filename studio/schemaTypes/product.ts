import { defineArrayMember, defineField, defineType } from "sanity";

/** The three categories of the live site. Must match `CategoryId` in src/content/types.ts. */
export const CATEGORIES = [
  { title: "Цикорий / Chicory", value: "chicory" },
  { title: "Рис / Rice", value: "rice" },
  { title: "Супер фуд / Superfood", value: "superfood" },
];

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      description: "Part of the page address: /ru/products/<slug>. Latin letters, digits and hyphens.",
      options: { source: "name.en", maxLength: 80 },
      validation: (rule) =>
        rule.required().custom((value) =>
          !value?.current || /^[a-z0-9-]+$/.test(value.current)
            ? true
            : "Use lowercase Latin letters, digits and hyphens only",
        ),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: CATEGORIES, layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      description: "The first photo is the main one (cards, search results, sharing).",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localeBlockContent",
    }),
    defineField({
      name: "listed",
      title: "Show in menu, home page and catalogue",
      type: "boolean",
      description: "Off = the product page exists but is only reachable by its link.",
      initialValue: true,
    }),
    defineField({
      name: "orderRank",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 100,
    }),
    defineField({
      name: "legacyId",
      title: "Old site ID",
      type: "number",
      description: "ID on the previous vkusindia.ru (products?prid=…). Used for redirects.",
      readOnly: true,
    }),
  ],
  orderings: [
    { title: "Sort order", name: "orderRankAsc", by: [{ field: "orderRank", direction: "asc" }] },
    { title: "Name", name: "nameAsc", by: [{ field: "name.ru", direction: "asc" }] },
  ],
  preview: {
    select: {
      title: "name.ru",
      subtitle: "name.en",
      media: "images.0",
      category: "category",
      listed: "listed",
    },
    prepare: ({ title, subtitle, media, category, listed }) => ({
      title,
      subtitle: [
        CATEGORIES.find((c) => c.value === category)?.title.split(" / ")[0],
        listed === false ? "скрыт" : null,
        subtitle,
      ]
        .filter(Boolean)
        .join(" · "),
      media,
    }),
  },
});
