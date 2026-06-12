import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import './Header.css'

const translations = {
  ky: {
    objects: 'Квартиралар жана объектилер',
    home: 'Башкы бет',
    about: 'Компания жөнүндө',
    news: 'Жаңылыктар',
    reviews: 'Пикирлер',
    contacts: 'Байланыштар',
  },
  ru: {
    objects: 'Квартиры и объекты',
    home: 'Главная',
    about: 'О компании',
    news: 'Новости',
    reviews: 'Отзывы',
    contacts: 'Контакты',
  },
  en: {
    objects: 'Apartments & Objects',
    home: 'Home',
    about: 'About',
    news: 'News',
    reviews: 'Reviews',
    contacts: 'Contacts',
  },
}

const langs = ['ky', 'ru', 'en']
const langLabels = { ky: 'KY', ru: 'RU', en: 'EN' }

export default function HeaderDefault() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const [lang, setLang] = useState('ky')
  const [langOpen, setLangOpen] = useState(false)
  const logoRef = useRef()
  const navRef = useRef()

  const t = translations[lang]

  useEffect(() => {
    gsap.fromTo(logoRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.3 })
    gsap.fromTo(navRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.5 })
  }, [])

  useEffect(() => {
    document.body.classList.toggle('dark-theme', dark)
  }, [dark])

  return (
    <>
      {/* NAV — всегда белый, фиксированный */}
      <nav className={`gc-nav gc-nav--fixed gc-nav--white ${dark ? 'dark' : ''}`} ref={navRef}>
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
          <Link to="/objects" className="gc-objects-link">{t.objects}</Link>
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
          <a href="tel:+996556111444" className="gc-phone">+996 556 111 444</a>

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
                    onClick={(e) => { e.stopPropagation(); setLang(l); setLangOpen(false) }}
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

      {/* Отступ под фиксированный хедер */}
      <div className="gc-nav-spacer"></div>

      {/* FULLSCREEN MENU */}
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
            { to: '/', label: t.home },
            { to: '/about', label: t.about },
            { to: '/objects', label: t.objects },
            { to: '/news', label: t.news },
            { to: '/reviews', label: t.reviews },
            { to: '/contacts', label: t.contacts },
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