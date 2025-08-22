import React from 'react'

interface WaveformDividerProps {
  amplitude?: number // vertical amplitude
  wavelength?: number // length of one wave cycle in px
  speedMs?: number // animation duration of one loop
  thickness?: number
  opacity?: number
  flip?: boolean
  dual?: boolean // draw secondary inverted wave
  offsetY?: number // vertical offset adjustment (px)
  zIndex?: number
}

// Lightweight SVG wave (tiled) with horizontal translate animation. No background fill.
export const WaveformDivider: React.FC<WaveformDividerProps> = ({
  amplitude = 10,
  wavelength = 160,
  speedMs = 6000,
  thickness = 2,
  opacity = 0.55,
  flip = false,
  dual = true,
  offsetY = 0,
  zIndex = 10,
}) => {
  const cycles = 3 // number of repeated wave segments
  const totalWidth = wavelength * cycles
  const path = React.useMemo(() => {
    // Build a single sine-ish path using quadratic curves
    const svgHeight = amplitude * 2
    const mid = svgHeight / 2
    const amp = amplitude
    // One cycle: start at x0,yMid then curve up and down back to baseline
    const single = `M0 ${mid} Q ${wavelength / 4} ${mid - amp} ${wavelength / 2} ${mid} Q ${(3 * wavelength) / 4} ${mid + amp} ${wavelength} ${mid}`
    return Array.from({ length: cycles }, (_, i) => `translate(${i * wavelength} 0)` + single).join(' ')
  }, [amplitude, wavelength, cycles])

  return (
    <div aria-hidden="true" className="relative w-full" style={{ height: 0, lineHeight: 0, zIndex }}>
      <div
        className={`absolute left-0 right-0 pointer-events-none select-none overflow-visible ${flip ? 'rotate-180' : ''}`}
        style={{ top: offsetY - amplitude, background: 'transparent' }}
      >
      <svg
          width="100%"
          height={amplitude * 2}
          viewBox={`0 0 ${totalWidth} ${amplitude * 2}`}
          preserveAspectRatio="none"
          className="block overflow-visible"
          style={{ background: 'transparent' }}
        >
        <defs>
          <linearGradient id="wf-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--signal))" stopOpacity={0} />
            <stop offset="15%" stopColor="hsl(var(--signal))" stopOpacity={opacity} />
            <stop offset="50%" stopColor="hsl(var(--wave-accent))" stopOpacity={opacity} />
            <stop offset="85%" stopColor="hsl(var(--signal))" stopOpacity={opacity} />
            <stop offset="100%" stopColor="hsl(var(--wave-accent))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <g
          style={{
            animation: `wf-shift ${speedMs}ms linear infinite`,
            transformOrigin: '0 0',
          }}
        >
          <path d={path} fill="none" stroke="url(#wf-line)" strokeWidth={thickness} strokeLinecap="round" />
          {dual && (
            <path
              d={path}
              fill="none"
              stroke="url(#wf-line)"
              strokeWidth={thickness * 0.6}
              strokeLinecap="round"
              style={{ transform: `translateY(${amplitude * 0.8}px)`, opacity: 0.55 }}
            />
          )}
        </g>
        </svg>
      </div>
      <style>{`
        @keyframes wf-shift { to { transform: translateX(-${wavelength}px); } }
        @media (prefers-reduced-motion: reduce) { svg g { animation: none !important; } }
      `}</style>
    </div>
  )
}
