import { GraduationCap, Beer, MapPin, Github, Linkedin, Mail } from 'lucide-react'

const SKILL_GROUPS = [
  { title: 'LANGUAGES', items: ['C', 'C++', 'Python', 'Bash', 'MATLAB'] },
  { title: 'EMBEDDED & SYSTEMS', items: ['Embedded Linux', 'ESP-IDF', 'FreeRTOS', 'Git', 'Make', 'CMake', 'Jenkins'] },
  { title: 'WIRELESS & NETWORKING', items: ['Wi-Fi', 'Bluetooth', 'TCP/IP', 'Radio systems', 'O-RAN'] },
  { title: 'DATA & ML', items: ['PyTorch', 'NumPy', 'SciPy', 'Pandas'] },
]

const META = [
  {
    icon: <GraduationCap size={13} />,
    title: 'EDUCATION',
    lines: ['M.Sc. Applied Physics & EE', 'Communication Systems', 'Linköping University · 2023–2028'],
  },
  {
    icon: <MapPin size={13} />,
    title: 'LOCATION',
    lines: ['Linköping / Stockholm'],
  },
  {
    icon: <Beer size={13} />,
    title: 'STUDENT ENGAGEMENT',
    lines: ['Bartending at VilleValla student pub'],
  },
]

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: '100px 32px 100px',
        background: '#f0ede8',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>

        <div className="about-grid">
          {/* Left: photo + socials */}
          <div>
            <div style={{ border: '1px solid rgba(0,0,0,0.1)', overflow: 'hidden', position: 'relative', aspectRatio: '4 / 5' }}>
              <img
                src="/images/me2.png"
                alt="Axel Sundqvist"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 20%',
                  display: 'block',
                  filter: 'grayscale(70%) contrast(1.1)',
                  transition: 'filter 0.6s',
                }}
                onMouseEnter={e => (e.currentTarget.style.filter = 'grayscale(20%) contrast(1.05)')}
                onMouseLeave={e => (e.currentTarget.style.filter = 'grayscale(70%) contrast(1.1)')}
              />
              {/* Blue duotone overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(0,124,191,0.1), rgba(0,124,191,0.05))',
                mixBlendMode: 'screen',
                pointerEvents: 'none',
              }} />
            </div>

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
                  className="link"
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: name, bio, compact meta row */}
          <div>
            <h2 style={{
              fontSize: 'clamp(44px, 6vw, 88px)',
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: '-0.025em',
              marginBottom: 36,
              color: '#1a1a1a',
            }}>
              <span style={{ color: '#1a1a1a' }}>AXEL</span><br />
              <span style={{ color: '#007cbf' }}>SUNDQVIST</span>
            </h2>

            <div style={{
              borderLeft: '2px solid rgba(0,124,191,0.4)',
              paddingLeft: 22,
              marginBottom: 40,
            }}>
              <p style={{ fontSize: 13, lineHeight: 1.85, color: '#555' }}>
                I'm an M.Sc. student in Applied Physics &amp; Electrical Engineering at
                Linköping University, focusing on Communication Systems.
              </p>
              <p style={{ fontSize: 13, lineHeight: 1.85, color: '#555', marginTop: 16 }}>
                My main interests are embedded systems, wireless communication and
                systems-level software. During my R&amp;D internship at Ericsson, I worked
                with radio hardware drivers and embedded Linux for Radio Unit platforms.
                Outside university, I build my own embedded and wireless systems around
                ESP32, ESP-IDF and FreeRTOS.
              </p>
            </div>

            {/* Compact meta strip */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
              {META.map(item => (
                <div key={item.title} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', minWidth: 180 }}>
                  <span style={{ color: '#007cbf', marginTop: 1, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 10, letterSpacing: '0.16em', color: '#1a1a1a', marginBottom: 5 }}>
                      {item.title}
                    </div>
                    {item.lines.map(l => (
                      <div key={l} style={{ fontSize: 12, color: '#777', lineHeight: 1.6 }}>{l}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills — full width */}
        <div style={{ marginTop: 72, paddingTop: 48, borderTop: '1px solid rgba(0,0,0,0.09)' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.22em', color: '#888', textTransform: 'uppercase', marginBottom: 28 }}>
            Skills
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 32 }}>
            {SKILL_GROUPS.map(g => (
              <div key={g.title}>
                <div style={{ fontSize: 10, letterSpacing: '0.14em', color: '#1a1a1a', marginBottom: 12 }}>
                  {g.title}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {g.items.map(s => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
