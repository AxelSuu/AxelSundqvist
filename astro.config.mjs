import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import { satteri } from '@astrojs/markdown-satteri'
import { katexPlugin } from './src/lib/katex-plugin.ts'
import { scrollPlugin } from './src/lib/scroll-plugin.ts'

// https://astro.build/config
export default defineConfig({
  site: 'https://axelsundqvist.se',
  integrations: [react()],
  markdown: {
    processor: satteri({
      features: { math: true },
      mdastPlugins: [katexPlugin],
      hastPlugins: [scrollPlugin],
    }),
    // A light theme so code sits on the paper ground like the rest of the
    // page; reference.css overrides the background Shiki bakes in.
    shikiConfig: { theme: 'github-light', wrap: false },
  },
  // Directory format keeps the blog index at /python-2026/index.html; `file`
  // would flatten it to /python-2026.html and break the trailing-slash URL
  // the masthead and the portfolio both link to.
  trailingSlash: 'ignore',
  vite: {
    optimizeDeps: {
      // These reach Vite only through the island's dynamic import, so its
      // scan of src/pages misses them. Discovered late, it re-optimizes and
      // answers the in-flight request with 504 Outdated Optimize Dep — which
      // Astro's island loader reports as "Error hydrating" and never retries,
      // leaving the reveal animation unarmed and every chapter's type at
      // opacity 0. Pre-bundling them up front is the documented fix.
      include: ['@vercel/analytics/react', 'react', 'react-dom', 'react-dom/client'],
    },
  },
})
