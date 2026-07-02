import { useEffect, useRef, useState } from 'react'
import './Panorama360.css'
import { translations } from '../../locales/i18n'
import { useLang } from '../../locales/LangContext'

const STATUS_COLOR = {
  sale:  '#2d7a3a',
  book:  '#b45309',
  soon:  '#6b7280',
}

const PANO_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/%D0%91%D0%B8%D1%88%D0%BA%D0%B5%D0%BA%2C_%D0%9A%D0%93%D0%AE%D0%90%2C_%D1%81%D1%84%D0%B5%D1%80%D0%BE%D0%BF%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D0%B0.jpg/960px-%D0%91%D0%B8%D1%88%D0%BA%D0%B5%D0%BA%2C_%D0%9A%D0%93%D0%AE%D0%90%2C_%D1%81%D1%84%D0%B5%D1%80%D0%BE%D0%BF%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D0%B0.jpg'

export default function Panorama360() {
  const { lang } = useLang()
  const t = translations[lang].panorama

  const HOTSPOTS = [
    { id: 1, pitch: -5,  yaw: -60,  label: t.residential, sublabel: t.block_a, status: 'sale' },
    { id: 2, pitch: -8,  yaw: 20,   label: t.residential, sublabel: t.block_b, status: 'book' },
    { id: 3, pitch: -3,  yaw: 80,   label: t.business,    sublabel: 'Green City Plaza', status: 'soon' },
    { id: 4, pitch: -12, yaw: 150,  label: t.residential, sublabel: t.block_v, status: 'sale' },
    { id: 5, pitch: -6,  yaw: -140, label: t.parking,     sublabel: t.underground, status: 'sale' },
  ]

  const containerRef = useRef(null)
  const viewerRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [activeHotspot, setActiveHotspot] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!open) return

    const loadPannellum = async () => {
      if (!document.querySelector('#pannellum-css')) {
        const link = document.createElement('link')
        link.id = 'pannellum-css'
        link.rel = 'stylesheet'
        link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css'
        document.head.appendChild(link)
      }

      if (!window.pannellum) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js'
          script.onload = resolve
          script.onerror = reject
          document.head.appendChild(script)
        })
      }

      initViewer()
    }

    loadPannellum()

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy()
        viewerRef.current = null
      }
      setLoaded(false)
    }
  }, [open])

  const initViewer = () => {
    if (!containerRef.current || !window.pannellum) return

    const hotspots = HOTSPOTS.map(hs => ({
      id: `hs-${hs.id}`,
      pitch: hs.pitch,
      yaw: hs.yaw,
      type: 'custom',
      cssClass: 'pano-hotspot-pin',
      createTooltipFunc: (container) => {
        container.innerHTML = `
          <div class="pano-hs-tooltip">
            <div class="pano-hs-dot" style="background:${STATUS_COLOR[hs.status] || '#2d7a3a'}"></div>
            <div class="pano-hs-text">
              <span class="pano-hs-label">${hs.label}</span>
              <span class="pano-hs-sub">${hs.sublabel}</span>
            </div>
          </div>
        `
        container.addEventListener('click', (e) => {
          e.stopPropagation()
          setActiveHotspot(prev => prev?.id === hs.id ? null : hs)
        })
      },
    }))

    viewerRef.current = window.pannellum.viewer(containerRef.current, {
      type: 'equirectangular',
      panorama: PANO_IMAGE,
      autoLoad: true,
      autoRotate: -2,
      autoRotateInactivityDelay: 3000,
      compass: false,
      showControls: false,
      mouseZoom: true,
      hfov: 100,
      minHfov: 50,
      maxHfov: 120,
      pitch: -5,
      yaw: 0,
      hotSpots: hotspots,
      strings: { loadButtonLabel: '' },
    })

    viewerRef.current.on('load', () => setLoaded(true))
  }

  return (
    <>
      {!open && (
        <div className="pano-preview" onClick={() => setOpen(true)}>
          <img
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80"
            alt={t.preview_alt}
            className="pano-preview-img"
          />
          <div className="pano-preview-overlay" />
          <div className="pano-preview-content">
            <p className="pano-preview-title">{t.preview_title}</p>
          </div>
          <button className="pano-preview-btn">
            <span className="pano-preview-btn-dot" />
            {t.watch_btn}
          </button>
        </div>
      )}

      {open && (
        <div className="pano-fullscreen">
          <div ref={containerRef} className="pano-container" />

          {!loaded && (
            <div className="pano-loader">
              <div className="pano-loader-ring" />
              <span>{t.loading}</span>
            </div>
          )}

          <button className="pano-close" onClick={() => setOpen(false)}>
            {t.close}
          </button>

          {loaded && (
            <div className="pano-tip">{t.tip}</div>
          )}

          {activeHotspot && (
            <div className="pano-popup">
              <div className="pano-popup-header">
                <div>
                  <div className="pano-popup-label">{activeHotspot.label}</div>
                  <div className="pano-popup-sub">{activeHotspot.sublabel}</div>
                </div>
                <button className="pano-popup-close" onClick={() => setActiveHotspot(null)}>✕</button>
              </div>
              <div
                className="pano-popup-status"
                style={{ color: STATUS_COLOR[activeHotspot.status] }}
              >
                {t[`status_${activeHotspot.status}`]}
              </div>
              <button className="pano-popup-cta">{t.details}</button>
            </div>
          )}
        </div>
      )}
    </>
  )
}