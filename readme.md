# Personal Website

https://axelsundqvist.se/

Astro, with the portfolio itself as a React island and each blog rendered from
Markdown at build time.

```
npm run dev      # localhost:4321
npm run build    # astro check && astro build -> dist/
npm run lint
```

## Layout

```
src/
  pages/index.astro          the portfolio; mounts <App client:load />
  pages/[blog]/index.astro   a blog's contents page
  pages/[blog]/[slug].astro  one section
  layouts/Reference.astro    masthead, contents sidebar, pager, footer
  styles/reference.css       every blog's styling, in one file
  content.config.ts          frontmatter schemas
  lib/blog.ts                ordering, part grouping, prev/next
  content/<blog>/            the writing
```

## Adding a blog

Make a directory under `src/content/` and put two kinds of file in it. No code
changes, no route to register.

`_meta.yaml` describes the blog:

```yaml
title: Waveform Design for FMCW Radar
description: One sentence, for search results and social cards.
stamp: Reviewed March 2027      # optional, shown in the masthead
parts:                          # optional; numbered I, II, III at render
  - Fundamentals
  - Practice
math: true                      # optional; loads KaTeX only where it is needed
```

`NNN-<slug>.md` is one section. The number orders it and is dropped from the
URL, so `010-the-beat-signal.md` publishes at `/<blog>/the-beat-signal`. Leave
gaps in the numbering and inserting a section later is a filename, not a
renumbering.

```markdown
---
title: "The beat signal"
blurb: "Why the difference frequency carries the range."
part: "Fundamentals"       # omit to lead the contents, ungrouped
---
```

A missing or misspelled key fails the build and names the file.

## What the Markdown supports

GitHub-flavoured Markdown, plus:

* **Equations** — `$inline$` and `$$display$$`, rendered to HTML at build time
  by KaTeX. Set `math: true` in `_meta.yaml`, which is what loads the ~300 kB
  of stylesheet and fonts; blogs without it pay nothing.
* **Syntax highlighting** — Shiki, from the language on the fence. No setup per
  language.
* **Tables and code** get wrapped in a scroll box automatically, so the page
  body never scrolls sideways on a phone.

## Images

`scripts/images.py` builds the responsive WebP sizes in `public/images/` from
the originals in `assets-src/`, and writes `src/image-manifest.json`.
`public/og.html` is the social card source; the regeneration command is in a
comment at the top of it.
