import { Waves, FileText, FlaskConical } from 'lucide-react'

const HIGHLIGHTS = [
  { icon: <Waves size={13} />, title: 'PROTOTYPE DEV', desc: 'From spec to functional infrasound dryer prototype' },
  { icon: <FileText size={13} />, title: 'TECHNICAL DOCS', desc: 'Reports and documentation for infrasound projects' },
  { icon: <FlaskConical size={13} />, title: 'LAB TESTING', desc: '50% energy reduction validated in grain drying trials' },
]

export default function TerminalWork() {
  return (
    <section
      id="alt-work"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '100px 32px',
        position: 'relative',
      }}
    >
      {/* Faint background image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/images/infradryer.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'grayscale(100%) brightness(0.85)',
        opacity: 0.12,
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, rgba(248,248,248,0.97) 50%, rgba(248,248,248,0.82))',
        zIndex: 1,
      }} />

      <div style={{ maxWidth: 1240, width: '100%', margin: '0 auto', position: 'relative', zIndex: 2 }}>

        <div className="alt-work-grid">
          {/* Left: terminal window with image */}
          <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid rgba(0,0,0,0.1)', overflow: 'hidden', minWidth: 0 }}>
            <div className="alt-terminal-header">
              <div className="alt-dot" style={{ background: '#ff5f56' }} />
              <div className="alt-dot" style={{ background: '#febc2e' }} />
              <div className="alt-dot" style={{ background: '#27c840' }} />
              <span style={{ marginLeft: 8, fontSize: 10, color: '#aaa', letterSpacing: '0.1em' }}>
                infrasonik.exe
              </span>
            </div>
            <div className="alt-img-wrap" style={{ overflow: 'hidden', maxHeight: 320 }}>
              <img
                src="/images/infradryer.png"
                alt="Infrasonik infrasound dryer prototype"
                style={{ width: '100%', height: '100%', maxHeight: 320, objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
            
          </div>

          {/* Right: content */}
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.2em', color: '#00b85e', marginBottom: 20 }}>
              DEC 2022 — APR 2023&nbsp;//&nbsp;INTERN
            </div>

            <h2 style={{
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: '-0.025em',
              marginBottom: 28,
              color: '#1a1a1a',
            }}>
              INFRA<br />SONIK
            </h2>

            <div style={{
              borderLeft: '2px solid rgba(0,184,94,0.4)',
              paddingLeft: 20,
              marginBottom: 36,
            }}>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: '#555' }}>
                Worked with a small team going from technical documentation and
                specification to a functional prototype. Contributed to infrasound
                research targeting a 50% reduction in grain drying energy consumption.
              </p>
            </div>

            {/* Highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 36 }}>
              {HIGHLIGHTS.map(h => (
                <div key={h.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ color: '#00b85e', marginTop: 1, flexShrink: 0 }}>{h.icon}</span>
                  <div>
                    <div style={{ fontSize: 10, letterSpacing: '0.15em', color: '#1a1a1a', marginBottom: 3 }}>
                      {h.title}
                    </div>
                    <div style={{ fontSize: 12, color: '#777', lineHeight: 1.5 }}>{h.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['INFRASOUND', 'PROTOTYPE DEV', 'LAB TESTING', 'TECHNICAL DOCS', 'R&D'].map(t => (
                <span key={t} className="alt-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
