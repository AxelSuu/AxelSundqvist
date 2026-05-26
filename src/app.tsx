import TerminalNav from '@/components/alt/terminal-nav'
import TerminalHero from '@/components/alt/terminal-hero'
import TerminalWork from '@/components/alt/terminal-work'
import TerminalProjects from '@/components/alt/terminal-projects'
import TerminalAbout from '@/components/alt/terminal-about'
import { Analytics } from '@vercel/analytics/react'
import './app-alt.css'

function App() {
  return (
    <div className="alt-root">
      <a
        href="#alt-home"
        style={{
          position: 'absolute',
          top: -40,
          left: 0,
          background: '#00e87a',
          color: '#000',
          padding: '8px 16px',
          zIndex: 1000,
          fontFamily: 'var(--mono)',
          fontSize: 12,
          transition: 'top 0.3s',
        }}
        onFocus={e => (e.currentTarget.style.top = '0')}
        onBlur={e => (e.currentTarget.style.top = '-40px')}
      >
        Skip to main content
      </a>
      <TerminalNav />
      <main id="alt-home-main">
        <TerminalHero />
        <TerminalWork />
        <TerminalProjects />
        <TerminalAbout />
      </main>
      <Analytics />
    </div>
  )
}

export default App
