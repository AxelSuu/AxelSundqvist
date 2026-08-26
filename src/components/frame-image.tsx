import type { CSSProperties } from 'react'
import manifest from '@/image-manifest.json'

type Entry = { w: number[]; a: number }
const SOURCES: Record<string, Entry> = manifest

/* A full-bleed frame renders its photograph at max(frame width, frame height ×
   aspect) — on a phone the Ericsson shot fills 844px of height and so is drawn
   ~1137px wide inside a 390px box. Telling the browser `100vw` there makes it
   pick a file three times too small and upscale it, so the width the crop
   actually needs is what gets declared. A contained figure is letterboxed and
   never exceeds its box, so for that one 100vw is already right. */
export default function FrameImage({
  src,
  alt,
  style,
  fit = 'cover',
  priority = false,
}: {
  src: string
  alt: string
  style?: CSSProperties
  fit?: 'cover' | 'contain'
  priority?: boolean
}) {
  const entry = SOURCES[src]
  const base = src.replace(/\.jpg$/, '')
  const sizes = fit === 'contain' || !entry ? '100vw' : `max(100vw, calc(100vh * ${entry.a}))`

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
        fetchPriority={priority ? 'high' : undefined}
      />
    </picture>
  )
}
