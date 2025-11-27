
import { BookOpen, Cpu, Brain, Calculator, Award, Gamepad2, Beer, Activity, GraduationCap, MapPin, Code2, Sparkles } from 'lucide-react'
import { AnimatedSkillBar } from '@/components/ui/animated-skill-bar'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { GlowCard } from '@/components/ui/glow-card'
import { TextReveal } from '@/components/ui/text-reveal'
import { TiltCard } from '@/components/ui/tilt-card'
import { HolographicCard } from '@/components/ui/holographic-card'
import { AnimatedGradientBorder } from '@/components/ui/animated-gradient-border'
import { StaggerText } from '@/components/ui/stagger-text'

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
    <section id="about" className="py-20 bg-muted/50 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float-medium" />
        <div className="absolute bottom-40 left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <TextReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">About</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <StaggerText text="Get to know me" className="animated-gradient-text" staggerDelay={40} />
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A bit about who I am and what I do
            </p>
          </div>
        </TextReveal>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[minmax(120px,auto)]">
          
          {/* Large Bio Card */}
          <AnimatedGradientBorder containerClassName="col-span-2 md:col-span-2 lg:col-span-3 row-span-2">
            <TiltCard className="h-full" tiltMaxAngle={5}>
              <HolographicCard className="h-full">
                <GlowCard 
                  className="h-full p-6 flex flex-col justify-between bg-transparent border-0"
                  glowColor="rgba(59, 130, 246, 0.2)"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                        <BookOpen className="h-6 w-6 text-white" />
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
                    <MapPin className="h-4 w-4 text-red-500" />
                    <span>Linköping, Sweden</span>
                  </div>
                </GlowCard>
              </HolographicCard>
            </TiltCard>
          </AnimatedGradientBorder>

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
              className="h-full p-5 card-shine"
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
          </TiltCard>

          {/* Skills Card - Tall with holographic effect */}
          <TiltCard className="col-span-2 md:col-span-2 lg:col-span-3 row-span-2" tiltMaxAngle={6}>
            <HolographicCard className="h-full">
              <GlowCard 
                className="h-full p-6 bg-transparent border-0"
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
            </HolographicCard>
          </TiltCard>

          {/* Education Card */}
          <TiltCard className="col-span-2 md:col-span-2 lg:col-span-3 row-span-2" tiltMaxAngle={6}>
            <GlowCard 
              className="h-full p-6 card-shine"
              glowColor="rgba(59, 130, 246, 0.2)"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-blue-500" />
                Education
              </h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-muted/50 border border-border/50 hover:border-primary/30 transition-colors group">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-medium group-hover:text-primary transition-colors">MSE Applied Physics & EE</h4>
                      <p className="text-sm text-primary">Linköping University</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap px-2 py-1 rounded-full bg-primary/10">2026-28</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Starting masters next year</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border border-border/50 hover:border-primary/30 transition-colors group">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-medium group-hover:text-primary transition-colors">B.Sc. Applied Physics & EE</h4>
                      <p className="text-sm text-primary">Linköping University</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap px-2 py-1 rounded-full bg-green-500/10 text-green-500">2023-26</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Current program</p>
                </div>
              </div>
            </GlowCard>
          </TiltCard>

          {/* Achievement Cards - Small scattered with hover effects */}
          {achievements.map((achievement, index) => (
            <TiltCard key={index} className="col-span-1" tiltMaxAngle={20}>
              <GlowCard 
                className="h-full p-4 flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform card-shine"
                glowColor={`rgba(${index === 0 ? '245, 158, 11' : index === 1 ? '168, 85, 247' : '34, 197, 94'}, 0.3)`}
              >
                <div className={`p-2 rounded-xl ${achievement.color} mb-2 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg`}>
                  <achievement.icon className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-sm font-medium">{achievement.title}</h4>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </GlowCard>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
