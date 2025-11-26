import { useRef, useState, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export const GlowCard = ({
  children,
  className,
  glowColor = 'rgba(59, 130, 246, 0.5)',
}: GlowCardProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const { left, top } = ref.current.getBoundingClientRect()
    setGlowPosition({
      x: e.clientX - left,
      y: e.clientY - top,
    })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative rounded-xl border bg-card text-card-foreground shadow overflow-hidden transition-all duration-300',
        isHovered && 'shadow-lg scale-[1.02]',
        className
      )}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${glowPosition.x}px ${glowPosition.y}px, ${glowColor}, transparent 40%)`,
        }}
      />
      {/* Border glow */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${glowPosition.x}px ${glowPosition.y}px, ${glowColor}, transparent 40%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
