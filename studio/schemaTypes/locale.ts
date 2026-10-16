import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Every translatable field stores both languages side by side: { ru, en }.
 * Russian is the primary language of the site, so it comes first and is required.
 */
const languages = [
  { id: "ru", title: "Русский" },
  { id: "en", title: "English" },
] as const;

export const localeString = defineType({
  name: "localeString",
  title: "Localized string",
  type: "object",
  fields: languages.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: "string",
      validation: (rule) => rule.required().max(160),
    }),
  ),
});

export const localeText = defineType({
  name: "localeText",
  title: "Localized text",
  type: "object",
  fields: languages.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(400),
    }),
  ),
});

/** Rich text limited to what the product page renders: paragraphs, subheadings, bullet lists. */
const blockContent = defineArrayMember({
  type: "block",
  styles: [
    { title: "Normal", value: "normal" },
    { title: "Subheading", value: "h3" },
  ],
  lists: [{ title: "Bullet", value: "bullet" }],
  marks: {
    decorators: [
      { title: "Bold", value: "strong" },
      { title: "Italic", value: "em" },
    ],
    annotations: [],
  },
});

export const localeBlockContent = defineType({
  name: "localeBlockContent",
  title: "Localized rich text",
  type: "object",
  fields: languages.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: "array",
      of: [blockContent],
    }),
  ),
});

export const spec = defineType({
  name: "spec",
  title: "Specification",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "localeString" }),
    defineField({ name: "value", title: "Value", type: "localeString" }),
  ],
  preview: {
    select: { label: "label.ru", value: "value.ru" },
    prepare: ({ label, value }) => ({ title: `${label ?? "—"}: ${value ?? "—"}` }),
  },
});
