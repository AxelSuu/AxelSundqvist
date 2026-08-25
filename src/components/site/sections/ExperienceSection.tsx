import { experience } from "@/content/experience"
import type { ExperienceItem, SectionProps } from "@/content/types"
import { Section } from "../layout"
import { MediaFrame, TagRow } from "../primitives"
import { Reveal, Stagger, StaggerItem } from "../motion"

function NowBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 border border-brand px-2 py-0.5 text-[0.625rem] font-medium uppercase tracking-[0.12em] text-brand">
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      Now
    </span>
  )
}

function ExperienceRow({ item, position }: { item: ExperienceItem; position: string }) {
  return (
    <Reveal className="grid gap-y-8 border-t border-hairline py-12 first:border-t-0 md:grid-cols-12 md:gap-x-10 md:py-16">
      {/* Meta */}
      <div className="md:col-span-4">
        <div className="flex items-center gap-3">
          <span className="tnum font-display text-sm font-medium text-brand">{position}</span>
          {item.current && <NowBadge />}
        </div>
        <p className="mt-4 text-[0.8125rem] uppercase tracking-[0.14em] text-ink-faint">
          {item.period}
        </p>
        <h3 className="mt-3 font-display text-[clamp(1.9rem,3.2vw,2.75rem)] font-bold leading-[1.02] tracking-tight text-ink">
          {item.org}
        </h3>
        <p className="mt-1 text-sm text-ink-muted">{item.role}</p>
        {item.location && <p className="mt-1 text-sm text-ink-faint">{item.location}</p>}

        {item.media && (
          <MediaFrame media={item.media} className="mt-7 hidden md:block" />
        )}
      </div>

      {/* Body */}
      <div className="md:col-span-8 md:col-start-5">
        <p className="max-w-[60ch] text-lg leading-relaxed text-ink">{item.summary}</p>

        {item.metrics && (
          <div className="mt-9 flex flex-wrap gap-x-12 gap-y-6">
            {item.metrics.map((m) => (
              <div key={m.label}>
                <div className="tnum font-display text-3xl font-semibold text-ink">{m.value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.14em] text-ink-faint">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {item.highlights && (
          <Stagger className="mt-9 grid gap-7 sm:grid-cols-2">
            {item.highlights.map((h) => (
              <StaggerItem key={h.title} className="border-l border-hairline pl-4">
                <div className="text-sm font-medium text-ink">{h.title}</div>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{h.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
        )}

        <TagRow tags={item.tags} className="mt-9" />

        {item.media && (
          <MediaFrame media={item.media} className="mt-9 md:hidden" />
        )}
      </div>
    </Reveal>
  )
}

export function ExperienceSection({ id, band }: SectionProps) {
  return (
    <Section id={id} band={band}>
      <div className="flex flex-col">
        {experience.map((item, i) => (
          <ExperienceRow key={item.id} item={item} position={String(i + 1).padStart(2, "0")} />
        ))}
      </div>
    </Section>
  )
}
