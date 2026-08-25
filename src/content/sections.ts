import type { SectionDef } from "./types"
import { Hero } from "@/components/site/hero/Hero"
import { ExperienceSection } from "@/components/site/sections/ExperienceSection"
import { ProjectsSection } from "@/components/site/sections/ProjectsSection"
import { AboutSection } from "@/components/site/sections/AboutSection"
import { WritingSection } from "@/components/site/sections/WritingSection"
import { VentureSection } from "@/components/site/sections/VentureSection"

/**
 * The section registry — the single source of truth for what renders and in
 * what order. To add a future section: drop in a content module + section
 * component, append an entry here, and flip `enabled: true`.
 */
export const sections: SectionDef[] = [
  { id: "home", navLabel: "Home", index: "00", band: "canvas", enabled: true, inNav: false, Component: Hero },
  { id: "experience", navLabel: "Experience", index: "01", band: "sunken", enabled: true, inNav: true, Component: ExperienceSection },
  { id: "projects", navLabel: "Work", index: "02", band: "canvas", enabled: true, inNav: true, Component: ProjectsSection },
  { id: "about", navLabel: "About", index: "03", band: "sunken", enabled: true, inNav: true, Component: AboutSection },

  // ── Staged: enable once content is ready ──
  { id: "writing", navLabel: "Writing", index: "04", band: "canvas", enabled: false, inNav: true, Component: WritingSection },
  { id: "ventures", navLabel: "Ventures", index: "05", band: "sunken", enabled: false, inNav: true, Component: VentureSection },
]

export const enabledSections = sections.filter((s) => s.enabled)
export const navSections = enabledSections.filter((s) => s.inNav)
