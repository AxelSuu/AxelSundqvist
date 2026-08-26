import { useEffect, useRef } from 'react'

export default function useReveal<T extends HTMLElement>(threshold = 0.16) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-in')
      return
    }
    /* Two thresholds rather than one. The frame reveals on the way in, but only
       rearms once it is completely gone — rearming at the same 0.16 would blank
       the type while a sixth of it is still on screen. Between the two the
       state holds, so nothing flickers at the boundary. */
    const io = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (e.intersectionRatio >= threshold) e.target.classList.add('is-in')
          else if (!e.isIntersecting) e.target.classList.remove('is-in')
        }),
      { threshold: [0, threshold] }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return ref
}
