import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Stats.module.scss'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 3000, suffix: '+', label: 'иш орундар түзүлдү' },
  { value: 29, suffix: '', label: 'объектилер' },
  { value: 13, suffix: '', label: 'жыл Кыргызстан базарында' },
  { value: 5000, suffix: '+', label: 'канааттанган кардарлар' },
]

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef()
  const triggered = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true
          let start = 0
          const step = value / (2000 / 16)
          const timer = setInterval(() => {
            start += step
            if (start >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref} className={styles.number}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function Stats() {
  const sectionRef = useRef()
  const textRef = useRef()
  const numbersRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Текст слева
      gsap.fromTo(textRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: textRef.current, start: 'top 80%' }
        }
      )

      // Цифры снизу по очереди
      gsap.fromTo(
        numbersRef.current.querySelectorAll(`.${styles.statItem}`),
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: numbersRef.current, start: 'top 85%' }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.stats} ref={sectionRef}>
      <div className={styles.bg}>
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80"
          alt="Green City"
        />
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.text} ref={textRef}>
          <div className={styles.logo}>
            <svg viewBox="0 0 60 60" fill="none">
              <circle cx="30" cy="30" r="28" stroke="white" strokeWidth="1"/>
              <path d="M18 44 L18 28 L30 14 L42 28 L42 44 Z" stroke="white" strokeWidth="1.5" fill="none"/>
              <path d="M24 44 L24 35 L36 35 L36 44" stroke="white" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
          <p>
            <span className={styles.brand}>Green City</span> — курулуш компаниясы, ага ишенишет. Сүйөнүүгө мүмкүн болгон сапат менен курабыз
          </p>
        </div>

        <div className={styles.numbers} ref={numbersRef}>
          {stats.map((stat, i) => (
            <div key={i} className={styles.statItem}>
              <Counter value={stat.value} suffix={stat.suffix} />
              <span className={styles.label}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}