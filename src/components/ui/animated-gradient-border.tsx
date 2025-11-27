import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedGradientBorderProps {
  children: ReactNode
  className?: string
  containerClassName?: string
  borderWidth?: number
  duration?: number
}

export const AnimatedGradientBorder = ({
  children,
  className,
  containerClassName,
  borderWidth = 2,
  duration = 3
}: AnimatedGradientBorderProps) => {
  return (
    <div className={cn('relative group', containerClassName)}>
      {/* Animated border background */}
      <div
        className="absolute -inset-[1px] rounded-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(var(--gradient-angle), 
            #ff0080, #ff8c00, #40e0d0, #7928ca, #ff0080
          )`,
          animation: `gradient-rotate ${duration}s linear infinite`,
          padding: borderWidth
        }}
      />

      {/* Blur glow effect */}
      <div
        className="absolute -inset-[2px] rounded-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-xl"
        style={{
          background: `linear-gradient(var(--gradient-angle), 
            #ff0080, #ff8c00, #40e0d0, #7928ca, #ff0080
          )`,
          animation: `gradient-rotate ${duration}s linear infinite`
        }}
      />

      {/* Content container */}
      <div
        className={cn(
          'relative rounded-xl bg-background',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
