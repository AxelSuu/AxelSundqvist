import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface StaggerTextProps {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
  once?: boolean
}

export const StaggerText = ({
  text,
  className,
  delay = 0,
  staggerDelay = 50,
  once = true
}: StaggerTextProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasAnimated)) {
          setTimeout(() => {
            setIsVisible(true)
            setHasAnimated(true)
          }, delay)
        } else if (!once && !entry.isIntersecting) {
          setIsVisible(false)
        }
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [delay, once, hasAnimated])

  const words = text.split(' ')

  return (
    <span ref={containerRef} className={cn('inline-block', className)}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em]">
          {word.split('').map((char, charIndex) => {
            const totalIndex = words
              .slice(0, wordIndex)
              .reduce((acc, w) => acc + w.length, 0) + charIndex

            return (
              <span
                key={charIndex}
                className={cn(
                  'inline-block transition-all duration-500 ease-out',
                  isVisible
                    ? 'opacity-100 translate-y-0 blur-0'
                    : 'opacity-0 translate-y-8 blur-sm'
                )}
                style={{
                  transitionDelay: isVisible ? `${totalIndex * staggerDelay}ms` : '0ms'
                }}
              >
                {char}
              </span>
            )
          })}
        </span>
      ))}
    </span>
  )
}
