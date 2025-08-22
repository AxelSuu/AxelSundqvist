import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
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
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    // { name: 'Blog', href: '#blog' }, // Temporarily inactivated
    { name: 'Contact', href: '#contact' },
  ]

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-background/70 supports-[backdrop-filter]:backdrop-blur-xl border-b border-border/60 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.25)]' 
        : 'bg-transparent'
    }`}> 
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-2xl font-bold cursor-pointer" onClick={() => scrollToSection('#home')}>
            <span className="gradient-text">AS</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`text-foreground transition-all duration-200 relative group ${
                  activeSection === item.href.slice(1) 
                    ? 'text-primary font-semibold' 
                    : 'hover:text-primary'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-200 ${
                  activeSection === item.href.slice(1) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </button>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-accent transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full hover:bg-accent transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left px-3 py-2 text-foreground transition-colors duration-200 rounded-md ${
                    activeSection === item.href.slice(1) 
                      ? 'text-primary bg-accent font-semibold' 
                      : 'hover:text-primary hover:bg-accent'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
