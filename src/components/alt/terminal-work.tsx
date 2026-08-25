import { FlaskConical, FileText, Beaker } from 'lucide-react'

const HIGHLIGHTS = [
  { icon: <FlaskConical size={13} />, title: 'PROTOTYPE DEVELOPMENT', desc: 'From specification to functional prototype' },
  { icon: <FileText size={13} />, title: 'TECHNICAL DOCUMENTATION', desc: 'Reports, documentation, and project specifications' },
  { icon: <Beaker size={13} />, title: 'LAB TESTING', desc: 'Testing contributing to grain-drying trials' },
]

export default function TerminalWork() {
  return (
    <section
      id="alt-work"
      style={{
        padding: '90px 32px 100px',
        position: 'relative',
        background: '#f0ede8',
      }}
    >
      <div style={{ maxWidth: 1240, width: '100%', margin: '0 auto', position: 'relative' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
          <span style={{ width: 28, height: 1, background: '#007cbf' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.28em', color: '#007cbf', textTransform: 'uppercase' }}>
            Earlier R&amp;D Experience
          </span>
        </div>

        <div className="alt-work-grid">
          {/* Left: terminal window with image */}
          <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid rgba(0,0,0,0.1)', overflow: 'hidden', minWidth: 0, background: '#fff' }}>
            <div className="alt-terminal-header">
              <div className="alt-dot" style={{ background: '#ff5f56' }} />
              <div className="alt-dot" style={{ background: '#febc2e' }} />
              <div className="alt-dot" style={{ background: '#27c840' }} />
            </div>
            <div className="alt-img-wrap" style={{ overflow: 'hidden', position: 'relative', aspectRatio: '16 / 9' }}>
              <img
                src="/images/infradryer.png"
                alt="Infrasonik infrasound dryer prototype"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              />
              <div style={{
                position: 'absolute',
                top: 10,
                right: 10,
                fontSize: 10,
                color: '#007cbf',
                letterSpacing: '0.15em',
                background: 'rgba(0,0,0,0.75)',
                padding: '2px 8px',
                fontFamily: 'var(--mono)',
              }}>
                [02]
              </div>
            </div>
          </div>

          {/* Right: content */}
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.2em', color: '#007cbf', marginBottom: 20 }}>
              DEC 2022 — APR 2023
            </div>

            <h2 style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              marginBottom: 24,
              color: '#1a1a1a',
            }}>
              INFRASONIK
            </h2>

            <div style={{
              borderLeft: '2px solid rgba(0,124,191,0.4)',
              paddingLeft: 20,
              marginBottom: 32,
            }}>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: '#555' }}>
                Worked with a small R&amp;D team developing and testing infrasound-based
                grain drying technology. The work contributed to trials targeting a
                50% reduction in energy consumption.
              </p>
            </div>

            {/* Highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 32 }}>
              {HIGHLIGHTS.map(h => (
                <div key={h.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ color: '#007cbf', marginTop: 1, flexShrink: 0 }}>{h.icon}</span>
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
              {['INFRASOUND', 'PROTOTYPE DEV', 'LAB TESTING', 'R&D'].map(t => (
                <span key={t} className="alt-tag" style={{ borderColor: 'rgba(0,124,191,0.35)', color: '#007cbf' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
