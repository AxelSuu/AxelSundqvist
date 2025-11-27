import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { FloatingOrbs } from '@/components/ui/floating-orbs'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { ParticleField } from '@/components/ui/particle-field'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { MorphingText } from '@/components/ui/morphing-text'
import { LiquidButton } from '@/components/ui/liquid-button'
import { StaggerText } from '@/components/ui/stagger-text'

const Hero = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
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
    
    // Mark as loaded for entrance animations
    setTimeout(() => setIsLoaded(true), 200)
  }, [])

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Scroll Progress Indicator - Enhanced */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted/50 z-50 backdrop-blur-sm">
        <div 
          className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out relative"
          style={{ width: `${scrollProgress}%` }}
        >
          {/* Glow effect on progress bar */}
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white/50 to-transparent animate-pulse" />
        </div>
      </div>

      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Particle Field Background */}
        <ParticleField />
        
        {/* Aurora Background */}
        <AuroraBackground />
        
        {/* Floating Orbs Background */}
        <FloatingOrbs />
        
        {/* Animated Background */}
        <AnimatedBackground />

        {/* Morphing gradient blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute w-[600px] h-[600px] -top-[200px] -left-[200px] bg-gradient-to-br from-purple-500/20 to-blue-500/20 morphing-blob blur-3xl"
            style={{ animationDelay: '0s' }}
          />
          <div 
            className="absolute w-[500px] h-[500px] -bottom-[150px] -right-[150px] bg-gradient-to-br from-cyan-500/20 to-purple-500/20 morphing-blob blur-3xl"
            style={{ animationDelay: '-4s' }}
          />
          <div 
            className="absolute w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-pink-500/10 to-orange-500/10 morphing-blob blur-3xl"
            style={{ animationDelay: '-2s' }}
          />
        </div>

        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/50 dark:to-purple-900/50 opacity-30" />
        
        {/* Scanlines overlay for cyberpunk feel */}
        <div className="absolute inset-0 scanlines pointer-events-none opacity-30" />
        
        {/* Content */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto perspective-container">
            {/* Profile image with effects */}
            <div 
              className={`relative w-44 h-44 mx-auto mb-8 mt-16 group transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {/* Animated ring behind image */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-spin-slow opacity-75 blur-sm" 
                   style={{ animation: 'spin 8s linear infinite' }} />
              <div className="absolute inset-[3px] rounded-full bg-background" />
              
              {/* Image container */}
              <div className="absolute inset-[4px] rounded-full overflow-hidden border-2 border-white/20 shadow-2xl">
                <img 
                  src="/images/me3.jpeg" 
                  alt="Axel Sundqvist" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Floating badges around image */}
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold shadow-lg animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2s' }}>
                ✓
              </div>
            </div>

            {/* Name with glitch and typing effect */}
            <h1 
              className={`text-5xl md:text-7xl font-bold mb-4 leading-tight transition-all duration-700 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <span className="animated-gradient-text">
                {displayedText}
              </span>
              <span className="animate-pulse text-purple-500">|</span>
            </h1>
            
            {/* Subtitle with morphing text */}
            <h2 
              className={`text-xl md:text-2xl text-muted-foreground mb-6 transition-all duration-700 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <span className="mr-2">Applied Physics &</span>
              <MorphingText 
                words={['Electrical Engineering', 'Signal Processing']} 
                className="text-primary font-semibold"
                interval={2500}
              />
              <span className="ml-2">Student</span>
            </h2>

            {/* Description with stagger effect */}
            <div 
              className={`text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto transition-all duration-700 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <StaggerText 
                text="Check out my projects to see what I'm working on."
                staggerDelay={30}
                delay={800}
              />
              <br />
              <span className="inline-flex items-center gap-2 mt-2 text-green-500 font-medium">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Available for Summer 2026 Internships
              </span>
            </div>
            
            {/* Social links with magnetic effect */}
            <div 
              className={`flex justify-center space-x-6 mb-10 transition-all duration-700 delay-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <MagneticButton
                as="a"
                href="https://github.com/AxelSuu"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-muted/50 backdrop-blur-sm text-muted-foreground hover:bg-gray-800 hover:text-white transition-all duration-300 hover-float card-shine border border-white/10"
              >
                <Github className="h-6 w-6" />
              </MagneticButton>
              <MagneticButton
                as="a"
                href="https://www.linkedin.com/in/axel-sundqvist/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-muted/50 backdrop-blur-sm text-muted-foreground hover:bg-blue-600 hover:text-white transition-all duration-300 hover-float card-shine border border-white/10"
              >
                <Linkedin className="h-6 w-6" />
              </MagneticButton>
              <MagneticButton
                as="a"
                href="mailto:axesu672@student.liu.se"
                className="p-4 rounded-full bg-muted/50 backdrop-blur-sm text-muted-foreground hover:bg-purple-600 hover:text-white transition-all duration-300 hover-float card-shine border border-white/10"
              >
                <Mail className="h-6 w-6" />
              </MagneticButton>
            </div>

            {/* CTA Buttons */}
            <div 
              className={`flex flex-wrap justify-center gap-4 mb-16 transition-all duration-700 delay-600 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <LiquidButton onClick={scrollToProjects} variant="primary">
                View My Work
              </LiquidButton>
              <LiquidButton 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
                variant="ghost"
              >
                Get In Touch
              </LiquidButton>
            </div>

            {/* Scroll indicator */}
            <div 
              className={`absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer transition-all duration-700 delay-700 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={scrollToProjects}
            >
              <div className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
                <span className="text-xs mb-2 tracking-widest uppercase">Scroll</span>
                <ChevronDown className="h-6 w-6 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}


export default Hero
