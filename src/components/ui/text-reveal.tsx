import { useEffect, useRef, useState, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TextRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export const TextReveal = ({ children, className, delay = 0 }: TextRevealProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <div
        className={cn(
          'transform transition-all duration-700 ease-out',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        )}
      >
        {children}
      </div>
    </div>
  )
}

interface StaggeredTextProps {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
}

export const StaggeredText = ({
  text,
  className,
  delay = 0,
  staggerDelay = 50,
}: StaggeredTextProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={cn('flex flex-wrap', className)}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className={cn(
            'transform transition-all duration-500',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          )}
          style={{
            transitionDelay: isVisible ? `${i * staggerDelay}ms` : '0ms',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  )
}
