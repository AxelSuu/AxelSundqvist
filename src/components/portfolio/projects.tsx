import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
// import { BackgroundCodeMatrix } from '@/components/ui/background-code-matrix' // Removed background animation
// import { Suspense, lazy, useEffect, useRef, useState } from 'react' // Temporarily inactivated with demos
// Lazy loaded heavy interactive simulations (code-split) - Temporarily inactivated
// const WirelessCommunicationSimulator = lazy(() => import('@/components/ui/wireless-communication-simulator').then(m => ({ default: m.WirelessCommunicationSimulator })))
// const SignalProcessingDemo = lazy(() => import('@/components/ui/signal-processing-demo').then(m => ({ default: m.SignalProcessingDemo })))
// const AlgorithmVisualizations = lazy(() => import('@/components/ui/algorithm-visualizations').then(m => ({ default: m.AlgorithmVisualizations })))
import { Github, ExternalLink, Radio, Brain, Gamepad2, BookOpen } from 'lucide-react'

const Projects = () => {
  // Viewport-aware wrapper to delay mounting heavy components - Temporarily inactivated with demos
  /*
  const LazyViewport: React.FC<{ children: React.ReactNode; rootMargin?: string; minHeight?: number }> = ({ children, rootMargin = '200px', minHeight = 520 }) => {
    const ref = useRef<HTMLDivElement | null>(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
      const el = ref.current
      if (!el) return
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true)
            obs.disconnect()
          }
        })
      }, { root: null, rootMargin, threshold: 0.01 })
      obs.observe(el)
      return () => obs.disconnect()
    }, [])
    return <div ref={ref} style={{ minHeight }} className="relative">{visible ? children : <div className="absolute inset-0 rounded-xl border border-border/40 bg-background/30 backdrop-blur-sm flex items-center justify-center text-xs text-muted-foreground">Preparing module…</div>}</div>
  }
  */
  const projects = [
    {
      title: 'Stock Price Predictor Suite',
      description: 'Developed a real-time PyTorch-based stock price forecasting neural network.',
      technologies: ['Python', 'PyTorch', 'Numpy', 'Pandas'],
      icon: Brain,
      color: 'bg-blue-500',
      github: 'https://github.com/AxelSuu/Pytorch-Quant-Model',
      demo: null,
      featured: true,
    },
    {
      title: 'Communication Systems Simulations',
      description: 'Simulations of modulation and communication systems',
      technologies: ['Python', 'NumPy', 'Scikit-learn', 'Wireless Communications'],
      icon: Radio,
      color: 'bg-purple-500',
      github: 'https://github.com/AxelSuu/communications',
      demo: null,
      featured: true,
    },
    {
      title: '2D Platformer Game',
      description: 'A 2D platformer game built with Python and Pygame.',
      technologies: ['Python', 'Pygame', 'Game Development'],
      icon: Gamepad2,
      color: 'bg-green-500',
      github: 'https://github.com/AxelSuu/Skybound-2.0',
      demo: null,
      featured: false,
    },
    {
      title: 'Notepad App',
      description: 'Interactive text editor with integrated file management',
      technologies: ['Python', 'Pygame', 'GUI Development'],
      icon: BookOpen,
      color: 'bg-orange-500',
      github: 'https://github.com/AxelSuu/Notepad-app',
      demo: null,
      featured: false,
    },
  ]

  const featuredProjects = projects.filter(project => project.featured)
  const otherProjects = projects.filter(project => !project.featured)

  return (
  <section id="projects" aria-labelledby="projects-heading" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="projects-heading" className="text-4xl md:text-5xl font-bold mb-6 gradient-accent-text heading-wave">Projects</h2>
        </div>
        {/* Interactive Features - Temporarily inactivated */}
        {/*
        <div className="space-y-16 mt-16">

            <div>
              <LazyViewport>
                <Suspense fallback={<div className="h-[520px] rounded-xl border border-border/40 bg-background/40 backdrop-blur-sm flex items-center justify-center animate-pulse text-sm text-muted-foreground" aria-busy="true">Loading Algorithm Visualizations…</div>}>
                  <AlgorithmVisualizations />
                </Suspense>
              </LazyViewport>
              <p className="mt-4 text-sm text-muted-foreground text-center max-w-2xl mx-auto">Animated data structure & algorithm insights highlighting complexity and process flow.</p>
            </div>
        </div>
        */}        {/* Featured Projects */}
        <div className="mb-16">
          <div className="flex flex-col items-center mb-8">
          </div>
      <div className="asym-grid">
            {featuredProjects.map((project, index) => (
        <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${project.color}`}>
                        <project.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                    {project.demo && (
                      <Button size="sm" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Other Projects */}
        <div>
          <div className="flex flex-col items-center mb-8">
          </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherProjects.map((project, index) => (
        <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${project.color}`}>
                      <project.icon className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-3 w-3" />
                        Code
                      </a>
                    </Button>
                    {project.demo && (
                      <Button size="sm" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-3 w-3" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
