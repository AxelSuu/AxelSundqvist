import useReveal from '@/hooks/use-reveal'
import FrameImage from '@/components/frame-image'
import type { Chapter as Ch } from '@/content'

export default function Chapter({ chapter }: { chapter: Ch }) {
  const ref = useReveal<HTMLElement>()
  const isRepo = chapter.href?.includes('github')

  return (
    <section ref={ref} id={chapter.id} className="chapter">
      <div className="chapter-media" data-fit={chapter.fit}>
        <FrameImage
          src={chapter.image}
          alt={chapter.alt}
          fit={chapter.fit}
          style={chapter.position ? { objectPosition: chapter.position } : undefined}
        />
      </div>

      <div className="chapter-text">
        <div className="reveal">
          <div className="ch-kicker">
            {chapter.kicker}
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
              <a
                className="go"
                href={chapter.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  isRepo
                    ? `Source code for ${chapter.title.replace('\n', ' ')} on GitHub, opens in a new tab`
                    : 'Axel Sundqvist on LinkedIn, opens in a new tab'
                }
              >
                {isRepo ? 'Source' : 'LinkedIn'} <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
