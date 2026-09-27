// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import expressiveCode from 'astro-expressive-code';
import sitemap from '@astrojs/sitemap';
import portraitImages from './src/plugins/hast-portrait-images.mjs';
import admonitions from './src/plugins/hast-admonitions.mjs';

// https://astro.build/config
export default defineConfig({
  // Ziel-Domain nach dem Launch; Grundlage für die Sitemap
  site: 'https://www.petersell.com',
  integrations: [
    // Code-Boxen im Stil von Multiterm; Optionen in ec.config.mjs
    expressiveCode(),
    sitemap(),
  ],
  markdown: {
    processor: satteri({
      hastPlugins: [portraitImages, admonitions],
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
