import type { ComponentType } from "react"

/* ── Shared primitives ── */

export type SocialIcon = "github" | "linkedin" | "mail"

export interface Social {
  label: string
  href: string
  handle?: string
  icon: SocialIcon
}

export interface Link {
  label: string
  href: string
  external?: boolean
}

export interface MediaRef {
  src: string
  alt: string
  /** CSS aspect-ratio value, e.g. "16 / 9" — reserves space to prevent CLS */
  aspect?: string
}

export interface Metric {
  value: string
  label: string
}

export interface Highlight {
  title: string
  desc: string
}

export interface EducationItem {
  degree: string
  period: string
  school: string
}

/* ── Content items ── */

export interface ExperienceItem {
  id: string
  org: string
  role: string
  period: string
  location?: string
  current?: boolean
  summary: string
  highlights?: Highlight[]
  metrics?: Metric[]
  tags: string[]
  media?: MediaRef
  links?: Link[]
}

export interface ProjectItem {
  id: string
  title: string
  category: string
  description: string
  tags: string[]
  media: MediaRef
  repo?: string
  demo?: string
  year?: string
}

export interface WritingItem {
  id: string
  title: string
  venue?: string
  year?: string
  abstract: string
  tags: string[]
  link?: Link
  media?: MediaRef
}

export interface VentureItem {
  id: string
  name: string
  pitch: string
  status: string
  tags: string[]
  links?: Link[]
  media?: MediaRef
}

/* ── Profile ── */

export interface Profile {
  name: string
  initials: string
  role: string
  location: string
  email: string
  /** Hero positioning lines */
  lede: string[]
  /** Hero focus tags */
  focus: string[]
  /** About paragraph(s) */
  bio: string[]
  socials: Social[]
  education: EducationItem[]
  skills: string[]
  engagement: { title: string; lines: string[] }[]
  moreReposHref: string
}

/* ── Section registry ── */

export type SectionBand = "canvas" | "sunken"

export interface SectionProps {
  id: string
  index: string
  band: SectionBand
}

export interface SectionDef {
  id: string
  navLabel: string
  /** Editorial index shown in the margin, e.g. "01" */
  index: string
  band: SectionBand
  /** Future sections can be staged with enabled: false */
  enabled: boolean
  /** Whether the section appears as a nav link (hero usually does not) */
  inNav?: boolean
  Component: ComponentType<SectionProps>
}
