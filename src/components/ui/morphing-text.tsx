import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface MorphingTextProps {
  words: string[]
  className?: string
  interval?: number
}

export const MorphingText = ({ words, className, interval = 3000 }: MorphingTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length)
        setIsAnimating(false)
      }, 500)
    }, interval)

    return () => clearInterval(timer)
  }, [words.length, interval])

  return (
    <span className={cn('inline-block relative', className)}>
      <span
        className={cn(
          'inline-block transition-all duration-500',
          isAnimating ? 'opacity-0 blur-sm translate-y-4' : 'opacity-100 blur-0 translate-y-0'
        )}
      >
        {words[currentIndex]}
      </span>
    </span>
  )
}
