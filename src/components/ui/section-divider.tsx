import { cn } from '@/lib/utils'

interface SectionDividerProps {
  variant?: 'wave' | 'gradient' | 'dots' | 'circuit'
  className?: string
  flip?: boolean
}

export const SectionDivider = ({ 
  variant = 'wave', 
  className,
  flip = false 
}: SectionDividerProps) => {
  if (variant === 'wave') {
    return (
      <div className={cn('relative w-full h-24 overflow-hidden', flip && 'rotate-180', className)}>
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--signal))" stopOpacity="0.3" />
              <stop offset="50%" stopColor="hsl(var(--wave-accent))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--signal))" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path
            d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z"
            fill="url(#waveGradient)"
            className="animate-wave-slow"
          />
          <path
            d="M0,80 C200,120 400,40 600,80 C800,120 1000,40 1200,80 L1200,120 L0,120 Z"
            fill="hsl(var(--muted))"
            className="opacity-50"
          />
        </svg>
      </div>
    )
  }

  if (variant === 'gradient') {
    return (
      <div className={cn('relative w-full h-px my-16', className)}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary/50 blur-sm" />
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex justify-center items-center gap-2 my-12', className)}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-pulse"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'circuit') {
    return (
      <div className={cn('relative w-full h-12 my-8 overflow-hidden', className)}>
        <svg
          viewBox="0 0 1200 48"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--signal))" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(var(--signal))" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(var(--signal))" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Main horizontal line */}
          <line x1="0" y1="24" x2="1200" y2="24" stroke="url(#circuitGradient)" strokeWidth="1" />
          {/* Circuit nodes */}
          {[200, 400, 600, 800, 1000].map((x, i) => (
            <g key={i}>
              <circle cx={x} cy="24" r="3" fill="hsl(var(--signal))" opacity="0.6" />
              <circle cx={x} cy="24" r="6" fill="none" stroke="hsl(var(--signal))" strokeWidth="1" opacity="0.3" />
            </g>
          ))}
        </svg>
      </div>
    )
  }

  return null
}
