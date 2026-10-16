/**
 * Imports the 18 products from the old website into Sanity (photos included).
 * Safe to run more than once: documents use fixed ids and are replaced, photos are
 * de-duplicated by Sanity.
 *
 *   npm run seed
 */
import { createReadStream, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getCliClient } from "sanity/cli";

interface SeedProduct {
  _id: string;
  imageFile: string;
  [field: string]: unknown;
}

const seedDir = join(dirname(fileURLToPath(import.meta.url)), "..", "seed");
const products: SeedProduct[] = JSON.parse(readFileSync(join(seedDir, "products.json"), "utf8"));
const client = getCliClient({ apiVersion: "2025-02-19" });

for (const { imageFile, ...doc } of products) {
  const asset = await client.assets.upload("image", createReadStream(join(seedDir, "images", imageFile)), {
    filename: imageFile,
  });
  await client.createOrReplace({
    ...doc,
    _id: doc._id,
    _type: "product",
    image: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
  });
  console.log(`✓ ${doc._id}`);
}

console.log(`\nImported ${products.length} products.`);
