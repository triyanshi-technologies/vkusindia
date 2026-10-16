import { defineArrayMember, defineField, defineType } from "sanity";

/** Must match `CategoryId` in the website code (src/content/types.ts). */
export const CATEGORIES = [
  { title: "Цикорий / Chicory", value: "chicory" },
  { title: "Рис басмати / Basmati rice", value: "rice" },
  { title: "Специи / Spices", value: "spices" },
  { title: "Суперфуды и чай / Superfoods & tea", value: "superfoods" },
];

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  groups: [
    { name: "main", title: "Main", default: true },
    { name: "content", title: "Description" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "localeString",
      group: "main",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "main",
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
      group: "main",
      options: { list: CATEGORIES, layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      group: "main",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Short description",
      type: "localeText",
      group: "main",
      description: "One or two sentences shown on product cards and in search results.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "specs",
      title: "Specifications",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "spec" })],
    }),
    defineField({
      name: "body",
      title: "Full description",
      type: "localeBlockContent",
      group: "content",
    }),
    defineField({
      name: "featured",
      title: "Show on home page",
      type: "boolean",
      group: "settings",
      initialValue: false,
    }),
    defineField({
      name: "vegetarian",
      title: "Vegetarian product",
      type: "boolean",
      group: "settings",
      initialValue: true,
    }),
    defineField({
      name: "orderRank",
      title: "Sort order",
      type: "number",
      group: "settings",
      description: "Lower numbers appear first within the category.",
      initialValue: 100,
    }),
  ],
  orderings: [
    { title: "Sort order", name: "orderRankAsc", by: [{ field: "orderRank", direction: "asc" }] },
    { title: "Name", name: "nameAsc", by: [{ field: "name.ru", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name.ru", subtitle: "name.en", media: "image", category: "category" },
    prepare: ({ title, subtitle, media, category }) => ({
      title,
      subtitle: [CATEGORIES.find((c) => c.value === category)?.title.split(" / ")[1], subtitle]
        .filter(Boolean)
        .join(" · "),
      media,
    }),
  },
});
