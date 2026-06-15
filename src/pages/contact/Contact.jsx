import  { useState } from 'react';
import './Contact.scss';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Битрикске жөнөтүлдү:', form);
  };

  return (
    <section className="royal-contacts-page">
      <div className="royal-container">
        
        {/* Башкы заголовок жана Логотип */}
        <div className="royal-header-section">
          <h1 className="royal-main-title">
            Будьте на связи с <span className="royal-brand-logo"><i>R</i><span>oyal</span></span>
          </h1>
          <p className="royal-sub-title">— надёжно, удобно, прямо сейчас</p>
        </div>

        {/* 4 Маалымат колонкасы */}
        <div className="royal-info-grid">
          <div className="royal-grid-col">
            <h2 className="royal-col-label">Адрес</h2>
            <div className="royal-col-content">
              <p>Юридический адрес: 720010<br />г. Бишкек ул. Рыскулова 79 Б</p>
              <p style={{ marginTop: '15px' }}>Адрес: г. Бишкек, Пр-т<br />А.Масалиева, 28в (ориентир:<br />ресторан «Ала-Тоо»)</p>
            </div>
          </div>

          <div className="royal-grid-col">
            <h2 className="royal-col-label">Электронная почта</h2>
            <div className="royal-col-content">
              <p><a href="mailto:info@royal.kg" className="royal-link">info@royal.kg</a></p>
            </div>
          </div>

          <div className="royal-grid-col">
            <h2 className="royal-col-label">График работы</h2>
            <div className="royal-col-content royal-schedule">
              <div className="royal-schedule-row">
                <span className="royal-days">Пн-Пт</span>
                <span className="royal-time">9:00 - 18:00</span>
              </div>
              <div className="royal-schedule-row">
                <span className="royal-days">Сб</span>
                <span className="royal-time">10:00 - 16:00</span>
              </div>
            </div>
          </div>

          <div className="royal-grid-col royal-col-contacts">
            <h2 className="royal-col-label">Контакты</h2>
            <div className="royal-col-content">
              <p><a href="tel:+996555111444" className="royal-link">+996 555 111 444</a></p>
            </div>
            
            <div className="royal-social-links">
              <a href="#" target="_blank" rel="noreferrer">Instagram ↗</a>
              <a href="#" target="_blank" rel="noreferrer">whatsapp ↗</a>
              <a href="#" target="_blank" rel="noreferrer">facebook ↗</a>
            </div>
          </div>
        </div>

        {/* Карта бөлүмү */}
        <div className="royal-map-section">
          <div className="royal-map-wrapper">
            <iframe 
              src="https://yandex.ru/map-widget/v1/?ll=74.618646%2C42.825633&mode=search&oid=165355608688&ol=biz&z=16" 
              width="100%" 
              height="420" 
              frameBorder="0" 
              allowFullScreen={true}
              className="royal-map-iframe"
              title="Royal Map Location"
            ></iframe>
            
            <a href="https://2gis.kg/bishkek/geo/70000001038318991" target="_blank" rel="noreferrer" className="royal-circle-map-button">
              <div className="royal-circle-outer">
                <div className="royal-circle-inner">
                  <span>ПОСМОТРЕТЬ<br />НА КАРТЕ</span>
                </div>
              </div>
            </a>
          </div>
        </div>

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