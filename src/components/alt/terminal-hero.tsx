import { Github, Linkedin, Mail } from 'lucide-react'

const SOCIALS = [
  { href: 'https://github.com/AxelSuu', icon: <Github size={28} />, label: 'GITHUB' },
  { href: 'https://www.linkedin.com/in/axel-sundqvist/', icon: <Linkedin size={28} />, label: 'LINKEDIN' },
  { href: 'mailto:axesu672@student.liu.se', icon: <Mail size={28} />, label: 'MAIL' },
]

export default function TerminalHero() {
  return (
    <section
      id="alt-home"
      className="alt-grid-bg alt-scanlines"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        padding: '80px 32px 52px',
        overflow: 'hidden',
      }}
    >
      {/* Decorative corner grid lines */}
      <div style={{
        position: 'absolute',
        top: 64,
        right: 32,
        width: 120,
        height: 120,
        borderTop: '1px solid rgba(0,0,0,0.09)',
        borderRight: '1px solid rgba(0,0,0,0.09)',
        zIndex: 2,
      }} />
      <div style={{
        position: 'absolute',
        bottom: 100,
        left: 32,
        width: 80,
        height: 80,
        borderBottom: '1px solid rgba(0,0,0,0.09)',
        borderLeft: '1px solid rgba(0,0,0,0.09)',
        zIndex: 2,
      }} />

      {/* Main content */}
      <div style={{ maxWidth: 1240, width: '100%', margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* The big name + social links */}
        <div style={{ display: 'flex', alignItems: 'stretch', marginBottom: 36 }}>
          <div
            className="alt-hero-name"
            style={{
              fontSize: 'clamp(72px, 13vw, 180px)',
              fontWeight: 700,
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
              userSelect: 'none',
              flex: 1,
            }}
          >
            <div style={{ color: '#1a1a1a' }}>AXEL</div>
            <div style={{ color: '#00b85e' }}>SUNDQVIST</div>
          </div>

          {/* Social icon buttons — scattered */}
          <div style={{ position: 'relative', width: 220, flexShrink: 0 }}>
            {SOCIALS.map((s, i) => {
              const pos: React.CSSProperties[] = [
                { top: 16,    left: 60  },
                { top: '44%', left: 20  },
                { bottom: 16, left: 90  },
              ]
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  style={{
                    position: 'absolute',
                    ...pos[i],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#aaa',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#00b85e' }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#aaa' }}
                >
                  {s.icon}
                </a>
              )
            })}
          </div>
        </div>

        {/* Impact intro panel */}
        <div style={{
          border: '1px solid rgba(0,0,0,0.1)',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.025), rgba(0,0,0,0.01))',
          padding: '22px 24px',
          maxWidth: 860,
        }}>

          <p style={{
            margin: 0,
            color: '#333',
            fontSize: 18,
            lineHeight: 1.45,
            maxWidth: 780,
          }}>
            M.Sc. student in Applied Physics and Electrical Engineering @ LiU | 
            R&D intern @ Ericsson Business Area Networks (BNEW). 
          </p>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            marginTop: 16,
          }}>
            {['Telecom', 'Embedded Systems', 'Wi-Fi / Bluetooth'].map(tag => (
              <span
                key={tag}
                style={{
                  border: '1px solid rgba(0,184,94,0.35)',
                  color: '#007a40',
                  fontSize: 11,
                  letterSpacing: '0.05em',
                  padding: '6px 10px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
