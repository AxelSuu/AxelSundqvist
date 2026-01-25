import { Github, Linkedin, Mail } from 'lucide-react'
import { useState, useEffect } from 'react'
import { MagneticButton } from '@/components/ui/magnetic-button'

const Hero = () => {
  const [displayedText, setDisplayedText] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const fullName = 'AXEL SUNDQVIST'

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

  return (
      <section id="home" className="h-[100dvh] md:h-screen w-full flex items-center justify-center relative bg-background overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
        
        {/* Content */}
        <div className="container mx-auto px-3 md:px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto perspective-container">
            {/* Profile image with effects */}
            <div 
              className={`relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-3 md:mb-4 mt-4 md:mt-8 group transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {/* Image container */}
              <div className="absolute inset-[4px] rounded-full overflow-hidden border-2 border-white/20 shadow-2xl">
                <img 
                  src="/images/me.png" 
                  alt="Axel Sundqvist" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Name with glitch and typing effect */}
            <h1 
              className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-2 leading-tight transition-all duration-700 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <span className="text-foreground">
                {/* Split text to highlight QVIST */}
                {displayedText.length <= 9 ? (
                  <span style={{ color: '#002060' }}>{displayedText}</span>
                ) : (
                  <>
                    <span style={{ color: '#002060' }}>{displayedText.slice(0, 9)}</span>
                    <span className="text-white px-1 rounded-sm" style={{ backgroundColor: '#002060' }}>{displayedText.slice(9)}</span>
                  </>
                )}
              </span>
              <span className="#002060">|</span>
            </h1>
            
            {/* Subtitle */}
            <h2 
              className={`text-base md:text-lg lg:text-xl text-muted-foreground mb-3 md:mb-4 transition-all duration-700 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <span className="text-primary font-semibold">Applied Physics & Electrical Engineering Student</span>
            </h2>

            {/* Description */}
            <div 
              className={`text-base md:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto transition-all duration-700 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <span className="text-primary font-semibold">Embedded, Wireless Communications & ML oriented</span>

              
            </div>
            
            {/* Social links with magnetic effect */}
            <div 
              className={`flex justify-center space-x-3 md:space-x-4 mb-4 md:mb-6 transition-all duration-700 delay-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <MagneticButton
                as="a"
                href="https://github.com/AxelSuu"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 md:p-3 rounded-full bg-muted/50 backdrop-blur-sm text-muted-foreground hover:bg-gray-800 hover:text-white transition-all duration-300 hover-float card-shine border border-white/10 touch-manipulation"
              >
                <Github className="h-4 w-4 md:h-5 md:w-5" />
              </MagneticButton>
              <MagneticButton
                as="a"
                href="https://www.linkedin.com/in/axel-sundqvist/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 md:p-3 rounded-full bg-muted/50 backdrop-blur-sm text-muted-foreground hover:bg-blue-600 hover:text-white transition-all duration-300 hover-float card-shine border border-white/10 touch-manipulation"
              >
                <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
              </MagneticButton>
              <MagneticButton
                as="a"
                href="mailto:axesu672@student.liu.se"
                className="p-2.5 md:p-3 rounded-full bg-muted/50 backdrop-blur-sm text-muted-foreground hover:bg-purple-600 hover:text-white transition-all duration-300 hover-float card-shine border border-white/10 touch-manipulation"
              >
                <Mail className="h-4 w-4 md:h-5 md:w-5" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
  )
}


export default Hero
