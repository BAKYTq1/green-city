import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Apartments.module.scss";

// ─── DATA ────────────────────────────────────────────────────────────────────

export const OBJECTS = [
  {
    id: 1,
    slug: "monte-carlo",
    name: "MONTE CARLO",
    status: "building",
    address: "Калыя Молдобасанова, 8В",
    district: "Октябрьский район",
    type: "Квартиры",
    badge: null,
    year: "2026",
    floors: 18,
    apartments: 240,
    area: "45–120 м²",
    segment: "Бизнес-класс",
    description:
      "Элитный жилой комплекс в самом сердце Бишкека. Современная архитектура, панорамные окна и продуманная infrastructure создают атмосферу настоящей роскоши в каждой детали.",
    photos: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
    ],
    plans: [
      { rooms: 1, area: "45–52 м²", price: "от 5 200 000 сом" },
      { rooms: 2, area: "68–80 м²", price: "от 7 800 000 сом" },
      { rooms: 3, area: "95–120 м²", price: "от 11 500 000 сом" },
    ],
    features: [
      "Подземный паркинг",
      "Детская площадка",
      "Охрана 24/7",
      "Лифты Otis",
      "Видеонаблюдение",
      "Фитнес-зал",
    ],
  },
  {
    id: 2,
    slug: "salkyn",
    name: "SALKYN",
    status: "building",
    address: "Улица Чокана Валиханова, 7",
    district: "Первомайский район",
    type: "Квартиры",
    badge: "СТАРТ ПРОДАЖ",
    year: "2027",
    floors: 14,
    apartments: 180,
    area: "38–95 м²",
    segment: "Комфорт-класс",
    description:
      "Новый жилой комплекс бизнес-класса с уютными дворами, зелёными зонами и видом на горы. Стартовые цены — уникальная возможность инвестировать на раннем этапе строительства.",
    photos: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
    ],
    plans: [
      { rooms: 1, area: "38–46 м²", price: "от 4 100 000 сом" },
      { rooms: 2, area: "60–72 м²", price: "от 6 500 000 сом" },
      { rooms: 3, area: "80–95 м²", price: "от 8 900 000 сом" },
    ],
    features: [
      "Двор без машин",
      "Горный вид",
      "Видеонаблюдение",
      "Smart-замки",
      "Зелёные зоны",
      "Паркинг",
    ],
  },
  {
    id: 3,
    slug: "ala-too",
    name: "ALA TOO",
    status: "done",
    address: "Проспект Манаса, 12",
    district: "Ленинский район",
    type: "Квартиры",
    badge: null,
    year: "2023",
    floors: 22,
    apartments: 320,
    area: "50–130 м²",
    segment: "Бизнес-класс",
    description:
      "Сданный в эксплуатацию комплекс в деловом центре города. Все квартиры с чистовой отделкой, заселение возможно сразу после покупки. Готовая инфраструктура и развитый район.",
    photos: [
      "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=1200&q=80",
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=1200&q=80",
      "https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=1200&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
    ],
    plans: [
      { rooms: 1, area: "50–58 м²", price: "от 6 800 000 сом" },
      { rooms: 2, area: "75–90 м²", price: "от 9 200 000 сом" },
      { rooms: 3, area: "100–130 м²", price: "от 13 000 000 сом" },
    ],
    features: [
      "Чистовая отделка",
      "Фитнес-зал",
      "Паркинг",
      "Консьерж",
      "Детская площадка",
      "Магазины на 1 этаже",
    ],
  },
  {
    id: 4,
    slug: "yntymak",
    name: "YNTYMAK",
    status: "building",
    address: "Улица Ынтымак, 5",
    district: "Свердловский район",
    type: "Квартиры",
    badge: null,
    year: "2026",
    floors: 12,
    apartments: 160,
    area: "42–88 м²",
    segment: "Комфорт-класс",
    description:
      "Комфортный жилой комплекс в тихом районе с развитой инфраструктурой. Рядом школы, детские сады, парки и остановки общественного транспорта. Доступные цены и качественное строительство.",
    photos: [
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200&q=80",
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1200&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80",
    ],
    plans: [
      { rooms: 1, area: "42–50 м²", price: "от 3 900 000 сом" },
      { rooms: 2, area: "62–74 м²", price: "от 5 700 000 сом" },
      { rooms: 3, area: "76–88 м²", price: "от 7 400 000 сом" },
    ],
    features: [
      "Тихий район",
      "Рядом школы",
      "Зелёный двор",
      "ИП отопление",
      "Паркинг",
      "Охрана",
    ],
  },
  {
    id: 5,
    slug: "royal-garden",
    name: "ROYAL GARDEN",
    status: "soon",
    address: "Бульвар Эркиндик, 3",
    district: "Октябрьский район",
    type: "Коттеджи",
    badge: "СТАРТ ПРОДАЖ",
    year: "2027",
    floors: 3,
    apartments: 48,
    area: "180–350 м²",
    segment: "Премиум",
    description:
      "Закрытый коттеджный посёлок премиум-класса на Бульваре Эркиндик. Собственная территория, ландшафтный дизайн, бассейн и полная приватность для тех, кто ценит пространство.",
    photos: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
    ],
    plans: [
      { rooms: 4, area: "180–210 м²", price: "от 35 000 000 сом" },
      { rooms: 5, area: "240–280 м²", price: "от 48 000 000 сом" },
      { rooms: 6, area: "310–350 м²", price: "от 62 000 000 сом" },
    ],
    features: [
      "Закрытая территория",
      "Бассейн",
      "Ландшафт",
      "Гараж на 2 авто",
      "Охрана 24/7",
      "Зона барбекю",
    ],
  },
  {
    id: 6,
    slug: "royal-resort",
    name: "ROYAL RESORT",
    status: "done",
    address: "Иссык-Кульская область",
    district: "Иссык-Куль",
    type: "Коммерческие",
    badge: null,
    year: "2022",
    floors: 5,
    apartments: 120,
    area: "25–80 м²",
    segment: "Премиум",
    description:
      "Роскошный пансионат на берегу живописного озера Иссык-Куль. Апартаменты, рестораны, спа и конференц-залы — всё в одном месте среди живописных гор Кыргызстана.",
    photos: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80",
      "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=1200&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&q=80",
    ],
    plans: [
      { rooms: 1, area: "25–35 м²", price: "от 8 500 000 сом" },
      { rooms: 2, area: "45–60 м²", price: "от 13 000 000 сом" },
      { rooms: 3, area: "65–80 м²", price: "от 19 000 000 сом" },
    ],
    features: [
      "Берег озера",
      "СПА",
      "Ресторан",
      "Конференц-зал",
      "Бассейн",
      "Пляж",
    ],
  },
  {
    id: 7,
    slug: "brooklyn",
    name: "BROOKLYN",
    status: "building",
    address: "Улица Байтик Баатыра, 4",
    district: "Первомайский район",
    type: "Квартиры",
    badge: null,
    year: "2026",
    floors: 16,
    apartments: 200,
    area: "44–100 м²",
    segment: "Бизнес-класс",
    description:
      "Современный жилой комплекс в стиле нью-йоркского лофта. Высокие потолки, большие окна, открытые планировки и кирпичные акценты создают уникальную атмосферу.",
    photos: [
      "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=1200&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1200&q=80",
    ],
    plans: [
      { rooms: 1, area: "44–54 м²", price: "от 4 600 000 сом" },
      { rooms: 2, area: "66–78 м²", price: "от 6 900 000 сом" },
      { rooms: 3, area: "86–100 м²", price: "от 9 600 000 сом" },
    ],
    features: [
      "Высокие потолки",
      "Лофт-стиль",
      "Паркинг",
      "Терраса на крыше",
      "Smart home",
      "Кладовые",
    ],
  },
  {
    id: 8,
    slug: "cambridge",
    name: "CAMBRIDGE",
    status: "done",
    address: "Улица Горького, 15",
    district: "Ленинский район",
    type: "Офисы",
    badge: null,
    year: "2021",
    floors: 10,
    apartments: 80,
    area: "30–200 м²",
    segment: "Бизнес-класс",
    description:
      "Бизнес-центр класса А в деловом районе. Гибкие офисные пространства, переговорные комнаты, ресепшн и полная инфраструктура для современного бизнеса любого масштаба.",
    photos: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&q=80",
      "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?w=1200&q=80",
    ],
    plans: [
      { rooms: null, area: "30–50 м²", price: "от 180 000 сом/мес" },
      { rooms: null, area: "60–100 м²", price: "от 320 000 сом/мес" },
      { rooms: null, area: "120–200 м²", price: "от 580 000 сом/мес" },
    ],
    features: [
      "Класс А",
      "Переговорные",
      "Ресепшн",
      "Паркинг",
      "Скоростной лифт",
      "Кафе",
    ],
  },
  {
    id: 9,
    slug: "millennium",
    name: "MILLENNIUM",
    status: "building",
    address: "Проспект Чуй, 88",
    district: "Октябрьский район",
    type: "Квартиры",
    badge: "СТАРТ ПРОДАЖ",
    year: "2027",
    floors: 27,
    apartments: 420,
    area: "40–150 м²",
    segment: "Премиум",
    description:
      "Самый высокий жилой комплекс в Бишкеке. 27 этажей, панорамный вид на весь город и горы, небесный лаунж на верхнем этаже и эксклюзивные пентхаусы для ценителей высоты.",
    photos: [
      "https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?w=1200&q=80",
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=1200&q=80",
      "https://images.unsplash.com/photo-1574091812052-dd94ec383d73?w=1200&q=80",
      "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1200&q=80",
    ],
    plans: [
      { rooms: 1, area: "40–50 м²", price: "от 5 500 000 сом" },
      { rooms: 2, area: "70–90 м²", price: "от 8 400 000 сом" },
      { rooms: 3, area: "110–150 м²", price: "от 14 000 000 сом" },
    ],
    features: [
      "Sky Lounge",
      "Пентхаусы",
      "Консьерж",
      "2 уровня паркинга",
      "Бассейн",
      "Фитнес-клуб",
    ],
  },
  {
    id: 10,
    slug: "royal-tower",
    name: "ROYAL TOWER",
    status: "soon",
    address: "Улица Токтогула, 21",
    district: "Октябрьский район",
    type: "Квартиры",
    badge: null,
    year: "2028",
    floors: 24,
    apartments: 300,
    area: "48–140 м²",
    segment: "Премиум",
    description:
      "Флагманский проект компании Royal. Башня в центре города с видовыми квартирами, авторским лобби и собственным фитнес-клубом. Скоро открытие продаж — следите за обновлениями.",
    photos: [
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80",
      "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?w=1200&q=80",
      "https://images.unsplash.com/photo-1548795739-7a6e19f9bcfc?w=1200&q=80",
    ],
    plans: [
      { rooms: 1, area: "48–56 м²", price: "от 6 200 000 сом" },
      { rooms: 2, area: "74–92 м²", price: "от 9 800 000 сом" },
      { rooms: 3, area: "105–140 м²", price: "от 15 500 000 сом" },
    ],
    features: [
      "Видовые квартиры",
      "Авторское лобби",
      "Фитнес-клуб",
      "Smart home",
      "Консьерж",
      "Подземный паркинг",
    ],
  },
];

const STATUS_FILTERS = [
  "Все",
  "Строящиеся",
  "Завершенные",
  "На стадии завершения",
];
const TYPE_FILTERS = ["Все", "Квартиры", "Офисы", "Коттеджи", "Коммерческие"];
const PER_PAGE = 6;

// ─── STATUS HELPERS ───────────────────────────────────────────────────────────

export function statusLabel(s) {
  return (
    {
      building: "Строящиеся",
      done: "Завершённые",
      soon: "На стадии завершения",
    }[s] || s
  );
}

export function statusClass(s) {
  return (
    {
      building: "status--building",
      done: "status--done",
      soon: "status--soon",
    }[s] || ""
  );
}

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

  const statusClassName = styles[`status--${item.status}`] || "";

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
          src={item.photos[0]}
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
    </div>
  );
}

// ─── MAIN APARTMENTS LIST ─────────────────────────────────────────────────────

export function Apartments() {
  // ── Заменили useState(null) на useNavigate ──
  const navigate = useNavigate();

  const [tab, setTab] = useState("objects");
  const [statusFilter, setStatusFilter] = useState("Все");
  const [typeFilter, setTypeFilter] = useState("Все");
  const [complex, setComplex] = useState("Все объекты");
  const [dropOpen, setDropOpen] = useState(false);
  const [floorMax, setFloorMax] = useState(27);
  const [page, setPage] = useState(1);
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

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
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

  // ── Навигация через роутер ──
  function handleNavigate(slug) {
    navigate(`/objects/${slug}`);
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
            onClick={() => {
              setTab("objects");
              changePage(1);
            }}
          >
            {filtered.length} объект
          </button>
          <button
            className={`${styles["ap-toggle__btn"]} ${tab === "houses" ? styles["ap-toggle__btn--active"] : styles["ap-toggle__btn--inactive"]}`}
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
              onChange={(e) =>
                handleFilter(setFloorMax, Number(e.target.value))
              }
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
          {filtered.length} объектов найдено
        </div>
        {pageItems.length === 0 ? (
          <div className={styles["ap-empty"]}>
            <div className={styles["ap-empty__icon"]}>🏗</div>
            <div className={styles["ap-empty__title"]}>Объекты не найдены</div>
            <div className={styles["ap-empty__text"]}>
              Попробуйте изменить параметры фильтра
            </div>
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
      </div>
    </div>
  );
}

export default Apartments;
