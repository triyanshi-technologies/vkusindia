import "server-only";

import { createClient } from "@sanity/client";

import { sanityConfig } from "./env";

/**
 * Server-only read client. `useCdn: false` because results are cached by Next.js
 * (`use cache` + tags) and refreshed by the publish webhook - reading from the API
 * directly guarantees the refresh picks up the just-published version.
 */
export const sanityClient = createClient({
  ...sanityConfig,
  useCdn: false,
  perspective: "published",
});
