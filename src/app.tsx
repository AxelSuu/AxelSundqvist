import { ThemeProvider } from '@/components/theme-provider'
import { BrowserRouter as Router } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import Navigation from '@/components/portfolio/navigation'
import Hero from '@/components/portfolio/hero'
import About from '@/components/portfolio/about'
import { ProjectESP32, ProjectPyTorch, ProjectPlatformer } from '@/components/portfolio/projects'
import Infrasonik from '@/components/portfolio/Infrasonik'
import { PerspectiveScroll } from '@/components/ui/perspective-scroll'
import { Analytics } from '@vercel/analytics/react'
import './app.css'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="portfolio-theme-v2">
      <Router>
        <div className="bg-background text-foreground">
          {/* Skip to content for accessibility */}
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <Navigation />
          <main id="main-content">
            <PerspectiveScroll>
              <Hero />
              <Infrasonik />
              <ProjectESP32 />
              <ProjectPyTorch />
              <ProjectPlatformer />
              <About />
            </PerspectiveScroll>
          </main>
          <Toaster />
          <Analytics />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
