import { GraduationCap, Beer } from 'lucide-react'

const About = () => {
  return (
    <section id="about" className="min-h-[100dvh] md:h-screen w-full bg-background relative flex items-center overflow-hidden py-8 md:py-0">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 items-center">
          {/* Left: Content */}
          <div className="order-2 md:order-1">
            <div className="flex items-center gap-3 mb-2 md:mb-2">
              <span className="text-sm font-mono text-amber-600 dark:text-amber-400 tracking-wider font-bold">05</span>
              <div className="h-px w-12 bg-gradient-to-r from-amber-600/80 to-amber-600/0" />
              <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-widest">About Me</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-black mb-2 md:mb-3 leading-tight tracking-tight">
              Axel Sundqvist
            </h2>

            <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4 leading-relaxed max-w-xl">
              Ericsson 2026 R&D summer intern. Third year student in Applied Physics & Electrical Engineering at LiU.
              My main interests is communication systems, embedded systems, and systems engineering.
            </p>

            <div className="space-y-2 md:space-y-2 mb-3 md:mb-4">
              <div className="flex items-start gap-2.5">
                <GraduationCap className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">Education</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">B.Sc. Applied Physics & EE (2023–26), M.Sc. Communication systems (2026–28) at LiU</p>
                </div>
              </div>
        
              <div className="flex items-start gap-2.5">
                <Beer className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">Student engagements</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">Bartending at the student pub VilleValla.</p>
                </div>
              </div>
            </div>

            
          </div>

          {/* Right: Visual */}
          <div className="order-1 md:order-2">
            <div className="relative max-w-[280px] md:max-w-sm mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/20 via-transparent to-orange-500/20 rounded-2xl" />
              <div className="relative rounded-xl overflow-hidden border border-amber-500/20 shadow-2xl shadow-amber-500/10">
                <img
                  src="/images/me2.png"
                  alt="Axel Sundqvist"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
