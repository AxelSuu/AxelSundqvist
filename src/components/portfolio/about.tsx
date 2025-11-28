
import { BookOpen, Cpu, Brain, Calculator, Award, Gamepad2, Beer, Activity, GraduationCap, MapPin, Code2 } from 'lucide-react'
import { AnimatedSkillBar } from '@/components/ui/animated-skill-bar'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { GlowCard } from '@/components/ui/glow-card'
import { TiltCard } from '@/components/ui/tilt-card'

const About = () => {
  const skills = [
    { name: 'PyTorch', icon: Brain, color: 'bg-blue-500' },
    { name: 'NumPy', icon: BookOpen, color: 'bg-purple-500' },
    { name: 'Scikit-Learn', icon: Calculator, color: 'bg-green-500' },
    { name: 'C++', icon: Code2, color: 'bg-orange-500' },
    { name: 'Embedded', icon: Cpu, color: 'bg-yellow-500' },
  ]

  const achievements = [
    {
      title: 'Beer Pong Top 8',
      description: 'LIUs BP Tournament',
      icon: Beer,
      color: 'bg-amber-500'
    },
    {
      title: 'VilleValla Bartender',
      description: 'Student pub',
      icon: Activity,
      color: 'bg-purple-500'
    },
    {
      title: 'ESP32 pong',
      description: 'Perihperals + wifi',
      icon: Gamepad2,
      color: 'bg-green-500'
    }
  ]

  return (
    <section id="about" className="h-screen w-full py-2 bg-background relative flex items-center overflow-hidden">

      <div className="container mx-auto px-3 md:px-4 relative z-10 max-h-full">
        {/* Bento Grid Layout - Simplified for mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1.5 md:gap-2 auto-rows-[minmax(40px,1fr)] md:auto-rows-[minmax(50px,1fr)] max-h-[85vh] md:max-h-[75vh] overflow-y-auto md:overflow-hidden scrollbar-hide">
          
          {/* Large Bio Card */}
          <TiltCard className="col-span-2 md:col-span-2 lg:col-span-3 row-span-2 h-full" tiltMaxAngle={5}>
              <GlowCard 
                className="h-full p-3 flex flex-col justify-between"
                glowColor="rgba(59, 130, 246, 0.2)"
              >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                        <BookOpen className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold">Who I Am</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                      I'm a third year student in Applied Physics & Electrical Engineering who enjoys math, tech, embedded systems and running.
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      I'm bartending at the student pub VilleValla and always trying new beers.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 text-red-500" />
                    <span>Linköping, Sweden</span>
                  </div>
                </GlowCard>
          </TiltCard>

          {/* Stats Cards - Staggered with tilt */}
          <TiltCard className="col-span-1" tiltMaxAngle={15}>
            <GlowCard 
              className="h-full flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-transparent card-shine"
              glowColor="rgba(59, 130, 246, 0.3)"
            >
              <AnimatedCounter value={4} label="Years on Github" className="scale-90" />
            </GlowCard>
          </TiltCard>

          <TiltCard className="col-span-1" tiltMaxAngle={15}>
            <GlowCard 
              className="h-full flex items-center justify-center bg-gradient-to-br from-purple-500/10 to-transparent card-shine"
              glowColor="rgba(168, 85, 247, 0.3)"
            >
              <AnimatedCounter value={11} label="Projects" className="scale-90" />
            </GlowCard>
          </TiltCard>

          <TiltCard className="col-span-1" tiltMaxAngle={15}>
            <GlowCard 
              className="h-full flex items-center justify-center bg-gradient-to-br from-orange-500/10 to-transparent card-shine"
              glowColor="rgba(249, 115, 22, 0.3)"
            >
              <AnimatedCounter value={50} suffix="%" label="Coffee" className="scale-90" />
            </GlowCard>
          </TiltCard>

          {/* What Drives Me - Wide card */}
          <TiltCard className="col-span-2 md:col-span-2 lg:col-span-2" tiltMaxAngle={8}>
            <GlowCard 
              className="h-full p-3 card-shine"
              glowColor="rgba(168, 85, 247, 0.2)"
            >
              <div className="flex items-center gap-2 mb-1">
                <Award className="h-4 w-4 text-purple-500" />
                <h3 className="font-semibold text-sm">What Drives Me</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Linear algebra, signal processing, ML and wireless communications.
              </p>
            </GlowCard>
          </TiltCard>

          {/* Skills Card - Tall - Hidden on mobile */}
          <TiltCard className="hidden md:block col-span-2 md:col-span-2 lg:col-span-3 row-span-3" tiltMaxAngle={6}>
            <GlowCard 
              className="h-full p-4"
              glowColor="rgba(34, 197, 94, 0.2)"
            >
                <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-green-500" />
                  Tech Stack
                </h3>
                <div className="space-y-3">
                  {skills.map((skill, index) => (
                    <AnimatedSkillBar
                      key={index}
                      name={skill.name}
                      icon={skill.icon}
                      color={skill.color}
                    />
                  ))}
                </div>
              </GlowCard>
          </TiltCard>

          {/* Education Card */}
          <TiltCard className="col-span-2 md:col-span-2 lg:col-span-3 row-span-2" tiltMaxAngle={6}>
            <GlowCard 
              className="h-full p-3 card-shine"
              glowColor="rgba(59, 130, 246, 0.2)"
            >
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-blue-500" />
                Education
              </h3>
              <div className="space-y-2">
                <div className="p-2 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/30 transition-colors group">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-medium text-xs group-hover:text-primary transition-colors">MSE Applied Physics & EE</h4>
                      <p className="text-xs text-primary">Linköping University</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground px-1.5 py-0.5 rounded-full bg-primary/10">2026-28</span>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/30 transition-colors group">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-medium text-xs group-hover:text-primary transition-colors">B.Sc. Applied Physics & EE</h4>
                      <p className="text-xs text-primary">Linköping University</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-500">2023-26</span>
                  </div>
                </div>
              </div>
            </GlowCard>
          </TiltCard>

          {/* Achievement Cards - Small scattered with hover effects */}
          {achievements.map((achievement, index) => (
            <TiltCard key={index} className="col-span-1" tiltMaxAngle={20}>
              <GlowCard 
                className="h-full p-2 flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform card-shine"
                glowColor={`rgba(${index === 0 ? '245, 158, 11' : index === 1 ? '168, 85, 247' : '34, 197, 94'}, 0.3)`}
              >
                <div className={`p-1.5 rounded-lg ${achievement.color} mb-1 group-hover:scale-110 transition-all shadow-lg`}>
                  <achievement.icon className="h-3 w-3 text-white" />
                </div>
                <h4 className="text-xs font-medium">{achievement.title}</h4>
                <p className="text-[10px] text-muted-foreground">{achievement.description}</p>
              </GlowCard>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
