import { useEffect, useState } from 'react'

interface Orb {
  id: number
  x: number
  y: number
  size: number
  color: string
  delay: number
  duration: number
}

export const FloatingOrbs = () => {
  const [orbs, setOrbs] = useState<Orb[]>([])

  useEffect(() => {
    const colors = [
      'from-blue-500/30 to-cyan-500/20',
      'from-purple-500/30 to-pink-500/20',
      'from-indigo-500/30 to-blue-500/20',
      'from-cyan-500/30 to-teal-500/20',
    ]

    const generatedOrbs: Orb[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 300 + 200,
      color: colors[i % colors.length],
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
    }))

    setOrbs(generatedOrbs)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className={`absolute rounded-full bg-gradient-radial ${orb.color} blur-3xl opacity-60 dark:opacity-40 animate-float`}
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            transform: 'translate(-50%, -50%)',
            animationDelay: `${orb.delay}s`,
            animationDuration: `${orb.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
