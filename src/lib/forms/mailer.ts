import "server-only";

import { createTransport } from "nodemailer";

/** One notification to the company inbox; rows with an empty value are left out. */
export interface Mail {
  subject: string;
  /** The visitor's address, so "Reply" in the inbox answers them directly. */
  replyTo: string;
  rows: [label: string, value: string | number | undefined][];
}

const { SMTP_HOST, SMTP_PORT = "465", SMTP_USER, SMTP_PASS, MAIL_TO } = process.env;
const port = Number(SMTP_PORT);

// Created once per server instance; null until all settings are present.
const transport =
  SMTP_HOST && SMTP_USER && SMTP_PASS && MAIL_TO
    ? createTransport({
        host: SMTP_HOST,
        port,
        secure: port === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      })
    : null;

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

/**
 * Sends the notification; returns false when SMTP is not configured (e.g. local
 * development), so the caller can fall back to logging. Delivery errors throw.
 */
export async function sendMail({ subject, replyTo, rows }: Mail): Promise<boolean> {
  if (!transport) return false;

  const filled = rows.flatMap(([label, value]) => {
    const text = String(value ?? "").trim();
    return text ? [[label, text] as const] : [];
  });

  await transport.sendMail({
    from: { name: "vkusindia.ru", address: SMTP_USER! },
    to: MAIL_TO,
    replyTo,
    subject,
    text: filled.map(([label, value]) => `${label}: ${value}`).join("\n"),
    html: `<table cellpadding="6" style="border-collapse:collapse;font:14px/1.5 sans-serif">${filled
      .map(
        ([label, value]) =>
          `<tr><td style="color:#62645b;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td style="white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
      )
      .join("")}</table>`,
    signal: AbortSignal.timeout(15_000),
  });
  return true;
}
