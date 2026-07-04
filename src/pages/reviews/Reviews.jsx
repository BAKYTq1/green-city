import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Reviews.module.scss'
import { translations } from '../../locales/i18n'
import { useLang } from '../../locales/LangContext'
import { useReviewsStore } from '../../store'
import Obratnyi from '../../widgets/ui/ibratka/Obratnyi'
import { useTransition } from '../../app/transition/TransitionContext'

gsap.registerPlugin(ScrollTrigger)

function getYoutubeThumbnail(url) {
  if (!url) return null
  const match = url.match(/v=([^&]+)/)
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null
}

export default function Reviews() {
  const { lang } = useLang()
  const t = translations[lang].reviews
  const { goTo } = useTransition()

  const { items, loading, error, fetchList } = useReviewsStore()

  useEffect(() => {
    fetchList()
  }, [fetchList])

  // Показываем максимум 4 отзыва на главной, чередуя выравнивание left/right
  const reviews = items.slice(0, 4).map((item, i) => ({
    id: item.id,
    title: item.name,
    meta: item.descriptions,
    img: item.image || getYoutubeThumbnail(item.url),
    align: i % 2 === 0 ? 'left' : 'right',
  }))

  const sectionRef = useRef()
  const titleRef = useRef()
  const subtitleRef = useRef()
  const itemsRef = useRef([])

  useEffect(() => {
    if (loading || reviews.length === 0) return

    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' }
        }
      )
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: subtitleRef.current, start: 'top 85%' }
        }
      )
      itemsRef.current.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.1,
            scrollTrigger: { trigger: item, start: 'top 85%' }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [loading, reviews.length])

  return (
    <section className={styles.reviews} ref={sectionRef}>
      <div className={styles.container}>

        <div className={styles.top}>
          <h2 className={styles.title} ref={titleRef}>{t.title}</h2>
          <p className={styles.subtitle} ref={subtitleRef}>Green City.</p>
        </div>

        {loading && <p>Загрузка...</p>}
        {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}

        {!loading && !error && (
          <div className={styles.items}>
            {reviews.map((review, i) => (
              <div
                key={review.id}
                className={`${styles.item} ${styles[review.align]} ${styles.clickable}`}
                ref={el => itemsRef.current[i] = el}
                onClick={() => goTo(`/reviews/${review.id}`)}
              >
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemTitle}>{review.title}</h3>
                  <p className={styles.itemMeta}>{review.meta}</p>
                </div>
                {review.img && (
                  <div className={styles.itemImg}>
                    <img src={review.img} alt={review.title} loading="lazy" />
                    <div className={styles.itemImgOverlay}>
                      <span className={styles.itemImgOverlayText}>
                        Подробнее
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
      <Obratnyi/>
    </section>
  )
}