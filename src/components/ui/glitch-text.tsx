import { cn } from '@/lib/utils'

interface GlitchTextProps {
  children: string
  className?: string
  enableGlitch?: boolean
}

export const GlitchText = ({ children, className, enableGlitch = true }: GlitchTextProps) => {
  if (!enableGlitch) {
    return <span className={className}>{children}</span>
  }

  return (
    <span className={cn('glitch-wrapper relative inline-block', className)}>
      <span className="glitch-text" data-text={children}>
        {children}
      </span>
    </span>
  )
}
