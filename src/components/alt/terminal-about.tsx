import { GraduationCap, Beer, MapPin, Code2, Github, Linkedin, Mail } from 'lucide-react'

const SKILLS = [
  'C', 'C++', 'ESP-IDF / FreeRTOS', 'Embedded Systems', 'Wi-Fi', 'Bluetooth', 'Networking',
  'Python', 'MATLAB', '5G Toolkit', 'PyTorch', 'Valgrind', 'CMake'
]

export default function TerminalAbout() {
  return (
    <section
      id="alt-about"
      style={{
        padding: '100px 32px 80px',
        background: '#f0ede8',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div className="alt-about-grid">
          {/* Left: image + filename */}
          <div>
            <div style={{ border: '1px solid rgba(0,0,0,0.1)', overflow: 'hidden', position: 'relative' }}>
              {/* Terminal header */}
              <div className="alt-terminal-header">
                <div className="alt-dot" style={{ background: '#ff5f56' }} />
                <div className="alt-dot" style={{ background: '#febc2e' }} />
                <div className="alt-dot" style={{ background: '#27c840' }} />
                <span style={{ marginLeft: 8, fontSize: 10, color: '#aaa', letterSpacing: '0.1em' }}>
                  axel_sundqvist.jpg
                </span>
              </div>
              {/* Photo with treatment */}
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src="/images/me2.png"
                  alt="Axel Sundqvist"
                  style={{
                    width: '100%',
                    display: 'block',
                    filter: 'grayscale(70%) contrast(1.1)',
                    transition: 'filter 0.6s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.filter = 'grayscale(20%) contrast(1.05)')}
                  onMouseLeave={e => (e.currentTarget.style.filter = 'grayscale(70%) contrast(1.1)')}
                />
                {/* Green duotone overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(0,184,94,0.1), rgba(0,124,191,0.05))',
                  mixBlendMode: 'screen',
                  pointerEvents: 'none',
                }} />
              </div>
            </div>

            {/* Social links below image */}
            <div style={{ display: 'flex', gap: 16, marginTop: 20, paddingLeft: 4 }}>
              {[
                { href: 'https://github.com/AxelSuu', icon: <Github size={14} />, label: 'GITHUB' },
                { href: 'https://www.linkedin.com/in/axel-sundqvist/', icon: <Linkedin size={14} />, label: 'LINKEDIN' },
                { href: 'mailto:axesu672@student.liu.se', icon: <Mail size={14} />, label: 'EMAIL' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="alt-link"
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: bio */}
          <div>
            <h2 style={{
              fontSize: 'clamp(44px, 6vw, 88px)',
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: '-0.025em',
              marginBottom: 36,
              color: '#1a1a1a',
            }}>
              AXEL<br />
              <span style={{ color: '#00b85e' }}>SUNDQVIST</span>
            </h2>

            <div style={{
              borderLeft: '2px solid rgba(0,184,94,0.4)',
              paddingLeft: 22,
              marginBottom: 44,
            }}>
              <p style={{ fontSize: 13, lineHeight: 1.85, color: '#555' }}>
                Ericsson 2026 R&D summer intern. Third year student in Applied Physics &
                Electrical Engineering at LiU. My main interests are communication
                systems, embedded systems, and signal processing.
              </p>
            </div>

            {/* Details grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginBottom: 44 }}>
              {[
                {
                  icon: <GraduationCap size={13} />,
                  title: 'EDUCATION',
                  lines: [
                    'B.Sc. Applied Physics & EE  (2023 – 2026)',
                    'M.Sc. Communication Systems (2026 – 2028)',
                    'Linköping University, Sweden',
                  ],
                },
                {
                  icon: <Beer size={13} />,
                  title: 'STUDENT ENGAGEMENT',
                  lines: ['Bartending at VilleValla student pub'],
                },
                {
                  icon: <MapPin size={13} />,
                  title: 'LOCATION',
                  lines: ['Linköping / Stockholm'],
                },
                {
                  icon: <Code2 size={13} />,
                  title: 'SKILLS STACK',
                  content: (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {SKILLS.map(s => (
                        <span key={s} className="alt-tag">{s}</span>
                      ))}
                    </div>
                  )
                }
              ].map(item => (
                <div key={item.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ color: '#00b85e', marginTop: 1, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 10, letterSpacing: '0.18em', color: '#1a1a1a', marginBottom: 5 }}>
                      {item.title}
                    </div>
                    {Array.isArray(item.lines) && item.lines.map(l => (
                      <div key={l} style={{ fontSize: 12, color: '#777', lineHeight: 1.7 }}>{l}</div>
                    ))}
                    {item.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        
      </div>
    </section>
  )
}
