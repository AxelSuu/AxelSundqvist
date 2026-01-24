import { GraduationCap, MapPin, Code2, Cpu, Brain, Calculator, User, Briefcase } from 'lucide-react'

const About = () => {
  const skills = [
    { name: 'Python', icon: Brain },
    { name: 'C++', icon: Code2 },
    { name: 'ESP32', icon: Cpu },
    { name: 'MATLAB', icon: Calculator },
  ]

  return (
    <section id="about" className="h-[100dvh] md:h-screen w-full bg-background relative flex items-center overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="grid grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left: Profile + Skills */}
          <div>
            {/* Profile card */}
            <div className="relative mb-6">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-2xl" />
              
              <div className="relative bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl p-5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                    <User className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Axel Sundqvist</h3>
                    <p className="text-sm text-muted-foreground">AP & EE Student</p>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 text-red-500" />
                      <span>Linköping / Stockholm</span>
                    </div>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center p-2.5 rounded-lg bg-muted/30 border border-border/30">
                    <div className="text-xl font-bold text-blue-400">4</div>
                    <div className="text-xs text-muted-foreground">Years on GitHub</div>
                  </div>
                  <div className="text-center p-2.5 rounded-lg bg-muted/30 border border-border/30">
                    <div className="text-xl font-bold text-purple-400">13</div>
                    <div className="text-xs text-muted-foreground">Projects</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills - moved to left */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Code2 className="h-4 w-4 text-green-400" />
                <h3 className="text-sm font-semibold">Tech Stack</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {skills.map((skill) => (
                  <div 
                    key={skill.name}
                    className="flex items-center gap-2.5 p-2 rounded-lg bg-muted/30 border border-border/30"
                  >
                    <skill.icon className="h-4 w-4 text-green-400 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">{skill.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-mono text-muted-foreground tracking-wider">05</span>
              <div className="h-px w-8 bg-blue-500/50" />
              <span className="text-xs text-blue-400 font-medium uppercase tracking-wider">About Me</span>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
              Who I Am
            </h2>
            
            <p className="text-sm md:text-base text-muted-foreground mb-5 leading-relaxed">
              I'm a third year student in Applied Physics & Electrical Engineering at Linköping University. 
              I enjoy exploring mathematics in school and embedded projects in my spare time.
              Outside of studies, I bartend at the student pub VilleValla.
            </p>

            {/* Interests */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="h-4 w-4 text-purple-400" />
                <h3 className="text-sm font-semibold">Interests</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Signal Processing', 'Machine Learning', 'Embedded Systems', 'Wireless Communications'].map((interest) => (
                  <span 
                    key={interest} 
                    className="px-2.5 py-0.5 text-xs bg-purple-500/10 text-purple-300 rounded-full border border-purple-500/20"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="h-4 w-4 text-blue-400" />
                <h3 className="text-sm font-semibold">Education</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3 p-2.5 rounded-lg bg-muted/30 border border-border/30">
                  <div>
                    <p className="text-sm font-medium">M.Sc. Applied Physics & EE</p>
                    <p className="text-xs text-blue-400">Linköping University</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">2026–28</span>
                </div>
                <div className="flex items-start justify-between gap-3 p-2.5 rounded-lg bg-muted/30 border border-border/30">
                  <div>
                    <p className="text-sm font-medium">B.Sc. Applied Physics & EE</p>
                    <p className="text-xs text-green-400">Linköping University</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">2023–26</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
