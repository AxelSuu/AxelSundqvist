import { useRef, useState, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface HolographicCardProps {
  children: ReactNode
  className?: string
}

export const HolographicCard = ({ children, className }: HolographicCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setPosition({ x, y })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative rounded-xl overflow-hidden',
        'bg-gradient-to-br from-gray-900/90 to-gray-800/90',
        'border border-white/10',
        'transition-all duration-300',
        className
      )}
      style={{
        transform: isHovered ? 'scale(1.02)' : 'scale(1)'
      }}
    >
      {/* Holographic gradient overlay */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: isHovered ? 0.6 : 0,
          background: `
            radial-gradient(
              circle at ${position.x}% ${position.y}%,
              rgba(255, 0, 128, 0.3) 0%,
              rgba(0, 255, 255, 0.2) 25%,
              rgba(255, 255, 0, 0.2) 50%,
              rgba(0, 128, 255, 0.2) 75%,
              transparent 100%
            )
          `,
          filter: 'blur(20px)'
        }}
      />

      {/* Rainbow shine effect */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: isHovered ? 0.4 : 0,
          background: `
            linear-gradient(
              ${45 + (position.x - 50) * 0.5}deg,
              transparent 20%,
              rgba(255, 0, 0, 0.1) 30%,
              rgba(255, 165, 0, 0.1) 40%,
              rgba(255, 255, 0, 0.1) 50%,
              rgba(0, 255, 0, 0.1) 60%,
              rgba(0, 0, 255, 0.1) 70%,
              rgba(148, 0, 211, 0.1) 80%,
              transparent 90%
            )
          `
        }}
      />

      {/* Scan line effect */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ opacity: isHovered ? 0.1 : 0 }}
      >
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.03)_2px,rgba(255,255,255,0.03)_4px)]" />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Border glow */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          boxShadow: `
            inset 0 0 30px rgba(139, 92, 246, 0.2),
            0 0 30px rgba(139, 92, 246, 0.1)
          `
        }}
      />
    </div>
  )
}
