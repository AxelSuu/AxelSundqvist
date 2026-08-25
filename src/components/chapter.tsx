import useReveal from '@/hooks/use-reveal'
import type { Chapter as Ch } from '@/content'

export default function Chapter({ chapter }: { chapter: Ch }) {
  const ref = useReveal<HTMLElement>()

  return (
    <section ref={ref} id={chapter.id} className="chapter">
      <div className="chapter-media" data-fit={chapter.fit}>
        <img src={chapter.image} alt={chapter.title.replace('\n', ' ')} loading="lazy" />
      </div>

      <div className="chapter-text">
        <div className="reveal">
          <div className="ch-kicker">
            {chapter.no} — {chapter.kicker}
          </div>
          <h2 className="ch-title">{chapter.title}</h2>
        </div>

        <p className="ch-line reveal">{chapter.line}</p>

        <div className="ch-foot reveal">
          <dl className="facts" style={{ margin: 0 }}>
            {chapter.facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <div style={{ display: 'flex', gap: 28, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <p className="ch-tags">
              {chapter.tags.map(t => (
                <span key={t}>{t}</span>
              ))}
            </p>
            {chapter.href && (
              <a className="go" href={chapter.href} target="_blank" rel="noopener noreferrer">
                {chapter.href.includes('github') ? 'Source' : 'LinkedIn'} →
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
