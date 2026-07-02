"use client";
import { useEffect, useRef, useState } from "react";
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
  useInView,
} from "framer-motion";
import { ZoomParallax } from "./Zoomparallax/ZoomParallax";

// ─── ДАННЫЕ ───
const parallaxImages = [
  {
    src: "https://i.pinimg.com/736x/c5/69/6f/c5696f825f78dd4be31349d1ef6d209b.jpg",
    alt: "Green City — жилой комплекс",
  },
  {
    src: "https://i.pinimg.com/736x/98/04/cc/9804cc584897f606c08a563d12ab8176.jpg ",
    alt: "Green City — фасад",
  },
  {
    src: "https://i.pinimg.com/1200x/7a/50/a1/7a50a1c4ad6a073f71fe1f42c61fb354.jpg",
    alt: "Green City — interior",
  },
  {
    src: "https://i.pinimg.com/736x/f4/14/4a/f4144af3bfe3c47b36aeef238fd66b35.jpg",
    alt: "Green City — двор",
  },
  {
    src: "https://i.pinimg.com/736x/35/0b/24/350b2426dcce60ca73887ae2a48df34b.jpg",
    alt: "Green City — пентхаус",
  },
  {
    src: "https://i.pinimg.com/1200x/6d/1f/e4/6d1fe4be349834baffa4064c89c5f24d.jpg",
    alt: "Green City — бизнес-центр",
  },
  {
    src: "https://i.pinimg.com/1200x/f8/69/51/f86951719b406d8c9495664156497693.jpg",
    alt: "Green City — Иссык-Куль",
  },
];

const values = [
  {
    title: "Качество и надёжность",
    text: "Мы используем современные технологии, инженерные решения и сертифицированные материалы, чтобы строить объекты, которые сохраняют прочность и эстетику на протяжении десятилетий.",
    image: "/images/Green City/value-1.jpg",
  },
  {
    title: "Стиль и эстетика",
    text: "Каждый проект — это синтез архитектурного видения и функциональности. Мы создаём пространства, в которых хочется жить и работать.",
    image: "/images/Green City/value-2.jpg",
  },
  {
    title: "Доверие и прозрачность",
    text: "Юридическая чистота каждой сделки, полная прозрачность на всех этапах строительства и своевременная сдача объектов — наши ключевые обязательства.",
    image: "/images/Green City/value-3.jpg",
  },
];

const bannerImages = [
  {
    src: "https://i.pinimg.com/736x/c5/69/6f/c5696f825f78dd4be31349d1ef6d209b.jpg",
    alt: "Green City — жилой комплекс",
  },
  {
    src: "https://i.pinimg.com/1200x/6d/1f/e4/6d1fe4be349834baffa4064c89c5f24d.jpg",
    alt: "Green City — бизнес-центр",
  },
  {
    src: "https://i.pinimg.com/736x/35/0b/24/350b2426dcce60ca73887ae2a48df34b.jpg",
    alt: "Green City — пентхаус",
  },
  {
    src: "https://i.pinimg.com/1200x/f8/69/51/f86951719b406d8c9495664156497693.jpg",
    alt: "Green City — Иссык-Куль",
  },
  {
    src: "https://i.pinimg.com/1200x/7a/50/a1/7a50a1c4ad6a073f71fe1f42c61fb354.jpg",
    alt: "Green City — интерьер",
  },
];

const partners = [
  { name: "BekemBlock" },
  { name: "Laminam" },
  { name: "LG" },
  { name: "Schüco" },
  { name: "Knauf" },
  { name: "Bosch" },
  { name: "Grohe" },
  { name: "REHAU" },
  { name: "Schneider Electric" },
];

const directorSlides = [
  "Мирлан Акжигитов — один из самых успешных молодых предпринимателей Кыргызстана. По образованию он менеджер по управлению бизнесом. Образование он получил в городе Брадфорд, Великобритания. Именно там он приобрёл ценные навыки: упорство, системность, трудолюбие, умение ставить цели и добиваться их. Там же зародилась его любовь к архитектуре и искусству, к красивым зданиям, подобно которым он мечтал построить в Кыргызстане.",
  "Вернувшись на родину, Мирлан решил начать своё дело в строительной сфере, чтобы создавать не просто качественные, но и эстетически выразительные, уникальные здания. Не имея опыта, пришлось столкнуться с множеством трудностей: от сложностей с поставками до резких изменений в экономической или законодательной среде. Чтобы развиваться в этих условиях, нужно было быть гибким, быстро принимать решения, сохранять качество и оставаться конкурентоспособными.",
];

// ─── ХЕЛПЕР: анимация при появлении ───
function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
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
  );
}

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
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
  );
}

// ─── ХЕЛПЕР: фото с "оживлением" ───
function RevealImage({
  src,
  alt,
  className = "",
  imgClassName = "w-full h-full object-cover",
  delay = 0,
  scaleFrom = 1.15,
  hoverScale = 1.08,
  grayscale = false,
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        initial={{ opacity: 0, scale: scaleFrom, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0 }}
        whileHover={{ scale: hoverScale }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        className={`${imgClassName} ${grayscale ? "grayscale" : ""}`}
      />
    </div>
  );
}

// ─── ХЕЛПЕР: лого партнёра с fallback на текст ───
// Если logo не передан ИЛИ картинка не загрузилась (404, битая ссылка) —
// вместо пустого места / сломанной иконки показываем стилизованное название.
function PartnerLogo({ name, logo }) {
  const [failed, setFailed] = useState(false);

  if (!logo || failed) {
    return (
      <span className="text-base md:text-lg font-semibold uppercase tracking-wider text-gray-400 group-hover:text-[#1a1a1a] transition-colors duration-300 text-center px-2 select-none">
        {name}
      </span>
    );
  }

  return (
    <img
      src={logo}
      alt={name}
      onError={() => setFailed(true)}
      className="h-12 md:h-16 w-full object-contain grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
    />
  );
}

// ─── БАННЕР: карусель из 5 картинок ───
function HeroBanner() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timeoutRef = useRef(null);

  const goTo = (newIndex, dir) => {
    setDirection(dir);
    setIndex((newIndex + bannerImages.length) % bannerImages.length);
  };

  useEffect(() => {
    const delay = 5000 + Math.random() * 5000;
    timeoutRef.current = setTimeout(() => {
      goTo(index + 1, 1);
    }, delay);
    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.img
          key={index}
          src={bannerImages[index].src}
          alt={bannerImages[index].alt}
          custom={direction}
          initial={(dir) => ({
            opacity: 0,
            scale: 1.08,
            x: dir > 0 ? 40 : -40,
          })}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={(dir) => ({ opacity: 0, scale: 0.98, x: dir > 0 ? -40 : 40 })}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-black/10 pointer-events-none" />

      <div className="absolute inset-0 flex items-end">
        <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24 w-full">
          <FadeUp>
            <h2 className="text-3xl md:text-[2.8rem] font-bold text-white uppercase leading-tight max-w-3xl [text-shadow:0_2px_16px_rgba(0,0,0,0.45)]">
              За 13 лет упорной работы мы зарекомендовали себя как один из
              лидеров строительного рынка Кыргызстана
            </h2>
          </FadeUp>
        </div>
      </div>

      <motion.button
        onClick={() => goTo(index - 1, -1)}
        whileHover={{ scale: 1.15, opacity: 1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Предыдущее изображение"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-white text-2xl bg-transparent border-none opacity-80 hover:opacity-100 transition-opacity z-10 [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]"
      >
        ←
      </motion.button>
      <motion.button
        onClick={() => goTo(index + 1, 1)}
        whileHover={{ scale: 1.15, opacity: 1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Следующее изображение"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-white text-2xl bg-transparent border-none opacity-80 hover:opacity-100 transition-opacity z-10 [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]"
      >
        →
      </motion.button>

      <div className="absolute bottom-8 right-6 md:right-12 flex gap-2 z-10">
        {bannerImages.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > index ? 1 : -1)}
            aria-label={`Слайд ${i + 1}`}
            className={`h-1 transition-all duration-300 rounded-full ${
              i === index ? "w-8 bg-white" : "w-4 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── СЕКЦИЯ: О компании ───
function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const rightY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="bg-[#f7f5f0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Левая фото */}
          <motion.div
            style={{ y: leftY }}
            className="col-span-1 md:col-span-3 order-1 max-w-sm mx-auto md:max-w-none w-full"
          >
            <RevealImage
              className="aspect-[3/4] rounded-lg"
              src="https://i.pinimg.com/736x/04/b1/1e/04b11e6ba93477fdca9205d98900fe67.jpg"
              alt="Green City — проект"
            />
          </motion.div>

          {/* Текст по центру */}
          <FadeUp
            delay={0.15}
            className="col-span-1 md:col-span-5 flex flex-col justify-center order-2 text-center md:text-left my-6 md:my-0"
          >
            <p className="text-[#5a5a5a] text-base md:text-lg leading-relaxed">
              Реализовав более 30 масштабных проектов, охватывающих жилые
              комплексы, Бизнес-центры, клубные дома и объекты для отдыха. Наш
              подход — это синтез инноваций, безупречного качества и высокого
              профессионализма на каждом этапе реализации.
            </p>
          </FadeUp>

          {/* Правая фото */}
          <motion.div
            style={{ y: rightY }}
            className="col-span-1 md:col-span-4 order-3 max-w-sm mx-auto md:max-w-none w-full"
          >
            <RevealImage
              className="aspect-[3/4] rounded-lg"
              src="https://i.pinimg.com/736x/77/58/96/7758968a5f4e18fcba1ee9641f788577.jpg"
              alt="Green City — здание"
              delay={0.1}
              grayscale
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── СЕКЦИЯ: Мы развиваем ───
function WeGrowSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const rightY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={ref}
      className="bg-[#f7f5f0] py-12 md:py-0 overflow-hidden md:min-h-screen relative flex items-center"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
        {/* Левая фото */}
        <motion.div
          style={{ y: leftY }}
          className="relative md:absolute left-0 top-0 w-full max-w-[260px] md:w-[18vw] md:max-w-[230px] order-2 md:order-1"
        >
          <RevealImage
            className="aspect-[3/5] rounded-lg"
            src="https://i.pinimg.com/736x/60/2c/9a/602c9a34e5baa28b76b9f4ab4d8e667f.jpg"
            alt="Green City — комплекс"
          />
        </motion.div>

        {/* Текст по центру */}
        <div className="w-full md:max-w-2xl mx-auto px-4 md:px-8 order-1 md:order-2 text-center py-6 md:py-24 z-10">
          <FadeUp>
            <p className="text-xl md:text-4xl font-bold uppercase text-[#1a1a1a] leading-snug tracking-wide">
              Мы развиваем жилые комплексы в Бишкеке и центры отдыха на
              Иссык-Куле, задавая тренды и повышая качество жизни в Кыргызстане.
            </p>
          </FadeUp>
        </div>

        {/* Правая фото */}
        <motion.div
          style={{ y: rightY }}
          className="relative md:absolute right-0 top-0 w-full max-w-[260px] md:w-[18vw] md:max-w-[230px] order-3"
        >
          <RevealImage
            className="aspect-[3/5] rounded-lg"
            src="https://i.pinimg.com/736x/e4/e4/23/e4e42362f3604a83ec95aa23c7fe7d5a.jpg"
            alt="Green City — фасад"
            delay={0.15}
          />
        </motion.div>
      </div>
    </section>
  );
}

// ─── СЕКЦИЯ: Royal это — ───
function RoyalIsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const leftY = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const rightY = useTransform(scrollYProgress, [0, 1], [40, -60]);

  return (
    <section ref={ref} className="bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Большое фото слева */}
          <motion.div style={{ y: leftY }} className="md:col-span-5">
            <RevealImage
              className="aspect-[3/4]"
              src="https://i.pinimg.com/1200x/cf/7b/19/cf7b19b373101899db16f6ed6b82afd5.jpg"
              alt="Green City — башня"
            />
          </motion.div>

          {/* Центр: лого + пункты */}
          <div className="md:col-span-4 flex flex-col gap-10 pt-8">
            <FadeUp>
              <div className="text-[2.5rem] font-serif text-[#1a1a1a] leading-none mb-6">
                <span className="font-bold italic text-[3rem]">G</span>reen City
                это—
              </div>
            </FadeUp>

            {[
              {
                n: "01",
                text: "Более 6000 довольных клиентов, доверивших нам мечту о собственном жилье",
              },
              {
                n: "02",
                text: "Гарантия безопасности — все объекты сопровождаются полным пакетом разрешительной документации",
              },
              { n: "03", text: "Точные сроки сдачи объектов" },
              {
                n: "04",
                text: "Юридическая чистота каждой сделки и полная прозрачность",
              },
            ].map((item, i) => (
              <FadeUp key={item.n} delay={i * 0.1}>
                <p className="text-xs text-[#000000] mb-1">({item.n})</p>
                <p className="text-[#40a406d3] text-sm leading-relaxed font-medium">
                  {item.text}
                </p>
              </FadeUp>
            ))}
          </div>

          {/* Фото справа */}
          <motion.div style={{ y: rightY }} className="md:col-span-3 pt-32">
            <RevealImage
              className="aspect-[3/4]"
              src="https://i.pinimg.com/736x/73/bc/d5/73bcd567c5ed3a9b0e0c3273e0888865.jpg"
              alt="Green City — объект"
              delay={0.2}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── СЕКЦИЯ: Ценности ───
function ValuesSlider() {
  const [active, setActive] = useState(0);

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
          <motion.img
            src={values[active].image}
            alt={values[active].title}
            initial={{ scale: 1 }}
            animate={{ scale: 1.12 }}
            transition={{ duration: 8, ease: "linear" }}
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
          className="text-xs font-semibold uppercase tracking-widest text-[#60f709d3] mb-4"
        >
          Ценности компании Green City
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
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            onClick={() =>
              setActive((p) => (p - 1 + values.length) % values.length)
            }
            className="w-10 h-10 rounded-full border border-white/40 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            ←
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setActive((p) => (p + 1) % values.length)}
            className="w-10 h-10 rounded-full border border-white/40 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            →
          </motion.button>
          <div className="flex gap-2 ml-2">
            {values.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-6 h-px transition-all duration-300 ${i === active ? "bg-white" : "bg-white/30"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── СЕКЦИЯ: Директор ───
function DirectorSection() {
  const [slide, setSlide] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      style={{
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 60%, #0a0a0a 100%)",
      }}
      className="py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Фото */}
        <motion.div
          className="md:col-span-4"
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="aspect-[3/4] overflow-hidden grayscale">
            <motion.img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdX-sI_mtA4U1fgyaV5SHpxpN4AFKlH6HOr4HtyS4w6Q&s=10"
              alt="Алибек Шералиев — генеральный директор строительной компании Green City"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>

        {/* Текст */}
        <motion.div
          className="md:col-span-8 text-white"
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-bold uppercase mb-2 tracking-wide">
            Алибек Шералиев
            <br />
            ......
          </h2>
          <p className="text-[#40a406d3] text-sm font-medium mb-8 uppercase tracking-widest">
            Генеральный директор строительной компании GREEN CITY
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
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onClick={() =>
                setSlide(
                  (p) =>
                    (p - 1 + directorSlides.length) % directorSlides.length,
                )
              }
              className="w-10 h-10 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              ←
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setSlide((p) => (p + 1) % directorSlides.length)}
              className="w-10 h-10 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              →
            </motion.button>
            <span className="text-white/30 text-sm ml-2">
              {slide + 1} / {directorSlides.length}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-px bg-gray-200 border border-gray-200 overflow-hidden rounded-sm">
          {partners.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.05} className="bg-white">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group flex items-center justify-center p-8 h-40"
              >
                <PartnerLogo name={p.name} logo={p.logo} />
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ГЛАВНЫЙ КОМПОНЕНТ ───
export default function AboutCompany() {
  useEffect(() => {
    let lenis;
    let rafId;
    (async () => {
      const { default: Lenis } = await import("@studio-freight/lenis");
      lenis = new Lenis();
      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    })();
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy?.();
    };
  }, []);

  return (
    <main className="w-full">
      <AboutSection />
      <WeGrowSection />
      <RoyalIsSection />
      <ZoomParallax
        images={parallaxImages}
        title={
          <p
            style={{
              color: "white",
              textShadow: "0 2px 16px rgba(48, 232, 73, 0.648)",
            }}
            className="text-3xl md:text-[2.8rem] font-bold uppercase leading-tight max-w-3xl"
          >
            Строительная компания Green City <br />
            это символ надёжности, стиля
            <br />и стремления к совершенству.
          </p>
        }
      />
      <ValuesSlider />
      <DirectorSection />
      <PartnersSection />
    </main>
  );
}
