import { ventures } from "@/content/ventures"
import type { SectionProps } from "@/content/types"
import { Section, SectionHeader } from "../layout"
import { TagRow } from "../primitives"
import { Reveal, Stagger, StaggerItem } from "../motion"

/** Staged section — enabled in the registry once there's enough to show. */
export function VentureSection({ id, index, band }: SectionProps) {
  return (
    <Section id={id} band={band}>
      <SectionHeader
        index={index}
        label="Ventures & Labs"
        title="Building things of my own."
      />
      <Stagger className="grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-2">
        {ventures.map((v) => (
          <StaggerItem key={v.id} className="flex flex-col bg-surface p-8 sm:p-10">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                {v.name}
              </h3>
              <span className="whitespace-nowrap text-[0.6875rem] uppercase tracking-[0.12em] text-brand">
                {v.status}
              </span>
            </div>
            <p className="mt-4 flex-1 text-base leading-relaxed text-ink-muted">{v.pitch}</p>
            <TagRow tags={v.tags} className="mt-6" />
          </StaggerItem>
        ))}
      </Stagger>
      <Reveal className="mt-10">
        <p className="text-sm text-ink-faint">More to come.</p>
      </Reveal>
    </Section>
  )
}
