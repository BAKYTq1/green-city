import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../ui/buttton/Button'
import styles from './AboutCompany.module.scss'
import { translations } from '../../locales/i18n'
import { useLang } from '../../locales/LangContext'

gsap.registerPlugin(ScrollTrigger)

const AboutCompany = () => {
  const { lang } = useLang()
  const t = translations[lang] || translations.ky

  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const leftColRef = useRef(null)
  const rightImgRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headlineRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.2,
          scrollTrigger: { trigger: headlineRef.current, start: 'top 80%' }
        }
      )

      const textBlocks = Array.from(leftColRef.current.children).filter(
        (child) => child !== buttonRef.current
      )

      gsap.fromTo(textBlocks,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power4.out', stagger: 0.2,
          scrollTrigger: { trigger: leftColRef.current, start: 'top 80%' }
        }
      )

      gsap.fromTo(rightImgRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'power4.out', delay: 0.6,
          scrollTrigger: { trigger: rightImgRef.current, start: 'top 80%' }
        }
      )

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
            <span className={styles.headlineAccent}>{t.about.headline_accent}</span><br />
            {t.about.headline}
          </h2>
        </div>

        <div className={styles.grid}>

          <div ref={leftColRef} className={styles.leftCol}>

            <div className={styles.infoBlock}>
              <span className={styles.subtitle}>{t.about.title}</span>
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
                  <span className={styles.brandName}>reen City</span> {t.about.text_1}
                </p>
                <p className={styles.paragraph}>
                  {t.about.text_2}
                </p>
              </div>
            </div>

            <div ref={buttonRef} className={styles.btnWrap}>
              <Button text={t.about.button} link={'/about'}/>
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