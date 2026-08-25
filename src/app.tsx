import Overture from '@/components/overture'
import Chapter from '@/components/chapter'
import Closing from '@/components/closing'
import useCurrent from '@/hooks/use-current'
import { CHAPTERS, PERSON } from '@/content'
import { Analytics } from '@vercel/analytics/react'
import './app.css'

const IDS = CHAPTERS.map(c => c.id)

export default function App() {
  const current = useCurrent(IDS)
  const shown = CHAPTERS.find(c => c.id === current)

  return (
    <div className="root">
      <div className="grain" aria-hidden="true" />

      <a className="hud hud--tl" href="#top">
        {PERSON.first} {PERSON.last}
      </a>
      <a className="hud hud--tr" href={`mailto:${PERSON.email}`}>
        {PERSON.email}
      </a>
      <div className="hud hud--br" aria-hidden="true">
        <b>{shown ? shown.no : '—'}</b> / {CHAPTERS.length.toString().padStart(2, '0')}
      </div>

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
