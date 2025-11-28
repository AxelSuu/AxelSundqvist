import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      setScrolled(isScrolled)

      // Check which section is currently in view
      const sections = ['home', 'about', 'projects', 'blog', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home', index: 0 },
    { name: 'About', href: '#about', index: 2 },
    { name: 'Projects', href: '#projects', index: 1 },
    // { name: 'Blog', href: '#blog' }, // inactivated
    { name: 'Contact', href: '#contact', index: 3 },
  ]

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const scrollToSection = (href: string, index?: number) => {
    // Use perspective scroll navigation if available
    const navigateToSection = (window as Window & { navigateToSection?: (index: number) => void }).navigateToSection
    if (navigateToSection && index !== undefined) {
      navigateToSection(index)
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-background/60 supports-[backdrop-filter]:backdrop-blur-2xl border-b border-border/40 shadow-[0_4px_30px_-6px_rgba(0,0,0,0.3)]' 
        : 'bg-transparent'
    }`}> 
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo with animated gradient */}
          <div 
            className="text-2xl font-bold cursor-pointer group relative"
            onClick={() => scrollToSection('#home', 0)}
          >
            <span className="animated-gradient-text group-hover:scale-110 inline-block transition-transform">AS</span>
            <Sparkles className="absolute -top-1 -right-3 w-3 h-3 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 bg-muted/30 rounded-full px-2 py-1 backdrop-blur-sm border border-border/30">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href, item.index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative group ${
                  activeSection === item.href.slice(1) 
                    ? 'text-primary-foreground bg-primary shadow-lg shadow-primary/25' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {item.name}
                {/* Hover glow effect */}
                <span className={`absolute inset-0 rounded-full bg-primary/20 scale-0 group-hover:scale-100 transition-transform duration-300 -z-10 ${
                  activeSection === item.href.slice(1) ? 'hidden' : ''
                }`} />
              </button>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-muted/50 backdrop-blur-sm hover:bg-muted transition-all duration-300 hover:scale-110 hover:rotate-12 border border-border/30"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-blue-500" />
              )}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 rounded-full bg-muted/50 backdrop-blur-sm hover:bg-muted transition-all duration-300 border border-border/30"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation with slide animation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-background/95 backdrop-blur-xl border-t border-border/40 rounded-b-2xl shadow-xl">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href, item.index)}
                  className={`block w-full text-left px-4 py-3 text-foreground transition-all duration-300 rounded-xl ${
                    activeSection === item.href.slice(1) 
                      ? 'text-primary bg-primary/10 font-semibold' 
                      : 'hover:text-primary hover:bg-muted/50'
                  }`}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animation: isOpen ? 'fadeInUp 0.3s ease forwards' : 'none'
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
