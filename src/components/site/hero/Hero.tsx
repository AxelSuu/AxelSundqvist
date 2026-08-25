import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { profile } from "@/content/profile"
import type { SectionProps } from "@/content/types"
import { Container, Eyebrow, SocialLinks } from "../primitives"
import { EASE_OUT } from "../motion"
import { HeroBackdrop } from "./HeroBackdrop"

const nameContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.12 } },
}
const nameLetter = {
  hidden: { opacity: 0, y: "0.45em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
}

function NameLine({ word, className }: { word: string; className?: string }) {
  return (
    <span className={cn("block", className)}>
      {word.split("").map((ch, i) => (
        <motion.span key={`${ch}-${i}`} className="inline-block" variants={nameLetter}>
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

export function Hero({ id }: SectionProps) {
  return (
    <section
      id={id}
      className="scroll-anchor relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-canvas"
    >
      <HeroBackdrop />

      <Container className="relative z-10 py-20 sm:py-24">
        {/* Overline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
          className="mb-9 flex items-center gap-4"
        >
          <span className="h-px w-10 bg-ink" />
          <Eyebrow>{profile.role}</Eyebrow>
        </motion.div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12 lg:items-start">
          {/* Name + lede */}
          <div className="lg:col-span-8">
            <motion.h1
              variants={nameContainer}
              initial="hidden"
              animate="show"
              aria-label={profile.name}
              className="font-display text-[clamp(3rem,9.5vw,8.5rem)] font-bold leading-[0.86] tracking-tightest text-ink"
            >
              <NameLine word="Axel" />
              <NameLine word="Sundqvist" />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.66, ease: EASE_OUT }}
              className="mt-8 max-w-[44ch] text-lg leading-relaxed text-ink-muted sm:text-xl"
            >
              {profile.lede[0]}
            </motion.p>
          </div>

          {/* Focus + connect — sits high, to the right of the name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE_OUT }}
            className="flex flex-col gap-9 lg:col-span-4 lg:pt-2"
          >
            <div>
              <Eyebrow>Focus</Eyebrow>
              <ul className="mt-4">
                {profile.focus.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 border-t border-hairline py-2.5 text-[0.95rem] text-ink first:border-t-0"
                  >
                    <span className="h-1 w-1 rounded-full bg-brand" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Eyebrow>Connect</Eyebrow>
              <SocialLinks
                socials={profile.socials}
                withLabels
                vertical
                size={18}
                className="mt-4"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
