import { handleFormSubmission } from "@/lib/forms/handle-submission";
import { enquirySchema } from "@/lib/forms/schemas";

export async function POST(request: Request) {
  return handleFormSubmission(request, { kind: "enquiry", schema: enquirySchema });
}
