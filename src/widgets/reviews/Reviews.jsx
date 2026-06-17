import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Reviews.module.scss'
import Button from '../ui/buttton/Button'
gsap.registerPlugin(ScrollTrigger)

const reviews = [
  {
    id: 1,
    title: 'Айгүл жана Бакыт: биздин чоң үй-бүлөбүздүн жаңы коңшулары!',
    meta: '— Green City, 2025',
    link: 'https://youtube.com',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    align: 'left',
  },
  {
    id: 2,
    title: 'Биздин GREEN PARK турак жай комплексинен батир сатып алган сүйкүмдүү кардарыбыздан пикир!',
    meta: '— 2025',
    link: 'https://youtube.com',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    align: 'right',
  },
  {
    id: 3,
    title: 'Дубайдан келип, биздин ECO TOWER комплексин тандап алган кардардан пикир!',
    meta: '— 2025',
    link: 'https://youtube.com',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    align: 'left',
  },
]

export default function Reviews() {
  const sectionRef = useRef()
  const titleRef = useRef()
  const subtitleRef = useRef()
  const itemsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Заголовок
      gsap.fromTo(titleRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' }
        }
      )

      // Подзаголовок
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: subtitleRef.current, start: 'top 85%' }
        }
      )

      // Карточки по очереди
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
  }, [])

  return (
    <section className={styles.reviews} ref={sectionRef}>
      <div className={styles.container}>

        {/* TOP */}
        <div className={styles.top}>
          <h2 className={styles.title} ref={titleRef}>
            Биздин кардарлардын пикирлери
          </h2>
          <p className={styles.subtitle} ref={subtitleRef}>Green City.</p>
        </div>

        {/* ITEMS */}
        <div className={styles.items}>
          {reviews.map((review, i) => (
            <div
              key={review.id}
              className={`${styles.item} ${styles[review.align]}`}
              ref={el => itemsRef.current[i] = el}
            >
              <div className={styles.itemInfo}>
                <h3 className={styles.itemTitle}>{review.title}</h3>
                <p className={styles.itemMeta}>{review.meta}</p>
                <a
                  href={review.link}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.itemLink}
                >
                  YOUTUBE
                </a>
              </div>
              <div className={styles.itemImg}>
                <img src={review.img} alt={review.title} loading="lazy" />
              </div>
            </div>
          ))}
        </div>

        <div className='flex justify-center mt-10'>
           <Button text='Посмотреть все' link='/reviews'/>
        </div>

      </div>
    </section>
  )
}