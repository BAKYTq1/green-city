import { useState, useRef, useEffect, useMemo } from "react";
import styles from "./Apartments.module.scss";
import { translations } from "../../locales/i18n";
import { useLang } from "../../locales/LangContext";
import { useProjectStore } from "../../store";
import { mapProjectList } from "../../utils/projectAdapter";
import Obratnyi from "../../widgets/ui/ibratka/Obratnyi";
import { useTransition } from "../../app/transition/TransitionContext";

const PER_PAGE = 6;
const DEFAULT_MAX_FLOOR = 27;

// ─── INTERSECTION OBSERVER HOOK ───────────────────────────────────────────────

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

// ─── CARD COMPONENT ───────────────────────────────────────────────────────────

function ApartCard({ item, delay, onNavigate }) {
  const ref = useRef(null);
  const visible = useInView(ref);

  return (
    <div
      ref={ref}
      className={`${styles["ap-card"]}${visible ? ` ${styles.visible}` : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={() => onNavigate(item.slug)}
    >
      <div className={styles["ap-card__img-wrap"]}>
        <img
          className={styles["ap-card__img"]}
          src={item.photos?.[0] || ""}
          alt={item.name}
          loading="lazy"
        />
        <div className={styles["ap-card__overlay"]} />
        {item.badge && (
          <div className={styles["ap-card__badge"]}>{item.badge}</div>
        )}
        <div className={styles["ap-card__cta"]}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </div>
      </div>

      <div className={styles["ap-card__name"]}>{item.name}</div>
      <div className={styles["ap-card__meta"]}>
        {item.statusText && <span>{item.statusText}</span>}
        <span className={styles["ap-card__meta-item"]}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          {item.address}
        </span>
        <span className={styles["ap-card__meta-item"]}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          {item.type}
        </span>
      </div>
    </div>
  );
}

// ─── MAIN APARTMENTS LIST ─────────────────────────────────────────────────────

export function Apartments() {
  const { goTo } = useTransition()
  const { lang } = useLang();
  const t = translations[lang].apartments;

  const { items: rawProjects, loading, error, fetchList } = useProjectStore();

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const OBJECTS = useMemo(() => mapProjectList(rawProjects), [rawProjects]);

  // Максимальный этаж считаем от реальных данных, а не хардкодим.
  const maxFloorAvailable = useMemo(() => {
    const floors = OBJECTS.map((o) => o.floors).filter(
      (f) => typeof f === "number" && !Number.isNaN(f),
    );
    return floors.length ? Math.max(...floors) : DEFAULT_MAX_FLOOR;
  }, [OBJECTS]);

  const TYPE_FILTERS = useMemo(
    () => [t.filter_all, ...Array.from(new Set(OBJECTS.map((o) => o.type).filter(Boolean)))],
    [OBJECTS, t],
  );
  const TIME_FILTERS = useMemo(
    () => [t.filter_all, ...Array.from(new Set(OBJECTS.map((o) => o.statusText).filter(Boolean)))],
    [OBJECTS, t],
  );
  const COMPLEXES = useMemo(
    () => [t.all_objects, ...OBJECTS.map((o) => o.name)],
    [OBJECTS, t],
  );

  const [tab, setTab] = useState("objects");
  const [timeFilter, setTimeFilter] = useState(t.filter_all);
  const [typeFilter, setTypeFilter] = useState(t.filter_all);
  const [complex, setComplex] = useState(t.all_objects);
  const [dropOpen, setDropOpen] = useState(false);
  const [floorMax, setFloorMax] = useState(DEFAULT_MAX_FLOOR);
  const [page, setPage] = useState(1);
  const [animKey, setAnimKey] = useState(0);

  // Держим значение слайдера синхронизированным с реальными данными,
  // если максимум изменился (например, после загрузки проектов).
  useEffect(() => {
    setFloorMax((prev) => (prev === DEFAULT_MAX_FLOOR ? maxFloorAvailable : prev));
  }, [maxFloorAvailable]);

  // Сбрасываем фильтры при смене языка
  useEffect(() => {
    setTypeFilter(t.filter_all);
    setTimeFilter(t.filter_all);
    setComplex(t.all_objects);
    setPage(1);
  }, [lang]); // eslint-disable-line

  const filtered = useMemo(() => {
    return OBJECTS.filter((o) => {
      const tim = timeFilter === t.filter_all || o.statusText === timeFilter;
      const tm = typeFilter === t.filter_all || o.type === typeFilter;
      const cm = complex === t.all_objects || o.name === complex;
      // Раньше объекты без этажности (o.floors === undefined) молча
      // выпадали из списка, т.к. undefined <= floorMax === false.
      // Теперь такие объекты не отфильтровываются по этажности.
      const fm = typeof o.floors !== "number" || o.floors <= floorMax;
      return tim && tm && cm && fm;
    });
  }, [OBJECTS, timeFilter, typeFilter, complex, floorMax, t]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));

  // Если после изменения данных/фильтров текущая страница стала
  // недоступной (например, было 2 страницы, стала 1), возвращаемся
  // на последнюю существующую страницу вместо пустого экрана.
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function changePage(p) {
    setPage(p);
    setAnimKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleFilter(setter, val) {
    setter(val);
    setPage(1);
    setAnimKey((k) => k + 1);
  }

  function handleNavigate(slug) {
    goTo(`/objects/${slug}`);
  }

  const totalApartments = OBJECTS.reduce((sum, o) => sum + (o.apartments?.length || 0), 0);

  return (
    <div
      className={styles["ap-page"]}
      onClick={() => dropOpen && setDropOpen(false)}
    >
      {/* HERO */}
      <div className={styles["ap-hero"]}>
        <div className={styles["ap-hero__eyebrow"]}>{t.hero_eyebrow}</div>
        <h1 className={styles["ap-hero__title"]}>{t.hero_title}</h1>
        <div className={styles["ap-toggle"]}>
          <button
            className={`${styles["ap-toggle__btn"]} ${tab === "objects" ? styles["ap-toggle__btn--active"] : styles["ap-toggle__btn--inactive"]}`}
            onClick={() => {
              setTab("objects");
              changePage(1);
            }}
          >
            {filtered.length} {t.objects_count}
          </button>
          <button
            className={`${styles["ap-toggle__btn"]} ${tab === "houses" ? styles["ap-toggle__btn--active"] : styles["ap-toggle__btn--inactive"]}`}
            onClick={() => {
              setTab("houses");
              changePage(1);
            }}
          >
            {totalApartments} {t.houses_count}
          </button>
        </div>
      </div>

      {/* FILTERS */}
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
          <div
            className={styles["ap-dropdown-wrap"]}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={`${styles["ap-dropdown-btn"]}${dropOpen ? ` ${styles["ap-dropdown-btn--open"]}` : ""}`}
              onClick={() => setDropOpen((o) => !o)}
            >
              <span>{complex}</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{
                  transform: dropOpen ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s",
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {dropOpen && (
              <div className={styles["ap-dropdown-menu"]}>
                {COMPLEXES.map((c) => (
                  <div
                    key={c}
                    className={`${styles["ap-dropdown-item"]}${complex === c ? ` ${styles["ap-dropdown-item--active"]}` : ""}`}
                    onClick={() => {
                      handleFilter(setComplex, c);
                      setDropOpen(false);
                    }}
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
            <input
              type="range"
              min={0}
              max={maxFloorAvailable}
              value={floorMax}
              onChange={(e) =>
                handleFilter(setFloorMax, Number(e.target.value))
              }
            />
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

      {/* CARDS */}
      <div className={styles["ap-section"]}>
        {loading && (
          <div className={styles["ap-results-count"]}>{t.loading}</div>
        )}

        {error && (
          <div className={styles["ap-empty"]}>
            <div className={styles["ap-empty__title"]}>{t.error_title}</div>
            <div className={styles["ap-empty__text"]}>{error}</div>
            <button onClick={fetchList} style={{ marginTop: 16, cursor: "pointer" }}>
              {t.retry}
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className={styles["ap-results-count"]}>
              {filtered.length} {t.found}
            </div>
            {pageItems.length === 0 ? (
              <div className={styles["ap-empty"]}>
                <div className={styles["ap-empty__icon"]}>🏗</div>
                <div className={styles["ap-empty__title"]}>{t.empty_title}</div>
                <div className={styles["ap-empty__text"]}>{t.empty_text}</div>
              </div>
            ) : (
              <div key={animKey} className={styles["ap-card-grid"]}>
                {pageItems.map((item, i) => (
                  <ApartCard
                    key={item.id}
                    item={item}
                    delay={i * 80}
                    onNavigate={handleNavigate}
                  />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className={styles["ap-pagination"]}>
                <button
                  className={styles["ap-page-btn"]}
                  disabled={page === 1}
                  onClick={() => changePage(page - 1)}
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    className={`${styles["ap-page-btn"]}${p === page ? ` ${styles["ap-page-btn--active"]}` : ""}`}
                    onClick={() => changePage(p)}
                  >
                    {p}
                  </button>
                ))}
                <button
                  className={styles["ap-page-btn"]}
                  disabled={page === totalPages}
                  onClick={() => changePage(page + 1)}
                >
                  ›
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <Obratnyi/>
    </div>
  );
}

export default Apartments;