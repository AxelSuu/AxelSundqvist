import useReveal from '@/hooks/use-reveal'
import { PERSON } from '@/content'

/* The last frame. Five chapters of image, then nothing — one address on the
   same baseline every chapter used, with the whole screen empty above it. */
export default function Closing() {
  const ref = useReveal<HTMLElement>(0.25)

  return (
    <footer ref={ref} id="contact" className="closing">
      <a className="mail reveal" href={`mailto:${PERSON.email}`}>
        {PERSON.email}
      </a>
    </footer>
  )
}
