import { useRef, useState, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TiltCardProps {
  children: ReactNode
  className?: string
  glareEnabled?: boolean
  tiltMaxAngle?: number
  scale?: number
  perspective?: number
}

export const TiltCard = ({
  children,
  className,
  glareEnabled = true,
  tiltMaxAngle = 15,
  scale = 1.02,
  perspective = 1000
}: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    const rotateX = (-mouseY / (rect.height / 2)) * tiltMaxAngle
    const rotateY = (mouseX / (rect.width / 2)) * tiltMaxAngle

    setTransform(
      `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
    )

    // Calculate glare position
    const glareX = ((e.clientX - rect.left) / rect.width) * 100
    const glareY = ((e.clientY - rect.top) / rect.height) * 100
    setGlarePosition({ x: glareX, y: glareY })
  }

  const handleMouseLeave = () => {
    setTransform('')
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={cn(
        'relative overflow-hidden rounded-xl transition-transform duration-200 ease-out',
        className
      )}
      style={{
        transform: transform,
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Glare effect */}
      {glareEnabled && isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.25) 0%, transparent 60%)`,
            opacity: isHovered ? 1 : 0
          }}
        />
      )}

      {/* Border glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(139, 92, 246, 0.4) 0%, rgba(59, 130, 246, 0.2) 30%, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
          filter: 'blur(20px)'
        }}
      />

      {/* Content with 3D offset */}
      <div className="h-full" style={{ transform: 'translateZ(50px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </div>
  )
}
