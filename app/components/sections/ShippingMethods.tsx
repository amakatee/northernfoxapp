// app/shipping-methods/page.tsx
'use client';
import { Slider } from '../slider';
import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Minimalistic icons (stroke width 1.5 for elegance)
const AirIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
  </svg>
);

const TrainIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const TruckIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
  </svg>
);

const ShipIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const slides = [
  {
    id: 1,
    title: 'Авиаперевозки',
    subtitle: 'Самый быстрый способ',
    duration: '3-7 дн.',
    suitableFor: ['Срочные грузы', 'Электроника', 'Документы', 'Образцы'],
    cost: 'Высокая',
    reliability: 5,
    description: 'Идеально для ценных и срочных отправлений. Полный трекинг.',
  },
  {
    id: 2,
    title: 'Железнодорожные',
    subtitle: 'Баланс цены и скорости',
    duration: '18-40 дн.',
    suitableFor: ['FCL контейнеры', 'Сборные грузы', 'Оборудование', 'Сырьё'],
    cost: 'Средняя',
    reliability: 4,
    description: 'Надёжный и экономичный вариант для больших партий.',
  },
  {
    id: 3,
    title: 'Автомобильные',
    subtitle: 'Гибкость и универсальность',
    duration: '14-25 дн.',
    suitableFor: ['Дверь-дверь', 'Регионы', 'Температура', 'Частичные загрузки'],
    cost: 'Средняя',
    reliability: 4,
    description: 'Прямая доставка от склада до склада без перегрузок.',
  },
  {
    id: 4,
    title: 'Морские контейнерные',
    subtitle: 'Максимальная экономия',
    duration: '30-60 дн.',
    suitableFor: ['Массовые грузы', 'Консолидация', 'Крупногабарит', 'Международные'],
    cost: 'Низкая',
    reliability: 3,
    description: 'Самый низкий тариф при перевозке больших объёмов.',
  },
];


// Data for shipping methods (in Russian, enriched)
const shippingMethods = [
  {
    id: 1,
    icon: <AirIcon />,
    title: 'Авиаперевозки',
    subtitle: 'Самый быстрый способ',
    duration: '3-7 дн.',
    suitableFor: ['Срочные грузы', 'Электроника', 'Документы', 'Образцы'],
    cost: 'Высокая',
    reliability: 5,
    description: 'Идеально для ценных и срочных отправлений. Полный трекинг.',
  },
  {
    id: 2,
    icon: <TrainIcon />,
    title: 'Железнодорожные',
    subtitle: 'Баланс цены и скорости',
    duration: '18-40 дн.',
    suitableFor: ['FCL контейнеры', 'Сборные грузы', 'Оборудование', 'Сырьё'],
    cost: 'Средняя',
    reliability: 4,
    description: 'Надёжный и экономичный вариант для больших партий.',
  },
  {
    id: 3,
    icon: <TruckIcon />,
    title: 'Автомобильные',
    subtitle: 'Гибкость и универсальность',
    duration: '14-25 дн.',
    suitableFor: ['Дверь-дверь', 'Регионы', 'Температура', 'Частичные загрузки'],
    cost: 'Средняя',
    reliability: 4,
    description: 'Прямая доставка от склада до склада без перегрузок.',
  },
  {
    id: 4,
    icon: <ShipIcon />,
    title: 'Морские контейнерные',
    subtitle: 'Максимальная экономия',
    duration: '30-60 дн.',
    suitableFor: ['Массовые грузы', 'Консолидация', 'Крупногабарит', 'Международные'],
    cost: 'Низкая',
    reliability: 3,
    description: 'Самый низкий тариф при перевозке больших объёмов.',
  },
];

export default function ShippingMethodsPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // GSAP entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title fade-up
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Cards stagger (desktop only – but refs are shared)
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Helper to set card refs (used for both mobile and desktop)
  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    cardsRef.current[index] = el;
  };

  // Calculate cost handler (just an example)
  const handleCalculate = (id: number) => {
    const method = shippingMethods.find(m => m.id === id);
    alert(`Запрос стоимости для ${method?.title} отправлен. Мы свяжемся с вами в ближайшее время.`);
  };

  return (
    <main className=" bg-gradient-to-b from-blue-950 to-blue-950/60 mt-[-1px] text-white  px-4 sm:px-6 lg:px-8 ">
      {/* Subtle background lines (from your original) */}
     
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 flex justify-around px-8 lg:px-32">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-px h-full bg-gradient-to-b from-transparent via-blue-600/10 to-transparent"
            />
          ))}
        </div>
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>
      <h1
          ref={titleRef}
          className="text-3xl md:text-4xl font-light text-center mb-12 tracking-wide"
        >
          Способы доставки
        </h1> 

      <Slider slides={slides} />
      <section ref={sectionRef} className="relative max-w-7xl mx-auto">
        {/* Section Title */}
        

       

        {/* Desktop: Grid (hidden on mobile) */}
        <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {shippingMethods.map((method, index) => (
            <div
              key={method.id}
              ref={(el) => setCardRef(el, index)}
              className="bg-gradient-to-br from-gray-900/50 to-blue-950/50 backdrop-blur-sm rounded-xl p-6 border border-blue-800/30 hover:border-cyan-500/50 transition-all duration-300 flex flex-col"
            >
              {/* Same card content as mobile (but without Swiper) */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  {method.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{method.title}</h3>
                  <p className="text-sm text-cyan-200/70">{method.subtitle}</p>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4 text-sm">
                <span className="text-blue-200/80">⏱ {method.duration}</span>
                <span className={`font-medium px-2 py-0.5 rounded ${
                  method.cost === 'Высокая' ? 'bg-red-900/30 text-red-400' :
                  method.cost === 'Средняя' ? 'bg-yellow-900/30 text-yellow-400' :
                  'bg-green-900/30 text-green-400'
                }`}>
                  {method.cost} стоимость
                </span>
              </div>

              <div className="mb-4">
                <h4 className="text-xs uppercase tracking-wider text-blue-300/70 mb-2">Подходит для:</h4>
                <div className="flex flex-wrap gap-2">
                  {method.suitableFor.slice(0, 4).map((item, i) => (
                    <span key={i} className="text-xs bg-blue-900/30 text-blue-200 px-2 py-1 rounded-full border border-blue-700/30">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-wider text-blue-300/70 mb-2">Надёжность</h4>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 w-6 rounded-full ${
                        i < method.reliability ? 'bg-cyan-500' : 'bg-blue-800/50'
                      }`}
                    />
                  ))}
                  <span className="text-xs text-blue-300/60 ml-2">{method.reliability}/5</span>
                </div>
              </div>

              <button
                onClick={() => handleCalculate(method.id)}
                className="mt-auto w-full py-2.5 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 hover:from-cyan-600/50 hover:to-blue-600/50 border border-cyan-500/30 hover:border-cyan-400/50 text-white font-medium rounded-lg transition-all duration-300 active:scale-95 text-sm"
              >
                Рассчитать стоимость
              </button>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-blue-300/60 text-sm mt-5 pb-5 ">
          Все способы включают полное таможенное оформление
        </p>
      </section>
    </main>
  );
}