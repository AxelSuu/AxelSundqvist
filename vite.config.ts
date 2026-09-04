import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const ARTICLE_DIR = 'python-2026'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Each article section is its own static entry, not a route: no router, no
  // SPA rewrite and no prerender step, and a crawler gets the prose on the
  // first request. Regenerate the pages with `npm run article`.
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        ...Object.fromEntries(
          fs
            .readdirSync(path.resolve(__dirname, ARTICLE_DIR))
            .filter(f => f.endsWith('.html'))
            .map(f => [
              `article-${path.basename(f, '.html')}`,
              path.resolve(__dirname, ARTICLE_DIR, f),
            ]),
        ),
      },
    },
  },
})
