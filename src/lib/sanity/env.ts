import "server-only";

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable ${name} - see .env.example`);
  }
  return value;
}

export const sanityConfig = {
  projectId: required("SANITY_PROJECT_ID"),
  dataset: required("SANITY_DATASET"),
  /** Pinned API version: queries behave the same until we change this date on purpose. */
  apiVersion: "2025-02-19",
  /** Only needed if the dataset is private. Read-only (Viewer) token. */
  token: process.env.SANITY_API_READ_TOKEN || undefined,
} as const;
