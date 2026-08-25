import { Github } from 'lucide-react'

const PROJECTS = [
  {
    num: '03',
    filename: '',
    title: 'ESP32-S3\nWIRELESS EMBEDDED SYSTEM',
    image: '/images/esp32.jpeg',
    tags: ['C', 'ESP-IDF', 'FREERTOS', 'WI-FI', 'WEBSOCKET', 'SPI'],
    desc: 'A fully wireless embedded system built on ESP-IDF and FreeRTOS. The ESP32 acts as a Wi-Fi access point and communicates with a browser-based controller over WebSocket.',
    github: 'https://github.com/AxelSuu/ESP32-Wi-Fi-Pong',
    accentColor: '#00b85e',
  },
  {
    num: '04',
    filename: '',
    title: 'PYQUANT',
    image: '/images/pystock.png',
    tags: ['PYTHON', 'PYTORCH', 'TIME SERIES', 'CI', 'FASTAPI'],
    desc: 'A forecasting pipeline built around a Temporal Fusion Transformer, producing multi-horizon probabilistic forecasts with automated testing and nightly CI validation.',
    github: 'https://github.com/AxelSuu/Pytorch-Quant-Model',
    accentColor: '#00b85e',
  },
]

function ProjectCard({ p }: { p: typeof PROJECTS[0] }) {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.09)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'border-color 0.3s',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = p.accentColor + '66')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.09)')}
    >
      {/* Terminal chrome */}
      <div className="alt-terminal-header">
        <div className="alt-dot" style={{ background: '#ff5f56' }} />
        <div className="alt-dot" style={{ background: '#febc2e' }} />
        <div className="alt-dot" style={{ background: '#27c840' }} />
        <span style={{ marginLeft: 8, fontSize: 10, color: '#aaa', letterSpacing: '0.1em', fontFamily: 'var(--mono)', flex: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
          {p.filename}
        </span>
      </div>

      {/* Image */}
      <div className="alt-img-wrap" style={{ overflow: 'hidden', position: 'relative', aspectRatio: '16/9', flexShrink: 0 }}>
        <img
          src={p.image}
          alt={p.title.replace('\n', ' ')}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          top: 10,
          right: 10,
          fontSize: 10,
          color: p.accentColor,
          letterSpacing: '0.15em',
          background: 'rgba(0,0,0,0.75)',
          padding: '2px 8px',
          fontFamily: 'var(--mono)',
        }}>
          [{p.num}]
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: '18px 18px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: '-0.01em',
          lineHeight: 1.2,
          marginBottom: 10,
          color: '#1a1a1a',
          whiteSpace: 'pre-line',
        }}>
          {p.title}
        </h3>

        <p style={{ fontSize: 11, color: '#777', lineHeight: 1.65, marginBottom: 14, flex: 1 }}>
          {p.desc}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
          {p.tags.map(t => (
            <span
              key={t}
              style={{
                fontSize: 9,
                letterSpacing: '0.1em',
                padding: '2px 6px',
                border: `1px solid ${p.accentColor}33`,
                color: p.accentColor,
                textTransform: 'uppercase',
                fontFamily: 'var(--mono)',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <a
          href={p.github}
          target="_blank"
          rel="noopener noreferrer"
          className="alt-link"
          style={{ color: '#aaa' }}
          onMouseEnter={e => (e.currentTarget.style.color = p.accentColor)}
          onMouseLeave={e => (e.currentTarget.style.color = '#aaa')}
        >
          <Github size={11} />
          VIEW REPO
        </a>
      </div>
    </div>
  )
}

export default function TerminalProjects() {
  return (
    <section
      id="alt-projects"
      style={{
        padding: '100px 32px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
          <span style={{ width: 28, height: 1, background: '#00b85e' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.28em', color: '#00b85e', textTransform: 'uppercase' }}>
            Selected Projects
          </span>
        </div>

        <div className="alt-projects-grid">
          {PROJECTS.map(p => <ProjectCard key={p.num} p={p} />)}
        </div>

        <div style={{ marginTop: 36, display: 'flex', justifyContent: 'flex-end' }}>
          <a
            href="https://github.com/AxelSuu"
            target="_blank"
            rel="noopener noreferrer"
            className="alt-link"
          >
            MORE REPOS → github.com/AxelSuu
          </a>
        </div>
      </div>
    </section>
  )
}
