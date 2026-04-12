import { useState, useEffect } from 'react'
import type { MouseEvent } from 'react'
import { GraduationCap, Beer } from 'lucide-react'

interface AboutProps {
  isActive?: boolean
}

const About = ({ isActive }: AboutProps) => {
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
    <section id="about" className="min-h-[100dvh] md:h-screen w-full bg-background relative flex items-center overflow-hidden py-8 md:py-0">
      <div className="container mx-auto px-0 md:px-12 max-w-6xl">
        <div key={entryCount} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 items-center">
          {/* Left: Content */}
          <div className="order-2 md:order-1">
            <div className="reveal-up flex items-center gap-3 mb-2 md:mb-2" style={{ animationDelay: '0s' }}>
              <span className="text-sm font-mono text-amber-600 dark:text-amber-400 tracking-wider font-bold">05</span>
              <div className="h-px w-12 bg-gradient-to-r from-amber-600/80 to-amber-600/0" />
              <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-widest">About Me</span>
            </div>

            <h2 className="reveal-up text-2xl md:text-4xl font-black mb-2 md:mb-3 leading-tight tracking-tight" style={{ animationDelay: '0.1s' }}>
              Axel Sundqvist
            </h2>

            <p className="reveal-up text-sm md:text-base text-muted-foreground mb-3 md:mb-4 leading-relaxed max-w-xl" style={{ animationDelay: '0.2s' }}>
              Ericsson 2026 R&D summer intern. Third year student in Applied Physics & Electrical Engineering at LiU.
              My main interests are communication systems, embedded systems, and signal processing.
            </p>

            <div className="reveal-up space-y-2 md:space-y-2 mb-3 md:mb-4" style={{ animationDelay: '0.3s' }}>
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
          <div className="order-1 md:order-2 reveal-up" style={{ animationDelay: '0.05s' }}>
            <div
              className="relative max-w-[280px] md:max-w-sm mx-auto"
              style={{
                transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.15s ease-out',
                transformStyle: 'preserve-3d',
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            >
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
