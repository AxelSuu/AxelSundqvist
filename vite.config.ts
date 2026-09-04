import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // The article is a second entry, not a route: static HTML needs no router,
  // no SPA rewrite and no prerender step, and a crawler gets the prose on the
  // first request. Regenerate it with `npm run article`.
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        article: path.resolve(__dirname, 'python-2026.html'),
      },
    },
  },
})
