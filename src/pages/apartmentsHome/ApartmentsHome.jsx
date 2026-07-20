import { useState, useRef, useEffect, useMemo } from "react";
// import { Link } from "react-router-dom";
import { mapProjectList } from "../../utils/projectAdapter";
import Button from "../../widgets/ui/buttton/Button";
import styles from "./ApartmentsHome.module.scss";
import { translations } from "../../locales/i18n";
import { useLang } from "../../locales/LangContext";
import { useProjectStore } from "../../store";
import { useTransition } from "../../app/transition/TransitionContext";
import TransitionLink from "../../app/transition/TransitionLink";

const MAX_HOME_ITEMS = 6;

function useInView(ref, threshold = 0.1) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

// ─── SPINNER ───────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: "60px 0",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          border: "3px solid rgba(0,0,0,0.1)",
          borderTopColor: "currentColor",
          borderRadius: "50%",
          animation: "ap-spin 0.8s linear infinite",
        }}
      />
      <style>{`
        @keyframes ap-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function ApartCard({ item, delay }) {
  const ref = useRef(null);
  const visible = useInView(ref);


  return (
    <TransitionLink
      to={`/objects/${item.slug}`}
      ref={ref}
      className={`${styles["ap-card"]}${visible ? ` ${styles.visible}` : ""}`}
      style={{ transitionDelay: `${delay}ms`, textDecoration: "none", color: "inherit", display: "block" }}
    >
      <div className={styles["ap-card__img-wrap"]}>
        <img className={styles["ap-card__img"]} src={item.photos?.[0] || ""} alt={item.name} loading="lazy" />
        <div className={styles["ap-card__overlay"]} />
        {item.badge && <div className={styles["ap-card__badge"]}>{item.badge}</div>}
        <div className={styles["ap-card__cta"]}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </div>
      </div>
      <div className={styles["ap-card__name"]}>{item.name}</div>
      <div className={styles["ap-card__meta"]}>
        {item.statusText && <span>{item.statusText}</span>}
        <span className={styles["ap-card__meta-item"]}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          {item.address}
        </span>
        <span className={styles["ap-card__meta-item"]}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          {item.type}
        </span>
      </div>
    </TransitionLink>
  );
}

export function ApartmentsHome() {
  const { goTo } = useTransition();
  const { lang } = useLang();
  const t = translations[lang].apartments;

  const { items: rawProjects, loading, error, fetchList } = useProjectStore();

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const OBJECTS = useMemo(() => mapProjectList(rawProjects), [rawProjects]);

  const TYPE_FILTERS = [t.filter_all, ...Array.from(new Set(OBJECTS.map((o) => o.type).filter(Boolean)))];
  const TIME_FILTERS = [t.filter_all, ...Array.from(new Set(OBJECTS.map((o) => o.statusText).filter(Boolean)))];

  const [tab, setTab] = useState("objects");
  const [typeFilter, setTypeFilter] = useState(t.filter_all);
  const [timeFilter, setTimeFilter] = useState(t.filter_all);
  const [complex, setComplex] = useState(t.all_objects);
  const [dropOpen, setDropOpen] = useState(false);
  const [floorMax, setFloorMax] = useState(27);
  const [animKey, setAnimKey] = useState(0);

  // Сбрасываем фильтры при смене языка
  useEffect(() => {
    setTypeFilter(t.filter_all);
    setTimeFilter(t.filter_all);
    setComplex(t.all_objects);
  }, [lang]); // eslint-disable-line

  const COMPLEXES = [t.all_objects, ...OBJECTS.map((o) => o.name)];

  const filtered = OBJECTS.filter((o) => {
    const tm = typeFilter === t.filter_all || o.type === typeFilter;
    const tim = timeFilter === t.filter_all || o.statusText === timeFilter;
    const cm = complex === t.all_objects || o.name === complex;
    const fm = o.floors <= floorMax;
    return tm && tim && cm && fm;
  });

  const homeItems = filtered.slice(0, MAX_HOME_ITEMS);

  function handleFilter(setter, val) {
    setter(val);
    setAnimKey((k) => k + 1);
  }

  function handleSeeAll() {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    goTo("/objects");
  }

  return (
    <div className={styles["ap-page"]} onClick={() => dropOpen && setDropOpen(false)}>
      <div className={styles["ap-hero"]}>
        <div className={styles["ap-hero__eyebrow"]}>{t.hero_eyebrow}</div>
        <h1 className={styles["ap-hero__title"]}>{t.hero_title}</h1>
        <div className={styles["ap-toggle"]}>
          <button
            className={`${styles["ap-toggle__btn"]} ${tab === "objects" ? styles["ap-toggle__btn--active"] : styles["ap-toggle__btn--inactive"]}`}
            onClick={() => setTab("objects")}
          >
            {filtered.length} {t.objects_count}
          </button>
          <button
            className={`${styles["ap-toggle__btn"]} ${tab === "houses" ? styles["ap-toggle__btn--active"] : styles["ap-toggle__btn--inactive"]}`}
            onClick={() => setTab("houses")}
          >
            {OBJECTS.reduce((sum, o) => sum + (o.apartments?.length || 0), 0)} {t.houses_count}
          </button>
        </div>
      </div>

      <div className={styles["ap-filters"]}>
        <div className={styles["ap-filter-row"]}>
          {TIME_FILTERS.map((time) => (
            <button
              key={time}
              className={`${styles["ap-pill"]}${timeFilter === time ? ` ${styles["ap-pill--active"]}` : ""}`}
              onClick={() => handleFilter(setTimeFilter, time)}
            >
              {time}
            </button>
          ))}
        </div>
        <div className={styles["ap-filter-row"]}>
          <div className={styles["ap-dropdown-wrap"]} onClick={(e) => e.stopPropagation()}>
            <button
              className={`${styles["ap-dropdown-btn"]}${dropOpen ? ` ${styles["ap-dropdown-btn--open"]}` : ""}`}
              onClick={() => setDropOpen((o) => !o)}
            >
              <span>{complex}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                style={{ transform: dropOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {dropOpen && (
              <div className={styles["ap-dropdown-menu"]}>
                {COMPLEXES.map((c) => (
                  <div
                    key={c}
                    className={`${styles["ap-dropdown-item"]}${complex === c ? ` ${styles["ap-dropdown-item--active"]}` : ""}`}
                    onClick={() => { handleFilter(setComplex, c); setDropOpen(false); }}
                  >
                    {c}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={styles["ap-range-wrap"]}>
            <div className={styles["ap-range-labels"]}>
              <span>0 {t.floor}</span>
              <span>{floorMax} {t.floor}</span>
            </div>
            <input type="range" min={0} max={27} value={floorMax} onChange={(e) => setFloorMax(Number(e.target.value))} />
          </div>
          {TYPE_FILTERS.map((type) => (
            <button
              key={type}
              className={`${styles["ap-type-pill"]}${typeFilter === type ? ` ${styles["ap-type-pill--active"]}` : ""}`}
              onClick={() => handleFilter(setTypeFilter, type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className={styles["ap-section"]}>
        {loading && <Spinner />}

        {error && (
          <div className={styles["ap-empty"]}>
            <div className={styles["ap-empty__title"]}>Ошибка загрузки</div>
            <div className={styles["ap-empty__text"]}>{error}</div>
            <button onClick={fetchList} style={{ marginTop: 16, cursor: "pointer" }}>
              Попробовать снова
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className={styles["ap-results-count"]}>
              {t.showing} {homeItems.length} {t.of} {filtered.length} {t.objects_count}
            </div>
            {homeItems.length === 0 ? (
              <div className={styles["ap-empty"]}>
                <div className={styles["ap-empty__icon"]}>🏗</div>
                <div className={styles["ap-empty__title"]}>{t.empty_title}</div>
                <div className={styles["ap-empty__text"]}>{t.empty_text}</div>
              </div>
            ) : (
              <div key={animKey} className={styles["ap-card-grid"]}>
                {homeItems.map((item, i) => (
                  <ApartCard key={item.id} item={item} delay={i * 80} />
                ))}
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
              <div onClick={handleSeeAll} style={{ cursor: "pointer" }}>
                <Button text={t.see_all} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ApartmentsHome;  