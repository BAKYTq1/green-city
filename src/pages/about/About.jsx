'use client'
import { useEffect, useRef, useState } from 'react'
import { useScroll, useTransform, motion, AnimatePresence, useInView } from 'framer-motion'
import { ZoomParallax } from './Zoomparallax/ZoomParallax'

// ─── ДАННЫЕ ───
const parallaxImages = [
  { src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80', alt: 'Royal — жилой комплекс' },
  { src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80', alt: 'Royal — фасад' },
  { src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80', alt: 'Royal — интерьер' },
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80', alt: 'Royal — двор' },
  { src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80', alt: 'Royal — пентхаус' },
  { src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80', alt: 'Royal — бизнес-центр' },
  { src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80', alt: 'Royal — Иссык-Куль' },
]

const values = [
  {
    title: 'Качество и надёжность',
    text: 'Мы используем современные технологии, инженерные решения и сертифицированные материалы, чтобы строить объекты, которые сохраняют прочность и эстетику на протяжении десятилетий.',
    image: '/images/royal/value-1.jpg',
  },
  {
    title: 'Стиль и эстетика',
    text: 'Каждый проект — это синтез архитектурного видения и функциональности. Мы создаём пространства, в которых хочется жить и работать.',
    image: '/images/royal/value-2.jpg',
  },
  {
    title: 'Доверие и прозрачность',
    text: 'Юридическая чистота каждой сделки, полная прозрачность на всех этапах строительства и своевременная сдача объектов — наши ключевые обязательства.',
    image: '/images/royal/value-3.jpg',
  },
]

const partners = [
  { name: 'BekemBlock', logo: '/images/partners/bekemblock.svg' },
  { name: 'Laminam',    logo: '/images/partners/laminam.svg' },
  { name: 'LG',         logo: '/images/partners/lg.svg' },
  { name: 'Schüco',     logo: '/images/partners/schuco.svg' },
]

const directorSlides = [
  'Мирлан Акжигитов — один из самых успешных молодых предпринимателей Кыргызстана. По образованию он менеджер по управлению бизнесом. Образование он получил в городе Брадфорд, Великобритания. Именно там он приобрёл ценные навыки: упорство, системность, трудолюбие, умение ставить цели и добиваться их. Там же зародилась его любовь к архитектуре и искусству, к красивым зданиям, подобно которым он мечтал построить в Кыргызстане.',
  'Вернувшись на родину, Мирлан решил начать своё дело в строительной сфере, чтобы создавать не просто качественные, но и эстетически выразительные, уникальные здания. Не имея опыта, пришлось столкнуться с множеством трудностей: от сложностей с поставками до резких изменений в экономической или законодательной среде. Чтобы развиваться в этих условиях, нужно было быть гибким, быстро принимать решения, сохранять качество и оставаться конкурентоспособными.',
]

// ─── ХЕЛПЕР: анимация при появлении ───
function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── СЕКЦИЯ: О компании — левая фото едет вниз, правая вверх ───
function AboutSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Левая фото едет вниз (+80px), правая едет вверх (-80px)
  const leftY  = useTransform(scrollYProgress, [0, 1], [-60, 80])
  const rightY = useTransform(scrollYProgress, [0, 1], [60, -80])

  return (
    <section ref={ref} className="bg-[#f7f5f0] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeUp>
          <h2 className="text-3xl md:text-[2.6rem] font-bold text-[#1a1a1a] uppercase leading-tight max-w-3xl mb-16">
            За 13 лет упорной работы мы зарекомендовали себя как один из лидеров
            строительного рынка Кыргызстана
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-[60vh]">

          {/* Левая фото — едет ВНИЗ при скролле */}
          <motion.div style={{ y: leftY }} className="md:col-span-3">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="/images/royal/about-1.jpg"
                alt="Royal — проект"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Текст по центру — стоит на месте */}
          <FadeUp delay={0.15} className="md:col-span-5 flex flex-col justify-center">
            <p className="text-[#5a5a5a] text-sm md:text-base leading-relaxed">
              Реализовав более 30 масштабных проектов, охватывающих жилые
              комплексы, Бизнес-центры, клубные дома и объекты для отдыха.
              Наш подход — это синтез инноваций, безупречного качества и
              высокого профессионализма на каждом этапе реализации.
            </p>
          </FadeUp>

          {/* Правая фото — едет ВВЕРХ при скролле */}
          <motion.div style={{ y: rightY }} className="md:col-span-4">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="/images/royal/about-2.jpg"
                alt="Royal — здание"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

// ─── СЕКЦИЯ: Мы развиваем — большой текст по центру, 2 фото по краям ───
function WeGrowSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const leftY  = useTransform(scrollYProgress, [0, 1], [-80, 80])
  const rightY = useTransform(scrollYProgress, [0, 1], [80, -80])

  return (
    <section ref={ref} className="bg-[#f7f5f0] py-0 overflow-hidden min-h-screen relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">

        {/* Левая фото — едет вниз */}
        <motion.div
          style={{ y: leftY }}
          className="absolute left-0 top-0 w-[18vw] max-w-[230px]"
        >
          <div className="aspect-[3/5] overflow-hidden">
            <img
              src="/images/royal/grow-left.jpg"
              alt="Royal — комплекс"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Правая фото — едет вверх */}
        <motion.div
          style={{ y: rightY }}
          className="absolute right-0 top-0 w-[18vw] max-w-[230px]"
        >
          <div className="aspect-[3/5] overflow-hidden">
            <img
              src="/images/royal/grow-right.jpg"
              alt="Royal — фасад"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Текст по центру */}
        <div className="flex items-center justify-center min-h-screen py-24">
          <FadeUp className="text-center max-w-2xl mx-auto px-8">
            <p className="text-2xl md:text-4xl font-bold uppercase text-[#1a1a1a] leading-snug tracking-wide">
              Мы развиваем жилые комплексы в Бишкеке и центры отдыха на Иссык-Куле,
              задавая тренды и повышая качество жизни в Кыргызстане.
            </p>
          </FadeUp>
        </div>

      </div>
    </section>
  )
}

// ─── СЕКЦИЯ: Royal это — ───
function RoyalIsSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const leftY  = useTransform(scrollYProgress, [0, 1], [-40, 60])
  const rightY = useTransform(scrollYProgress, [0, 1], [40, -60])

  return (
    <section ref={ref} className="bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

          {/* Большое фото слева — едет вниз */}
          <motion.div style={{ y: leftY }} className="md:col-span-5">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="/images/royal/royal-is-1.jpg"
                alt="Royal — башня"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Центр: лого + пункты */}
          <div className="md:col-span-4 flex flex-col gap-10 pt-8">
            <FadeUp>
              <div className="text-[2.5rem] font-serif text-[#1a1a1a] leading-none mb-6">
                <span className="font-bold italic text-[3rem]">R</span>oyal это—
              </div>
            </FadeUp>

            {[
              { n: '01', text: 'Более 6000 довольных клиентов, доверивших нам мечту о собственном жилье' },
              { n: '02', text: 'Гарантия безопасности — все объекты сопровождаются полным пакетом разрешительной документации' },
              { n: '03', text: 'Точные сроки сдачи объектов' },
              { n: '04', text: 'Юридическая чистота каждой сделки и полная прозрачность' },
            ].map((item, i) => (
              <FadeUp key={item.n} delay={i * 0.1}>
                <p className="text-xs text-[#b0a898] mb-1">({item.n})</p>
                <p className="text-[#c8a96e] text-sm leading-relaxed font-medium">
                  {item.text}
                </p>
              </FadeUp>
            ))}
          </div>

          {/* Фото справа — едет вверх */}
          <motion.div style={{ y: rightY }} className="md:col-span-3 pt-32">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="/images/royal/royal-is-2.jpg"
                alt="Royal — объект"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

// ─── СЕКЦИЯ: Ценности ───
function ValuesSlider() {
  const [active, setActive] = useState(0)

  return (
    <section className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img
            src={values[active].image}
            alt={values[active].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4"
        >
          Ценности компании Royal
        </motion.p>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-lg"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-snug">
              {values[active].title}
            </h2>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              {values[active].text}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-4 mt-10">
          <button
            onClick={() => setActive((p) => (p - 1 + values.length) % values.length)}
            className="w-10 h-10 rounded-full border border-white/40 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            ←
          </button>
          <button
            onClick={() => setActive((p) => (p + 1) % values.length)}
            className="w-10 h-10 rounded-full border border-white/40 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            →
          </button>
          <div className="flex gap-2 ml-2">
            {values.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-6 h-px transition-all duration-300 ${i === active ? 'bg-white' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── СЕКЦИЯ: Директор ───
function DirectorSection() {
  const [slide, setSlide] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 60%, #0a0a0a 100%)' }}
      className="py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

        {/* Фото — появляется слева */}
        <motion.div
          className="md:col-span-4"
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="aspect-[3/4] overflow-hidden grayscale">
            <img
              src="/images/royal/director.jpg"
              alt="Акжигитов Мирлан Толонович"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>

        {/* Текст — появляется справа */}
        <motion.div
          className="md:col-span-8 text-white"
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-bold uppercase mb-2 tracking-wide">
            Акжигитов Мирлан<br />Толонович
          </h2>
          <p className="text-amber-400 text-sm font-medium mb-8 uppercase tracking-widest">
            Генеральный директор строительной компании ROYAL
          </p>

          <AnimatePresence mode="wait">
            <motion.p
              key={slide}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45 }}
              className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl"
            >
              {directorSlides[slide]}
            </motion.p>
          </AnimatePresence>

          <div className="flex items-center gap-4 mt-10">
            <button
              onClick={() => setSlide((p) => (p - 1 + directorSlides.length) % directorSlides.length)}
              className="w-10 h-10 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              ←
            </button>
            <button
              onClick={() => setSlide((p) => (p + 1) % directorSlides.length)}
              className="w-10 h-10 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              →
            </button>
            <span className="text-white/30 text-sm ml-2">
              {slide + 1} / {directorSlides.length}
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

// ─── СЕКЦИЯ: Партнёры ───
function PartnersSection() {
  return (
    <section className="bg-white py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <FadeUp className="max-w-lg">
            <h2 className="text-3xl md:text-4xl font-bold uppercase text-[#1a1a1a] leading-tight">
              Надёжные партнёры, с которыми мы строим будущее Кыргызстана
            </h2>
          </FadeUp>
          <FadeIn delay={0.2}>
            <p className="text-xs text-[#b0a898] uppercase tracking-widest">
              Партнёры
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-200 border border-gray-200">
          {partners.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.1}>
              <div className="flex items-center justify-center py-12 px-8 h-full">
                <img
                  src={p.logo}
                  alt={p.name}
                  className="h-8 object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── ГЛАВНЫЙ КОМПОНЕНТ ───
export default function AboutCompany() {
  useEffect(() => {
    let lenis
    let rafId
    ;(async () => {
      const { default: Lenis } = await import('@studio-freight/lenis')
      lenis = new Lenis()
      const raf = (time) => {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    })()
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      lenis?.destroy?.()
    }
  }, [])

  return (
    <main className="w-full">
      {/* 1. Зум-параллакс */}

      {/* 2. О компании: фото едут в разные стороны */}
      <AboutSection />

      {/* 3. "Мы развиваем..." — текст + 2 фото по краям */}
      <WeGrowSection />

      {/* 4. Royal это — */}
      <RoyalIsSection />

      <ZoomParallax
        images={parallaxImages}
        title={
          <p style={{color:'white'}}>
            Строительная компания Royal —<br />
            это символ надёжности, стиля<br />
            и стремления к совершенству.
          </p>
        }
      />
      {/* 5. Ценности */}
      <ValuesSlider />

      {/* 6. Директор */}
      <DirectorSection />

      {/* 7. Партнёры */}
      <PartnersSection />
    </main>
  )
}
 