import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.scss';

// СҮРӨТТӨРДҮ ИМПОРТ КЫЛУУ (Жолдорун өзүңө карап түзөп ал)
import heroImg1 from '../../assets/company_center_2.png';
import heroImg2 from '../../assets/company_center_1.png';
import featureImg1 from '../../assets/company_about_1.png';
import featureImg2 from '../../assets/company_about_2.png';
import leaderBgFixed from '../../assets/company_gallery_1.png';
import teamPhoto1 from '../../assets/company_team_1.png';
import teamPhoto2 from '../../assets/company_team_2.jpg';

gsap.registerPlugin(ScrollTrigger);

// 3-СЕКЦИЯ: БАННЕРДИН МААЛЫМАТТАРЫ
const BANNER_SLIDES = [
  {
    id: 1,
    subtitle: "Качество и надёжность",
    desc: "Мы используем современные технологии, инженерные решения и сертифицированные материалы, чтобы строить объекты, которые сохраняют прочность и эстетику на протяжении десятилетий.",
    bg: featureImg1 // Импорттолгон өзгөрмө
  },
  {
    id: 2,
    subtitle: "Экологичность и комфорт",
    desc: "Создаем продуманную зеленую инфраструктуру для комфортной жизни вашей семьи в гармонии с природой.",
    bg: featureImg2 // Импорттолгон өзгөрмө
  }
];

// 5-СЕКЦИЯ: ЖЕТЕКЧИЛЕРДИН МААЛЫМАТТАРЫ
const LEADERS_DATA = [
  {
    id: 1,
    name: "АКЖИГИТОВ МИРЛАН ТОЛОНОВИЧ",
    position: "Генеральный директор строительной компании ROYAL",
    bio1: "Мирлан Акжигитов — один из самых успешных молодых предпринимателей Кыргызстана. По образованию он менеджер по управлению бизнесом. Образование он получил в городе Брэдфорд, Великобритания. Именно там он приобрёл ценные навыки: упорство, системность, трудолюбие, умение ставить цели и добиваться их.",
    bio2: "Вернувшись на родину, Мирлан решил начать своё дело в строительной сфере, чтобы создавать не просто качественные, но и эстетически выразительные, уникальные здания. Чтобы развиваться в этих условиях, нужно было быть гибким, быстро принимать решения и оставаться конкурентоспособным.",
    photo: teamPhoto1 // Импорттолгон өзгөрмө
  },
  {
    id: 2,
    name: "ДРУГОЙ РУКОВОДИТЕЛЬ КОМПАНИИ",
    position: "Исполнительный директор строительной компании GREEN CITY",
    bio1: "Опыт работы в строительной индустрии более 10 лет. Специализируется на управлении масштабными проектами и внедрении инновационных экологических стандартов строительства.",
    bio2: "Под его руководством были успешно реализованы ключевые жилые комплексы и бизнес-центры, ставшие визитной карточкой современной архитектуры.",
    photo: teamPhoto2 // Импорттолгон өзгөрмө
  }
];

// 6-СЕКЦИЯ: ПАРТНЕРЛЕРДИН ЛОГОТИПТЕРИ
const PARTNERS_DATA = [
  { id: 1, name: "BEKEMBLOCK" },
  { id: 2, name: "LAMINAM" },
  { id: 3, name: "LG" },
  { id: 4, name: "SCHÜCO" }
];

export default function About() {
  const containerRef = useRef(null);
  const parallaxRef = useRef(null);
  
  const [bannerIdx, setBannerIdx] = useState(0);
  const [leaderIdx, setLeaderIdx] = useState(0);
  const [formData, setFormData] = useState({ name: '', phone: '' });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Жөнөтүлгөн маалыматтар:", formData);
    alert("Спасибо! Ваша заявка успешно отправлена.");
    setFormData({ name: '', phone: '' });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Маска анимациясы
      gsap.utils.toArray('.gc-mask-trigger').forEach((box) => {
        const img = box.querySelector('img');
        gsap.fromTo(box,
          { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', opacity: 0 },
          {
            clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
            opacity: 1,
            duration: 1.5,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: box, start: 'top 85%' }
          }
        );
        if (img) {
          gsap.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.8, ease: 'power3.out', scrollTrigger: { trigger: box, start: 'top 85%' } });
        }
      });

      // Тексттердин калкып чыгышы
      gsap.utils.toArray('.gc-fade-up').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } }
        );
      });

      // Карталардын stagger анимациясы
      gsap.fromTo('.gc-info-card',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: '.gc-inner-layout', start: 'top 75%' } }
      );

      // Параллакс анимациясы
      if (parallaxRef.current) {
        gsap.fromTo('.gc-para-left', { y: '-60px' }, { y: '60px', scrollTrigger: { trigger: parallaxRef.current, start: 'top bottom', end: 'bottom top', scrub: true } });
        gsap.fromTo('.gc-para-right', { y: '60px' }, { y: '-60px', scrollTrigger: { trigger: parallaxRef.current, start: 'top bottom', end: 'bottom top', scrub: true } });
      }

      // Партнерлордун анимациясы
      gsap.fromTo('.gc-partner-item',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: '.gc-partners-grid', start: 'top 90%' } }
      );

      // Форманын анимациясы
      gsap.fromTo('.gc-cta-form-card',
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.gc-cta-section', start: 'top 75%' } }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="green-city-page" ref={containerRef}>
      
      {/* 1-СЕКЦИЯ: ИНТРО */}
      <section className="gc-hero-section">
        <div className="gc-container">
          <h1 className="gc-hero-title gc-fade-up">
            ЗА 13 ЛЕТ УПОРНОЙ РАБОТЫ МЫ ЗАРЕКОМЕНДОВАЛИ СЕБЯ КАК ОДИН ИЗ ЛИДЕРОВ СТРОИТЕЛЬНОГО РЫНКА КЫРГЫЗSTANА
          </h1>
          <div className="gc-hero-grid">
            <div className="gc-hero-left-img gc-mask-trigger">
              <img src={heroImg1} alt="Green City Project" />
            </div>
            <div className="gc-hero-desc gc-fade-up">
              <p>
                Реализовав более 30 масштабных проектов, охватывающих жилые комплексы, Бизнес-центры, клубные дома и объекты для отдыха. Наш подход – это синтез инноваций, безупречного качества и высокого профессионама на каждом этапе реализации.
              </p>
            </div>
            <div className="gc-hero-right-img gc-mask-trigger">
              <img src={heroImg2} alt="Green City Architecture" />
            </div>
          </div>
        </div>
      </section>

      {/* 2-СЕКЦИЯ: ТЕХНИКАЛЫК АСИММЕТРИЯЛЫК МАКЕТ */}
      <section className="gc-features-section">
        <div className="gc-container">
          <div className="gc-asymmetric-grid">
            <div className="gc-left-giant-media gc-mask-trigger">
              <img src={featureImg1} alt="Green City Tower" />
            </div>
            <div className="gc-content-side">
              <h2 className="gc-main-title gc-fade-up">
                <span>G</span>reen City это-
              </h2>
              <div className="gc-inner-layout">
                <div className="gc-card-col-right-top">
                  <div className="gc-info-card">
                    <span className="gc-num">(01)</span>
                    <p>Более 6000 <strong>Довольных Клиентов</strong>, доверивших нам мечту о собственном жилье</p>
                  </div>
                  <div className="gc-info-card">
                    <span className="gc-num">(02)</span>
                    <p><strong>Гарантия Безопасности</strong> — все объекты сопровождаются полным пакетом разрешительной документации</p>
                  </div>
                </div>
                <div className="gc-card-col-left-bottom">
                  <div className="gc-info-card">
                    <span className="gc-num">(03)</span>
                    <p><strong>Точные сроки</strong> сдачи объектов</p>
                  </div>
                  <div className="gc-info-card">
                    <span className="gc-num">(02)</span>
                    <p><strong>Юридическая чистота</strong> каждой сделки и полная прозрачность</p>
                  </div>
                </div>
                <div className="gc-right-sub-media gc-mask-trigger">
                  <img src={featureImg2} alt="Green City Building" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-СЕКЦИЯ: "ЦЕННОСТИ" БАННЕР СЛАЙДЕРИ */}
      <section className="gc-values-banner-section">
        <div className="gc-banner-bg-wrapper">
          <img src={BANNER_SLIDES[bannerIdx].bg} alt="Background" key={bannerIdx} className="gc-banner-fade-img" />
          <div className="gc-banner-overlay"></div>
        </div>
        <div className="gc-banner-container">
          <div className="gc-banner-content">
            <h2 className="gc-banner-main-title">Ценности компании <span>Green City</span></h2>
            <div className="gc-banner-info-block" key={`banner-text-${bannerIdx}`}>
              <h3 className="gc-banner-subtitle">{BANNER_SLIDES[bannerIdx].subtitle}</h3>
              <p className="gc-banner-desc">{BANNER_SLIDES[bannerIdx].desc}</p>
            </div>
          </div>
          <div className="gc-banner-controls">
            <button className="gc-banner-arrow-btn" onClick={() => setBannerIdx((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button className="gc-banner-arrow-btn" onClick={() => setBannerIdx((prev) => (prev + 1) % BANNER_SLIDES.length)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* 4-СЕКЦИЯ: ПАРАЛЛАКС БЛОК */}
      <section className="gc-parallax-section" ref={parallaxRef}>
        <div className="gc-container">
          <div className="gc-parallax-grid">
            <div className="gc-para-img-wrapper gc-para-left">
              <img src={heroImg1} alt="Green City Bishkek" />
            </div>
            <div className="gc-para-text-block gc-fade-up">
              <h2>МЫ РАЗВИВАЕМ ЖИЛЫЕ КОМПЛЕКСЫ В БИШКЕКЕ И ЦЕНТРЫ ОТДЫХА НА ИССЫК-КУЛЕ, ЗАДАВАЯ ТРЕНДЫ И ПОВЫШАЯ КАЧЕСТВО ЖИЗНИ В КЫРГЫЗСТАНЕ.</h2>
            </div>
            <div className="gc-para-img-wrapper gc-para-right">
              <img src={heroImg2} alt="Green City Issyk-Kul" />
            </div>
          </div>
        </div>
      </section>

      {/* 5-СЕКЦИЯ: РУКОВОДСТВО СЛАЙДЕР */}
      <section className="gc-leader-slider-section">
        <div className="gc-leader-bg-fixed">
          <img src={leaderBgFixed} alt="Background" />
          <div className="gc-leader-overlay"></div>
        </div>
        <div className="gc-leader-container">
          <div className="gc-leader-grid">
            <div className="gc-leader-photo-side">
              <div className="gc-leader-img-frame" key={`photo-${leaderIdx}`}>
                <img src={LEADERS_DATA[leaderIdx].photo} alt={LEADERS_DATA[leaderIdx].name} />
              </div>
              <div className="gc-leader-controls">
                <button className="gc-leader-btn" onClick={() => setLeaderIdx((prev) => (prev - 1 + LEADERS_DATA.length) % LEADERS_DATA.length)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button className="gc-leader-btn" onClick={() => setLeaderIdx((prev) => (prev + 1) % LEADERS_DATA.length)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </div>
            </div>
            <div className="gc-leader-info-side" key={`text-${leaderIdx}`}>
              <h2 className="gc-leader-name">{LEADERS_DATA[leaderIdx].name}</h2>
              <h4 className="gc-leader-position">{LEADERS_DATA[leaderIdx].position}</h4>
              <div className="gc-leader-bio">
                <p>{LEADERS_DATA[leaderIdx].bio1}</p>
                <p>{LEADERS_DATA[leaderIdx].bio2}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6-СЕКЦИЯ: ПАРТНЕРЛЕР БЛОГУ */}
      <section className="gc-partners-section">
        <div className="gc-container">
          <div className="gc-partners-header">
            <h2 className="gc-partners-title gc-fade-up">НАДЁЖНЫЕ ПАРТНЁРЫ, С КОТОРЫМИ МЫ СТРОИМ БУДУЩЕЕ КЫРГЫЗСТАНА</h2>
            <span className="gc-partners-tag gc-fade-up">Партнеры</span>
          </div>
          <div className="gc-partners-grid">
            {PARTNERS_DATA.map((partner) => (
              <div className="gc-partner-item" key={partner.id}>
                <div className="gc-partner-logo-mock">{partner.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7-СЕКЦИЯ: АКЫРКЫ БАЙЛАНЫШ ФОРМАСЫ */}
      <section className="gc-cta-section">
        <div className="gc-container">
          <h2 className="gc-cta-title gc-fade-up">
            Доверьте нам <br /> мы приведём вас к вашему будущему дому.
          </h2>
          <div className="gc-cta-form-wrapper">
            <form onSubmit={handleFormSubmit} className="gc-cta-form-card">
              <div className="gc-input-group">
                <input 
                  type="text" 
                  required 
                  placeholder="Ваше имя *" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="gc-input-group">
                <input 
                  type="tel" 
                  required 
                  placeholder="Ваш номер телефона *" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <button type="submit" className="gc-submit-btn">ОТПРАВИТЬ</button>
              <div className="gc-form-footer">
                <a href="#privacy" className="gc-report-link" onClick={(e) => e.preventDefault()}>
                  Сообщить о нарушении <span className="gc-help-icon">?</span>
                </a>
                <span className="gc-powered-by">Заряжено <strong>Битрикс 24</strong></span>
              </div>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}