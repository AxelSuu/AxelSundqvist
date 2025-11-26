import { useEffect, useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface AnimatedSkillBarProps {
  name: string
  level?: number
  icon?: LucideIcon
  color?: string
  className?: string
  showLevel?: boolean
}

export const AnimatedSkillBar = ({
  name,
  level,
  icon: Icon,
  color = 'bg-blue-500',
  className,
  showLevel = false,
}: AnimatedSkillBarProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedLevel, setAnimatedLevel] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible && level !== undefined && showLevel) {
      const timer = setTimeout(() => {
        const duration = 1500 // ms
        const steps = 60
        const increment = level / steps
        let current = 0

        const interval = setInterval(() => {
          current += increment
          if (current >= level) {
            setAnimatedLevel(level)
            clearInterval(interval)
          } else {
            setAnimatedLevel(Math.round(current))
          }
        }, duration / steps)

        return () => clearInterval(interval)
      }, 200)

      return () => clearTimeout(timer)
    }
  }, [isVisible, level, showLevel])

  // Simple display without progress bar when no level
  if (level === undefined || !showLevel) {
    return (
      <div ref={ref} className={cn('group flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors', className)}>
        {Icon && (
          <div className={cn('p-2 rounded-lg', color)}>
            <Icon className="h-4 w-4 text-white" />
          </div>
        )}
        <span className="font-medium text-sm">{name}</span>
      </div>
    )
  }

  return (
    <div ref={ref} className={cn('group', className)}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {Icon && (
            <div className={cn('p-1.5 rounded-md', color)}>
              <Icon className="h-4 w-4 text-white" />
            </div>
          )}
          <span className="font-medium text-sm">{name}</span>
        </div>
        <span className="text-xs text-muted-foreground font-mono">
          {animatedLevel}%
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-1000 ease-out relative',
            color
          )}
          style={{ width: isVisible ? `${level}%` : '0%' }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  )
}
