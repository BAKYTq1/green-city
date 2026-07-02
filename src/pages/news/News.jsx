import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./News.module.scss";
import { translations } from "../../locales/i18n";
import { useLang } from "../../locales/LangContext";
import { useNewsStore } from "../../store";
import { parseError } from "../../utils/parseError";
import Obratnyi from "../../widgets/ui/ibratka/Obratnyi";

const ITEMS_PER_PAGE = 6;

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

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

function NewsCard({ item, big, delay, onClick }) {
  const ref = useRef(null);
  const visible = useInView(ref);

  return (
    <div
      ref={ref}
      className={`${styles["news-card"]} ${visible ? styles.visible : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={onClick}
    >
      <div
        className={`${styles["news-card__img"]} ${big ? styles["news-card__img--big"] : styles["news-card__img--small"]}`}
      >
        {item.img ? (
          <img src={item.img} alt={item.name} loading="lazy" />
        ) : (
          <div className={styles["news-card__img-placeholder"]} />
        )}
      </div>
      <span className={styles["news-card__date"]}>{formatDate(item.created_at)}</span>
      <span className={styles["news-card__tag"]}>{item.name}</span>
      <p
        className={
          big
            ? styles["news-card__title--big"]
            : styles["news-card__title--small"]
        }
      >
        {item.descriptions}
      </p>
      <div className={styles["news-card__arrow"]}>
        <span>↗</span>
      </div>
    </div>
  );
}

export default function News() {
  const { lang } = useLang();
  const t = translations[lang].news;
  const navigate = useNavigate();

  const { items, loading, error, fetchList } = useNewsStore();

  const [page, setPage] = useState(1);
  const [animKey, setAnimKey] = useState(0);
  const headerRef = useRef(null);
  const headerVisible = useInView(headerRef);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const TOTAL_PAGES = Math.ceil(items.length / ITEMS_PER_PAGE);

  const pageNews = items.slice(
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
      <div
        ref={headerRef}
        className={`${styles["news-header"]} ${headerVisible ? styles.visible : ""}`}
      >
        <div className={styles["news-containe"]}>
          <div className={styles["news-header__top"]}>
            <h1 className={styles["news-header__label"]}>{t.header_label}</h1>
            <div className={styles["news-header__brand-wrap"]}>
              <span className={styles["news-header__script"]}>Green City</span>
            </div>
          </div>

          <p className={styles["news-header__sub"]}>
            <span className={styles["news-header__dash"]}>—</span>
            {t.sub_line1}
            <br />
            {t.sub_line2}
          </p>
        </div>
      </div>

      <div className={styles["news-container"]}>
       {loading && (
  <p className={styles.statusText}>Загружаем новости…</p>
)}
       {error && (
  <div className={styles.errorBlock}>
    <p className={styles.errorText}>{parseError(error)}</p>
    <button className={styles.retryBtn} onClick={fetchList}>
      Попробовать снова
    </button>
  </div>
)}

{!loading && !error && items.length === 0 && (
  <p className={styles.statusText}>Новостей пока нет</p>
)}

        {!loading && !error && (
          <>
            <div key={animKey} className={styles["news-grid"]}>
              {bigCards.map((item, i) => (
                <NewsCard
                  key={item.id}
                  item={item}
                  big
                  delay={i * 80}
                  onClick={() => navigate(`/news/${item.id}`)}
                />
              ))}
              {smallCards.length > 0 && (
                <div className={styles["news-row-small"]}>
                  {smallCards.map((item, i) => (
                    <NewsCard
                      key={item.id}
                      item={item}
                      big={false}
                      delay={160 + i * 70}
                      onClick={() => navigate(`/news/${item.id}`)}
                    />
                  ))}
                </div>
              )}
            </div>

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
          </>
        )}
      </div>
      <Obratnyi/>
    </div>
  );
}