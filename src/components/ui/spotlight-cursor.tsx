import { useEffect, useState } from 'react'

export const SpotlightCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <>
      {/* Main spotlight */}
      <div
        className="pointer-events-none fixed z-[9999] transition-opacity duration-300"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0
        }}
      >
        {/* Outer glow */}
        <div
          className="absolute rounded-full"
          style={{
            width: '400px',
            height: '400px',
            left: '-200px',
            top: '-200px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(59, 130, 246, 0.04) 40%, transparent 70%)',
            filter: 'blur(40px)'
          }}
        />

        {/* Inner glow */}
        <div
          className="absolute rounded-full"
          style={{
            width: '150px',
            height: '150px',
            left: '-75px',
            top: '-75px',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)'
          }}
        />

        {/* Cursor dot */}
        <div
          className="absolute rounded-full bg-gradient-to-br from-violet-500 to-blue-500"
          style={{
            width: '8px',
            height: '8px',
            left: '-4px',
            top: '-4px',
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)'
          }}
        />
      </div>
    </>
  )
}
