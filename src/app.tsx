import Hero from '@/components/hero'
import Experience from '@/components/experience'
import Work from '@/components/work'
import Projects from '@/components/projects'
import About from '@/components/about'
import { Analytics } from '@vercel/analytics/react'
import './app.css'

function App() {
  return (
    <div className="root">
      <a
        href="#home"
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
      <main id="home-main">
        <Hero />
        <Experience />
        <Work />
        <Projects />
        <About />
      </main>
      <Analytics />
    </div>
  )
}

export default App
