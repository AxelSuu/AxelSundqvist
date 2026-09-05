import { getCollection, getEntry, type CollectionEntry } from 'astro:content'

export type Section = {
  entry: CollectionEntry<'sections'>
  order: number
  slug: string
  href: string
  title: string
  blurb: string
  part?: string
  reviewed?: Date
}

/* A run of consecutive sections sharing a `part`, in document order. */
export type Group = { part?: string; label?: string; sections: Section[] }

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

/* Section ids are "<blog>/NNN-<slug>". The number orders the section and is
 * dropped from the URL, so inserting one between two others is a rename. */
function parseId(id: string) {
  const cut = id.indexOf('/')
  const match = /^(\d+)-(.+)$/.exec(id.slice(cut + 1))
  if (!match) throw new Error(`section "${id}" must be named NNN-slug.md`)
  return { blog: id.slice(0, cut), order: Number(match[1]), slug: match[2] }
}

/* "Practices" -> "Part I: Practices", by its position in _meta.yaml. A part
 * not listed there keeps its own name, unnumbered. */
function label(parts: string[], part: string) {
  const i = parts.indexOf(part)
  return i < 0 || i >= ROMAN.length ? part : `Part ${ROMAN[i]}: ${part}`
}

function group(sections: Section[], parts: string[]): Group[] {
  const groups: Group[] = []
  for (const section of sections) {
    const last = groups.at(-1)
    if (!last || last.part !== section.part) {
      groups.push({
        part: section.part,
        label: section.part && label(parts, section.part),
        sections: [section],
      })
    } else {
      last.sections.push(section)
    }
  }
  return groups
}

export async function loadBlog(blogId: string) {
  const meta = await getEntry('blogs', blogId)
  if (!meta) throw new Error(`blog "${blogId}" has no _meta.yaml`)

  const sections: Section[] = (
    await getCollection('sections', (e) => e.id.startsWith(`${blogId}/`))
  )
    .map((entry) => {
      const { order, slug } = parseId(entry.id)
      return { entry, order, slug, href: `/${blogId}/${slug}`, ...entry.data }
    })
    .sort((a, b) => a.order - b.order)

  const seen = new Set<string>()
  for (const s of sections) {
    if (seen.has(s.slug)) throw new Error(`duplicate slug "${s.slug}" in ${blogId}`)
    seen.add(s.slug)
  }

  return { blog: blogId, meta: meta.data, sections, groups: group(sections, meta.data.parts) }
}

export async function listBlogs() {
  return (await getCollection('blogs')).map((b) => b.id)
}
