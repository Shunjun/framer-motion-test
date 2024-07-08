import { defineConfig, presetUno } from "unocss";

export default defineConfig({
  theme: {
    colors: {
      brand: {
        // primary: "#fbf5ef",
      },
    },
  },
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        "src/**/*.{js,ts}",
      ],
      // exclude files
      // exclude: []
    },
  },
  presets: [presetUno()],
});
