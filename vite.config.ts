import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import Unocss from "unocss/vite";

const baseUrl = process.env.BASE_URL || "/";

// https://vitejs.dev/config/
export default defineConfig({
  base: baseUrl,
  plugins: [react(), Unocss()],
  build: {
    outDir: "docs",
  },
  define: {
    VITE_BASE_URL: JSON.stringify(baseUrl),
  },
});
