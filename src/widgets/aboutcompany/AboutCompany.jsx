import { useEffect, useRef } from 'react';
import anime from 'animejs';

const AboutCompany = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const leftColRef = useRef(null);
  const rightImgRef = useRef(null);
  const buttonRef = useRef(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          
          // Анимация заголовка
          anime({
            targets: headlineRef.current,
            translateY: [100, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutQuart',
            delay: 200,
          });

          // Анимация элементов левой колонки по очереди
          anime({
            targets: Array.from(leftColRef.current.children),
            translateX: [-50, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutQuart',
            delay: anime.stagger(200),
          });

          // Анимация большого фото
          anime({
            targets: rightImgRef.current,
            scale: [1.2, 1],
            opacity: [0, 1],
            duration: 1500,
            easing: 'easeOutQuart',
            delay: 600,
          });

          // Анимация кнопки
          anime({
            targets: buttonRef.current,
            scale: [0, 1],
            rotate: '360deg',
            duration: 800,
            easing: 'easeOutQuart',
            delay: 1000,
          });

          // Отключаем наблюдение после запуска
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  if (sectionRef.current) {
    observer.observe(sectionRef.current);
  }

  return () => observer.disconnect();
}, []);

  return (
    <section ref={sectionRef} className="py-12 md:py-24 bg-white overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-6">
        
        {/* Заголовок */}
        <div className="flex justify-end mb-12 md:mb-20">
          <h2 
            ref={headlineRef}
            className="w-full lg:w-[75%] text-2xl md:text-[42px] leading-[1.1] font-light text-[#1A1A1A] uppercase opacity-0"
          >
            <span className="text-[#0D6D63] font-medium">Биз үчүн курулуш — бул</span><br />
            ишенимдүү, функционалдык жана жардамчы мейкиндиктерди жаратуу искусствосу
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Левая колонка */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col space-y-10">
            
            <div className="opacity-0">
              <span className="text-xs uppercase tracking-[0.2em] text-gray-400 block mb-6">
                О компании
              </span>
              <div className="relative w-64 h-80 grayscale overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                  alt="Building BW"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="relative pt-4 max-w-[420px] opacity-0">
              <div className="relative text-[15px] md:text-base text-gray-600 leading-relaxed">
                <span className="absolute -top-10 -left-6 font-serif text-[90px] text-gray-100 italic select-none -z-10">
                  R
                </span>
                <p className="mb-4">
                  <span className="font-bold text-black">oyal</span> — строиственная компания, которая сдает свои объекты в эксплуатацию в обещанные сроки.
                </p>
                <p>
                  Наши объекты строятся в 5-минутной ходьбе от парково-прогулочных зон и основных объектов соцбыта.
                </p>
              </div>
            </div>

            {/* Кнопка */}
            <div ref={buttonRef} className="opacity-0 w-32 h-32">
              <button className="group relative w-full h-full rounded-full border border-gray-200 flex items-center justify-center transition-colors hover:border-[#0D6D63]">
                <div className="w-[88%] h-[88%] rounded-full bg-[#0D6D63] flex items-center justify-center text-white text-[10px] uppercase tracking-widest font-bold">
                  Читать все
                </div>
              </button>
            </div>
          </div>

          {/* Правая колонка */}
          <div className="lg:col-span-7 relative h-[500px] md:h-[750px] w-full overflow-hidden">
            <div 
              ref={rightImgRef}
              className="w-full h-full opacity-0 relative"
            >
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1935&auto=format&fit=crop"
                alt="Modern Towers"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-8 left-8 w-10 h-10 border border-white/50 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-serif italic">R</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutCompany;