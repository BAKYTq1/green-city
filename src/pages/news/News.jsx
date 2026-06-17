import { useState, useEffect, useRef } from "react";
import styles from "./News.module.scss";

const ALL_NEWS = [
  {
    id: 1,
    date: "28.08.25",
    tag: "Команда",
    title:
      "GREEN CITY жетекчилиги өз кызматкерлерин баалайт жана алар үчүн унутулгус тимбилдингдерди уюштурат!",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    date: "25.08.25",
    tag: "Курулуш",
    title:
      "Саякат, укмуштуудай окуялар, кемелтиксиздик — мунун баарын GREEN CITY RESORT'тон табууга болот!",
    img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    date: "18.08.25",
    tag: "Инсандар",
    title:
      "Мирлан Акжигитовдун ийгилигинин сырлары: KFC тазалоочусунан компаниянын негиздөөчүсүнө чейин",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    date: "18.08.25",
    tag: "Сыйлык",
    title: "Сыйлык — бул мактаныч",
    img: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    date: "15.08.25",
    tag: "Команда",
    title: "Куруучулар күнүнө арналган жыл сайынкы жазгы тимбилдинг",
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    date: "10.08.25",
    tag: "Долбоор",
    title:
      "GREEN CITY жаңы турак-жай комплексинин курулушун баштады — заманбап жашоо мейкиндиги",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7, // Исправлен ID с 6 на 7 для уникальности key
    date: "10.08.25",
    tag: "Долбоор",
    title:
      "GREEN CITY жаңы турак-жай комплексинин курулушун баштады — заманбап жашоо мейкиндиги",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
  },
];

const ITEMS_PER_PAGE = 6;
const TOTAL_PAGES = Math.ceil(ALL_NEWS.length / ITEMS_PER_PAGE);

function useInView(ref) {
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
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function NewsCard({ item, big, delay }) {
  const ref = useRef(null);
  const visible = useInView(ref);

  return (
    <div
      ref={ref}
      className={`${styles["news-card"]} ${visible ? styles.visible : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className={`${styles["news-card__img"]} ${big ? styles["news-card__img--big"] : styles["news-card__img--small"]}`}
      >
        <img src={item.img} alt={item.title} loading="lazy" />
      </div>
      <span className={styles["news-card__date"]}>{item.date}</span>
      <span className={styles["news-card__tag"]}>{item.tag}</span>
      <p
        className={
          big
            ? styles["news-card__title--big"]
            : styles["news-card__title--small"]
        }
      >
        {item.title}
      </p>
      <div className={styles["news-card__arrow"]}>
        <span>↗</span>
      </div>
    </div>
  );
}

export default function News() {
  const [page, setPage] = useState(1);
  const [animKey, setAnimKey] = useState(0);
  const headerRef = useRef(null);
  const headerVisible = useInView(headerRef);

  const pageNews = ALL_NEWS.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const bigCards = pageNews.slice(0, 2);
  const smallCards = pageNews.slice(2, 6);

  function goToPage(p) {
    if (p < 1 || p > TOTAL_PAGES) return;
    setPage(p);
    setAnimKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className={styles["news-page"]}>
      {/* ── Header ── */}
      <div
        ref={headerRef}
        className={`${styles["news-header"]} ${headerVisible ? styles.visible : ""}`}
      >
        <div className={styles["news-container"]} style={{ padding: "0 24px" }}>
          <div className={styles["news-header__top"]}>
            <h1 className={styles["news-header__label"]}>
              Компания жаңылыктары
            </h1>
            <div className={styles["news-header__brand-wrap"]}>
              <span className={styles["news-header__script"]}>Green City</span>
            </div>
          </div>

          <p className={styles["news-header__sub"]}>
            <span className={styles["news-header__dash"]}>—</span>
            биздин долбоорлор, өнөктөштүктөр жана
            <br />
            өнүгүү жөнүндө билүү керек болгон нерселердин баары.
          </p>
        </div>
      </div>

      {/* ── Cards Grid ── */}
      <div className={styles["news-container"]}>
        <div key={animKey} className={styles["news-grid"]}>
          {bigCards.map((item, i) => (
            <NewsCard key={item.id} item={item} big delay={i * 80} />
          ))}
          {smallCards.length > 0 && (
            <div className={styles["news-row-small"]}>
              {smallCards.map((item, i) => (
                <NewsCard
                  key={item.id}
                  item={item}
                  big={false}
                  delay={160 + i * 70}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Пагинация ── */}
        {TOTAL_PAGES > 1 && (
          <div className={styles["news-pagination"]}>
            <button
              className={styles["news-pagination__arrow"]}
              disabled={page === 1}
              onClick={() => goToPage(page - 1)}
            >
              ←
            </button>

            <div className={styles["news-pagination__pages"]}>
              {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((p) => (
                <span
                  key={p}
                  className={`${styles["news-pagination__item"]} ${p === page ? styles["news-pagination__item--active"] : ""}`}
                  onClick={() => goToPage(p)}
                >
                  {p}
                </span>
              ))}
            </div>

            <button
              className={styles["news-pagination__arrow"]}
              disabled={page === TOTAL_PAGES}
              onClick={() => goToPage(page + 1)}
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
