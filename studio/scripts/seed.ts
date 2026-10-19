/**
 * Imports the 18 products of the live vkusindia.ru into Sanity (photos included).
 * Names and Russian texts are copied verbatim from the live site.
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
  imageFiles: string[];
  [field: string]: unknown;
}

const seedDir = join(dirname(fileURLToPath(import.meta.url)), "..", "seed");
const products: SeedProduct[] = JSON.parse(readFileSync(join(seedDir, "products.json"), "utf8"));
const client = getCliClient({ apiVersion: "2025-02-19" });

for (const { imageFiles, ...doc } of products) {
  const images = [];
  for (const [index, file] of imageFiles.entries()) {
    const asset = await client.assets.upload("image", createReadStream(join(seedDir, "images", file)), {
      filename: file,
    });
    images.push({
      _type: "image",
      _key: `img${index}`,
      asset: { _type: "reference", _ref: asset._id },
    });
  }

  await client.createOrReplace({ ...doc, _id: doc._id, _type: "product", images });
  console.log(`✓ ${doc._id}`);
}

console.log(`\nImported ${products.length} products.`);
