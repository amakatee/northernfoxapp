// app/components/StackingCardsSection.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
const cardBackgrounds = [
  "bg-[radial-gradient(circle_at_-90%_-15%,rgba(0,200,180,0.36)_3%,rgba(0,200,180,0.20)_2%,rgba(10,28,30,0.95)_70%,rgba(12,32,34,1)_85%)]",
  "bg-[radial-gradient(circle_at_170%_95%,rgba(255,40,40,0.38)_2%,rgba(255,40,40,0.22)_2%,rgba(28,8,10,0.92)_70%,rgba(32,10,12,1)_85%)]",
  "bg-[radial-gradient(circle_at_170%_-15%,rgba(0,255,235,0.38)_2%,rgba(0,255,235,0.22)_2%,rgba(8,28,32,0.92)_70%,rgba(10,32,36,1)_85%)]  ",
  "bg-[radial-gradient(circle_at_-40%_15%,rgba(0,140,255,0.42)_2%,rgba(0,140,255,0.18)_2%,rgba(0,15,35,0.9)_60%,#050608_85%)]",
];
const bg = "bg-[#05080b]"
const cards = [
  {
    id:0,
    title: "Авиа доставка",
    description: "Быстрая авиадоставка. Срок 5–9 дней. Для срочных, дорогих и чувствительных к времени грузов: электроника, одежда премиум-класса, образцы и запчасти.",
    icon: "🛫"
  },
  {
    id:1,
    title: "Ж/Д доставка",
    description: "Надёжная и выгодная перевозка за 12–18 дней. Лучший выбор для регулярных поставок одежды, обуви, товаров для дома и среднего бизнеса.",
    icon: "🚇"
  },
  {
    id:2,
    title: "Автодоставка",
    description: "Прямая доставка от двери поставщика до вашего склада за 18–25 дней. Максимальная гибкость и удобство для сборных грузов.",
    icon:"🚛"
  },
  {
    id:3,
    title: "Комбинированная доставка",
    description: "Оптимальное решение для крупных объёмов. Лучшая цена при сроке 25–35 дней. Идеально для больших партий и сезонных товаров.",
    icon:"🚢"
  },
];
const fontColor =["#d4f2ff","#ffe3da","#d4f2ff","#a7e8f6"
]
const textColor= [
  'text-[#d4f2ff]',
  'text-[#ffe3da]',
  'text-[#d4f2ff]',
  'text-[#a7e8f6]'
]

export const StackingCardsSection: React.FC = () => {
  const firstCardRef = useRef<HTMLDivElement | null>(null);
  const [cardHeight, setCardHeight] = useState<number | null>(null);

  const cardsCount = cards.length;
  const gap = 50; // px

  useEffect(() => {
    const measure = () => {
      if (!firstCardRef.current) return;
      const rect = firstCardRef.current.getBoundingClientRect();
      setCardHeight(rect.height);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const wrapperHeight =
    cardHeight !== null
      ? cardsCount * cardHeight +
        (cardsCount - 1) * gap +
        cardsCount * (cardHeight * 0.9)
      : undefined;

  const visiblePart = cardHeight ? cardHeight * 0.1 : 0;

  return (
    <section className={`"w-full text-white px-4 py-24 md:px-10 
    lg:px-20 bg-white
     ${bg}`}
  >
      <div className="max-w-5xl  mx-auto">
        <h2 className="text-3xl md:text-4xl px-4 text-neutral-900 lg:text-5xl font-semibold tracking-tight">
        Комплексные решения для вашего бизнеса
        </h2>
        <p className="mt-4 max-w-2xl pb-9 px-4 text-neutral-700">
        Полный спектр услуг по логистике, таможенному оформлению и налоговой оптимизации.
        </p>

        {/* --- FIX #1: SCROLL SPACER --- */}
        {wrapperHeight && (
          <div style={{ height: wrapperHeight }} />
        )}

        {/* --- FIX #1: REAL CARDS FLOW WITH NEGATIVE MARGIN --- */}
        <div
          className="relative  flex flex-col gap-[50px]"
          style={{
            marginTop: wrapperHeight ? `-${wrapperHeight}px` : undefined,
          }}
        >
          {cards.map((card, index) => (
            <div
              key={card.title}
              ref={index === 0 ? firstCardRef : undefined}
              className={`
    sticky
    w-full
    rounded-2xl
    px-5
    py-6
    backdrop-blur-2xl bg-opacity-99
    ${textColor[index]}
    ${cardBackgrounds[index]}
  `}
              style={{
                zIndex: index + 1,

                // --- FIX #2: progressive sticky top ---
                top: cardHeight
                  ? `calc(15vh + ${visiblePart * index}px)`
                  : "15vh",
              }}
            >  
            <p className="mb-14" style={{ fontSize: '1.6rem' }}> {card.icon}</p>
              <h3 className="text-[1.3rem] md:text-2xl font-semibold">
                {card.title}
              </h3>
              <p className={`mt-3 text-[1rem] font-normal `}>
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA now appears immediately after the last card */}
        <button className="mt-10 inline-flex items-center rounded-full border border-neutral-900 px-6 py-3 text-sm font-medium text-black hover:bg-neutral-900 transition">
        Рассчитать цену
        </button>
      </div>
    </section>
  );
};
