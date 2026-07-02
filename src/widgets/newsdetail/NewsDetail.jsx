import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './NewsDetail.module.scss'
import { useNewsStore } from '../../store'
import Obratnyi from '../ui/ibratka/Obratnyi'
import { useLang } from '../../locales/LangContext'
import { translations } from '../../locales/i18n'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default function NewsDetail() {
  const { id } = useParams()
    const { lang } = useLang();
  const t = translations[lang];
  const navigate = useNavigate()
  const { selectedItem, loading, error, fetchById } = useNewsStore()

  useEffect(() => {
    fetchById(id)
  }, [id, fetchById])

  if (loading) return <div className={styles.state}>Загрузка...</div>
  if (error) return <div className={styles.state}>Ошибка: {error}</div>
  if (!selectedItem) return null

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate('/news')}>
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
         {t.back_to_news}
      </button>
        {selectedItem.img && (
          <div className={styles.imgWrap}>
            <img src={selectedItem.img} alt={selectedItem.name} />
          </div>
        )}

      <div className={styles.container}>

        <div className={styles.body}>
          <span className={styles.tag}>{selectedItem.name}</span>
          <h1 className={styles.title}>{selectedItem.descriptions}</h1>
          <span className={styles.date}>{formatDate(selectedItem.created_at)}</span>

          <div className={styles.actions}>
            {selectedItem.url && (
              <a
                href={selectedItem.url}
                target="_blank"
                rel="noreferrer"
                className={styles.watchBtn}
              >
               {t.youtube}
              </a>
            )}
          </div>
        </div>
      </div>
      <Obratnyi/>
    </div>
  )
}