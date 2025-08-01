import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github, Play, Pause } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  demoUrl: string
  githubUrl: string
  technologies: string[]
  category: 'web' | 'game' | 'mobile' | 'desktop'
  isLive: boolean
}

export const LiveProjectPreviews = () => {
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const [loadingProjects, setLoadingProjects] = useState<Set<string>>(new Set())

  const projects: Project[] = [
    {
      id: 'ecommerce',
      title: 'E-Commerce Store',
      description: 'Modern online store with shopping cart and product management',
      demoUrl: 'https://commerce.vercel.store',
      githubUrl: 'https://github.com/AxelSuu/ecommerce-store',
      technologies: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
      category: 'web',
      isLive: true
    },
    {
      id: 'blog-platform',
      title: 'Blog Platform',
      description: 'Content management system with markdown support and real-time editing',
      demoUrl: 'https://nextjs-blog-template.vercel.app',
      githubUrl: 'https://github.com/AxelSuu/blog-platform',
      technologies: ['Next.js', 'MDX', 'Tailwind CSS', 'Prisma'],
      category: 'web',
      isLive: true
    },
    {
      id: 'chat-app',
      title: 'Real-time Chat',
      description: 'WebSocket-powered chat application with multiple rooms and user authentication',
      demoUrl: 'https://socket-io-chat.vercel.app',
      githubUrl: 'https://github.com/AxelSuu/realtime-chat',
      technologies: ['React', 'Socket.IO', 'Node.js', 'Express'],
      category: 'web',
      isLive: true
    },
    {
      id: 'portfolio-site',
      title: 'Portfolio Template',
      description: 'Responsive portfolio website with smooth animations and dark mode',
      demoUrl: 'https://portfolio-nextjs-ten.vercel.app',
      githubUrl: 'https://github.com/AxelSuu/portfolio-template',
      technologies: ['Next.js', 'Framer Motion', 'TypeScript', 'CSS3'],
      category: 'web',
      isLive: true
    }
  ]

  const handlePreviewToggle = (projectId: string) => {
    if (activeProject === projectId) {
      setActiveProject(null)
    } else {
      setLoadingProjects(prev => new Set(prev).add(projectId))
      setActiveProject(projectId)
    }
  }

  const handleIframeLoad = (projectId: string) => {
    setLoadingProjects(prev => {
      const newSet = new Set(prev)
      newSet.delete(projectId)
      return newSet
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Live Project Previews</h3>
        <p className="text-muted-foreground">
          Interactive demos of my projects running in real-time
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <div className="flex items-center space-x-2">
                  {project.isLive && (
                    <span className="flex items-center text-sm text-green-600 dark:text-green-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />
                      Live
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-primary/10 rounded text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              {/* Preview Controls */}
              <div className="flex space-x-2 mb-4">
                <Button
                  size="sm"
                  variant={activeProject === project.id ? "secondary" : "default"}
                  onClick={() => handlePreviewToggle(project.id)}
                  className="flex-1"
                >
                  {activeProject === project.id ? (
                    <>
                      <Pause className="w-4 h-4 mr-1" />
                      Hide Preview
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-1" />
                      Live Preview
                    </>
                  )}
                </Button>
                
                <Button size="sm" variant="outline" asChild>
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Open
                  </a>
                </Button>
                
                <Button size="sm" variant="outline" asChild>
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 mr-1" />
                    Code
                  </a>
                </Button>
              </div>

              {/* Live Preview iframe */}
              {activeProject === project.id && (
                <div className="relative">
                  {loadingProjects.has(project.id) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-lg z-10">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm text-muted-foreground">Loading preview...</span>
                      </div>
                    </div>
                  )}
                  
                  <iframe
                    src={project.demoUrl}
                    className="w-full h-64 border border-border rounded-lg"
                    onLoad={() => handleIframeLoad(project.id)}
                    title={`${project.title} Preview`}
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                  
                  <div className="absolute top-2 right-2">
                    <span className="text-xs px-2 py-1 bg-background/80 backdrop-blur-sm rounded border text-muted-foreground">
                      Live Demo
                    </span>
                  </div>
                </div>
              )}

              {/* Placeholder when not active */}
              {activeProject !== project.id && (
                <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click "Live Preview" to see the project in action
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center text-sm text-muted-foreground mt-6">
        <p>
          🚀 All previews are live deployments • Click "Open" to interact with full projects
        </p>
      </div>
    </div>
  )
}
