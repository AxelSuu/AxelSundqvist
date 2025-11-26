import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Github, Radio, Brain, Gamepad2, BookOpen, Sparkles } from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import { TextReveal } from '@/components/ui/text-reveal'

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
    <section id="projects" aria-labelledby="projects-heading" className="py-20 bg-muted/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <TextReveal>
          <div className="text-center mb-16">
            <h2 id="projects-heading" className="text-4xl md:text-5xl font-bold mb-6 gradient-accent-text heading-wave">Projects</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Some things I've built
            </p>
          </div>
        </TextReveal>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)]">
          
          {/* Featured Large Card - Spans 2 cols */}
          <GlowCard 
            className="md:col-span-2 md:row-span-2 group relative overflow-hidden"
            glowColor="rgba(59, 130, 246, 0.4)"
          >
            
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-xl bg-blue-500 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
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
                  <Badge key={i} variant="secondary" className="hover:scale-105 transition-transform">
                    {tech}
                  </Badge>
                ))}
              </div>
              <Button variant="outline" className="w-fit group/btn" asChild>
                <a href={projects[0].github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4 group-hover/btn:rotate-12 transition-transform" />
                  View Code
                </a>
              </Button>
            </CardContent>
          </GlowCard>

          {/* Tall Card - Spans 2 rows */}
          <GlowCard 
            className="md:row-span-2 group relative overflow-hidden"
            glowColor="rgba(168, 85, 247, 0.4)"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-xl bg-purple-500 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
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
                  <Badge key={i} variant="outline" className="text-xs hover:scale-105 transition-transform">
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

          {/* Info/Stats Card */}
          <GlowCard 
            className="bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 flex items-center justify-center"
            glowColor="rgba(6, 182, 212, 0.3)"
          >
            <div className="text-center p-4">
              <div className="text-5xl font-bold gradient-accent-text mb-2">11</div>
              <p className="text-sm text-muted-foreground">Projects Completed</p>
            </div>
          </GlowCard>

          {/* Small Project Cards */}
          <GlowCard 
            className="group hover:-translate-y-1 transition-all duration-300"
            glowColor="rgba(34, 197, 94, 0.3)"
          >
            <CardContent className="p-5 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-green-500 group-hover:scale-110 transition-transform">
                  <Gamepad2 className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold">{projects[2].title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3 flex-grow">{projects[2].description}</p>
              <div className="flex gap-2 flex-wrap mb-3">
                {projects[2].technologies.map((tech, i) => (
                  <Badge key={i} variant="outline" className="text-xs">{tech}</Badge>
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

          <GlowCard 
            className="group hover:-translate-y-1 transition-all duration-300"
            glowColor="rgba(249, 115, 22, 0.3)"
          >
            <CardContent className="p-5 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-orange-500 group-hover:scale-110 transition-transform">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold">{projects[3].title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3 flex-grow">{projects[3].description}</p>
              <div className="flex gap-2 flex-wrap mb-3">
                {projects[3].technologies.map((tech, i) => (
                  <Badge key={i} variant="outline" className="text-xs">{tech}</Badge>
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

          {/* CTA Card */}
          <GlowCard 
            className="md:col-span-2 lg:col-span-1 bg-gradient-to-br from-primary/5 to-purple-500/5 flex items-center justify-center group cursor-pointer"
            glowColor="rgba(168, 85, 247, 0.2)"
          >
            <a 
              href="https://github.com/AxelSuu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-center p-6 w-full h-full flex flex-col items-center justify-center"
            >
              <Github className="h-10 w-10 mb-3 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all" />
              <p className="font-medium">More on GitHub</p>
              <p className="text-xs text-muted-foreground mt-1">View all repositories →</p>
            </a>
          </GlowCard>
        </div>
      </div>
    </section>
  )
}

export default Projects
