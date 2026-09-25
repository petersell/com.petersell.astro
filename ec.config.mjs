// @ts-check
// Optionen für Expressive Code (Code-Boxen im Stil von Multiterm: Fensterrahmen,
// Titel, Kopier-Schaltfläche). Eigene Datei statt inline in astro.config.mjs, weil
// themeCssSelector eine Funktion ist (Empfehlung von Expressive Code).
// Achtung: Nach Änderungen hier den Content-Cache node_modules/.astro löschen, sonst
// verweisen die Seiten auf ein veraltetes ec.*.css (404, Codeblöcke ohne Rahmen).
// Hell/dunkel folgt prefers-color-scheme wie global.css,
// manuell per data-theme="light|dark" am <html> (ThemeToggle.astro)
import { defineEcConfig } from 'astro-expressive-code';

export default defineEcConfig({
  themes: ['github-light', 'github-dark'],
  themeCssSelector: (theme) => `[data-theme='${theme.type}']`,
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
});
