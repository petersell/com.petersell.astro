// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import expressiveCode from 'astro-expressive-code';
import portraitImages from './src/plugins/hast-portrait-images.mjs';
import admonitions from './src/plugins/hast-admonitions.mjs';

// https://astro.build/config
export default defineConfig({
  integrations: [
    // Code-Boxen im Stil von Multiterm: Fensterrahmen, Titel, Kopier-Schaltfläche.
    // Ersetzt Shiki; hell/dunkel folgt prefers-color-scheme wie global.css
    expressiveCode({
      themes: ['github-light', 'github-dark'],
      defaultLocale: 'de',
      styleOverrides: {
        borderRadius: '4px',
        borderColor: 'var(--color-border)',
        codeFontFamily: 'var(--font-mono)',
        uiFontFamily: 'var(--font-mono)',
        codeFontSize: '0.875rem',
        codeBackground: 'var(--color-surface)',
        frames: {
          frameBoxShadowCssValue: 'none',
          editorActiveTabIndicatorTopColor: 'var(--color-accent)',
          editorActiveTabBackground: 'var(--color-surface)',
          editorTabBarBackground: 'var(--color-bg)',
          terminalTitlebarBackground: 'var(--color-bg)',
          terminalBackground: 'var(--color-surface)',
        },
      },
    }),
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
