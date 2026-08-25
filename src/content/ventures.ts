import type { VentureItem } from "./types"

/**
 * Ventures & labs. The VentureSection is staged in the registry
 * (enabled: false) until there's enough to show publicly.
 */
export const ventures: VentureItem[] = [
  {
    id: "fintech-api",
    name: "Fintech API (SaaS)",
    pitch:
      "An API-first fintech SaaS — an early-stage venture building developer-facing financial infrastructure.",
    status: "In development",
    tags: ["SaaS", "Fintech", "API", "Startup"],
  },
  {
    id: "embedded-lab",
    name: "Embedded Product-Dev Lab",
    pitch:
      "A personal embedded-systems lab for taking hardware ideas from concept to working, tested prototype.",
    status: "Ongoing",
    tags: ["Embedded", "Hardware", "Product Dev"],
  },
]
