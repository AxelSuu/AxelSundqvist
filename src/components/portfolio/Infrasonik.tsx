import { Waves, FileText, FlaskConical, Building2, Calendar } from 'lucide-react'

const Infrasonik = () => {
  return (
    <section id="infrasonik" className="min-h-[100dvh] md:h-screen w-full bg-background relative flex items-center overflow-hidden pt-16 pb-8 md:py-0">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 items-center">
          {/* Left: Content */}
          <div className="order-2 md:order-1">
            <div className="flex items-center gap-3 mb-2 md:mb-2">
              <span className="text-sm font-mono text-cyan-600 dark:text-cyan-400 tracking-wider font-bold">01</span>
              <div className="h-px w-12 bg-gradient-to-r from-cyan-600/80 to-cyan-600/0" />
              <span className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold uppercase tracking-widest">Work Experience</span>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-black mb-2 md:mb-2 leading-tight tracking-tight">
              Infrasonik
            </h2>
            
            <div className="hidden md:flex items-center gap-2 mb-2 md:mb-4 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span>Laboratory Assistant R&D</span>
              <span className="text-muted-foreground/50">•</span>
              <Calendar className="h-4 w-4" />
              <span>Dec 2022 – April 2023</span>
            </div>
            
            <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4 leading-relaxed max-w-xl">
              Worked as a laboratory assistant in Research & Development at Infrasonik. 
              Collaborated with a cross-functional team to transition from technical documentation 
              to a functional prototype, contributing to innovative infrasound technology projects.
            </p>

            <div className="space-y-2 md:space-y-2 mb-3 md:mb-4">
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
                  <p className="text-xs text-muted-foreground leading-relaxed">Prepared technical reports and documentation for R&D projects</p>
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

            <div className="flex flex-wrap gap-1.5">
              {['Prototyping', 'R&D', 'Infrasound', 'Technical Writing', 'Lab Testing'].map((skill) => (
                <span 
                  key={skill} 
                  className="px-2.5 py-0.5 text-xs bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 rounded-full border border-cyan-500/30 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className="order-1 md:order-2">
            <div className="relative max-w-[280px] md:max-w-sm mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/20 rounded-2xl" />
              <div className="relative rounded-xl overflow-hidden border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
                <img 
                  src="/images/infradryer.png" 
                  alt="Infrasonik Infrasound Dryer Prototype" 
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

export default Infrasonik
