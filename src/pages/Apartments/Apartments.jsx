import { useState, useRef, useEffect } from "react";
import styles from "./Apartments.module.scss";

const OBJECTS = [
  {
    id: 1,
    name: "MONTE CARLO",
    status: "building",
    address: "Калыя Молдобасанова 8В",
    type: "Квартиры",
    badge: null,
    color: "#1e3226",
  },
  {
    id: 2,
    name: "SALKYN",
    status: "building",
    address: "Улица Чокана Валиханова, 7",
    type: "Квартиры",
    badge: "СТАРТ ПРОДАЖ",
    color: "#243d2c",
  },
  {
    id: 3,
    name: "ALA TOO",
    status: "done",
    address: "Проспект Манаса, 12",
    type: "Квартиры",
    badge: null,
    color: "#14261b",
  },
  {
    id: 4,
    name: "YNTYMAK",
    status: "building",
    address: "Улица Ынтымак, 5",
    type: "Квартиры",
    badge: null,
    color: "#2d3b32",
  },
  {
    id: 5,
    name: "ROYAL GARDEN",
    status: "soon",
    address: "Бульвар Эркиндик, 3",
    type: "Коттеджи",
    badge: "СТАРТ ПРОДАЖ",
    color: "#1a2d20",
  },
  {
    id: 6,
    name: "ROYAL RESORT",
    status: "done",
    address: "Иссык-Кульская область",
    type: "Коммерческие",
    badge: null,
    color: "#1b2e24",
  },
  {
    id: 7,
    name: "BROOKLYN",
    status: "building",
    address: "Улица Байтик Баатыра, 4",
    type: "Квартиры",
    badge: null,
    color: "#28382e",
  },
  {
    id: 8,
    name: "CAMBRIDGE",
    status: "done",
    address: "Улица Горького, 15",
    type: "Офисы",
    badge: null,
    color: "#202d25",
  },
  {
    id: 9,
    name: "MILLENNIUM",
    status: "building",
    address: "Проспект Чуй, 88",
    type: "Квартиры",
    badge: "СТАРТ ПРОДАЖ",
    color: "#223528",
  },
  {
    id: 10,
    name: "ROYAL TOWER",
    status: "soon",
    address: "Улица Токтогула, 21",
    type: "Квартиры",
    badge: null,
    color: "#1a2a20",
  },
];

const COMPLEXES = [
  "Все объекты",
  "MONTE CARLO",
  "SALKYN",
  "ALA TOO",
  "YNTYMAK",
  "ROYAL OLOLOAKJOL",
  "ЭПОС",
  "ROYAL GARDEN",
  "ROYAL RESORT",
  "FOUR SEASONS by Royal",
  "ARCHA",
  "BROOKLYN",
  "ROYAL TOWER",
  "CAMBRIDGE",
  "MILLENNIUM",
  "ROYAL",
  "Royal",
  "CONSUL",
];
const STATUS_FILTERS = [
  "Все",
  "Строящиеся",
  "Завершенные",
  "На стадии завершения",
];
const TYPE_FILTERS = [
  "Все",
  "Квартиры",
  "Офисы",
  "Коттеджи",
  "Коммерческие помещения",
];

const PER_PAGE = 6;

function CardSVG({ color, badge }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: color,
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <svg
        viewBox="0 0 600 375"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <defs>
          <linearGradient
            id={`g${color.replace("#", "")}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.95" />
          </linearGradient>
        </defs>
        <rect width="600" height="375" fill={color} />
        <rect
          x="180"
          y="80"
          width="60"
          height="250"
          rx="4"
          fill="rgba(255,255,255,0.07)"
        />
        <rect
          x="250"
          y="40"
          width="100"
          height="290"
          rx="4"
          fill="rgba(255,255,255,0.1)"
        />
        <rect
          x="360"
          y="100"
          width="60"
          height="230"
          rx="4"
          fill="rgba(255,255,255,0.07)"
        />
        {[0, 1, 2, 3, 4, 5, 6].map((r) =>
          [0, 1, 2].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={260 + c * 28}
              y={55 + r * 35}
              width="18"
              height="22"
              rx="2"
              fill="rgba(255,240,180,0.25)"
            />
          )),
        )}
        {[0, 1, 2, 3, 4].map((r) =>
          [0, 1].map((c) => (
            <rect
              key={`s${r}-${c}`}
              x={192 + c * 22}
              y={100 + r * 42}
              width="14"
              height="18"
              rx="2"
              fill="rgba(255,240,180,0.18)"
            />
          )),
        )}
        <rect
          width="600"
          height="375"
          fill={`url(#g${color.replace("#", "")})`}
        />
        <circle cx="295" cy="38" r="12" fill="rgba(30,81,40,0.7)" />
        <circle cx="295" cy="38" r="6" fill="#4caf50" />
        <polyline
          points="0,320 80,230 160,280 240,200 320,260 400,210 480,270 560,220 600,260 600,375 0,375"
          fill="rgba(0,0,0,0.15)"
        />
      </svg>
      {badge && (
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            background: "rgba(241, 245, 242, 0.92)",
            color: "#1e5128",
            fontSize: 12,
            fontWeight: 500,
            padding: "6px 16px",
            borderRadius: 99,
            letterSpacing: "0.05em",
            zIndex: 2,
          }}
        >
          {badge}
        </div>
      )}
    </div>
  );
}

function useInView(ref) {
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
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return v;
}

function ApartCard({ item, delay }) {
  const ref = useRef(null);
  const v = useInView(ref);
  const statusLabel = {
    building: "Строящиеся",
    done: "Завершенные",
    soon: "На стадии завершения",
  }[item.status];

  const statusClass = {
    building: styles["apCard__status--building"],
    done: styles["apCard__status--done"],
    soon: styles["apCard__status--soon"],
  }[item.status];

  return (
    <div
      ref={ref}
      className={`${styles.apCard} ${v ? styles.visible : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.apCard__header}>
        <div className={styles.apCard__name}>{item.name}</div>
        <div className={styles.apCard__meta}>
          <span className={`${styles.apCard__status} ${statusClass}`}>
            {statusLabel}
          </span>
          <span className={styles.apCard__metaItem}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            {item.address}
          </span>
          <span className={styles.apCard__metaItem}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            {item.type}
          </span>
        </div>
      </div>
      <div className={styles.apCard__imgWrap}>
        <CardSVG color={item.color} badge={item.badge} />
      </div>
    </div>
  );
}

export function Apartments() {
  const [tab, setTab] = useState("objects");
  const [statusFilter, setStatusFilter] = useState("Все");
  const [typeFilter, setTypeFilter] = useState("Все");
  const [complex, setComplex] = useState("Все объекты");
  const [dropOpen, setDropOpen] = useState(false);
  const [floorMax, setFloorMax] = useState(27);
  const [page, setPage] = useState(1);
  const [animKey, setAnimKey] = useState(0);

  const filtered = OBJECTS.filter((o) => {
    const statusMatch =
      statusFilter === "Все" ||
      (statusFilter === "Строящиеся" && o.status === "building") ||
      (statusFilter === "Завершенные" && o.status === "done") ||
      (statusFilter === "На стадии завершения" && o.status === "soon");
    const typeMatch = typeFilter === "Все" || o.type === typeFilter;
    const complexMatch = complex === "Все объекты" || o.name === complex;
    return statusMatch && typeMatch && complexMatch;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function changePage(p) {
    setPage(p);
    setAnimKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleFilterChange(setter, val) {
    setter(val);
    setPage(1);
    setAnimKey((k) => k + 1);
  }

  return (
    <div className={styles.apPage}>
      {/* HERO */}
      <div className={styles.apHero}>
        <h1 className={styles.apHero__title}>
          Чыпкалаңыз. Салыштырыңыз. Тандаңыз.
        </h1>
        <div className={styles.apToggle}>
          <button
            className={`${styles.apToggle__btn} ${tab === "objects" ? styles["apToggle__btn--active"] : styles["apToggle__btn--inactive"]}`}
            onClick={() => {
              setTab("objects");
              changePage(1);
            }}
          >
            {filtered.length} объект
          </button>
          <button
            className={`${styles.apToggle__btn} ${tab === "houses" ? styles["apToggle__btn--active"] : styles["apToggle__btn--inactive"]}`}
            onClick={() => {
              setTab("houses");
              changePage(1);
            }}
          >
            19 Турак-жай
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div className={styles.apFilters}>
        <div className={styles.apFilterRow}>
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              className={`${styles.apPill} ${statusFilter === s ? styles["apPill--active"] : ""}`}
              onClick={() => handleFilterChange(setStatusFilter, s)}
            >
              {s}
            </button>
          ))}
        </div>

        <div className={styles.apFilterRow}>
          <div className={styles.apDropdownWrap}>
            <button
              className={`${styles.apDropdownBtn} ${dropOpen ? styles["apDropdownBtn--open"] : ""}`}
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
                  transform: dropOpen ? "rotate(180deg)" : "rotate(0)",
                  transition: "transform 0.2s",
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {dropOpen && (
              <div className={styles.apDropdownMenu}>
                {COMPLEXES.map((c) => (
                  <div
                    key={c}
                    className={`${styles.apDropdownItem} ${complex === c ? styles["apDropdownItem--active"] : ""}`}
                    onClick={() => {
                      handleFilterChange(setComplex, c);
                      setDropOpen(false);
                    }}
                  >
                    {c}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.apRangeWrap}>
            <div className={styles.apRangeLabels}>
              <span>0 этаж</span>
              <span>{floorMax} этаж</span>
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
              className={`${styles.apTypePill} ${typeFilter === t ? styles["apTypePill--active"] : ""}`}
              onClick={() => handleFilterChange(setTypeFilter, t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* CARDS */}
      <div
        className={styles.apSection}
        onClick={() => dropOpen && setDropOpen(false)}
      >
        {pageItems.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 0",
              color: "#637a6b",
              fontSize: 16,
            }}
          >
            Объекттер табылган жок
          </div>
        ) : (
          <div key={animKey} className={styles.apCardGrid}>
            {pageItems.map((item, i) => (
              <ApartCard key={item.id} item={item} delay={i * 70} />
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className={styles.apPagination}>
            <button
              className={styles.apPageBtn}
              disabled={page === 1}
              onClick={() => changePage(page - 1)}
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={`${styles.apPageBtn} ${p === page ? styles["apPageBtn--active"] : ""}`}
                onClick={() => changePage(p)}
              >
                {p}
              </button>
            ))}
            <button
              className={styles.apPageBtn}
              disabled={page === totalPages}
              onClick={() => changePage(page + 1)}
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Apartments;
