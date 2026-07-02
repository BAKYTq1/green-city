import { useState } from 'react';
import './Contact.scss';
import { translations } from '../../locales/i18n';
import { useLang } from '../../locales/LangContext';
import { useFeedbackStore } from '../../store';

const PHONE_REGEX = /^\+?\d{9,15}$/;

export default function Contact() {
  const { lang } = useLang();
  const t = translations[lang].contactPage;
  const tf = translations[lang].contactForm;

  const [form, setForm] = useState({ name: '', phone: '' });
  const [errors, setErrors] = useState({ name: '', phone: '' });
  const { createFeedback, submitting, error, successMessage } = useFeedbackStore();

  function validate(values) {
    const next = { name: '', phone: '' };

    const name = values.name.trim();
    if (!name) {
      next.name = 'Введите имя';
    } else if (name.length < 2) {
      next.name = 'Имя слишком короткое';
    } else if (name.length > 50) {
      next.name = 'Имя слишком длинное';
    }

    const phone = values.phone.trim().replace(/[\s()-]/g, '');
    if (!phone) {
      next.phone = 'Введите номер телефона';
    } else if (!PHONE_REGEX.test(phone)) {
      next.phone = 'Некорректный номер телефона';
    }

    return next;
  }

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(Boolean);
    if (hasErrors) return;

    await createFeedback({
      name: form.name.trim(),
      phone_number: form.phone.trim(),
    });
    setForm({ name: '', phone: '' });
    setErrors({ name: '', phone: '' });
  };

  return (
    <section className="royal-contacts-page">
      <div className="royal-container">

        {/* Башкы заголовок жана Логотип */}
        <div className="royal-header-section">
          <h1 className="royal-main-title">
            {t.title_prefix} <span className="news-header__script">Green City</span>
          </h1>
          <p className="royal-sub-title">{t.subtitle}</p>
        </div>

        {/* 4 Маалымат колонкасы */}
        <div className="royal-info-grid">
          <div className="royal-grid-col">
            <h2 className="royal-col-label">{t.address_label}</h2>
            <div className="royal-col-content">
              <p>{t.legal_address}</p>
              {/* <p style={{ marginTop: '15px' }}>{t.physical_address}</p> */}
            </div>
          </div>

          <div className="royal-grid-col">
            <h2 className="royal-col-label">{t.email_label}</h2>
            <div className="royal-col-content">
              <p><a href="mailto:info@royal.kg" className="royal-link">greencity.kg</a></p>
            </div>
          </div>

          <div className="royal-grid-col">
            <h2 className="royal-col-label">{t.schedule_label}</h2>
            <div className="royal-col-content royal-schedule">
              <div className="royal-schedule-row">
                <span className="royal-days">{t.weekdays}</span>
                <span className="royal-time">9:00 - 18:00</span>
              </div>
              <div className="royal-schedule-row">
                <span className="royal-days">{t.saturday}</span>
                <span className="royal-time">10:00 - 16:00</span>
              </div>
            </div>
          </div>

          <div className="royal-grid-col royal-col-contacts">
            <h2 className="royal-col-label">{t.contacts_label}</h2>
            <div className="royal-col-content">
              <p><a href="tel:+996999007336" className="royal-link">+996 999 007 336</a></p>
            </div>

            <div className="royal-social-links">
              <a href="https://www.instagram.com/greencity.center/" target="_blank" rel="noreferrer">Instagram ↗</a>
              <a href="https://api.whatsapp.com/send/?phone=996999007336&text&type=phone_number&app_absent=0&utm_source=ig" target="_blank" rel="noreferrer">whatsapp ↗</a>
              <a href="https://www.facebook.com/profile.php?id=61583611771089#" target="_blank" rel="noreferrer">facebook ↗</a>
            </div>
          </div>
        </div>

        {/* Карта бөлүмү */}
        <div className="royal-map-section">
          <div className="royal-map-wrapper">
            <iframe
              src="https://2gis.kg/balykchy/geo/70030076137248028/76.195788%2C42.462242?m=76.195765%2C42.462228%2F17.43"
              width="100%"
              height="420"
              frameBorder="0"
              allowFullScreen={true}
              className="royal-map-iframe"
              title="Royal Map Location"
            ></iframe>

            {/* <a href="https://2gis.kg/bishkek/geo/70000001038318991" target="_blank" rel="noreferrer" className="royal-circle-map-button">
              <div className="royal-circle-outer">
                <div className="royal-circle-inner">
                  <span>{t.view_on_map}</span>
                </div>
              </div>
            </a> */}
          </div>
        </div>

        {/* Форма Свяжитесь с нами */}
        <div className="royal-bitrix-form-section">
          <h2 className="royal-bitrix-title">{tf.title}</h2>
          <h3 className="royal-bitrix-subtitle">{tf.subtitle}</h3>

          <div className="royal-bitrix-card">
            <form onSubmit={handleSubmit} noValidate>

              <div className="royal-bitrix-field">
                <label className={form.name ? 'active' : ''}>{tf.name_label} <span>*</span></label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder={form.name ? "" : `${tf.name_label} *`}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <span style={{ color: 'red', fontSize: 12, marginTop: 4, display: 'block' }}>
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="royal-bitrix-field">
                <label className={form.phone ? 'active' : ''}>{tf.phone_label} <span>*</span></label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder={form.phone ? "" : `${tf.phone_label} *`}
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && (
                  <span style={{ color: 'red', fontSize: 12, marginTop: 4, display: 'block' }}>
                    {errors.phone}
                  </span>
                )}
              </div>

              <button type="submit" className="royal-bitrix-submit-btn" disabled={submitting}>
                {submitting ? '...' : tf.submit_btn}
              </button>

              {successMessage && (
                <p style={{ color: '#2d7a3a', marginTop: 12, fontSize: 14 }}>
                  {successMessage}
                </p>
              )}
              {error && (
                <p style={{ color: 'red', marginTop: 12, fontSize: 14 }}>
                  Ошибка: {error}
                </p>
              )}


            </form>
          </div>
        </div>

      </div>
    </section>
  );
}