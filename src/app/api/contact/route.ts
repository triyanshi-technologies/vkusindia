import { handleFormSubmission } from "@/lib/forms/handle-submission";
import { contactSchema } from "@/lib/forms/schemas";

export async function POST(request: Request) {
  return handleFormSubmission(request, { kind: "contact", schema: contactSchema });
}
