import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Github, Radio, Brain, Gamepad2, BookOpen, Sparkles } from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import { TextReveal } from '@/components/ui/text-reveal'
import { TiltCard } from '@/components/ui/tilt-card'
import { HolographicCard } from '@/components/ui/holographic-card'
import { AnimatedGradientBorder } from '@/components/ui/animated-gradient-border'
import { StaggerText } from '@/components/ui/stagger-text'

const Projects = () => {
  const projects = [
    {
      title: 'ESP32-S3 Wireless Pong',
      description: 'Embedded wireless pong game with SPI, Wi-Fi communication, and OLED peripheral in C++',
      technologies: ['C++', 'Embedded', 'Esp32-S3', 'WiFi'],
      icon: Radio,
      color: 'bg-purple-500',
      github: 'https://github.com/AxelSuu/ESP32-Wi-Fi-Pong',
      demo: null,
      featured: false,
      size: 'large', // Takes 2 rows
    },
    {
      title: 'PyTorch Stock Forecasting',
      description: 'Developed a PyTorch-based stock price forecaster with Yahoo Finance as a learning project.',
      technologies: ['Python', 'PyTorch', 'Numpy', 'Yahoo Finance'],
      icon: Brain,
      color: 'bg-blue-500',
      github: 'https://github.com/AxelSuu/Pytorch-Quant-Model',
      demo: null,
      featured: false,
      size: 'tall', // Takes 2 columns
    },
    {
      title: '2D Platformer Game',
      description: 'A 2D platformer game built with Python and Pygame.',
      technologies: ['Python', 'Pygame'],
      icon: Gamepad2,
      color: 'bg-green-500',
      github: 'https://github.com/AxelSuu/Skybound-2.0',
      demo: null,
      featured: false,
      size: 'normal',
    },
    {
      title: 'PDF to excel',
      description: 'Excel table pipeline',
      technologies: ['Python', 'camelot-py', 'xlsxwriter'],
      icon: BookOpen,
      color: 'bg-orange-500',
      github: 'https://github.com/AxelSuu/SBB-pdf-report-to-excel',
      demo: null,
      featured: false,
      size: 'normal',
    },
  ]

  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-20 bg-muted/50 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-medium" style={{ animationDelay: '-2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <TextReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Portfolio</span>
            </div>
            <h2 id="projects-heading" className="text-4xl md:text-5xl font-bold mb-6">
              <StaggerText text="Featured Projects" className="animated-gradient-text" staggerDelay={40} />
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              What I do in my spare time
            </p>
          </div>
        </TextReveal>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)]">
          
          {/* Featured Large Card - Spans 2 cols with Holographic effect */}
          <AnimatedGradientBorder 
            containerClassName="md:col-span-2 md:row-span-2"
            className="h-full"
          >
            <TiltCard className="h-full" tiltMaxAngle={8}>
              <HolographicCard className="h-full">
                <GlowCard 
                  className="h-full group relative overflow-hidden bg-transparent border-0"
                  glowColor="rgba(59, 130, 246, 0.4)"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <Brain className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl">{projects[0].title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col h-full">
                    <p className="text-muted-foreground mb-6 leading-relaxed text-lg flex-grow">
                      {projects[0].description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {projects[0].technologies.map((tech, i) => (
                        <Badge 
                          key={i} 
                          variant="secondary" 
                          className="hover:scale-110 transition-transform bg-primary/10 border-primary/20 hover:bg-primary/20"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" className="w-fit group/btn electric-border" asChild>
                      <a href={projects[0].github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4 group-hover/btn:rotate-12 transition-transform" />
                        View Code
                      </a>
                    </Button>
                  </CardContent>
                </GlowCard>
              </HolographicCard>
            </TiltCard>
          </AnimatedGradientBorder>

          {/* Tall Card - Spans 2 rows with Tilt effect */}
          <TiltCard className="md:row-span-2" tiltMaxAngle={10}>
            <GlowCard 
              className="h-full group relative overflow-hidden card-shine"
              glowColor="rgba(168, 85, 247, 0.4)"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                    <Radio className="h-7 w-7 text-white" />
                  </div>
                </div>
                <CardTitle className="text-xl mt-3">{projects[1].title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col h-full">
                <p className="text-muted-foreground mb-4 leading-relaxed flex-grow">
                  {projects[1].description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {projects[1].technologies.map((tech, i) => (
                    <Badge key={i} variant="outline" className="text-xs hover:scale-110 transition-transform hover:bg-purple-500/10">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-fit group/btn" asChild>
                  <a href={projects[1].github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4 group-hover/btn:rotate-12 transition-transform" />
                    Code
                  </a>
                </Button>
              </CardContent>
            </GlowCard>
          </TiltCard>

          {/* Info/Stats Card with animated counter */}
          <TiltCard tiltMaxAngle={15}>
            <GlowCard 
              className="h-full bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 flex items-center justify-center relative overflow-hidden"
              glowColor="rgba(6, 182, 212, 0.3)"
            >
              {/* Animated background circles */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-32 h-32 rounded-full bg-cyan-500/20 -top-10 -left-10 animate-float-slow" />
                <div className="absolute w-24 h-24 rounded-full bg-purple-500/20 -bottom-8 -right-8 animate-float-medium" />
              </div>
              <div className="text-center p-4 relative z-10">
                <div className="text-5xl font-bold animated-gradient-text mb-2">11</div>
                <p className="text-sm text-muted-foreground">Projects Completed</p>
              </div>
            </GlowCard>
          </TiltCard>

          {/* Small Project Cards with hover effects */}
          <TiltCard tiltMaxAngle={12}>
            <GlowCard 
              className="h-full group hover:-translate-y-1 transition-all duration-300 card-shine"
              glowColor="rgba(34, 197, 94, 0.3)"
            >
              <CardContent className="p-5 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 group-hover:scale-110 group-hover:rotate-6 transition-all">
                    <Gamepad2 className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold">{projects[2].title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3 flex-grow">{projects[2].description}</p>
                <div className="flex gap-2 flex-wrap mb-3">
                  {projects[2].technologies.map((tech, i) => (
                    <Badge key={i} variant="outline" className="text-xs hover:scale-105 transition-transform">{tech}</Badge>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="w-fit -ml-2 group/btn" asChild>
                  <a href={projects[2].github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-1 h-3 w-3" />
                    <span className="text-xs">View</span>
                  </a>
                </Button>
              </CardContent>
            </GlowCard>
          </TiltCard>

          <TiltCard tiltMaxAngle={12}>
            <GlowCard 
              className="h-full group hover:-translate-y-1 transition-all duration-300 card-shine"
              glowColor="rgba(249, 115, 22, 0.3)"
            >
              <CardContent className="p-5 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 group-hover:scale-110 group-hover:-rotate-6 transition-all">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold">{projects[3].title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3 flex-grow">{projects[3].description}</p>
                <div className="flex gap-2 flex-wrap mb-3">
                  {projects[3].technologies.map((tech, i) => (
                    <Badge key={i} variant="outline" className="text-xs hover:scale-105 transition-transform">{tech}</Badge>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="w-fit -ml-2 group/btn" asChild>
                  <a href={projects[3].github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-1 h-3 w-3" />
                    <span className="text-xs">View</span>
                  </a>
                </Button>
              </CardContent>
            </GlowCard>
          </TiltCard>

          {/* CTA Card with animated border */}
          <AnimatedGradientBorder containerClassName="md:col-span-2 lg:col-span-1">
            <GlowCard 
              className="h-full bg-gradient-to-br from-primary/5 to-purple-500/5 flex items-center justify-center group cursor-pointer"
              glowColor="rgba(168, 85, 247, 0.2)"
            >
              <a 
                href="https://github.com/AxelSuu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-center p-6 w-full h-full flex flex-col items-center justify-center"
              >
                <div className="relative">
                  <Github className="h-12 w-12 mb-3 text-muted-foreground group-hover:text-primary transition-all duration-300" />
                  {/* Pulse ring effect */}
                  <div className="absolute inset-0 rounded-full border-2 border-primary/50 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                </div>
                <p className="font-semibold text-lg group-hover:text-primary transition-colors">More on GitHub</p>
                <p className="text-xs text-muted-foreground mt-1 group-hover:translate-x-1 transition-transform">
                  View all repositories →
                </p>
              </a>
            </GlowCard>
          </AnimatedGradientBorder>
        </div>
      </div>
    </section>
  )
}

export default Projects
