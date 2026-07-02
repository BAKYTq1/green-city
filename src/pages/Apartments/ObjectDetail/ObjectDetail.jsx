import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjectStore } from "../../../store/index";
import { mapProjectToObject, mapProjectList } from "../../../utils/projectAdapter";
import { translations } from "../../../locales/i18n";
import { useLang } from "../../../locales/LangContext";
import styles from "./ObjectDetail.module.scss";

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
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + photos.length) % photos.length);
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
      <button className={styles.odLightboxClose} onClick={onClose}>×</button>
      <button
        className={`${styles.odLightboxNav} ${styles.odLightboxNavPrev}`}
        onClick={() => setIdx((i) => (i - 1 + photos.length) % photos.length)}
      >‹</button>
      <img className={styles.odLightboxImg} src={photos[idx]} alt="" />
      <button
        className={`${styles.odLightboxNav} ${styles.odLightboxNavNext}`}
        onClick={() => setIdx((i) => (i + 1) % photos.length)}
      >›</button>
      <div className={styles.odLightboxCounter}>{idx + 1} / {photos.length}</div>
    </div>
  );
}

// ─── DETAIL PAGE ──────────────────────────────────────────────────────────────
export function ObjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { lang } = useLang();
  const t = translations[lang].objectDetail;

  const { items: rawProjects, selectedItem: rawSelected, loading, error, fetchById, fetchList } = useProjectStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchById(slug);
  }, [slug, fetchById]);

  const [heroLoaded, setHeroLoaded] = useState(false);
  const [heroAnim, setHeroAnim] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const statsRef = useRef(null);
  const statsVisible = useInView(statsRef);

  useEffect(() => {
    setHeroLoaded(false);
    setHeroAnim(false);
    const timer = setTimeout(() => setHeroAnim(true), 100);
    return () => clearTimeout(timer);
  }, [slug]);

  if (loading) return <div style={{ padding: "120px 20px", textAlign: "center" }}>Загрузка...</div>;
  if (error) return <div style={{ padding: "120px 20px", textAlign: "center", color: "red" }}>Ошибка: {error}</div>;
  if (!rawSelected) return (
    <div style={{ padding: "120px 20px", textAlign: "center", color: "#5b7062" }}>
      <h2>{t.not_found}</h2>
      <button onClick={() => navigate("/objects")} style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}>
        {t.back_to_catalog}
      </button>
    </div>
  );

  const item = mapProjectToObject(rawSelected);
  const allItems = mapProjectList(rawProjects);

  // Похожие — того же типа или той же локации
  const similarItems = allItems
    .filter((o) => o.id !== item.id && (o.type === item.type || o.location === item.location))
    .slice(0, 3);

  return (
    <div className={styles.odPage}>
      {/* КНОПКА НАЗАД */}
      <button className={styles.odBack} onClick={() => navigate(-1)}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M19 12H5M5 12l7-7M5 12l7 7" />
        </svg>
        {t.back_to_objects}
      </button>

      {/* HERO BANNER */}
      <div className={styles.odHero}>
        {item.photos?.[0] && (
          <img
            className={`${styles.odHeroImg} ${heroLoaded ? styles.loaded : ""}`}
            src={item.photos[0]}
            alt={item.name}
            onLoad={() => setHeroLoaded(true)}
          />
        )}
        <div className={styles.odHeroOverlay} />
        <div className={styles.odHeroContent}>
          <div className={styles.odHeroNameWrap}>
            <div className={`${styles.odHeroStatus} ${heroAnim ? styles.anim : ""}`}>
              <span>{item.statusText}</span>
            </div>
            <div className={`${styles.odHeroName} ${heroAnim ? styles.anim : ""}`}>
              {item.name}
            </div>
          </div>
          <div className={`${styles.odHeroDesc} ${heroAnim ? styles.anim : ""}`}>
            {item.title}
          </div>
        </div>
        <div className={styles.odHeroScroll}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* СТАТИСТИКА */}
      <div ref={statsRef} className={`${styles.odStats} ${statsVisible ? styles.visible : ""}`}>
        {[
          { val: item.floors ? `${item.floors} ${t.floors_unit}` : "—", label: t.stat_floors },
          { val: item.apartmentsCount ? `${item.apartmentsCount} ${t.apartments_unit}` : "—", label: t.stat_housing },
          { val: item.blocks ? `${item.blocks}` : "—", label: t.stat_area },
          { val: item.statusText || "—", label: t.stat_deadline },
        ].map((s, i) => (
          <div key={i} className={styles.odStat} style={{ transitionDelay: `${i * 60}ms` }}>
            <div className={styles.odStatLabel}>{s.label}</div>
            <div className={styles.odStatVal}>{s.val}</div>
          </div>
        ))}
      </div>

      {/* О ПРОЕКТЕ + ГАЛЕРЕЯ */}
      <div className={styles.odAbout}>
        <div className={styles.odAboutText}>
          <RevealEl>
            <div className={styles.odAboutEyebrow}>{t.about_eyebrow}</div>
            <div className={styles.odAboutTitle}>
              {t.about_title_prefix} {item.name} <br />
              <em>{item.type}</em>
            </div>
            <p className={styles.odAboutDesc}>{item.title}</p>
            <p className={styles.odAboutDesc}>{item.address}</p>
          </RevealEl>
        </div>

        {item.photos?.length > 0 && (
          <div className={styles.odAboutGallery}>
            <div className={styles.odAboutGalleryMain} onClick={() => setLightbox(0)}>
              <img src={item.photos[0]} alt={item.name} />
            </div>
            {item.photos.slice(1, 3).map((ph, i) => (
              <div key={i} className={styles.odAboutGalleryThumb} onClick={() => setLightbox(i + 1)}>
                <img src={ph} alt={`${item.name} ${i + 2}`} />
                {i === 1 && item.photos.length > 3 && (
                  <div className={styles.odAboutGalleryCount}>
                    +{item.photos.length - 3} {t.photos_in_gallery}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ПЛАНИРОВКИ — квартиры из apartment[] */}
      <div className={styles.odPlans}>
        <RevealEl>
          <div className={styles.odPlansEyebrow}>{t.plans_eyebrow}</div>
          <div className={styles.odPlansTitle}>{t.plans_title}</div>
          <div className={styles.odPlansContainer}>
            {rawSelected.apartment?.length > 0 ? (
              rawSelected.apartment.map((apt) => (
                <div key={apt.id} className={styles.odPlanRow}>
                  <div>
                    <div className={styles.odPlanRowRooms}>
                      {apt.type ? `${apt.type} ${t.room_apartment}` : t.free_layout}
                    </div>
                    <div className={styles.odPlanRowArea}>
                      {apt.square ? `${apt.square} м²` : "—"} · {t.floors_unit} {apt.storey}
                    </div>
                  </div>
                  {apt.image && (
                    <img src={apt.image} alt="" style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 4 }} />
                  )}
                </div>
              ))
            ) : (
              <div className={styles.odPlanRow} style={{ justifyContent: "center", color: "#5b7062" }}>
                {t.price_updating}
              </div>
            )}
          </div>
        </RevealEl>
      </div>

      {/* ИНФРАСТРУКТУРА — comfortable[] */}
      {rawSelected.comfortable?.length > 0 && (
        <div className={styles.odFeatures}>
          <RevealEl>
            <div className={styles.odFeaturesEyebrow}>{t.features_eyebrow}</div>
            <div className={styles.odFeaturesTitle}>{t.features_title}</div>
            <div className={styles.odFeaturesGrid}>
              {rawSelected.comfortable.map((c) => (
                <div key={c.id} className={styles.odFeatureItem}>
                  <a href={c.urls} target="_blank" rel="noreferrer">
                    {c.title} — {c.minute} мин.
                  </a>
                </div>
              ))}
            </div>
          </RevealEl>
        </div>
      )}

      {/* МЕСТОПОЛОЖЕНИЕ */}
      <div className={styles.odLocation}>
        <RevealEl>
          <div className={styles.odLocationEyebrow}>{t.location_eyebrow}</div>
          <div className={styles.odLocationTitle}>
            {t.location_title_line1} <br /> {t.location_title_line2}
          </div>
          <div className={styles.odLocationInfo}>
            <div className={styles.odLocationItem}>
              <div className={styles.odLocationIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div>
                <div className={styles.odLocationLabel}>{t.exact_address}</div>
                <div className={styles.odLocationVal}>{item.address || t.address_clarifying}</div>
              </div>
            </div>
            <div className={styles.odLocationItem}>
              <div className={styles.odLocationIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 9h.01M15 9h.01M9 15h.01M15 15h.01" />
                </svg>
              </div>
              <div>
                <div className={styles.odLocationLabel}>{t.district_surrounding}</div>
                <div className={styles.odLocationVal}>{item.location || t.eco_district}</div>
              </div>
            </div>
            <div className={styles.odLocationItem}>
              <div className={styles.odLocationIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div>
                <div className={styles.odLocationLabel}>{t.property_format}</div>
                <div className={styles.odLocationVal}>{item.type || t.residential_complex}</div>
              </div>
            </div>
          </div>
        </RevealEl>
      </div>

      {/* CTA */}
      <RevealEl>
        <div className={styles.odCta}>
          <div className={styles.odCtaEyebrow}>{t.cta_eyebrow}</div>
          <div className={styles.odCtaTitle}>
            {t.cta_title_line1} <br /> {t.cta_title_line2}
          </div>
          <div className={styles.odCtaSub}>{t.cta_sub}</div>
          <button className={styles.odCtaBtn}>
            {t.cta_btn}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </RevealEl>

      {/* ПОХОЖИЕ ОБЪЕКТЫ */}
      {similarItems.length > 0 && (
        <div className={styles.odSimilar}>
          <RevealEl>
            <div className={styles.odSimilarHead}>
              <div className={styles.odSimilarEyebrow}>{t.similar_eyebrow}</div>
              <div className={styles.odSimilarTitle}>{t.similar_title}</div>
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
                    src={sim.photos?.[0] || ""}
                    alt={sim.name}
                    loading="lazy"
                  />
                  <div className={styles.odSimCardBody}>
                    <span style={{ fontSize: 10, marginBottom: 12, display: "inline-block" }}>
                      {sim.statusText}
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
      {lightbox !== null && item.photos?.length > 0 && (
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