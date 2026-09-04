import FrameImage from '@/components/frame-image'
import { PERSON } from '@/content'

export default function Overture() {
  return (
    <header className="overture" id="top">
      <div className="overture-media">
        <FrameImage
          src="/images/hero.jpg"
          alt="An ESP32-S3 board and a small OLED display running on a page of handwritten Fourier analysis"
          priority
          mobileVh={84}
        />
      </div>

      <h1 className="overture-name">
        <span>Axel</span>
        <span>Sundqvist</span>
      </h1>

      <div className="overture-rule" />

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <p className="overture-sub">
          Hardware. Software. Systems. Fourth-year M.Sc. student in communication systems at Linköping University. 
          R&D Intern experience in radio hardware drivers at Ericsson.
        </p>

        <p style={{ display: 'flex', gap: 26, flexWrap: 'wrap' }}>
          <a
            className="go"
            href={PERSON.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Axel Sundqvist on GitHub, opens in a new tab"
          >
            GitHub
          </a>
          <a
            className="go"
            href={PERSON.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Axel Sundqvist on LinkedIn, opens in a new tab"
          >
            LinkedIn
          </a>
          <a className="go" href="/python-2026/">
            Python 2026
          </a>
          <a className="go" href="#contact">
            Contact
          </a>
        </p>
      </div>
    </header>
  )
}
