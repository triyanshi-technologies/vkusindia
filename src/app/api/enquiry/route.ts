import { LOCALES } from "@/i18n/config";
import { getProduct } from "@/lib/content";
import { handleFormSubmission } from "@/lib/forms/handle-submission";
import { enquirySchema } from "@/lib/forms/schemas";

export async function POST(request: Request) {
  return handleFormSubmission(request, {
    kind: "enquiry",
    schema: enquirySchema,
    // Variants must be real options of this product, at most one per group.
    validate: async ({ locale, product: slug, variant }) => {
      if (!variant.length) return null;
      const product = slug ? await getProduct(locale, slug) : null;
      // "Group: Option" (as the form submits it) -> group, to catch two picks in one group.
      const allowed = new Map<string, string>(
        (product?.variants ?? []).flatMap((group) =>
          group.options.map((option): [string, string] => [`${group.name}: ${option}`, group.name]),
        ),
      );
      const groups = variant.map((value) => allowed.get(value));
      const valid = groups.every(Boolean) && new Set(groups).size === groups.length;
      return valid ? null : { variant: "invalid" };
    },
    // Labels are bilingual: the inbox is read by the team in India and in Russia.
    mail: async (data) => {
      const names = data.product
        ? (await Promise.all(LOCALES.map((l) => getProduct(l, data.product!)))).map((p) => p?.name)
        : [];
      const product = [...new Set(names.filter(Boolean))].join(" / ");
      return {
        subject: `New enquiry / Новый запрос${product ? `: ${product}` : ""}`,
        replyTo: data.email,
        rows: [
          ["Product / Продукт", product],
          ["Options / Варианты", data.variant.join("; ")],
          ["Quantity / Количество", data.quantity],
          ["Name / Имя", data.name],
          ["Phone / Телефон", data.phone],
          ["Email", data.email],
          ["Country / Страна", data.country],
          ["Comment / Комментарий", data.comment],
          ["Page language / Язык страницы", data.locale.toUpperCase()],
        ],
      };
    },
  });
}
