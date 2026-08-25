import { cn } from "@/lib/utils"
import { profile } from "@/content/profile"
import { projects } from "@/content/projects"
import type { ProjectItem, SectionProps } from "@/content/types"
import { Section } from "../layout"
import { Eyebrow, LinkArrow, MediaFrame, TagRow } from "../primitives"
import { Reveal } from "../motion"

function ProjectRow({
  project,
  position,
  flip,
}: {
  project: ProjectItem
  position: string
  flip: boolean
}) {
  const media = project.repo ? (
    <a
      href={project.repo}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title} — repository`}
      className="block"
    >
      <MediaFrame media={project.media} />
    </a>
  ) : (
    <MediaFrame media={project.media} />
  )

  return (
    <Reveal className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
      <div className={cn("md:col-span-7", flip && "md:order-2")}>{media}</div>

      <div className={cn("md:col-span-5", flip ? "md:order-1" : undefined)}>
        <div className="flex items-center gap-3">
          <span className="tnum font-display text-sm font-medium text-brand">{position}</span>
          <span className="h-px w-7 bg-hairline" />
          <Eyebrow>{project.category}</Eyebrow>
        </div>
        <h3 className="mt-5 font-display text-[clamp(2rem,3.6vw,3.1rem)] font-bold leading-[1.02] tracking-tight text-ink">
          {project.title}
        </h3>
        <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-ink-muted">
          {project.description}
        </p>
        <TagRow tags={project.tags} className="mt-6" />
        {project.repo && (
          <LinkArrow href={project.repo} className="mt-7">
            View repository
          </LinkArrow>
        )}
      </div>
    </Reveal>
  )
}

export function ProjectsSection({ id, band }: SectionProps) {
  return (
    <Section id={id} band={band}>
      <div className="flex flex-col gap-24 md:gap-32">
        {projects.map((project, i) => (
          <ProjectRow
            key={project.id}
            project={project}
            position={String(i + 1).padStart(2, "0")}
            flip={i % 2 === 1}
          />
        ))}
      </div>

      <Reveal className="mt-20 flex justify-end border-t border-hairline pt-8">
        <LinkArrow href={profile.moreReposHref}>More on GitHub — {profile.socials[0].handle}</LinkArrow>
      </Reveal>
    </Section>
  )
}
