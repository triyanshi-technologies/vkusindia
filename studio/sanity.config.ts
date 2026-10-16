import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { projectId, dataset } from "./env";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "vkusindia",
  title: "Вкусы Индии",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
