import { Github, Linkedin, Mail } from 'lucide-react'
import { useState, useEffect } from 'react'
import { AnimatedBackground } from '@/components/ui/animated-background'

const Hero = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const fullName = 'Axel Sundqvist'

  // Scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(Math.min(progress, 100))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Typing animation
  useEffect(() => {
    let currentIndex = 0
    const typeWriter = () => {
      if (currentIndex < fullName.length) {
        setDisplayedText(fullName.slice(0, currentIndex + 1))
        currentIndex++
        setTimeout(typeWriter, 150)
      }
    }
    setTimeout(typeWriter, 1000) // Start after 1 second
  }, [])

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 opacity-30" />
      
      {/* Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Profile image */}
          <div className="w-40 h-40 mx-auto mb-8 mt-16 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl hover:shadow-3xl transition-shadow duration-300">
            <img 
              src="/images/me.jpeg" 
              alt="Axel Sundqvist" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Name with typing animation */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 fade-in-up leading-tight heading-wave">
            <span className="gradient-accent-text">
              {displayedText}
              <span className="animate-pulse">|</span>
            </span>
          </h1>
          
          <h2 className="text-xl md:text-2xl text-muted-foreground mb-8 fade-in-up">
            Applied Physics & Electrical Engineering Student
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto fade-in-up">
            Check out my projects to see  
            what I'm working on.
            Available for Summer 2026 Internships.
          </p>
          
          {/* Social links */}
          <div className="flex justify-center space-x-6 fade-in-up mb-8">
            <a
              href="https://github.com/AxelSuu"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-muted text-muted-foreground hover:bg-gray-800 hover:text-white transition-all duration-200 transform hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/axel-sundqvist/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-muted text-muted-foreground hover:bg-blue-600 hover:text-white transition-all duration-200 transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:axesu672@student.liu.se"
              className="p-3 rounded-full bg-muted text-muted-foreground hover:bg-gray-600 hover:text-white transition-all duration-200 transform hover:scale-110"
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}


export default Hero
