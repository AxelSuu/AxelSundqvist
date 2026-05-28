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

        {/* Impact intro panel */}
        <div style={{
          border: '1px solid rgba(255,255,255,0.09)',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
          padding: '22px 24px',
          maxWidth: 860,
        }}>

          <p style={{
            margin: 0,
            color: '#cfcfcf',
            fontSize: 18,
            lineHeight: 1.45,
            maxWidth: 780,
          }}>
            M.Sc. student in Applied Physics and Electrical Engineering student @ LiU | 
            R&D intern @ Ericsson Business Area Networks. 
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
                  border: '1px solid rgba(0,232,122,0.25)',
                  color: '#8ee9b7',
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
