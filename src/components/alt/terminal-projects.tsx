import { Github } from 'lucide-react'

const PROJECTS = [
  {
    num: '02',
    filename: 'openairinterface5g.c',
    title: 'OAI 5G RAN\nFORK',
    image: '/images/OAI.png',
    tags: ['5G', 'C', 'OpenAirInterface', 'Embedded Linux', 'Telecom'],
    desc: 'A fork of the OpenAirInterface 5G RAN implementation to study the ORAN architecture. ',
    github: 'https://github.com/AxelSuu/openairinterface5g',
    accentColor: '#00e87a',
  },
  {
    num: '03',
    filename: 'esp32_wireless_pong.c',
    title: 'ESP32-S3\nWIRELESS PONG',
    image: '/images/esp32.jpeg',
    tags: ['C', 'ESP-IDF', 'FreeRTOS', 'Networking', 'Wi-Fi AP', 'SPI'],
    desc: 'ESP-IDF / FreeRTOS Wireless Pong on an ESP32-S3 with 128×96 LED display and a browser-based WebSocket controller. ESP32 acts as Wi-Fi access point.',
    github: 'https://github.com/AxelSuu/ESP32-Wi-Fi-Pong',
    accentColor: '#00cfff',
  },
  {
    num: '04',
    filename: 'pytorch_quant_model.py',
    title: 'PYTORCH\nSTOCK MODEL',
    image: '/images/pystock.png',
    tags: ['Python', 'PyTorch', 'LSTM', 'Yahoo Finance', 'ML'],
    desc: 'LSTM neural network for stock price time-series prediction. Live market data via Yahoo Finance with an easy frontend API.',
    github: 'https://github.com/AxelSuu/Pytorch-Quant-Model',
    accentColor: '#ff2d55',
  },
]

function ProjectCard({ p }: { p: typeof PROJECTS[0] }) {
  return (
    <div
      style={{
        background: '#0d0d0d',
        border: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'border-color 0.3s',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = p.accentColor + '55')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
    >
      {/* Terminal chrome */}
      <div className="alt-terminal-header">
        <div className="alt-dot" style={{ background: '#ff5f56' }} />
        <div className="alt-dot" style={{ background: '#febc2e' }} />
        <div className="alt-dot" style={{ background: '#27c840' }} />
        <span style={{ marginLeft: 8, fontSize: 10, color: '#2c2c2c', letterSpacing: '0.1em', fontFamily: 'var(--mono)', flex: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
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
          color: '#e8e8e8',
          whiteSpace: 'pre-line',
        }}>
          {p.title}
        </h3>

        <p style={{ fontSize: 11, color: '#464646', lineHeight: 1.65, marginBottom: 14, flex: 1 }}>
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
          style={{ color: '#2c2c2c' }}
          onMouseEnter={e => (e.currentTarget.style.color = p.accentColor)}
          onMouseLeave={e => (e.currentTarget.style.color = '#2c2c2c')}
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
        borderTop: '1px solid rgba(255,255,255,0.07)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div className="alt-section-label" style={{ fontSize: 16 }}>Projects</div>
        <div className="alt-hr" style={{ marginBottom: 52 }} />

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
