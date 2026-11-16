// @ts-check
import { defineConfig } from 'astro/config';

// TODO: remplacer par le vrai nom de domaine avant la mise en ligne
export default defineConfig({
  site: 'https://www.phoenix-permis.fr',
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
});
