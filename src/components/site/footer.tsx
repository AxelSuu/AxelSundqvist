import { profile } from "@/content/profile"
import { Container, Eyebrow, SocialLinks } from "./primitives"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-hairline bg-canvas">
      <Container className="py-16 sm:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <Eyebrow>Get in touch</Eyebrow>
            <a
              href={`mailto:${profile.email}`}
              className="mt-5 block break-words font-display text-[clamp(1.6rem,5vw,3.4rem)] font-semibold tracking-tightest text-ink transition-colors duration-300 hover:text-brand"
            >
              {profile.email}
            </a>
          </div>
          <div className="flex flex-col justify-end md:col-span-3 md:col-start-10">
            <SocialLinks socials={profile.socials} withLabels />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-hairline pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {profile.name}
          </span>
          <span className="hidden sm:inline">{profile.location}</span>
          <span>Designed &amp; built in Sweden</span>
        </div>
      </Container>
    </footer>
  )
}
