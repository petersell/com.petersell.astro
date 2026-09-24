// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import portraitImages from './src/plugins/hast-portrait-images.mjs';

// https://astro.build/config
export default defineConfig({
  markdown: {
    processor: satteri({
      hastPlugins: [portraitImages],
      features: {
        // Fußnoten-Beschriftung auf Deutsch (Standard: "Footnotes", "Back to reference …")
        gfm: {
          footnotes: {
            label: "Anmerkungen",
            backLabel: "Zurück zum Verweis {reference}",
          },
        },
      },
    }),
  },
});
