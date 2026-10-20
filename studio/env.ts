// Set in studio/.env (see .env.example). Sanity exposes SANITY_STUDIO_* variables to the Studio.
export const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "";
export const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

if (!projectId) {
  throw new Error("Missing SANITY_STUDIO_PROJECT_ID - copy studio/.env.example to studio/.env");
}
