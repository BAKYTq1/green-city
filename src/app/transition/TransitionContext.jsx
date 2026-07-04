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
    if (path === location.pathname) return

    setIsAnimating(true)

    const words = textRef.current.querySelectorAll('.gc-transition-text-main, .gc-transition-text-accent')
    gsap.set(words, { clipPath: 'inset(0 100% 0 0)', opacity: 1 })

    const tl = gsap.timeline()

    tl.to(linesRef.current, {
      scaleY: 1,
      duration: 0.6,
      ease: 'power4.inOut',
      stagger: 0.06,
    })
      .to(
        words,
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.25,
        },
        '-=0.15'
      )
      .eventCallback('onComplete', () => {
        navigate(path)
      })
  }

  const finishTransition = () => {
    const words = textRef.current.querySelectorAll('.gc-transition-text-main, .gc-transition-text-accent')

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    })

    tl.to(words, {
      clipPath: 'inset(0 0 0 100%)',
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