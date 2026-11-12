import { handleFormSubmission } from "@/lib/forms/handle-submission";
import { contactSchema } from "@/lib/forms/schemas";

export async function POST(request: Request) {
  return handleFormSubmission(request, {
    kind: "contact",
    schema: contactSchema,
    // Labels are bilingual: the inbox is read by the team in India and in Russia.
    mail: (data) => ({
      subject: `New message / Новое сообщение: ${data.subject}`,
      replyTo: data.email,
      rows: [
        ["Name / Имя", data.name],
        ["Email", data.email],
        ["Subject / Тема", data.subject],
        ["Message / Сообщение", data.message],
        ["Page language / Язык страницы", data.locale.toUpperCase()],
      ],
    }),
  });
}
