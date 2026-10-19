import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Every translatable field stores both languages side by side: { ru, en }.
 * Russian is the primary language of the site, so it comes first.
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

/**
 * Rich text limited to what the live descriptions use: paragraphs and subheadings.
 * Shift+Enter inside a paragraph adds a line break, exactly like <br> on the old site.
 */
const blockContent = defineArrayMember({
  type: "block",
  styles: [
    { title: "Normal", value: "normal" },
    { title: "Subheading", value: "h3" },
  ],
  lists: [],
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
