import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTransition } from '../../../app/transition/TransitionContext'
import './PageTransition.css'

function waitForImages(container, timeout = 2500) {
  if (!container) return Promise.resolve()
  const images = Array.from(container.querySelectorAll('img'))
  if (images.length === 0) return Promise.resolve()

  const promises = images.map((img) =>
    img.complete
      ? Promise.resolve()
      : new Promise((resolve) => {
          img.addEventListener('load', resolve, { once: true })
          img.addEventListener('error', resolve, { once: true })
        })
  )
  return Promise.race([Promise.all(promises), new Promise((r) => setTimeout(r, timeout))])
}

export default function PageTransition() {
  const location = useLocation()
  const { linesRef, textRef, finishTransition } = useTransition()

  useEffect(() => {
    const run = async () => {
      const main = document.querySelector('main')
      await waitForImages(main)
      finishTransition()
    }
    run()
  }, [location.pathname])

  return (
    <div className="gc-transition">
      {[...Array(8)].map((_, i) => (
        <span key={i} className="gc-transition-line" ref={(el) => (linesRef.current[i] = el)} />
      ))}
      <div className="gc-transition-text" ref={textRef}>
        <span className="gc-transition-text-main">Green</span>
        <span className="gc-transition-text-accent">City</span>
      </div>
    </div>
  )
} 