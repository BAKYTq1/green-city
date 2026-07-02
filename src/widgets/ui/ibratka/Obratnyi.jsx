import { useState } from 'react';
import { useLang } from '../../../locales/LangContext';
import { translations } from '../../../locales/i18n';
import { useFeedbackStore } from '../../../store';
// import './Contact.scss';

const PHONE_REGEX = /^\+?\d{9,15}$/;

export default function Obratnyi() {
  const { lang } = useLang();
  const t = translations[lang].contactForm;

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

        <div className="royal-bitrix-form-section">
          <h2 className="royal-bitrix-title">{t.title}</h2>
          <h3 className="royal-bitrix-subtitle">{t.subtitle}</h3>

          <div className="royal-bitrix-card">
            <form onSubmit={handleSubmit} noValidate>

              <div className="royal-bitrix-field">
                <label className={form.name ? 'active' : ''}>{t.name_label} <span>*</span></label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder={form.name ? "" : `${t.name_label} *`}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <span style={{ color: 'red', fontSize: 12, marginTop: 4, display: 'block' }}>
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="royal-bitrix-field">
                <label className={form.phone ? 'active' : ''}>{t.phone_label} <span>*</span></label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder={form.phone ? "" : `${t.phone_label} *`}
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && (
                  <span style={{ color: 'red', fontSize: 12, marginTop: 4, display: 'block' }}>
                    {errors.phone}
                  </span>
                )}
              </div>

              <button type="submit" className="royal-bitrix-submit-btn" disabled={submitting}>
                {submitting ? '...' : t.submit_btn}
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