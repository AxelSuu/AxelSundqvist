import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import type { SectionBand } from "@/content/types"
import { Container, Eyebrow } from "./primitives"
import { Reveal } from "./motion"

/** Full-width section band with editorial vertical rhythm + anchor offset. */
export function Section({
  id,
  band = "canvas",
  className,
  children,
}: {
  id: string
  band?: SectionBand
  className?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-anchor relative",
        band === "sunken" ? "bg-surface-sunken" : "bg-canvas",
        className,
      )}
    >
      <Container className="py-[clamp(5.5rem,12vh,10rem)]">{children}</Container>
    </section>
  )
}

/** Editorial section header — margin index, eyebrow, headline, optional intro. */
export function SectionHeader({
  index,
  label,
  title,
  intro,
  className,
}: {
  index: string
  label: string
  title: ReactNode
  intro?: ReactNode
  className?: string
}) {
  return (
    <Reveal className={cn("mb-16 sm:mb-20", className)}>
      <div className="flex items-center gap-3">
        <span className="tnum font-display text-sm font-medium text-brand">{index}</span>
        <span className="h-px w-8 bg-hairline" />
        <Eyebrow>{label}</Eyebrow>
      </div>
      <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-[1.02] tracking-tightest text-ink">
        {title}
      </h2>
      {intro && (
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-muted">{intro}</p>
      )}
    </Reveal>
  )
}
