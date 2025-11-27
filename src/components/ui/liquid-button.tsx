import { ReactNode, useState } from 'react'
import { cn } from '@/lib/utils'

interface LiquidButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
}

export const LiquidButton = ({
  children,
  className,
  onClick,
  variant = 'primary'
}: LiquidButtonProps) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple = { x, y, id: Date.now() }
    setRipples((prev) => [...prev, newRipple])

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, 1000)

    onClick?.()
  }

  const baseClasses = cn(
    'relative overflow-hidden px-8 py-3 rounded-full font-semibold transition-all duration-300',
    'transform hover:scale-105 active:scale-95',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background'
  )

  const variantClasses = {
    primary: cn(
      'bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600',
      'text-white shadow-lg shadow-purple-500/25',
      'hover:shadow-xl hover:shadow-purple-500/40',
      'focus:ring-purple-500',
      'before:absolute before:inset-0 before:bg-gradient-to-r before:from-violet-500 before:via-purple-500 before:to-blue-500',
      'before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100'
    ),
    secondary: cn(
      'bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800',
      'text-white border border-gray-700',
      'hover:border-purple-500/50',
      'focus:ring-gray-500'
    ),
    ghost: cn(
      'bg-transparent border-2 border-purple-500/50',
      'text-purple-500 dark:text-purple-400',
      'hover:bg-purple-500/10 hover:border-purple-500',
      'focus:ring-purple-500'
    )
  }

  return (
    <button
      onClick={handleClick}
      className={cn(baseClasses, variantClasses[variant], className)}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}

      {/* Liquid blob effect */}
      <span className="liquid-blob absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  )
}
