import { profile } from "@/content/profile"
import type { SectionProps } from "@/content/types"
import { Section } from "../layout"
import { Eyebrow, MediaFrame, SocialLinks, TagRow } from "../primitives"
import { Reveal } from "../motion"

export function AboutSection({ id, band }: SectionProps) {
  return (
    <Section id={id} band={band}>
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        {/* Portrait */}
        <div className="md:col-span-5 lg:col-span-4">
          <Reveal>
            <MediaFrame
              media={{ src: "/images/me2.png", alt: "Portrait of Axel Sundqvist", aspect: "4 / 5" }}
            />
            <SocialLinks socials={profile.socials} withLabels className="mt-7" />
          </Reveal>
        </div>

        {/* Bio + details */}
        <div className="md:col-span-7 lg:col-span-7 lg:col-start-6">
          <Reveal>
            <h2 className="max-w-[15ch] font-display text-[clamp(2.1rem,4.6vw,3.5rem)] font-bold leading-[1.0] tracking-tightest text-ink">
              Engineer at the boundary of hardware and radio.
            </h2>
            <div className="mt-7 max-w-[58ch] space-y-5 text-lg leading-relaxed text-ink-muted">
              {profile.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-12 grid gap-10 border-t border-hairline pt-10 sm:grid-cols-2">
            <div>
              <Eyebrow>Education</Eyebrow>
              <ul className="mt-4 space-y-4">
                {profile.education.map((e) => (
                  <li key={e.degree}>
                    <div className="text-sm font-medium text-ink">{e.degree}</div>
                    <div className="mt-1 text-sm text-ink-muted">
                      {e.school} · <span className="tnum">{e.period}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Eyebrow>{profile.engagement[0].title}</Eyebrow>
                {profile.engagement[0].lines.map((l) => (
                  <p key={l} className="mt-3 text-sm text-ink-muted">
                    {l}
                  </p>
                ))}
              </div>

              <div className="mt-8">
                <Eyebrow>Based in</Eyebrow>
                <p className="mt-3 text-sm text-ink-muted">{profile.location}</p>
              </div>
            </div>

            <div>
              <Eyebrow>Skills &amp; Tools</Eyebrow>
              <TagRow tags={profile.skills} className="mt-4" />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
