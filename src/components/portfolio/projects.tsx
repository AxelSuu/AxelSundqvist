import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Github, Radio, Brain, Gamepad2, BookOpen } from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import { TiltCard } from '@/components/ui/tilt-card'

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
    <section id="projects" aria-labelledby="projects-heading" className="h-screen w-full py-2 bg-background relative flex items-center overflow-hidden">

      <div className="container mx-auto px-3 md:px-4 relative z-10 max-h-full">
        {/* Bento Grid Layout - Clean 4-column layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[minmax(100px,1fr)] md:auto-rows-[minmax(120px,1fr)] max-w-4xl mx-auto max-h-[80vh] md:max-h-[70vh] overflow-y-auto md:overflow-hidden scrollbar-hide">
          
          {/* Featured Project - Large card spanning 2x2 */}
          <TiltCard className="col-span-2 row-span-2" tiltMaxAngle={8}>
            <GlowCard 
              className="h-full group relative overflow-hidden p-4"
              glowColor="rgba(59, 130, 246, 0.4)"
            >
              <CardHeader className="p-0 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Radio className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-lg">{projects[0].title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col p-0 h-[calc(100%-60px)]">
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm flex-grow">
                  {projects[0].description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {projects[0].technologies.map((tech, i) => (
                    <Badge 
                      key={i} 
                      variant="secondary" 
                      className="text-xs px-2.5 py-0.5 hover:scale-105 transition-transform bg-primary/10 border-primary/20"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-fit h-8 text-xs group/btn" asChild>
                  <a href={projects[0].github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-1.5 h-3.5 w-3.5 group-hover/btn:rotate-12 transition-transform" />
                    View Code
                  </a>
                </Button>
              </CardContent>
            </GlowCard>
          </TiltCard>

          {/* PyTorch Project - Tall card */}
          <TiltCard className="col-span-1 row-span-2" tiltMaxAngle={10}>
            <GlowCard 
              className="h-full group relative overflow-hidden card-shine p-3"
              glowColor="rgba(168, 85, 247, 0.4)"
            >
              <CardHeader className="p-0 pb-2">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-all duration-300">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <CardTitle className="text-sm leading-tight">{projects[1].title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col p-0 h-[calc(100%-50px)]">
                <p className="text-muted-foreground mb-3 leading-relaxed text-xs flex-grow">
                  {projects[1].description}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {projects[1].technologies.slice(0, 3).map((tech, i) => (
                    <Badge key={i} variant="outline" className="text-[10px] px-2 py-0 hover:bg-purple-500/10">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-fit h-7 text-xs group/btn" asChild>
                  <a href={projects[1].github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-1 h-3 w-3 group-hover/btn:rotate-12 transition-transform" />
                    Code
                  </a>
                </Button>
              </CardContent>
            </GlowCard>
          </TiltCard>

          {/* Stats Card */}
          <TiltCard className="col-span-1 row-span-1" tiltMaxAngle={15}>
            <GlowCard 
              className="h-full bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 flex items-center justify-center"
              glowColor="rgba(6, 182, 212, 0.3)"
            >
              <div className="text-center p-3">
                <div className="text-4xl font-bold animated-gradient-text mb-1">11</div>
                <p className="text-xs text-muted-foreground">Projects</p>
              </div>
            </GlowCard>
          </TiltCard>

          {/* GitHub CTA */}
          <TiltCard className="col-span-1 row-span-1" tiltMaxAngle={10}>
            <GlowCard 
              className="h-full bg-gradient-to-br from-primary/5 to-purple-500/5 flex items-center justify-center group cursor-pointer"
              glowColor="rgba(168, 85, 247, 0.2)"
            >
              <a 
                href="https://github.com/AxelSuu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-center p-3 w-full h-full flex flex-col items-center justify-center"
              >
                <Github className="h-8 w-8 mb-2 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                <p className="font-semibold text-sm group-hover:text-primary transition-colors">More on GitHub</p>
                <p className="text-[10px] text-muted-foreground">View all repos →</p>
              </a>
            </GlowCard>
          </TiltCard>

          {/* Platformer Game Card */}
          <TiltCard className="col-span-1 row-span-1" tiltMaxAngle={12}>
            <GlowCard 
              className="h-full group card-shine p-3"
              glowColor="rgba(34, 197, 94, 0.3)"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 group-hover:scale-110 transition-all">
                    <Gamepad2 className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm">{projects[2].title}</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-2 flex-grow line-clamp-2">{projects[2].description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {projects[2].technologies.slice(0, 2).map((tech, i) => (
                      <Badge key={i} variant="outline" className="text-[10px] px-1.5 py-0">{tech}</Badge>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" asChild>
                    <a href={projects[2].github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>
              </div>
            </GlowCard>
          </TiltCard>

          {/* PDF to Excel Card */}
          <TiltCard className="col-span-1 row-span-1" tiltMaxAngle={12}>
            <GlowCard 
              className="h-full group card-shine p-3"
              glowColor="rgba(249, 115, 22, 0.3)"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 group-hover:scale-110 transition-all">
                    <BookOpen className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm">{projects[3].title}</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-2 flex-grow line-clamp-2">{projects[3].description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {projects[3].technologies.slice(0, 2).map((tech, i) => (
                      <Badge key={i} variant="outline" className="text-[10px] px-1.5 py-0">{tech}</Badge>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" asChild>
                    <a href={projects[3].github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>
              </div>
            </GlowCard>
          </TiltCard>
        </div>
      </div>
    </section>
  )
}

export default Projects
