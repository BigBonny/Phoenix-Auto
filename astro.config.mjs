// @ts-check
import { defineConfig } from 'astro/config';

// TODO: remplacer par le vrai nom de domaine avant la mise en ligne
export default defineConfig({
  site: 'https://www.autoecole-prefecture-nanterre.fr',
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
});
