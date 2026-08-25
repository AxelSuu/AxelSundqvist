import type { ExperienceItem } from "./types"

export const experience: ExperienceItem[] = [
  {
    id: "ericsson",
    org: "Ericsson",
    role: "R&D Intern — Business Area Networks (BNEW)",
    period: "Summer 2026",
    location: "Stockholm, Sweden",
    current: true,
    summary:
      "Summer R&D internship within Ericsson's Business Area Networks, working in the radio-unit domain that powers mobile networks — hands-on engineering inside one of the world's largest telecom R&D organisations.",
    highlights: [
      { title: "Radio Unit R&D", desc: "Development work in the radio-unit domain of Ericsson's RAN portfolio." },
      { title: "Telecom at Scale", desc: "Production-grade tooling, processes and systems for live mobile networks." },
    ],
    tags: ["Telecom", "5G RAN", "Radio Unit", "Embedded", "R&D"],
  },
  {
    id: "infrasonik",
    org: "Infrasonik",
    role: "R&D Intern",
    period: "Dec 2022 — Apr 2023",
    summary:
      "Worked with a small team taking an infrasound grain-drying concept from technical specification to a functional prototype, as part of research into drastically lower-energy drying.",
    highlights: [
      { title: "Prototype Development", desc: "From specification to a working infrasound dryer prototype." },
      { title: "Technical Documentation", desc: "Reports and documentation for the infrasound research projects." },
      { title: "Lab Testing", desc: "Validated a 50% reduction in grain-drying energy use in trials." },
    ],
    metrics: [
      { value: "−50%", label: "Drying energy" },
      { value: "0→1", label: "Spec to prototype" },
    ],
    tags: ["Infrasound", "Prototype Dev", "Lab Testing", "Technical Docs", "R&D"],
    media: {
      src: "/images/infradryer.png",
      alt: "Infrasonik infrasound dryer prototype",
      aspect: "4 / 3",
    },
  },
]
