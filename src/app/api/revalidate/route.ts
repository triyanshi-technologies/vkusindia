import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { PRODUCTS_TAG } from "@/lib/content";
import { revalidateSecret } from "@/lib/sanity/env";

/**
 * Sanity webhook: called on every product publish/unpublish/delete.
 * Verifies the signed payload, then marks cached product data stale so the
 * next visitor gets fresh content (stale-while-revalidate, no downtime).
 */
export async function POST(request: Request) {
  if (!revalidateSecret) {
    return NextResponse.json({ ok: false, error: "Webhook secret not configured" }, { status: 500 });
  }

  const signature = request.headers.get(SIGNATURE_HEADER_NAME) ?? "";
  const body = await request.text();

  if (!signature || !(await isValidSignature(body, signature, revalidateSecret))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  revalidateTag(PRODUCTS_TAG, "max");
  return NextResponse.json({ ok: true, revalidated: PRODUCTS_TAG });
}
