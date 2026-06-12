import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../ui/buttton/Button'
import './AboutCompany.css'
gsap.registerPlugin(ScrollTrigger)

const AboutCompany = () => {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const leftColRef = useRef(null)
  const rightImgRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(headlineRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.2,
          scrollTrigger: { trigger: headlineRef.current, start: 'top 80%' }
        }
      )

      gsap.fromTo(Array.from(leftColRef.current.children),
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power4.out', stagger: 0.2,
          scrollTrigger: { trigger: leftColRef.current, start: 'top 80%' }
        }
      )

      gsap.fromTo(rightImgRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'power4.out', delay: 0.6,
          scrollTrigger: { trigger: rightImgRef.current, start: 'top 80%' }
        }
      )

      gsap.fromTo(buttonRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.5)', delay: 1,
          scrollTrigger: { trigger: buttonRef.current, start: 'top 90%' }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-12 md:py-24 bg-white overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-6">
        
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
                <span className="grenText absolute -top-18 -left-2 font-serif text-[90px] text-gray-400 italic select-none -z-10">
                  G
                </span>
                <p className="mb-4">
                  <span className="font-bold text-black ml-15">reen City</span> — строительная компания, которая сдаёт объекты в эксплуатацию в обещанные сроки.
                </p>
                <p>
                  Наши объекты строятся в 5-минутной ходьбе от парково-прогулочных зон и основных объектов соцбыта.
                </p>
              </div>
            </div>

            <div ref={buttonRef} className="opacity-0  h-32">
             <Button text="Читать все" />
            </div>
          </div>

          <div className="lg:col-span-7 relative h-[500px] md:h-[750px] w-full overflow-hidden">
            <div ref={rightImgRef} className="w-full h-full opacity-0 relative">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1935&auto=format&fit=crop"
                alt="Modern Towers"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-8 left-8 w-10 h-10 border border-white/50 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-serif italic">G</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default AboutCompany