import { ThemeProvider } from '@/components/theme-provider'
import { BrowserRouter as Router } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import Navigation from '@/components/portfolio/navigation'
import ScrollToTopButton from '@/components/ui/scroll-to-top-button'
import Hero from '@/components/portfolio/hero'
import About from '@/components/portfolio/about'
import Projects from '@/components/portfolio/projects'
// import Blog from '@/components/portfolio/blog' // Temporarily inactivated
import Contact from '@/components/portfolio/contact'
import Footer from '@/components/portfolio/footer'
import './app.css'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme-v2">
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          {/* Skip to content for accessibility */}
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <Navigation />
          <main id="main-content">
            <Hero />
            <Projects />
            <About />
            {/* <Blog /> */} {/* Temporarily inactivated */}
            <Contact />
          </main>
          <ScrollToTopButton />
          <Footer />
          <Toaster />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
