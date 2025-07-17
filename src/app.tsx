import { ThemeProvider } from '@/components/theme-provider'
import { BrowserRouter as Router } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import Navigation from '@/components/portfolio/navigation'
import Hero from '@/components/portfolio/hero'
import About from '@/components/portfolio/about'
import Projects from '@/components/portfolio/projects'
import Blog from '@/components/portfolio/blog'
import Contact from '@/components/portfolio/contact'
import Footer from '@/components/portfolio/footer'
import './app.css'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Navigation />
          <main>
            <Hero />
            <Projects />
            <About />
            <Blog />
            <Contact />
          </main>
          <Footer />
          <Toaster />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
