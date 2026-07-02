import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCreative } from 'swiper/modules'
import gsap from 'gsap'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-creative'
import './Header.css'
import { translations, langs, langLabels } from '../../locales/i18n'
import { useLang } from '../../locales/LangContext'

export default function HeaderHome() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const logoRef = useRef()
  const navRef = useRef()

  const { lang, changeLang } = useLang()
  const t = translations[lang]

  const slides = [
    {
      id: 1,
      title: t.headerHome.slide1_title,
      subtitle: t.headerHome.slide1_sub,
      bg: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80',
    },
    {
      id: 2,
      title: t.headerHome.slide2_title,
      subtitle: t.headerHome.slide2_sub,
      bg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80',
    },
  ]

  useEffect(() => {
    gsap.fromTo(logoRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.3 })
    gsap.fromTo(navRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.5 })
  }, [])

  useEffect(() => {
    document.body.classList.toggle('dark-theme', dark)
  }, [dark])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className={`gc-nav gc-nav--fixed ${scrolled ? 'scrolled' : ''} ${dark ? 'dark' : ''}`} ref={navRef}>
        <div className="gc-nav-left">
          <button className="gc-theme-btn" onClick={() => setDark(!dark)} aria-label="Тема">
            {dark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
          <Link to="/objects" className="gc-objects-link">{t.headerHome.objects}</Link>
        </div>

        <Link to="/" className="gc-logo" ref={logoRef}>
          <div className="gc-logo-icon">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M12 28 L12 18 L20 10 L28 18 L28 28 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M16 28 L16 22 L24 22 L24 28" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <circle cx="20" cy="16" r="2" stroke="currentColor" strokeWidth="1.2" fill="none"/>
            </svg>
          </div>
          <span className="gc-logo-text">Green City</span>
        </Link>

        <div className="gc-nav-right">
          <a href="tel:+996556111444" className="gc-phone">{t.headerHome.phone}</a>

          <div className="gc-lang" onClick={() => setLangOpen(!langOpen)}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.25">
              <circle cx="10" cy="10" r="9.375"/>
              <path d="M9.26 0.5C6.93 3.17 3.26 11.5 9.26 19.5"/>
              <path d="M10.74 0.5C13.07 3.17 16.74 11.5 10.74 19.5"/>
              <line x1="1" y1="7.375" x2="19" y2="7.375"/>
              <line x1="1" y1="13.375" x2="19" y2="13.375"/>
            </svg>
            <span>{langLabels[lang]}</span>
            <span className={`gc-lang-arrow ${langOpen ? 'open' : ''}`}>▾</span>
            {langOpen && (
              <div className="gc-lang-dropdown">
                {langs.map((l) => (
                  <div
                    key={l}
                    className={`gc-lang-item ${lang === l ? 'active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); changeLang(l); setLangOpen(false) }}
                  >
                    {langLabels[l]}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className={`gc-burger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Меню">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <header className={`gc-header ${dark ? 'dark' : ''}`}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCreative]}
          navigation={{ nextEl: '.gc-next', prevEl: '.gc-prev' }}
          pagination={{ el: '.gc-pagination', type: 'fraction' }}
          autoplay={{ delay: 4000 }}
          speed={1200}
          effect="creative"
          creativeEffect={{
            prev: { translate: ['-100%', 0, 0], scale: 1.08 },
            next: { translate: ['100%', 0, 0], scale: 1.08 },
          }}
          className="gc-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="gc-slide" style={{ backgroundImage: `url(${slide.bg})` }}>
                <div className="gc-slide-overlay"></div>
                <div className="gc-slide-content">
                  <h2 className="gc-slide-title">{slide.title}</h2>
                  <p className="gc-slide-desc">{slide.subtitle}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="gc-controls">
            <div className="gc-pagination"></div>
            <div className="gc-nav-btns">
              <button className="gc-prev">←</button>
              <button className="gc-next">→</button>
            </div>
          </div>
        </Swiper>
      </header>

      <div className={`gc-menu ${menuOpen ? 'open' : ''}`}>
        <button
          className={`gc-burger gc-menu-burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(false)}
          aria-label="Закрыть"
        >
          <span></span><span></span><span></span>
        </button>
        <nav className="gc-menu-links">
          {[
            { to: '/', label: t.headerHome.home },
            { to: '/about', label: t.headerHome.about },
            { to: '/objects', label: t.headerHome.objects },
            { to: '/news', label: t.headerHome.news },
            { to: '/reviews', label: t.headerHome.reviews },
            { to: '/contacts', label: t.headerHome.contacts },
          ].map((link) => (
            <Link key={link.to} to={link.to} className="gc-menu-link" onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="gc-menu-bg-text">Green City</div>
      </div>
    </>
  )
}