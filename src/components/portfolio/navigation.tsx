import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const sectionNames = ['home', 'infrasonik', 'project-esp32', 'project-pytorch', 'project-platformer', 'about']

  useEffect(() => {
    // Listen for section changes from PerspectiveScroll
    const handleSectionChange = (e: CustomEvent) => {
      const sectionIndex = e.detail as number
      if (sectionIndex >= 0 && sectionIndex < sectionNames.length) {
        setActiveSection(sectionNames[sectionIndex])
      }
    }

    // Also check initial section on mount
    const currentSection = (window as Window & { currentSection?: number }).currentSection
    if (currentSection !== undefined && currentSection >= 0 && currentSection < sectionNames.length) {
      setActiveSection(sectionNames[currentSection])
    }

    window.addEventListener('sectionChange', handleSectionChange as EventListener)
    
    // Handle scroll for navbar background effect only
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      setScrolled(isScrolled)
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('sectionChange', handleSectionChange as EventListener)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const navItems = [
    { name: 'Home', href: '#home', index: 0 },
    { name: 'Infrasonik', href: '#infrasonik', index: 1 },
    { name: 'Projects', href: '#projects', index: 2 },
    { name: 'About', href: '#about', index: 5 },
  ]

  const isActiveSection = (href: string) => {
    const sectionId = href.slice(1)
    // For Projects, check if any project section is active
    if (sectionId === 'projects') {
      return activeSection === 'project-esp32' || activeSection === 'project-pytorch' || activeSection === 'project-platformer'
    }
    return activeSection === sectionId
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

  const activeNavItem = navItems.find((item) => isActiveSection(item.href)) ?? navItems[0]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-background/60 supports-[backdrop-filter]:backdrop-blur-2xl border-b border-border/40 shadow-[0_4px_30px_-6px_rgba(0,0,0,0.3)]' 
        : 'bg-transparent'
    }`}> 
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12 md:h-16">
          {/* Logo */}
          <div 
            className="text-xl md:text-2xl font-bold cursor-pointer group relative"
            onClick={() => scrollToSection('#home', 0)}
          >
            <span style={{ color: '#002060' }}>AS</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 bg-muted/30 rounded-full px-2 py-1 backdrop-blur-sm border border-border/30">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href, item.index)}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 relative group ${
                  isActiveSection(item.href)
                    ? 'text-primary-foreground bg-primary shadow-lg shadow-primary/25' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {item.name}
                {/* Hover glow effect */}
                <span className={`absolute inset-0 rounded-full bg-primary/20 scale-0 group-hover:scale-100 transition-transform duration-300 -z-10 ${
                  isActiveSection(item.href) ? 'hidden' : ''
                }`} />
              </button>
            ))}
          </div>

          {/* Mobile Active Pill + Menu */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => scrollToSection(activeNavItem.href, activeNavItem.index)}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-muted/30 backdrop-blur-sm border border-border/30 text-foreground"
              aria-label={`Current section: ${activeNavItem.name}`}
            >
              {activeNavItem.name}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-full bg-muted/50 backdrop-blur-sm hover:bg-muted transition-all duration-300 border border-border/30"
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
                    isActiveSection(item.href)
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
