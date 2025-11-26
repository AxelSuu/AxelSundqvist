
import { BookOpen, Cpu, Brain, Calculator, Award, Gamepad2, Beer, Activity, GraduationCap, MapPin, Code2 } from 'lucide-react'
import { AnimatedSkillBar } from '@/components/ui/animated-skill-bar'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { GlowCard } from '@/components/ui/glow-card'
import { TextReveal } from '@/components/ui/text-reveal'

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
    <section id="about" className="py-20 bg-muted/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <TextReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-accent-text heading-wave">About Me</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get to know me more
            </p>
          </div>
        </TextReveal>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[minmax(120px,auto)]">
          
          {/* Large Bio Card */}
          <GlowCard 
            className="col-span-2 md:col-span-2 lg:col-span-3 row-span-2 p-6 flex flex-col justify-between"
            glowColor="rgba(59, 130, 246, 0.2)"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-blue-500/10">
                  <BookOpen className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-2xl font-semibold">Who I Am</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I'm a third year student in Applied Physics & Electrical Engineering who enjoys math, tech, embedded systems and running.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I'm bartending at the student pub VilleValla and always trying new beers. Currently building an embedded wireless ESP32 game.
              </p>
            </div>
            <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Linköping, Sweden</span>
            </div>
          </GlowCard>

          {/* Stats Cards - Staggered */}
          <GlowCard 
            className="col-span-1 flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-transparent"
            glowColor="rgba(59, 130, 246, 0.3)"
          >
            <AnimatedCounter value={4} label="Years on Github" className="scale-90" />
          </GlowCard>

          <GlowCard 
            className="col-span-1 flex items-center justify-center bg-gradient-to-br from-purple-500/10 to-transparent"
            glowColor="rgba(168, 85, 247, 0.3)"
          >
            <AnimatedCounter value={11} label="Projects" className="scale-90" />
          </GlowCard>


          <GlowCard 
            className="col-span-1 flex items-center justify-center bg-gradient-to-br from-orange-500/10 to-transparent"
            glowColor="rgba(249, 115, 22, 0.3)"
          >
            <AnimatedCounter value={50} suffix="%" label="Coffee" className="scale-90" />
          </GlowCard>

          {/* What Drives Me - Wide card */}
          <GlowCard 
            className="col-span-2 md:col-span-2 lg:col-span-2 p-5"
            glowColor="rgba(168, 85, 247, 0.2)"
          >
            <div className="flex items-center gap-2 mb-3">
              <Award className="h-5 w-5 text-purple-500" />
              <h3 className="font-semibold">What Drives Me</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Interested in linear algebra, signal processing, ML and wireless communications. As well as embedded and C++.
            </p>
          </GlowCard>

          {/* Skills Card - Tall */}
          <GlowCard 
            className="col-span-2 md:col-span-2 lg:col-span-3 row-span-2 p-6"
            glowColor="rgba(34, 197, 94, 0.2)"
          >
            <h3 className="text-xl font-semibold mb-5 flex items-center gap-2">
              <Code2 className="h-5 w-5 text-green-500" />
              Tech Stack
            </h3>
            <div className="space-y-4">
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

          {/* Education Card */}
          <GlowCard 
            className="col-span-2 md:col-span-2 lg:col-span-3 row-span-2 p-6"
            glowColor="rgba(59, 130, 246, 0.2)"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-blue-500" />
              Education
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-medium">MSE Applied Physics & EE</h4>
                    <p className="text-sm text-primary">Linköping University</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">2026-28</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Starting masters next year</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-medium">B.Sc. Applied Physics & EE</h4>
                    <p className="text-sm text-primary">Linköping University</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">2023-26</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Current program</p>
              </div>
            </div>
          </GlowCard>

          {/* Achievement Cards - Small scattered */}
          {achievements.map((achievement, index) => (
            <GlowCard 
              key={index}
              className="col-span-1 p-4 flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform"
              glowColor={`rgba(${index === 0 ? '245, 158, 11' : index === 1 ? '168, 85, 247' : '34, 197, 94'}, 0.3)`}
            >
              <div className={`p-2 rounded-xl ${achievement.color} mb-2 group-hover:scale-110 transition-transform`}>
                <achievement.icon className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-sm font-medium">{achievement.title}</h4>
              <p className="text-xs text-muted-foreground">{achievement.description}</p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
