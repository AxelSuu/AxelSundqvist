import type { ReactNode } from "react"
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MediaRef, Social, SocialIcon } from "@/content/types"

/* ── Layout container ── */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-container px-6 sm:px-8 lg:px-12", className)}>
      {children}
    </div>
  )
}

/* ── Eyebrow / overline label ── */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-ink-faint",
        className,
      )}
    >
      {children}
    </span>
  )
}

/* ── Tag pill ── */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block border border-hairline px-2.5 py-1 text-[0.6875rem] uppercase tracking-[0.1em] text-ink-muted transition-colors duration-300">
      {children}
    </span>
  )
}

export function TagRow({ tags, className }: { tags: string[]; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((t) => (
        <Tag key={t}>{t}</Tag>
      ))}
    </div>
  )
}

/* ── Link with animated underline + arrow ── */
export function LinkArrow({
  href,
  children,
  external = true,
  className,
}: {
  href: string
  children: ReactNode
  external?: boolean
  className?: string
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group inline-flex items-center gap-1 text-sm font-medium text-ink transition-colors hover:text-brand",
        className,
      )}
    >
      <span className="link-underline">{children}</span>
      <ArrowUpRight
        size={16}
        className="translate-y-px transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  )
}

/* ── Social icons ── */
const ICONS: Record<SocialIcon, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
}

export function SocialLinks({
  socials,
  size = 20,
  withLabels = false,
  vertical = false,
  className,
}: {
  socials: Social[]
  size?: number
  withLabels?: boolean
  vertical?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        vertical
          ? "flex flex-col items-start gap-3.5"
          : "flex flex-wrap items-center gap-x-6 gap-y-3",
        className,
      )}
    >
      {socials.map((s) => {
        const Icon = ICONS[s.icon]
        return (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={s.label}
            className="group inline-flex items-center gap-2.5 text-ink-muted transition-colors duration-300 hover:text-brand"
          >
            <Icon size={size} strokeWidth={1.6} />
            {withLabels && (
              <span className="text-[0.8125rem] uppercase tracking-[0.12em]">{s.label}</span>
            )}
          </a>
        )
      })}
    </div>
  )
}

/* ── Image frame with refined duotone hover ── */
export function MediaFrame({
  media,
  className,
  priority = false,
}: {
  media: MediaRef
  className?: string
  priority?: boolean
}) {
  return (
    <div
      className={cn(
        "media-duotone relative overflow-hidden border border-hairline bg-surface-sunken",
        className,
      )}
      style={{ aspectRatio: media.aspect ?? "16 / 9" }}
    >
      <img
        src={media.src}
        alt={media.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-cover"
      />
    </div>
  )
}
