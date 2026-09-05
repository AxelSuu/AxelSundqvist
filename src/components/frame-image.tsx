import type { CSSProperties, ImgHTMLAttributes } from 'react'
import manifest from '@/image-manifest.json'

type Entry = { w: number[]; a: number }
const SOURCES: Record<string, Entry> = manifest

/* A full-bleed frame renders its photograph at max(frame width, frame height ×
   aspect) — a portrait crop draws wider than the viewport to cover the frame's
   height. Telling the browser `100vw` there makes it pick a file too small and
   upscale it, so the width the crop actually needs is what gets declared.
   The frame's own height isn't 100vh below 760px (app.css shortens it, to
   84svh for the overture and 64svh for a chapter), so the `sizes` string
   needs that same split or a mobile phone downloads a wider file than its
   shorter frame ever shows. A contained figure is letterboxed and never
   exceeds its box, so for that one 100vw is already right. */
export default function FrameImage({
  src,
  alt,
  style,
  fit = 'cover',
  priority = false,
  mobileVh = 64,
}: {
  src: string
  alt: string
  style?: CSSProperties
  fit?: 'cover' | 'contain'
  priority?: boolean
  /* Must match the frame's min-height below 760px in app.css. */
  mobileVh?: number
}) {
  const entry = SOURCES[src]
  const base = src.replace(/\.jpg$/, '')
  /* React 18's JSX types predate fetchPriority, and the camelCase spelling
     makes it warn on every render. The DOM attribute is lowercase. */
  const hint = (priority
    ? { fetchpriority: 'high' }
    : {}) as ImgHTMLAttributes<HTMLImageElement>
  const sizes =
    fit === 'contain' || !entry
      ? '100vw'
      : `(max-width: 760px) max(100vw, calc(${mobileVh}svh * ${entry.a})), max(100vw, calc(100vh * ${entry.a}))`

  return (
    <picture>
      {entry && (
        <source
          type="image/webp"
          sizes={sizes}
          srcSet={entry.w.map(w => `${base}-${w}.webp ${w}w`).join(', ')}
        />
      )}
      <img
        src={src}
        alt={alt}
        style={style}
        loading={priority ? 'eager' : 'lazy'}
        {...hint}
      />
    </picture>
  )
}
