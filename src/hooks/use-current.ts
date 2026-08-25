import { useEffect, useState } from 'react'

/* Which chapter is on screen — drives the counter in the corner. */
export default function useCurrent(ids: string[]) {
  const [current, setCurrent] = useState<string | null>(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const io = new IntersectionObserver(
      entries => {
        const best = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (best) setCurrent(best.target.id)
      },
      { threshold: [0.35, 0.6, 0.9] }
    )

    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [ids.join(',')])

  return current
}
