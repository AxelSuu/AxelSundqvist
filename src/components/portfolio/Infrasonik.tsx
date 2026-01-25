import { Waves, FileText, FlaskConical, Building2, Calendar } from 'lucide-react'

const Infrasonik = () => {
  return (
    <section id="infrasonik" className="min-h-[100dvh] md:h-screen w-full bg-background relative flex items-center overflow-hidden pt-16 pb-8 md:py-0">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 items-center">
          {/* Left: Content */}
          <div className="order-2 md:order-1">
            <div className="flex items-center gap-3 mb-2 md:mb-3">
              <span className="text-sm font-mono text-muted-foreground tracking-wider">01</span>
              <div className="h-px w-8 bg-cyan-500/50" />
              <span className="text-xs text-cyan-400 font-medium uppercase tracking-wider">Work Experience</span>
            </div>
            
            <h2 className="text-xl md:text-4xl font-bold mb-1 md:mb-2 leading-tight">
              Infrasonik
            </h2>
            
            <div className="flex items-center gap-2 mb-2 md:mb-4 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span>Laboratory Assistant R&D</span>
              <span className="text-muted-foreground/50">•</span>
              <Calendar className="h-4 w-4" />
              <span>Dec 2022 – April 2023</span>
            </div>
            
            <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-5 leading-relaxed">
              Worked as a laboratory assistant in Research & Development at Infrasonik, 
              contributed to innovative infrasound technology projects and gained 
              experience in teamwork, quick prototyping and technical documentation.
            </p>

            <div className="space-y-2 md:space-y-3 mb-3 md:mb-5">
              <div className="flex items-start gap-2.5">
                <Waves className="h-4 w-4 text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium">Prototype Development</p>
                  <p className="text-xs text-muted-foreground">Designed, built and tested a prototype for an infrasound dryer</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <FileText className="h-4 w-4 text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium">Technical Documentation</p>
                  <p className="text-xs text-muted-foreground">Prepared technical reports and documentation for R&D projects</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <FlaskConical className="h-4 w-4 text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium">Laboratory Testing</p>
                  <p className="text-xs text-muted-foreground">Contributed to laboratory testing on various projects</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {['Prototyping', 'R&D', 'Infrasound', 'Technical Writing', 'Lab Testing'].map((skill) => (
                <span 
                  key={skill} 
                  className="px-2.5 py-0.5 text-xs bg-cyan-500/10 text-cyan-300 rounded-full border border-cyan-500/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className="order-1 md:order-2">
            <div className="relative max-w-[140px] md:max-w-sm mx-auto">
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
