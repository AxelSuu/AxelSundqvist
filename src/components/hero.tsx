import { Github, Linkedin, Mail } from 'lucide-react'

const SOCIALS = [
  { href: 'https://github.com/AxelSuu', icon: <Github size={28} />, label: 'GITHUB' },
  { href: 'https://www.linkedin.com/in/axel-sundqvist/', icon: <Linkedin size={28} />, label: 'LINKEDIN' },
  { href: 'mailto:axesu672@student.liu.se', icon: <Mail size={28} />, label: 'MAIL' },
]

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        padding: '40px 32px',
        background: '#f0ede8',
        overflow: 'hidden',
      }}
    >

      {/* Main content */}
      <div style={{ maxWidth: 1240, width: '100%', margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* The big name + social links */}
        <div style={{ display: 'flex', alignItems: 'stretch', marginBottom: 36 }}>
          <div
            className="hero-name"
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
            <div style={{ color: '#007cbf' }}>SUNDQVIST</div>
          </div>

          {/* Social icon buttons — scattered (desktop only) */}
          <div className="hero-socials-desktop" style={{ position: 'relative', width: 220, flexShrink: 0 }}>
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
                    color: '#666',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  aria-label={s.label}
                  onMouseEnter={e => { e.currentTarget.style.color = '#00b85e' }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#666' }}
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
          background: '#fff',
          padding: '22px 24px',
          maxWidth: 860,
        }}>

          <p style={{
            margin: 0,
            color: '#333',
            fontSize: 20,
            lineHeight: 1.45,
            maxWidth: 780,
          }}>
            4th year M.Sc. student in Applied Physics &amp; Electrical Engineering / Communication Systems at Linköping University.</p>

            <p style={{
              margin: '16px 0 0',
              color: '#333',
              fontSize: 16,
              lineHeight: 1.45,
              maxWidth: 780,
            }}>
            Ericsson R&amp;D intern experience in Radio Hardware Drivers / Embedded Systems.
          </p>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            marginTop: 16,
          }}>
            {['Embedded Systems', 'IoT', 'ESP-IDF / FreeRTOS', 'C / C++', 'Rust'].map(tag => (
              <span
                key={tag}
                style={{
                  border: '1px solid rgba(0,124,191,0.35)',
                  color: '#007cbf',
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

        {/* Social icon row — mobile only */}
        <div className="hero-socials-mobile" style={{ display: 'none', gap: 28, marginTop: 28 }}>
          {SOCIALS.map(s => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={s.label}
              style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#007cbf' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#666' }}
            >
              {s.icon}
            </a>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-socials-desktop { display: none !important; }
          .hero-socials-mobile { display: flex !important; }
        }
      `}</style>
    </section>
  )
}
