import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { OBJECTS, statusLabel, statusClass } from "../Apartments";
import styles from "./ObjectDetail.module.scss";

// ─── STATUS CLASS HELPER ──────────────────────────────────────────────────────
const getStatusClassName = (status) => {
  const currentClass = statusClass(status);
  if (currentClass === "status--building") return styles.statusBuilding;
  if (currentClass === "status--done") return styles.statusDone;
  return styles.statusSoon;
};

// ─── INTERSECTION HOOK ────────────────────────────────────────────────────────
function useInView(ref, threshold = 0.1) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setV(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return v;
}

function RevealEl({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const v = useInView(ref);
  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${v ? styles.visible : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── LIGHTBOX ─────────────────────────────────────────────────────────────────
function Lightbox({ photos, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % photos.length);
      if (e.key === "ArrowLeft")
        setIdx((i) => (i - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [photos.length, onClose]);

  return (
    <div
      className={styles.odLightbox}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button className={styles.odLightboxClose} onClick={onClose}>
        ×
      </button>
      <button
        className={`${styles.odLightboxNav} ${styles.odLightboxNavPrev}`}
        onClick={() => setIdx((i) => (i - 1 + photos.length) % photos.length)}
      >
        ‹
      </button>
      <img className={styles.odLightboxImg} src={photos[idx]} alt="" />
      <button
        className={`${styles.odLightboxNav} ${styles.odLightboxNavNext}`}
        onClick={() => setIdx((i) => (i + 1) % photos.length)}
      >
        ›
      </button>
      <div className={styles.odLightboxCounter}>
        {idx + 1} / {photos.length}
      </div>
    </div>
  );
}

// ─── DETAIL PAGE ──────────────────────────────────────────────────────────────
export function ObjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const item = OBJECTS.find((o) => o.slug === slug);

  const [heroLoaded, setHeroLoaded] = useState(false);
  const [heroAnim, setHeroAnim] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const statsRef = useRef(null);
  const statsVisible = useInView(statsRef);

  useEffect(() => {
    window.scrollTo(0, 0);
    setHeroLoaded(false);
    setHeroAnim(false);
    const t = setTimeout(() => setHeroAnim(true), 100);
    return () => clearTimeout(t);
  }, [slug]);

  // Объект не найден
  if (!item) {
    return (
      <div
        style={{ padding: "120px 20px", textAlign: "center", color: "#5b7062" }}
      >
        <h2>Объект не найден</h2>
        <button
          onClick={() => navigate("/objects")}
          style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}
        >
          Вернуться к каталогу
        </button>
      </div>
    );
  }

  const similarItems = OBJECTS.filter(
    (o) =>
      o.id !== item.id && (o.segment === item.segment || o.type === item.type),
  ).slice(0, 3);

  return (
    <div className={styles.odPage}>
      {/* КНОПКА НАЗАД */}
      <button className={styles.odBack} onClick={() => navigate(-1)}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M19 12H5M5 12l7-7M5 12l7 7" />
        </svg>
        Назад к объектам
      </button>

      {/* HERO BANNER */}
      <div className={styles.odHero}>
        <img
          className={`${styles.odHeroImg} ${heroLoaded ? styles.loaded : ""}`}
          src={item.photos && item.photos[0]}
          alt={item.name}
          onLoad={() => setHeroLoaded(true)}
        />
        <div className={styles.odHeroOverlay} />
        <div className={styles.odHeroContent}>
          <div className={styles.odHeroNameWrap}>
            <div
              className={`${styles.odHeroStatus} ${heroAnim ? styles.anim : ""}`}
            >
              <span className={getStatusClassName(item.status)}>
                {statusLabel(item.status)}
              </span>
            </div>
            <div
              className={`${styles.odHeroName} ${heroAnim ? styles.anim : ""}`}
            >
              {item.name}
            </div>
          </div>
          <div
            className={`${styles.odHeroDesc} ${heroAnim ? styles.anim : ""}`}
          >
            {item.description}
          </div>
        </div>
        <div className={styles.odHeroScroll}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* СТАТИСТИКА */}
      <div
        ref={statsRef}
        className={`${styles.odStats} ${statsVisible ? styles.visible : ""}`}
      >
        {[
          {
            val: item.floors ? `${item.floors} этажей` : "—",
            label: "Этажность",
          },
          { val: item.apartments || "240 квартир", label: "Жилой фонд" },
          { val: item.area || "45–120 м²", label: "Площади" },
          {
            val: item.year ? `${item.year} год` : "2026 год",
            label: "Срок сдачи проекта",
          },
        ].map((s, i) => (
          <div
            key={i}
            className={styles.odStat}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <div className={styles.odStatLabel}>{s.label}</div>
            <div className={styles.odStatVal}>{s.val}</div>
          </div>
        ))}
      </div>

      {/* О ПРОЕКТЕ + ГАЛЕРЕЯ */}
      <div className={styles.odAbout}>
        <div className={styles.odAboutText}>
          <RevealEl>
            <div className={styles.odAboutEyebrow}>Жилой Комплекс</div>
            <div className={styles.odAboutTitle}>
              Современный {item.name} <br />
              Идеология класса <em>{item.segment || "Premium"}</em>
            </div>
            <p className={styles.odAboutDesc}>{item.description}</p>
          </RevealEl>
        </div>

        {item.photos && item.photos.length > 0 && (
          <div className={styles.odAboutGallery}>
            <div
              className={styles.odAboutGalleryMain}
              onClick={() => setLightbox(0)}
            >
              <img src={item.photos[0]} alt={item.name} />
            </div>
            {item.photos.slice(1, 3).map((ph, i) => (
              <div
                key={i}
                className={styles.odAboutGalleryThumb}
                onClick={() => setLightbox(i + 1)}
              >
                <img src={ph} alt={`${item.name} ${i + 2}`} />
                {i === 1 && item.photos.length > 3 && (
                  <div className={styles.odAboutGalleryCount}>
                    +{item.photos.length - 3} photo в галерее
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ПЛАНИРОВКИ */}
      <div className={styles.odPlans}>
        <RevealEl>
          <div className={styles.odPlansEyebrow}>Планировочные решения</div>
          <div className={styles.odPlansTitle}>Доступные квартиры и цены</div>
          <div className={styles.odPlansContainer}>
            {item.plans && item.plans.length > 0 ? (
              item.plans.map((plan, i) => (
                <div key={i} className={styles.odPlanRow}>
                  <div>
                    <div className={styles.odPlanRowRooms}>
                      {plan.rooms
                        ? `${plan.rooms}-комнатная квартира`
                        : "Свободная планировка"}
                    </div>
                    <div className={styles.odPlanRowArea}>{plan.area}</div>
                  </div>
                  <div className={styles.odPlanRowPrice}>{plan.price}</div>
                </div>
              ))
            ) : (
              <div
                className={styles.odPlanRow}
                style={{ justifyContent: "center", color: "#5b7062" }}
              >
                Информация о ценах обновляется. Свяжитесь с отделом продаж.
              </div>
            )}
          </div>
        </RevealEl>
      </div>

      {/* ОСОБЕННОСТИ */}
      {item.features && item.features.length > 0 && (
        <div className={styles.odFeatures}>
          <RevealEl>
            <div className={styles.odFeaturesEyebrow}>
              Преимущества Green City
            </div>
            <div className={styles.odFeaturesTitle}>
              Особенности и инфраструктура
            </div>
            <div className={styles.odFeaturesGrid}>
              {item.features.map((f) => (
                <div key={f} className={styles.odFeatureItem}>
                  {f}
                </div>
              ))}
            </div>
          </RevealEl>
        </div>
      )}

      {/* МЕСТОПОЛОЖЕНИЕ */}
      <div className={styles.odLocation}>
        <RevealEl>
          <div className={styles.odLocationEyebrow}>Локация</div>
          <div className={styles.odLocationTitle}>
            Расположение объекта <br />в эко-системе города
          </div>
          <div className={styles.odLocationInfo}>
            <div className={styles.odLocationItem}>
              <div className={styles.odLocationIcon}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div>
                <div className={styles.odLocationLabel}>Точный адрес</div>
                <div className={styles.odLocationVal}>
                  {item.address || "Адрес уточняется"}
                </div>
              </div>
            </div>
            <div className={styles.odLocationItem}>
              <div className={styles.odLocationIcon}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 9h.01M15 9h.01M9 15h.01M15 15h.01" />
                </svg>
              </div>
              <div>
                <div className={styles.odLocationLabel}>Район / Окружение</div>
                <div className={styles.odLocationVal}>
                  {item.district || "Экологический район"}
                </div>
              </div>
            </div>
            <div className={styles.odLocationItem}>
              <div className={styles.odLocationIcon}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div>
                <div className={styles.odLocationLabel}>
                  Формат недвижимости
                </div>
                <div className={styles.odLocationVal}>
                  {item.type || "Жилой комплекс"} ·{" "}
                  {item.segment || "Green Класс"}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.odLocationMap}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ marginRight: 8 }}
            >
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
              <line x1="8" y1="2" x2="8" y2="18" />
              <line x1="16" y1="6" x2="16" y2="22" />
            </svg>
            <span>
              Интерактивная карта — {item.address || "Green City концепт"}
            </span>
          </div>
        </RevealEl>
      </div>

      {/* CTA */}
      <RevealEl>
        <div className={styles.odCta}>
          <div className={styles.odCtaEyebrow}>
            Консультация эксперта Green City
          </div>
          <div className={styles.odCtaTitle}>
            Найдите идеальное пространство <br />
            для вашей семьи
          </div>
          <div className={styles.odCtaSub}>
            Оставьте свои контакты, эксперт проекта вышлет вам полный каталог
            планировок и проведет закрытый показ.
          </div>
          <button className={styles.odCtaBtn}>
            Получить презентацию объекта
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </RevealEl>

      {/* ПОХОЖИЕ ОБЪЕКТЫ */}
      {similarItems && similarItems.length > 0 && (
        <div className={styles.odSimilar}>
          <RevealEl>
            <div className={styles.odSimilarHead}>
              <div className={styles.odSimilarEyebrow}>
                Рекомендации недвижимости
              </div>
              <div className={styles.odSimilarTitle}>Похожие эко-комплексы</div>
            </div>
            <div className={styles.odSimilarGrid}>
              {similarItems.map((sim) => (
                <div
                  key={sim.id}
                  className={styles.odSimCard}
                  onClick={() => navigate(`/objects/${sim.slug}`)}
                >
                  <img
                    className={styles.odSimCardImg}
                    src={sim.photos && sim.photos[0]}
                    alt={sim.name}
                    loading="lazy"
                  />
                  <div className={styles.odSimCardBody}>
                    <span
                      className={getStatusClassName(sim.status)}
                      style={{
                        fontSize: 10,
                        marginBottom: 12,
                        display: "inline-block",
                      }}
                    >
                      {statusLabel(sim.status)}
                    </span>
                    <div className={styles.odSimCardName}>{sim.name}</div>
                    <div className={styles.odSimCardAddr}>{sim.address}</div>
                  </div>
                </div>
              ))}
            </div>
          </RevealEl>
        </div>
      )}

      {/* ЛАЙТБОКС */}
      {lightbox !== null && item.photos && (
        <Lightbox
          photos={item.photos}
          startIndex={lightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}

export default ObjectDetail;
