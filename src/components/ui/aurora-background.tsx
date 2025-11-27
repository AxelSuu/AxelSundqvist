import { cn } from '@/lib/utils'

interface AuroraBackgroundProps {
  className?: string
  showRadialGradient?: boolean
}

export const AuroraBackground = ({
  className,
  showRadialGradient = true
}: AuroraBackgroundProps) => {
  return (
    <div className={cn('fixed inset-0 overflow-hidden pointer-events-none', className)}>
      {/* Aurora layers */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-blue-500/10 dark:via-purple-500/10 dark:to-blue-500/20" />
        
        {/* Aurora wave 1 */}
        <div
          className="aurora-wave absolute w-[200%] h-[50%] left-[-50%] top-[10%] opacity-30 dark:opacity-40"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(120, 119, 198, 0.3) 50%, transparent 100%)',
            filter: 'blur(60px)',
            animation: 'aurora-shift 15s ease-in-out infinite',
            transform: 'rotate(-5deg)'
          }}
        />
        
        {/* Aurora wave 2 */}
        <div
          className="aurora-wave absolute w-[200%] h-[40%] left-[-25%] top-[20%] opacity-20 dark:opacity-30"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, 0.4) 50%, transparent 100%)',
            filter: 'blur(80px)',
            animation: 'aurora-shift 12s ease-in-out infinite reverse',
            transform: 'rotate(3deg)'
          }}
        />
        
        {/* Aurora wave 3 */}
        <div
          className="aurora-wave absolute w-[150%] h-[30%] left-[0%] top-[5%] opacity-25 dark:opacity-35"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(139, 92, 246, 0.35) 50%, transparent 100%)',
            filter: 'blur(70px)',
            animation: 'aurora-shift 18s ease-in-out infinite',
            animationDelay: '-5s',
            transform: 'rotate(-8deg)'
          }}
        />

        {/* Shimmer particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/30 dark:bg-white/40"
              style={{
                width: Math.random() * 4 + 1 + 'px',
                height: Math.random() * 4 + 1 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 50 + '%',
                animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Radial gradient overlay */}
      {showRadialGradient && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_70%)]" />
      )}
    </div>
  )
}
