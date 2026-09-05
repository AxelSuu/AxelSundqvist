import { defineCollection } from 'astro:content'
import { z } from 'zod'
import { glob } from 'astro/loaders'

const BASE = './src/content'

/* One directory per blog under src/content/:
 *
 *   src/content/<blog>/_meta.yaml        title, parts, stamp
 *   src/content/<blog>/NNN-<slug>.md     one section, ordered by NNN
 *
 * A new blog is a new directory. Nothing else needs editing. */

const blogs = defineCollection({
  loader: glob({
    pattern: '*/_meta.yaml',
    base: BASE,
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /* Shown in the masthead. A dated review stamp is a promise to revisit. */
    stamp: z.string().optional(),
    /* Part names in order; numbering is applied at render. Sections without a
     * `part` lead the contents, ungrouped. */
    parts: z.array(z.string()).default([]),
    /* Loads the KaTeX stylesheet and its fonts. Off by default: that is
     * ~300 kB a blog with no equations should not pay for. */
    math: z.boolean().default(false),
  }),
})

const sections = defineCollection({
  loader: glob({ pattern: '*/[0-9]*.md', base: BASE }),
  schema: z.object({
    title: z.string(),
    /* One line. Carries the index listing and the page's meta description. */
    blurb: z.string(),
    part: z.string().optional(),
  }),
})

export const collections = { blogs, sections }
