import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../ui/buttton/Button'
import styles from './AboutCompany.module.scss'

gsap.registerPlugin(ScrollTrigger)

const AboutCompany = () => {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const leftColRef = useRef(null)
  const rightImgRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Анимация заголовка
      gsap.fromTo(headlineRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.2,
          scrollTrigger: { trigger: headlineRef.current, start: 'top 80%' }
        }
      )

      // Анимация блоков в левой колонке (исключая кнопку)
      const textBlocks = Array.from(leftColRef.current.children).filter(
        (child) => child !== buttonRef.current
      )

      gsap.fromTo(textBlocks,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power4.out', stagger: 0.2,
          scrollTrigger: { trigger: leftColRef.current, start: 'top 80%' }
        }
      )

      // Анимация большого изображения справа
      gsap.fromTo(rightImgRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'power4.out', delay: 0.6,
          scrollTrigger: { trigger: rightImgRef.current, start: 'top 80%' }
        }
      )

      // Анимация кнопки (back эффект)
      gsap.fromTo(buttonRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.5)', delay: 1,
          scrollTrigger: { trigger: buttonRef.current, start: 'top 90%' }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        
        <div className={styles.headlineWrapper}>
          <h2 ref={headlineRef} className={styles.headline}>
            <span className={styles.headlineAccent}>Биз үчүн курулуш — бул</span><br />
            ишенимдүү, функционалдык жана жардамчы мейкиндиктерди жаратуу искусствосу
          </h2>
        </div>

        <div className={styles.grid}>
          
          <div ref={leftColRef} className={styles.leftCol}>
            
            <div className={styles.infoBlock}>
              <span className={styles.subtitle}>О компании</span>
              <div className={styles.thumbWrap}>
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                  alt="Building BW"
                  className={styles.image}
                />
              </div>
            </div>

            <div className={styles.descrBlock}>
              <div className={styles.descrContent}>
                <span className={styles.dropcap}>G</span>
                <p className={styles.paragraph}>
                  <span className={styles.brandName}>reen City</span> — строительная компания, которая сдаёт объекты в эксплуатацию в обещанные сроки.
                </p>
                <p className={styles.paragraph}>
                  Наши объекты строятся в 5-минутной ходьбе от парково-прогулочных зон и основных объектов соцбыта.
                </p>
              </div>
            </div>

            <div ref={buttonRef} className={styles.btnWrap}>
              <Button text="Читать все" />
            </div>
          </div>

          <div className={styles.rightCol}>
            <div ref={rightImgRef} className={styles.mainImgWrap}>
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1935&auto=format&fit=crop"
                alt="Modern Towers"
                className={styles.image}
              />
              <div className={styles.badge}>
                <span className={styles.badgeLetter}>G</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default AboutCompany