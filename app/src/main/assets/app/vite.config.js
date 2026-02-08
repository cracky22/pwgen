import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  base: './',
  build: {
    target: 'es2015', 
    assetsInlineLimit: 100000, 
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    }
  }
});