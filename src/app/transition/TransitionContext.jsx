import { createContext, useContext, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import gsap from 'gsap'

const TransitionContext = createContext(null)

export function TransitionProvider({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const linesRef = useRef([])
  const textRef = useRef()
  const [isAnimating, setIsAnimating] = useState(false)

  const goTo = (path) => {
    if (isAnimating) return

    // Клик на ту же страницу, где уже находимся — ничего не делаем
    if (path === location.pathname) return

    setIsAnimating(true)

    const tl = gsap.timeline()

    tl.to(linesRef.current, {
      scaleY: 1,
      duration: 0.6,
      ease: 'power4.inOut',
      stagger: 0.06,
    })
      .fromTo(
        textRef.current,
        { opacity: 0, y: 16, letterSpacing: '0.5em' },
        { opacity: 1, y: 0, letterSpacing: '0.2em', duration: 0.6, ease: 'power3.out' },
        '-=0.15'
      )
      .eventCallback('onComplete', () => {
        navigate(path)
      })
  }

  const finishTransition = () => {
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    })

    tl.to(textRef.current, {
      opacity: 0,
      y: -12,
      duration: 0.35,
      ease: 'power2.in',
    })
      .to(
        linesRef.current,
        {
          scaleY: 0,
          duration: 0.6,
          ease: 'power4.inOut',
          stagger: 0.06,
        },
        '-=0.1'
      )
  }

  return (
    <TransitionContext.Provider value={{ goTo, finishTransition, linesRef, textRef }}>
      {children}
    </TransitionContext.Provider>
  )
}

export const useTransition = () => useContext(TransitionContext)