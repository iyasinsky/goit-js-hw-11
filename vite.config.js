// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src', 'index.html'),
      },
    },
  },
  base: '/goit-js-hw-11/',
  define: {
    global: 'window',
  },
});
