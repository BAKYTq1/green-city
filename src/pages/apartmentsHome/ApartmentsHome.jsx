import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { OBJECTS, statusLabel } from "../Apartments/Apartments";
import Button from "../../widgets/ui/buttton/Button";
import styles from "./ApartmentsHome.module.scss";

const STATUS_FILTERS = [
  "Все",
  "Строящиеся",
  "Завершенные",
  "На стадии завершения",
];
const TYPE_FILTERS = ["Все", "Квартиры", "Офисы", "Коттеджи", "Коммерческие"];

const MAX_HOME_ITEMS = 6;

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
function ApartCard({ item, delay }) {
  const ref = useRef(null);
  const visible = useInView(ref);

  const statusClassName = styles[`status--${item.status}`] || "";

  return (
    <Link
      to={`/objects/${item.slug}`}
      ref={ref}
      className={`${styles["ap-card"]}${visible ? ` ${styles.visible}` : ""}`}
      style={{
        transitionDelay: `${delay}ms`,
        textDecoration: "none",
        color: "inherit",
        display: "block",
      }}
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
        <span className={statusClassName}>{statusLabel(item.status)}</span>
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
    </Link>
  );
}

// ─── MAIN APARTMENTS HOME COMPONENT ───────────────────────────────────────────
export function ApartmentsHome() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("objects");
  const [statusFilter, setStatusFilter] = useState("Все");
  const [typeFilter, setTypeFilter] = useState("Все");
  const [complex, setComplex] = useState("Все объекты");
  const [dropOpen, setDropOpen] = useState(false);
  const [floorMax, setFloorMax] = useState(27);
  const [animKey, setAnimKey] = useState(0);

  const COMPLEXES = ["Все объекты", ...OBJECTS.map((o) => o.name)];

  const filtered = OBJECTS.filter((o) => {
    const sm =
      statusFilter === "Все" ||
      (statusFilter === "Строящиеся" && o.status === "building") ||
      (statusFilter === "Завершенные" && o.status === "done") ||
      (statusFilter === "На стадии завершения" && o.status === "soon");
    const tm =
      typeFilter === "Все" ||
      o.type === typeFilter ||
      (typeFilter === "Коммерческие" && o.type === "Коммерческие");
    const cm = complex === "Все объекты" || o.name === complex;
    const fm = o.floors <= floorMax;
    return sm && tm && cm && fm;
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
    navigate("/objects");
  }

  return (
    <div
      className={styles["ap-page"]}
      onClick={() => dropOpen && setDropOpen(false)}
    >
      {/* HERO */}
      <div className={styles["ap-hero"]}>
        <div className={styles["ap-hero__eyebrow"]}>
          Портфолио объектов — Green City
        </div>
        <h1 className={styles["ap-hero__title"]}>
          Чыпкалаңыз.
          <br />
          Салыштырыңыз.
          <br />
          Тандаңыз.
        </h1>
        <div className={styles["ap-toggle"]}>
          <button
            className={`${styles["ap-toggle__btn"]} ${tab === "objects" ? styles["ap-toggle__btn--active"] : styles["ap-toggle__btn--inactive"]}`}
            onClick={() => setTab("objects")}
          >
            {filtered.length} объект
          </button>
          <button
            className={`${styles["ap-toggle__btn"]} ${tab === "houses" ? styles["ap-toggle__btn--active"] : styles["ap-toggle__btn--inactive"]}`}
            onClick={() => setTab("houses")}
          >
            19 Турак-жай
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div className={styles["ap-filters"]}>
        <div className={styles["ap-filter-row"]}>
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              className={`${styles["ap-pill"]}${statusFilter === s ? ` ${styles["ap-pill--active"]}` : ""}`}
              onClick={() => handleFilter(setStatusFilter, s)}
            >
              {s}
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
              <span>0 эт.</span>
              <span>{floorMax} эт.</span>
            </div>
            <input
              type="range"
              min={0}
              max={27}
              value={floorMax}
              onChange={(e) => setFloorMax(Number(e.target.value))}
            />
          </div>
          {TYPE_FILTERS.map((t) => (
            <button
              key={t}
              className={`${styles["ap-type-pill"]}${typeFilter === t ? ` ${styles["ap-type-pill--active"]}` : ""}`}
              onClick={() => handleFilter(setTypeFilter, t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* CARDS */}
      <div className={styles["ap-section"]}>
        <div className={styles["ap-results-count"]}>
          Показано {homeItems.length} из {filtered.length} объектов
        </div>
        {homeItems.length === 0 ? (
          <div className={styles["ap-empty"]}>
            <div className={styles["ap-empty__icon"]}>🏗</div>
            <div className={styles["ap-empty__title"]}>Объекты не найдены</div>
            <div className={styles["ap-empty__text"]}>
              Попробуйте изменить параметры фильтра
            </div>
          </div>
        ) : (
          <div key={animKey} className={styles["ap-card-grid"]}>
            {homeItems.map((item, i) => (
              <ApartCard key={item.id} item={item} delay={i * 80} />
            ))}
          </div>
        )}

        {/* КНОПКА "СМОТРЕТЬ ВСЕ" — СИНХРОНИЗИРОВАНА С КОМПОНЕНТОМ BUTTON */}
        {filtered.length > MAX_HOME_ITEMS && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <div onClick={handleSeeAll} style={{ cursor: "pointer" }}>
              <Button text="Смотреть все" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApartmentsHome;
