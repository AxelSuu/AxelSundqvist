import useReveal from '@/hooks/use-reveal'
import { PERSON } from '@/content'

export default function Closing() {
  const ref = useReveal<HTMLElement>(0.1)

  return (
    <footer ref={ref} id="contact" className="closing">
      <div className="ch-kicker reveal" style={{ marginBottom: 26 }}>
        Fin — write to him
      </div>

      <a className="mail reveal" href={`mailto:${PERSON.email}`}>
        {PERSON.email}
      </a>

      <div
        className="reveal"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 24,
          flexWrap: 'wrap',
          marginTop: 'clamp(40px, 8vh, 88px)',
          paddingTop: 20,
          borderTop: '1px solid var(--bone-14)',
        }}
      >
        <span className="ch-tags">
          <span>{PERSON.based}</span>
          <span>© {new Date().getFullYear()}</span>
        </span>
        <span style={{ display: 'flex', gap: 26, flexWrap: 'wrap' }}>
          <a className="go" href={PERSON.github} target="_blank" rel="noopener noreferrer">
            {PERSON.githubHandle}
          </a>
          <a className="go" href="#top">
            Back to the top ↑
          </a>
        </span>
      </div>
    </footer>
  )
}
