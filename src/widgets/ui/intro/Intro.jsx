import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import './Intro.css'

export default function Intro({ onDone }) {
  const iconRef = useRef()
  const titleRef = useRef()
  const subtitleRef = useRef()
  const hintRef = useRef()
  const overlayRef = useRef()
  const introRef = useRef()

  const goToSite = useCallback(() => {
    gsap.to([iconRef.current, titleRef.current, subtitleRef.current, hintRef.current], {
      opacity: 0, scale: 1.2, duration: 0.5, ease: 'power2.in',
    })
    gsap.to(overlayRef.current, {
      opacity: 1, duration: 0.6, delay: 0.3, ease: 'power2.out',
        onComplete: () => onDone(),
    })
  }, [onDone])

  useEffect(() => {
    const tl = gsap.timeline()
    tl.to(iconRef.current, { opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.5)' })
      .to(titleRef.current, { opacity: 1, scale: 1, duration: 1, ease: 'expo.out' }, '-=0.4')
      .to(subtitleRef.current, { opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.4')
      .to(hintRef.current, { opacity: 1, duration: 0.5, ease: 'power2.out' }, '+=0.3')

    const timer = setTimeout(() => goToSite(), 5000)
    return () => clearTimeout(timer)
  }, [goToSite])

  return (
    <div className="gc-intro" ref={introRef} onClick={goToSite}>
      <div className="gc-intro-circle"></div>
      <div className="gc-intro-circle"></div>
      <div className="gc-intro-circle"></div>
      <div className="gc-intro-logo">
        <div className="gc-intro-icon" ref={iconRef}>
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M18 44 L18 28 L32 14 L46 28 L46 44 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M24 44 L24 35 L40 35 L40 44" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <circle cx="32" cy="24" r="3" stroke="currentColor" strokeWidth="1.2" fill="none"/>
            <path d="M10 28 Q18 18 32 12 Q46 18 54 28" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
          </svg>
        </div>
        <h1 className="gc-intro-title" ref={titleRef}>Green City</h1>
        <p className="gc-intro-subtitle" ref={subtitleRef}>строительная компания</p>
      </div>
      <p className="gc-intro-hint" ref={hintRef}>нажмите чтобы войти</p>
      <div className="gc-intro-overlay" ref={overlayRef}></div>
    </div>
  )
}