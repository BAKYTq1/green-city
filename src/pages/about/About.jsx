import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const titleRef = useRef()
  const textRef = useRef()

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        }
      }
    )
    gsap.fromTo(textRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, delay: 0.2,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        }
      }
    )
  }, [])

  return (
    <section>
      <h2 ref={titleRef}>О компании</h2>
      <p ref={textRef}>Текст...</p>
      <h1></h1>
    </section>
  )
}