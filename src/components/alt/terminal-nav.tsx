import { useState, useEffect } from 'react'
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react'

const NAV = [
  { id: 'alt-home', label: 'HOME', num: '00' },
  { id: 'alt-work', label: 'WORK', num: '01' },
  { id: 'alt-projects', label: 'PROJECTS', num: '02' },
  { id: 'alt-about', label: 'ABOUT', num: '05' },
]

export default function TerminalNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        fontFamily: 'var(--mono)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        background: scrolled ? 'rgba(7,7,7,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        transition: 'background 0.35s, border-color 0.35s',
      }}
    >
      <div style={{
        maxWidth: 1240,
        margin: '0 auto',
        padding: '0 28px',
        height: 54,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <button
          onClick={() => scrollTo('alt-home')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: 15,
            fontWeight: 700,
            color: '#00e87a',
            letterSpacing: '0.12em',
            padding: 0,
          }}
        >
          &gt;_ AS
        </button>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}
             className="alt-desktop-nav">
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 10,
                letterSpacing: '0.18em',
                color: '#464646',
                textTransform: 'uppercase',
                padding: '4px 0',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#d8d8d8')}
              onMouseLeave={e => (e.currentTarget.style.color = '#464646')}
            >
            {item.label}
            </button>
          ))}

          <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)' }} />

          {[
            { href: 'https://github.com/AxelSuu', icon: <Github size={13} />, label: 'GH' },
            { href: 'https://www.linkedin.com/in/axel-sundqvist/', icon: <Linkedin size={13} />, label: 'LI' },
            { href: 'mailto:axesu672@student.liu.se', icon: <Mail size={13} />, label: 'MAIL' },
          ].map(s => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              style={{
                color: '#464646',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#00e87a')}
              onMouseLeave={e => (e.currentTarget.style.color = '#464646')}
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            background: 'none',
            border: '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
            color: '#d8d8d8',
            padding: '6px 8px',
            display: 'none',
          }}
          className="alt-hamburger"
          aria-label="Toggle menu"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div style={{
          background: 'rgba(7,7,7,0.97)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          padding: '20px 28px 28px',
          fontFamily: 'var(--mono)',
        }}>
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 12,
                letterSpacing: '0.15em',
                color: '#464646',
                padding: '10px 0',
                textTransform: 'uppercase',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#00e87a')}
              onMouseLeave={e => (e.currentTarget.style.color = '#464646')}
            >
              [{item.num}]_{item.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .alt-desktop-nav { display: none !important; }
          .alt-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
