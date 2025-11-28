"use client"

import { useEffect, useRef, useState, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PerspectiveScrollProps {
  children: ReactNode[]
  className?: string
}

export function PerspectiveScroll({ children, className }: PerspectiveScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const totalSections = children.length

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let touchStartY = 0
    let lastScrollTime = 0
    const scrollCooldown = 800 // ms between scroll events

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      
      const now = Date.now()
      if (now - lastScrollTime < scrollCooldown || isAnimating) return
      
      lastScrollTime = now
      
      if (e.deltaY > 0 && currentSection < totalSections - 1) {
        setIsAnimating(true)
        setCurrentSection(prev => prev + 1)
        setTimeout(() => setIsAnimating(false), scrollCooldown)
      } else if (e.deltaY < 0 && currentSection > 0) {
        setIsAnimating(true)
        setCurrentSection(prev => prev - 1)
        setTimeout(() => setIsAnimating(false), scrollCooldown)
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const now = Date.now()
      if (now - lastScrollTime < scrollCooldown || isAnimating) return
      
      const touchEndY = e.changedTouches[0].clientY
      const diff = touchStartY - touchEndY
      
      lastScrollTime = now
      
      if (diff > 50 && currentSection < totalSections - 1) {
        setIsAnimating(true)
        setCurrentSection(prev => prev + 1)
        setTimeout(() => setIsAnimating(false), scrollCooldown)
      } else if (diff < -50 && currentSection > 0) {
        setIsAnimating(true)
        setCurrentSection(prev => prev - 1)
        setTimeout(() => setIsAnimating(false), scrollCooldown)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now()
      if (now - lastScrollTime < scrollCooldown || isAnimating) return
      
      if ((e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') && currentSection < totalSections - 1) {
        e.preventDefault()
        lastScrollTime = now
        setIsAnimating(true)
        setCurrentSection(prev => prev + 1)
        setTimeout(() => setIsAnimating(false), scrollCooldown)
      } else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && currentSection > 0) {
        e.preventDefault()
        lastScrollTime = now
        setIsAnimating(true)
        setCurrentSection(prev => prev - 1)
        setTimeout(() => setIsAnimating(false), scrollCooldown)
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentSection, totalSections, isAnimating])

  // Expose navigation function globally for nav links
  useEffect(() => {
    (window as Window & { navigateToSection?: (index: number) => void }).navigateToSection = (index: number) => {
      if (index >= 0 && index < totalSections && !isAnimating) {
        setIsAnimating(true)
        setCurrentSection(index)
        setTimeout(() => setIsAnimating(false), 800)
      }
    }
  }, [totalSections, isAnimating])

  return (
    <div 
      ref={containerRef}
      className={cn("h-[100dvh] md:h-screen w-screen overflow-hidden perspective-[1000px]", className)}
      style={{ perspective: '1000px' }}
    >
      <div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
        {children.map((child, index) => {
          const offset = index - currentSection
          
          // Calculate z-position and opacity based on offset
          let zPosition = offset * -1500
          let opacity = 1
          let scale = 1
          let blur = 0
          
          if (offset < 0) {
            // Sections that have passed (behind camera)
            zPosition = offset * 2000
            opacity = 0
            scale = 2
          } else if (offset === 0) {
            // Current section
            zPosition = 0
            opacity = 1
            scale = 1
          } else {
            // Upcoming sections (in front)
            zPosition = offset * -800
            opacity = Math.max(0, 1 - offset * 0.5)
            scale = Math.max(0.5, 1 - offset * 0.15)
            blur = offset * 2
          }
          
          return (
            <div
              key={index}
              className="absolute inset-0 w-full h-full"
              style={{
                transform: `translateZ(${zPosition}px) scale(${scale})`,
                opacity,
                filter: blur > 0 ? `blur(${blur}px)` : 'none',
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease, filter 0.8s ease',
                pointerEvents: offset === 0 ? 'auto' : 'none',
                zIndex: totalSections - Math.abs(offset),
              }}
            >
              {child}
            </div>
          )
        })}
      </div>
      
      {/* Section indicators - hidden on small mobile, visible on larger screens */}
      <div className="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 md:gap-3">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true)
                setCurrentSection(index)
                setTimeout(() => setIsAnimating(false), 800)
              }
            }}
            className={cn(
              "w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 touch-manipulation",
              index === currentSection 
                ? "bg-primary scale-125 md:scale-150 shadow-lg shadow-primary/50" 
                : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
            )}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

interface PerspectiveSectionProps {
  children: ReactNode
  className?: string
  id?: string
}

export function PerspectiveSection({ children, className, id }: PerspectiveSectionProps) {
  return (
    <section 
      id={id}
      className={cn(
        "h-screen w-full flex items-center justify-center bg-background",
        className
      )}
    >
      {children}
    </section>
  )
}
