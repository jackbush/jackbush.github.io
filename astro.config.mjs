// @ts-check
import { defineConfig } from "astro/config";
import cvPdfs from "./src/integrations/cv-pdfs.ts";

// https://astro.build/config
export default defineConfig({
    site: "https://jackbush.github.io",
    integrations: [cvPdfs()],
});
