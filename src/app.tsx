import Overture from '@/components/overture'
import Chapter from '@/components/chapter'
import Closing from '@/components/closing'
import { CHAPTERS } from '@/content'
import { Analytics } from '@vercel/analytics/react'
import './app.css'

export default function App() {
  return (
    <div className="root">
      <div className="grain" aria-hidden="true" />

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
