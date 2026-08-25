import { Radio, Cpu, GitBranch, Network, Linkedin } from 'lucide-react'

const HIGHLIGHTS = [
  { icon: <Radio size={13} />, title: 'RADIO DRIVERS', desc: 'Implementation and testing across 20+ radio platforms' },
  { icon: <Cpu size={13} />, title: 'HARDWARE TESTING', desc: 'C / Bash / Linux interface and validation tests' },
  { icon: <GitBranch size={13} />, title: 'CI AUTOMATION', desc: 'Automated hardware-configuration testing and nightly validation' },
  { icon: <Network size={13} />, title: 'NETWORKING', desc: 'Link-layer test tools and Ethernet / interface validation' },
]

export default function TerminalExperience() {
  return (
    <section
      id="alt-experience"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 32px 100px',
        position: 'relative',
        background: '#fff',
      }}
    >
      <div style={{ maxWidth: 1240, width: '100%', margin: '0 auto', position: 'relative' }}>

        {/* Kicker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
          <span style={{ width: 28, height: 1, background: '#007cbf' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.28em', color: '#007cbf', textTransform: 'uppercase' }}>
            Professional Experience
          </span>
        </div>

        <div className="alt-work-grid" style={{ alignItems: 'start' }}>

          {/* Left: team photo */}
          <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid rgba(0,0,0,0.1)', overflow: 'hidden', minWidth: 0, background: '#fff' }}>
            <div className="alt-terminal-header">
              <div className="alt-dot" style={{ background: '#ff5f56' }} />
              <div className="alt-dot" style={{ background: '#febc2e' }} />
              <div className="alt-dot" style={{ background: '#27c840' }} />
            </div>
            <div className="alt-img-wrap" style={{ overflow: 'hidden', position: 'relative', aspectRatio: '4 / 3' }}>
              <img
                src="/images/ericsson-team.jpeg"
                alt="Radio Unit software team at Ericsson's Kista campus"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
              />
            </div>
          </div>

          {/* Right: content */}
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.2em', color: '#007cbf', marginBottom: 20 }}>
              R&amp;D SUMMER INTERN &nbsp;·&nbsp; STOCKHOLM, SWEDEN &nbsp;·&nbsp; JUN — AUG 2026
            </div>

            <h2 style={{
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: '-0.025em',
              marginBottom: 28,
              color: '#1a1a1a',
            }}>
              ERICSSON<br /><span style={{ color: '#007cbf' }}>RADIO</span>
            </h2>

            <div style={{ borderLeft: '2px solid rgba(0,124,191,0.4)', paddingLeft: 20, marginBottom: 36 }}>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: '#555' }}>
                Worked with radio hardware drivers for Ericsson's radios, which are at the
                core of Ericsson's products. Part of Ericsson Business Area Networks (BNEW),
                in the Radio Unit software organization.
              </p>
            </div>

            {/* Highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 36 }}>
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

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {['RADIO HARDWARE', 'EMBEDDED LINUX', 'C / BASH', 'TESTING', 'CI', 'NETWORKING'].map(t => (
                <span
                  key={t}
                  className="alt-tag"
                  style={{ borderColor: 'rgba(0,124,191,0.35)', color: '#007cbf' }}
                >
                  {t}
                </span>
              ))}
            </div>

            <a
              href="https://www.linkedin.com/in/axel-sundqvist/"
              target="_blank"
              rel="noopener noreferrer"
              className="alt-link"
              style={{ color: '#999' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#007cbf')}
              onMouseLeave={e => (e.currentTarget.style.color = '#999')}
            >
              <Linkedin size={11} />
              VIEW ON LINKEDIN
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
