import { PERSON } from '@/content'

export default function Overture() {
  return (
    <header className="overture" id="top">
      <div className="overture-media">
        <img
          src="/images/hero.jpeg"
          alt="An ESP32-S3 board and a small OLED display running on a page of handwritten Fourier analysis"
        />
      </div>

      <h1 className="overture-name">
        <span>Axel</span>
        <span>Sundqvist</span>
      </h1>

      <div className="overture-rule" />

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <p className="overture-sub">
          Embedded systems, radio hardware and the software that sits closest to it.
          Fourth-year M.Sc. student in Applied Physics and Electrical Engineering at
          Linköping University specializing in communication systems.
        </p>

        <p style={{ display: 'flex', gap: 26, flexWrap: 'wrap' }}>
          <a className="go" href={PERSON.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a className="go" href={PERSON.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a className="go" href="#contact">
            Contact
          </a>
        </p>
      </div>
    </header>
  )
}
