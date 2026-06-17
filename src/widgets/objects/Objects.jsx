import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Objects.module.scss'
import Button from '../ui/buttton/Button'

gsap.registerPlugin(ScrollTrigger)

const objects = [
  {
    id: 1,
    name: 'GREEN PARK',
    status: 'Курулуп жатат',
    statusType: 'building',
    address: 'ул. Масалиева 8B',
    type: 'Квартиры',
    floors: 22,
    tag: null,
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
  },
  {
    id: 2,
    name: 'FOREST HILLS',
    status: 'Курулуп жатат',
    statusType: 'building',
    address: 'ул. Валиханова 7',
    type: 'Квартиры',
    floors: 18,
    tag: 'САТУУ БАШТАЛДЫ',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
  },
  {
    id: 3,
    name: 'ECO TOWER',
    status: 'Курулуп жатат',
    statusType: 'building',
    address: 'ул. Масалиева 16',
    type: 'Офисы',
    floors: 21,
    tag: null,
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
  },
  {
    id: 4,
    name: 'NATURE PLACE',
    status: 'Бүткөн',
    statusType: 'done',
    address: 'ул. Масалиева 8A',
    type: 'Квартиры',
    floors: 16,
    tag: null,
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
  },
  {
    id: 5,
    name: 'GREEN VALLEY',
    status: 'Аяктоо стадиясында',
    statusType: 'finishing',
    address: 'ул. Чуйская 45',
    type: 'Коттеджи',
    floors: 3,
    tag: null,
    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80',
  },
  {
    id: 6,
    name: 'CITY GARDEN',
    status: 'Бүткөн',
    statusType: 'done',
    address: 'ул. Байтик Баатыра 12',
    type: 'Коммерческие',
    floors: 8,
    tag: null,
    img: 'https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=600&q=80',
  },
]

const statuses = [
  { label: 'Баары', value: '' },
  { label: 'Курулуп жатат', value: 'building' },
  { label: 'Бүткөн', value: 'done' },
  { label: 'Аяктоо стадиясында', value: 'finishing' },
]

const types = [
  { label: 'Баары', value: '' },
  { label: 'Квартиры', value: 'Квартиры' },
  { label: 'Офисы', value: 'Офисы' },
  { label: 'Коттеджи', value: 'Коттеджи' },
  { label: 'Коммерческие', value: 'Коммерческие' },
]

export default function Objects() {
  const [activeStatus, setActiveStatus] = useState('')
  const [activeType, setActiveType] = useState('')
  const [minFloors, setMinFloors] = useState(0)
  const [maxFloors, setMaxFloors] = useState(27)

  const sectionRef = useRef()
  const titleRef = useRef()
  const filtersRef = useRef()
  const gridRef = useRef()
  const btnRef = useRef()

  const filtered = objects.filter((obj) => {
    if (activeStatus && obj.statusType !== activeStatus) return false
    if (activeType && obj.type !== activeType) return false
    if (obj.floors < minFloors || obj.floors > maxFloors) return false
    return true
  })

  const clearFilters = () => {
    setActiveStatus('')
    setActiveType('')
    setMinFloors(0)
    setMaxFloors(27)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Заголовок
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: 'power4.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' }
        }
      )

      // Фильтры
      gsap.fromTo(filtersRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: filtersRef.current, start: 'top 85%' }
        }
      )

      // Карточки по очереди
      gsap.fromTo(
        gridRef.current.querySelectorAll(`.${styles.card}`),
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%' }
        }
      )

      // Кнопка
      gsap.fromTo(btnRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: btnRef.current, start: 'top 90%' }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Анимация карточек при смене фильтра
  useEffect(() => {
    gsap.fromTo(
      gridRef.current?.querySelectorAll(`.${styles.card}`),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.1 }
    )
  }, [activeStatus, activeType, minFloors, maxFloors])

  return (
    <section className={styles.objects} ref={sectionRef}>
      <div className={styles.container}>

        <h2 className={styles.title} ref={titleRef}>
          Фильтрлеңиз. Салыштырыңыз. Тандаңыз.
        </h2>

        {/* ФИЛЬТРЫ */}
        <div className={styles.filters} ref={filtersRef}>
          <div className={styles.filterRow}>
            <div className={styles.filterGroup}>
              {statuses.map((s) => (
                <button
                  key={s.value}
                  className={`${styles.filterBtn} ${activeStatus === s.value ? styles.active : ''}`}
                  onClick={() => setActiveStatus(s.value)}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div className={styles.filterGroup}>
              {types.map((t) => (
                <button
                  key={t.value}
                  className={`${styles.filterBtn} ${activeType === t.value ? styles.active : ''}`}
                  onClick={() => setActiveType(t.value)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterRow}>
            <div className={styles.rangeGroup}>
              <div className={styles.rangeValues}>
                <span>{minFloors} этаж</span>
                <span>{maxFloors} этаж</span>
              </div>
              <div className={styles.rangeInputs}>
                <input type="range" min="0" max="27" value={minFloors}
                  onChange={(e) => setMinFloors(+e.target.value)} />
                <input type="range" min="0" max="27" value={maxFloors}
                  onChange={(e) => setMaxFloors(+e.target.value)} />
              </div>
            </div>
            <button className={styles.clearBtn} onClick={clearFilters}>
              ✕ Сбросить
            </button>
          </div>
        </div>

        {/* КАРТОЧКИ */}
        <div className={styles.grid} ref={gridRef}>
          {filtered.length === 0 ? (
            <p className={styles.noResults}>Объекты табылган жок</p>
          ) : (
            filtered.map((obj) => (
              <Link to={`/objects/${obj.id}`} key={obj.id} className={styles.card}>
                <h3 className={styles.cardTitle}>{obj.name}</h3>
                <div className={styles.cardInfo}>
                  <span className={`${styles.cardStatus} ${styles[obj.statusType]}`}>
                    {obj.status}
                  </span>
                  <span className={styles.cardAddress}>📍 {obj.address}</span>
                  <span className={styles.cardType}>🏠 {obj.type}</span>
                </div>
                <div className={styles.cardImg}>
                  {obj.tag && <p className={styles.cardTag}>{obj.tag}</p>}
                  <img src={obj.img} alt={obj.name} loading="lazy" />
                </div>
              </Link>
            ))
          )}
        </div>

        {/* КНОПКА */}
        <div className={styles.bottom} ref={btnRef}>
          <Button text='Смотреть все' link='/about'/>
        </div>

      </div>
    </section>
  )
}