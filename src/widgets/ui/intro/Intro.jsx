import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import img from '../../../assets/IMG_0370.png'
import './Intro.css'

export default function Intro({ onDone }) {
  const iconRef = useRef()
  const subtitleRef = useRef()
  const hintRef = useRef()
  const overlayRef = useRef()
  const introRef = useRef()

  const goToSite = useCallback(() => {
    gsap.to([iconRef.current, subtitleRef.current, hintRef.current], {
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
      .to(subtitleRef.current, { opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.3')
      .to(hintRef.current, { opacity: 1, duration: 0.5, ease: 'power2.out' }, '+=0.3')

    const timer = setTimeout(() => goToSite(), 3200)
    return () => clearTimeout(timer)
  }, [goToSite])

  return (
    <div className="gc-intro" ref={introRef} onClick={goToSite}>
      <div className="gc-intro-circle"></div>
      <div className="gc-intro-circle"></div>
      <div className="gc-intro-circle"></div>
      <div className="gc-intro-logos">
        <div className="gc-intro-icon" ref={iconRef}>
         <img src={img} alt="logo" />
        </div>
      </div>
      <p className="gc-intro-hint" ref={hintRef}>нажмите чтобы войти</p>
      <div className="gc-intro-overlay" ref={overlayRef}></div>
    </div>
  )
}