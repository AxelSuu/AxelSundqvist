import { Suspense, lazy, useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"

const HeroCanvas = lazy(() => import("./HeroCanvas"))

/**
 * Hero background. Always renders the cheap CSS gradient mesh as a base, then
 * mounts the lazy WebGL canvas on top when the device supports it and the user
 * hasn't requested reduced motion. A legibility veil keeps the hero text crisp.
 */
export function HeroBackdrop() {
  const reduce = useReducedMotion()
  const [canWebGL, setCanWebGL] = useState(false)

  useEffect(() => {
    try {
      const c = document.createElement("canvas")
      setCanWebGL(Boolean(c.getContext("webgl2") || c.getContext("webgl")))
    } catch {
      setCanWebGL(false)
    }
  }, [])

  const showCanvas = canWebGL && !reduce

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="hero-css-mesh" />
      {showCanvas && (
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      )}
      <div className="hero-veil" />
    </div>
  )
}
