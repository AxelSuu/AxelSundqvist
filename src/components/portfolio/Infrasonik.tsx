import { useState, useEffect } from 'react'
import type { MouseEvent } from 'react'
import { Waves, FileText, FlaskConical } from 'lucide-react'

interface InfrasonikProps {
  isActive?: boolean
}

const Infrasonik = ({ isActive }: InfrasonikProps) => {
  const [entryCount, setEntryCount] = useState(0)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (isActive) setEntryCount(c => c + 1)
  }, [isActive])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    setTilt({
      x: ((e.clientY - top) / height - 0.5) * 10,
      y: ((e.clientX - left) / width - 0.5) * -10,
    })
  }

  return (
    <section id="infrasonik" className="min-h-[100dvh] md:h-screen w-full bg-background relative flex items-center overflow-hidden pt-16 pb-8 md:py-0">
      <div className="container mx-auto px-0 md:px-12 max-w-6xl">
        <div key={entryCount} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-center">
          {/* Left: Content */}
          <div className="order-1 md:order-1">
            <div className="reveal-up flex items-center gap-3 mb-2 md:mb-2" style={{ animationDelay: '0s' }}>
              <span className="text-sm font-mono text-cyan-600 dark:text-cyan-400 tracking-wider font-bold">01</span>
              <div className="h-px w-12 bg-gradient-to-r from-cyan-600/80 to-cyan-600/0" />
              <span className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold uppercase tracking-widest">Work Experience</span>
            </div>

            <div className="reveal-up mb-2 flex flex-wrap gap-2" style={{ animationDelay: '0.05s' }}>
              <span className="inline-flex items-center rounded-full border border-border/70 bg-muted/50 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                Intern
              </span>
              <span className="inline-flex items-center rounded-full border border-border/70 bg-muted/50 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                Dec 2022 - Apr 2023
              </span>
            </div>

            <h2 className="reveal-up text-2xl md:text-4xl font-black mb-2 md:mb-2 leading-tight tracking-tight" style={{ animationDelay: '0.1s' }}>
              Infrasonik
            </h2>

            <p className="reveal-up text-sm md:text-base text-muted-foreground mb-3 md:mb-4 leading-relaxed max-w-xl" style={{ animationDelay: '0.2s' }}>
              Worked as an intern at Infrasonik.
              Worked with a small team to go from technical documentation and specification
              to a functional prototype, also contributing to other infrasound projects.
            </p>

            <div className="reveal-up hidden md:block space-y-2 md:space-y-2 mb-3 md:mb-4" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-start gap-2.5">
                <Waves className="h-4 w-4 text-cyan-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">Prototype Development</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">Designed, built and tested a prototype for an infrasound dryer</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <FileText className="h-4 w-4 text-cyan-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">Technical Documentation</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">Prepared technical reports and documentation for the projects</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <FlaskConical className="h-4 w-4 text-cyan-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">Laboratory Testing</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">Contributed to laboratory testing that validated a 50% reduction in energy consumption for grain drying prototypes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="order-2 md:order-2 reveal-up" style={{ animationDelay: '0.05s' }}>
            <div
              className="relative w-full max-w-none md:max-w-sm mx-1 md:mx-auto"
              style={{
                transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.15s ease-out',
                transformStyle: 'preserve-3d',
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            >
              <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/20 rounded-2xl" />
              <div className="relative rounded-xl overflow-hidden border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
                <img
                  src="/images/infradryer.png"
                  alt="Infrasonik Infrasound Dryer Prototype"
                  className="w-full max-h-[240px] md:max-h-none object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Infrasonik
