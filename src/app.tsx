import { useEffect } from 'react'
import Overture from '@/components/overture'
import Chapter from '@/components/chapter'
import Closing from '@/components/closing'
import { CHAPTERS } from '@/content'
import { Analytics } from '@vercel/analytics/react'
import './app.css'

export default function App() {
  /* The browser resolves the hash before React mounts, so a shared /#ericsson
     lands at the top. Do the scroll again once the frames exist. */
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
  }, [])

  return (
    <div className="root">
      <div className="grain" aria-hidden="true" />

      <a className="skip" href="#contact">
        Skip to contact
      </a>

      <main>
        <Overture />
        {CHAPTERS.map(c => (
          <Chapter key={c.id} chapter={c} />
        ))}
      </main>

      <Closing />
      <Analytics />
    </div>
  )
}
