import { useState, useEffect } from 'react'
import { ArrowDown } from 'lucide-react'

const ROLES = [
  'Applied Physics & EE Student',
  'Embedded Systems Developer',
  'Ericsson R&D Intern 2026',
  'Signal Processing Enthusiast',
  'Communication Systems Nerd',
]

export default function TerminalHero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [shown, setShown] = useState('')
  const [erasing, setErasing] = useState(false)

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    const full = ROLES[roleIdx]
    if (!erasing) {
      if (shown.length < full.length) {
        t = setTimeout(() => setShown(full.slice(0, shown.length + 1)), 55)
      } else {
        t = setTimeout(() => setErasing(true), 2400)
      }
    } else {
      if (shown.length > 0) {
        t = setTimeout(() => setShown(s => s.slice(0, -1)), 28)
      } else {
        setRoleIdx(i => (i + 1) % ROLES.length)
        setErasing(false)
      }
    }
    return () => clearTimeout(t)
  }, [shown, erasing, roleIdx])

  return (
    <section
      id="alt-home"
      className="alt-grid-bg alt-scanlines"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        position: 'relative',
        padding: '0 32px 52px',
        overflow: 'hidden',
      }}
    >
      {/* Top system prompt */}
      <div style={{
        position: 'absolute',
        top: 70,
        left: 32,
        fontSize: 10,
        letterSpacing: '0.2em',
        color: '#2c2c2c',
        fontFamily: 'var(--mono)',
        zIndex: 2,
      }}>
        SYSTEM:/PORTFOLIO/AXEL $&nbsp;
        <span style={{ color: '#00e87a' }}>./display --name</span>
      </div>

      {/* Decorative corner grid lines */}
      <div style={{
        position: 'absolute',
        top: 64,
        right: 32,
        width: 120,
        height: 120,
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        zIndex: 2,
      }} />
      <div style={{
        position: 'absolute',
        bottom: 100,
        left: 32,
        width: 80,
        height: 80,
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        borderLeft: '1px solid rgba(255,255,255,0.05)',
        zIndex: 2,
      }} />

      {/* Main content */}
      <div style={{ maxWidth: 1240, width: '100%', margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* The big name */}
        <div
          className="alt-hero-name"
          style={{
            fontSize: 'clamp(72px, 13vw, 180px)',
            fontWeight: 700,
            lineHeight: 0.88,
            letterSpacing: '-0.03em',
            marginBottom: 36,
            userSelect: 'none',
          }}
        >
          <div style={{ color: '#f0f0f0' }}>AXEL</div>
          <div style={{ color: '#00e87a' }}>SUNDQVIST</div>
        </div>

        {/* Divider */}
        <div className="alt-hr" style={{ marginBottom: 28 }} />

        {/* Bottom row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 20,
        }}>
          {/* Typing role */}
          <div style={{
            fontSize: 13,
            letterSpacing: '0.06em',
            color: '#555',
            fontFamily: 'var(--mono)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <span style={{ color: '#2c2c2c' }}>&gt;_&nbsp;</span>
            <span>{shown}</span>
            <span className="alt-cursor" />
          </div>

          {/* Location + school */}
          <div style={{ fontSize: 10, color: '#2c2c2c', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            LiU&nbsp;·&nbsp;Linköping, Sweden
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: 52,
        right: 32,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        color: '#2c2c2c',
        fontSize: 9,
        letterSpacing: '0.2em',
        zIndex: 2,
      }}>
        <span>SCROLL</span>
        <ArrowDown size={11} style={{ animation: 'alt-blink 2s infinite' }} />
      </div>
    </section>
  )
}
