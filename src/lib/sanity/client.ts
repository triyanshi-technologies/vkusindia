import "server-only";

import { createClient } from "@sanity/client";

import { sanityConfig } from "./env";

/**
 * Server-only read client. Static demo pages fetch published Sanity content
 * during the build, so read directly from the API rather than the CDN cache.
 */
export const sanityClient = createClient({
  ...sanityConfig,
  useCdn: false,
  perspective: "published",
});
