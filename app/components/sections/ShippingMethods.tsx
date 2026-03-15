"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DeliveryMethodCard from "../helpers/ShippingCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Array of gradient classes for each card
const gradients = [
  "bg-gradient-to-br from-purple-900/80 to-blue-900/80",
  "bg-gradient-to-br from-teal-900/70 to-cyan-900/70",
  "bg-gradient-to-br from-amber-900/70 to-orange-900/70",
  "bg-gradient-to-br from-emerald-900/70 to-green-900/70",
];

const shippingMethods = [
  {
    id: 1,
    icon: <></>,                    // empty icon
    title: "Авиаперевозки",
    subtitle: "Самый быстрый способ",
    duration: "3-7 дн.",
    suitableFor: ["Образцы", "Электроника", "Мед. товары", "Документы"],
    cost: "Высокая" as const,
    reliability: 5,
    features: ["Скорость доставки", "Безопасность", "Трекинг", "Таможня"],
    imageSrc: "/images/airpng.png",
  },
  {
    id: 2,
    icon: <></>,
    title: "Железнодорожные",
    subtitle: "Баланс цены и скорости",
    duration: "18-40 дн.",
    suitableFor: ["Контейнеры FCL", "Сборные грузы LCL", "Оборудование", "Стройматериалы"],
    cost: "Средняя" as const,
    reliability: 4,
    features: ["Оптимальная стоимость", "Надежность", "Контейнерные", "Сборные грузы"],
    imageSrc: "/images/train.jpg",
  },
  {
    id: 3,
    icon: <></>,
    title: "Автомобильные",
    subtitle: "Гибкий и универсальный",
    duration: "14-25 дн.",
    suitableFor: ["Региональные", "Междугородные", "Температура", "Частичные загрузки"],
    cost: "Средняя" as const,
    reliability: 4,
    features: ["Гибкость маршрутов", "Дверь-дверь", "Экспедирование", "Мультимодальные"],
    imageSrc: "/images/truck-cargo.jpg",
  },
  {
    id: 4,
    icon: <></>,
    title: "Морские контейнерные",
    subtitle: "Самый экономичный",
    duration: "30-60 дн.",
    suitableFor: ["Международные", "Консолидация", "Крупногабаритные", "Сырье"],
    cost: "Низкая" as const,
    reliability: 3,
    features: ["Низкая стоимость", "Большие объёмы", "Международные", "Контейнеры"],
    imageSrc: "/images/cargo.jpg",
  },
];

export default function ShippingMethodsPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length || !containerRef.current) return;

    const totalCards = cards.length;
    const container = containerRef.current;

    // Set container height to create scroll distance (100vh per card)
    container.style.height = `${totalCards * 100}vh`;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${totalCards * 100}vh`,
          scrub: 0.8,                // smooth, speed‑dependent
          invalidateOnRefresh: true,
        },
        defaults: { ease: "power2.out" },
      });

      // Animate each card (except the first) to its final stacked position
      cards.slice(1).forEach((card, idx) => {
        // Final top: 10vh, 20vh, 30vh … (leaves 10% of previous card visible)
        const finalTop = 10 + idx * 10; // vh

        // Each card moves during its own scroll segment
        tl.to(
          card,
          {
            top: `${finalTop}vh`,
            duration: 1 / (totalCards - 1), // one segment per card
          },
          idx / (totalCards - 1) // start at proportional progress
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    cardsRef.current[index] = el;
  };

  const handleCalculate = (id: number) => {
    const method = shippingMethods.find((m) => m.id === id);
    alert(`Запрос стоимости для ${method?.title} отправлен.`);
  };

  return (
    <section ref={sectionRef} className="relative bg-blue-950 text-white pt-16 pb-40 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center md:text-left mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-4">
            Способы доставки из Китая в Россию
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-3xl">
            Надёжные, быстрые и экономичные варианты под ваш груз и сроки
          </p>
        </div>

        {/* Контейнер с динамической высотой (устанавливается через style) */}
        <div ref={containerRef} className="relative w-full">
          {/* Sticky wrapper – держит все карточки в области видимости */}
          <div className="sticky top-30 h-screen overflow-hidden">
            {shippingMethods.map((method, index) => (
              <div
                key={method.id}
                ref={(el) => setCardRef(el, index)}
                className="absolute left-1/2 -translate-x-1/2 w-full max-w-5xl will-change-[top]"
                style={{ top: `${index * 100}vh` }} // начальное положение — стопкой вертикально
              >
                <DeliveryMethodCard
                  id={method.id}
                  icon={method.icon}
                  title={method.title}
                  subtitle={method.subtitle}
                  duration={method.duration}
                  suitableFor={method.suitableFor}
                  cost={method.cost}
                  reliability={method.reliability}
                  features={method.features}
                  imageSrc={method.imageSrc}
                  onCalculate={handleCalculate}
                  bgGradient={gradients[index % gradients.length]} // apply per‑card gradient
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
// const shippingMethods = [
//   {
//     id: 1,
//     icon: <></>,                    // empty icon
//     title: 'Авиаперевозки',
//     subtitle: 'Самый быстрый способ',
//     duration: '3-7 дн.',
//     suitableFor: ['Образцы', 'Электроника', 'Мед. товары', 'Документы'],
//     cost: 'Высокая' as const,
//     reliability: 5,
//     features: ['Скорость доставки', 'Безопасность', 'Трекинг', 'Таможня'],
//     imageSrc: '/images/airpng.png',
//   },
//   {
//     id: 2,
//     icon: <></>,
//     title: 'Железнодорожные',
//     subtitle: 'Баланс цены и скорости',
//     duration: '18-40 дн.',
//     suitableFor: ['Контейнеры FCL', 'Сборные грузы LCL', 'Оборудование', 'Стройматериалы'],
//     cost: 'Средняя' as const,
//     reliability: 4,
//     features: ['Оптимальная стоимость', 'Надежность', 'Контейнерные', 'Сборные грузы'],
//     imageSrc: '/images/train-cargo.jpg',
//   },
//   {
//     id: 3,
//     icon: <></>,
//     title: 'Автомобильные',
//     subtitle: 'Гибкий и универсальный',
//     duration: '14-25 дн.',
//     suitableFor: ['Региональные', 'Междугородные', 'Температура', 'Частичные загрузки'],
//     cost: 'Средняя' as const,
//     reliability: 4,
//     features: ['Гибкость маршрутов', 'Дверь-дверь', 'Экспедирование', 'Мультимодальные'],
//     imageSrc: '/images/truck-cargo.jpg',
//   },
//   {
//     id: 4,
//     icon: <></>,
//     title: 'Морские контейнерные',
//     subtitle: 'Самый экономичный',
//     duration: '30-60 дн.',
//     suitableFor: ['Международные', 'Консолидация', 'Крупногабаритные', 'Сырье'],
//     cost: 'Низкая' as const,
//     reliability: 3,
//     features: ['Низкая стоимость', 'Большие объёмы', 'Международные', 'Контейнеры'],
//     imageSrc: '/images/sea-container.jpg',
//   },
// ];