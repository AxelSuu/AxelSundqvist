import { writing } from "@/content/writing"
import type { SectionProps } from "@/content/types"
import { Section, SectionHeader } from "../layout"
import { LinkArrow, TagRow } from "../primitives"
import { Reveal } from "../motion"

/** Staged section — enabled in the registry once the material is ready. */
export function WritingSection({ id, index, band }: SectionProps) {
  return (
    <Section id={id} band={band}>
      <SectionHeader
        index={index}
        label="Writing & Research"
        title="Putting the theory on paper."
      />
      <div className="flex flex-col">
        {writing.map((item, i) => (
          <Reveal
            key={item.id}
            className="grid gap-y-6 border-t border-hairline py-12 first:border-t-0 md:grid-cols-12 md:gap-x-10"
          >
            <div className="md:col-span-4">
              <span className="tnum font-display text-sm font-medium text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.venue && (
                <p className="mt-4 text-[0.8125rem] uppercase tracking-[0.14em] text-ink-faint">
                  {item.venue}
                </p>
              )}
            </div>
            <div className="md:col-span-8 md:col-start-5">
              <h3 className="max-w-[24ch] font-display text-2xl font-semibold leading-tight tracking-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-ink-muted">
                {item.abstract}
              </p>
              <TagRow tags={item.tags} className="mt-6" />
              {item.link && (
                <LinkArrow href={item.link.href} className="mt-7">
                  {item.link.label}
                </LinkArrow>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
