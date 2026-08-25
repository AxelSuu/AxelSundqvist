import { motion, type Variants } from "framer-motion"
import type { ReactNode } from "react"

/** House easing — expo-out. Used for every entrance. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const

export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
}

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
}

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}

const VIEWPORT = { once: true, margin: "-12% 0px" } as const

/**
 * Scroll-reveal wrapper. Fades + rises once when it enters the viewport.
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user">.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT, delay } },
      }}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  )
}

/** Parent that staggers its <StaggerItem> children when scrolled into view. */
export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  )
}
