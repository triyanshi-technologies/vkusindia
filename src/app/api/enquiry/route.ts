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
  });
}
