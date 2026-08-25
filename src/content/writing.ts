import type { WritingItem } from "./types"

/**
 * Writing / research. The WritingSection is staged in the registry
 * (enabled: false) until the linked material is ready to publish.
 */
export const writing: WritingItem[] = [
  {
    id: "iq-demod",
    title: "I/Q Demodulation of a Narrow-Band Radio Signal",
    venue: "Course paper · Linköping University",
    abstract:
      "A study of coherent I/Q demodulation for a narrow-band radio signal — deriving baseband recovery, analysing noise behaviour, and validating the approach in simulation.",
    tags: ["DSP", "I/Q", "Demodulation", "Communications", "MATLAB"],
    // link: { label: "Read the paper (PDF)", href: "/papers/iq-demodulation.pdf", external: true },
  },
]
