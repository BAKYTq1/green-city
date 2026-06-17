import { useState } from 'react';
// import './Contact.scss';

export default function Obratnyi() {
  const [form, setForm] = useState({ name: '', phone: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Битрикске жөнөтүлдү:', form);
  };

  return (
    <section className="royal-contacts-page">
      <div className="royal-container">
    
        {/* Снимок экрана 2026-06-15 182250.png СҮРӨТТӨГҮДӨЙ СВЯЖИТЕСЬ С НАМИ ФОРМАСЫ */}
        <div className="royal-bitrix-form-section">
          <h2 className="royal-bitrix-title">Свяжитесь с нами</h2>
          <h3 className="royal-bitrix-subtitle">Мы готовы ответить на все ваши вопросы</h3>
          
          <div className="royal-bitrix-card">
            <form onSubmit={handleSubmit}>
              
              <div className="royal-bitrix-field">
                <label className={form.name ? 'active' : ''}>Ваше имя <span>*</span></label>
                <input 
                  type="text" 
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={form.name ? "" : "Ваше имя *"}
                  required 
                />
              </div>

              <div className="royal-bitrix-field">
                <label className={form.phone ? 'active' : ''}>Ваш номер телефона <span>*</span></label>
                <input 
                  type="tel" 
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder={form.phone ? "" : "Ваш номер телефона *"}
                  required 
                />
              </div>

              <button type="submit" className="royal-bitrix-submit-btn">
                ОТПРАВИТЬ
              </button>

              {/* Төмөнкү Битрикс24 автордук маалыматтары */}
              <div className="royal-bitrix-footer">
                <span className="royal-report">Сообщить о нарушении <i className="royal-help-icon">?</i></span>
                <span className="royal-powered">Заряжено <span>Битрикс</span>24</span>
              </div>

            </form>
          </div>
        </div>

      </div>
    </section>
  );
}