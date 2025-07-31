import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BackgroundCodeMatrix } from '@/components/ui/background-code-matrix'
import { AlgorithmVisualizations } from '@/components/ui/algorithm-visualizations'
import { SignalProcessingDemo } from '@/components/ui/signal-processing-demo'
import { WirelessCommunicationSimulator } from '@/components/ui/wireless-communication-simulator'
import { Github, ExternalLink, Radio, Brain, Gamepad2, BookOpen } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      title: 'Stock Price Predictor Suite',
      description: 'Developed a PyTorch-based stock price forecasting system with advanced neural network architectures and real-time data integration.',
      technologies: ['Python', 'PyTorch', 'Numpy', 'Pandas'],
      icon: Brain,
      color: 'bg-blue-500',
      github: 'https://github.com/AxelSuu/Pytorch-Quant-Model',
      demo: 'https://github.com/AxelSuu/Pytorch-Quant-Model',
      featured: true,
    },
    {
      title: 'Communication Systems Simulations',
      description: 'Simulations of Channel Effects, Equalizers, MIMO Systems, and Practical Systems',
      technologies: ['Python', 'NumPy', 'Scikit-learn', 'Wireless Communications'],
      icon: Radio,
      color: 'bg-purple-500',
      github: 'https://github.com/AxelSuu/communications',
      demo: 'https://github.com/AxelSuu/communications',
      featured: true,
    },
    {
      title: '2D Platformer Game',
      description: 'A 2D platformer game built with Python and Pygame, featuring custom physics and level design tools.',
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
    <section id="projects" className="py-20 relative overflow-hidden min-h-screen bg-slate-900/50">
      {/* Animated Background */}
      <BackgroundCodeMatrix 
        mode="code-rain" 
        opacity={0.6} 
        speed={75}
        className="absolute inset-0"
      />
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Projects</h2>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold bg-background/80 backdrop-blur-sm rounded-lg py-2 px-4 inline-block">Featured Projects</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-background/90 backdrop-blur-sm border-border/50">
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
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold bg-background/80 backdrop-blur-sm rounded-lg py-2 px-4 inline-block">Other Projects</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherProjects.map((project, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 bg-background/90 backdrop-blur-sm border-border/50">
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

        {/* Interactive Features */}
        <div className="space-y-12 mt-16">
          {/* Wireless Communication Simulator */}
          <div>
            <WirelessCommunicationSimulator />
          </div>

          {/* Signal Processing Demo */}
          <div>
            <SignalProcessingDemo />
          </div>

          {/* Algorithm Visualizations */}
          <div>
            <AlgorithmVisualizations />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
