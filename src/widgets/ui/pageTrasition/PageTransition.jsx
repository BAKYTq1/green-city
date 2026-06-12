import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import './PageTransition.css'

export default function PageTransition() {
  const location = useLocation()
  const linesRef = useRef([])
  const textRef = useRef()

  useEffect(() => {
    const tl = gsap.timeline()

    // Полоски закрываются
    tl.to(linesRef.current, {
      scaleY: 1,
      duration: 0.5,
      ease: 'power4.inOut',
      stagger: 0.05,
    })
    // Текст появляется
    .to(textRef.current, {
      opacity: 1,
      duration: 0.3,
    })
    // Полоски открываются
    .to(linesRef.current, {
      scaleY: 0,
      duration: 0.5,
      ease: 'power4.inOut',
      stagger: 0.05,
      delay: 0.2,
    })
    .to(textRef.current, {
      opacity: 0,
      duration: 0.2,
    }, '-=0.3')

  }, [location.pathname])

  return (
    <div className="gc-transition">
      {[...Array(8)].map((_, i) => (
        <span
          key={i}
          className="gc-transition-line"
          ref={el => linesRef.current[i] = el}
        />
      ))}
      <h2 className="gc-transition-text" ref={textRef}>Green City</h2>
    </div>
  )
}