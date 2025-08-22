import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 h-11 w-11 rounded-full border border-border/60 bg-background/70 backdrop-blur-md shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  )
}

export default ScrollToTopButton
