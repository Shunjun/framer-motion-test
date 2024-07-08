import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import Unocss from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/framer-motion-test",
  plugins: [react(), Unocss()],
  build: {
    outDir: "docs",
  },
});
