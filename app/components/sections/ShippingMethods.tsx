// app/components/StackingCardsSection.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
const cardBackgrounds = [
  "bg-[linear-gradient(90deg,#180628,#0f0a29_55%,#0c132f_85%,#050d22)]",
 "bg-[#180d04] bg-[radial-gradient(circle_at_22%_18%,rgba(255,40,40,0.18)_0%,transparent_52%),radial-gradient(circle_at_82%_78%,rgba(255,40,40,0.09)_10%,transparent_99%)]",
 "bg-[#030e10] bg-[radial-gradient(circle_at_8%_18%,rgba(0,255,235,0.19)_0%,transparent_52%),radial-gradient(circle_at_92%_80%,rgba(0,255,235,0.20)_0%,transparent_64%)]",
  "bg-[#071123] bg-[radial-gradient(circle_at_8%_18%,rgba(0,140,255,0.20)_0%,transparent_50%),radial-gradient(circle_at_82%_80%,rgba(0,140,255,0.21)_0%,transparent_63%)]",
];
const bg = "bg-[#05080b]"
const cards = [
  {
    id:0,
    title: "Авиа доставка",
    description: "Экспресс-перевозка для срочных и высоколиквидных грузов. Срок: 5–9 дней. Идеально для электроники, образцов, запчастей и товаров премиум-сегмента. Полный контроль температуры и таможенное сопровождение.",
    icon: "🛫"
  },
  {
    id:1,
    title: "Ж/Д доставка",
    description: "Оптимальный баланс цены и надёжности. Срок: 12–18 дней. Лучшее решение для регулярных поставок одежды, обуви, товаров для дома и FMCG. Регулярные контейнерные поезда с фиксированным расписанием.",
    icon: "🚇"
  },
  {
    id:2,
    title: "Автодоставка",
    description: "Гибкая перевозка «от двери до двери». Срок: 18–25 дней. Идеально для сборных грузов и средних партий. Полный контроль маршрута, отслеживание в реальном времени, прямая подача под загрузку.",
    icon:"🚛"
  },
  {
    id:3,
    title: "Комбинированная доставка",
    description: "Максимальная экономия при больших объёмах. Срок: 25–35 дней. Оптимально для сезонных товаров, крупных партий и продукции с низкой срочностью. Морской + Ж/Д или авто — подберём лучший маршрут.",
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
        <h2 className="text-3xl md:text-4xl px-4 text-[#0b2249] lg:text-5xl font-semibold tracking-tight">
        Комплексные решения для вашего бизнеса
        </h2>
        <p className="mt-4 max-w-2xl pb-9 px-4 text-[#0b2249]/90">
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
    pb-6
    pt-4
    backdrop-blur-xl bg-opacity-90
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
            <p className="mb-13" style={{ fontSize: '1.6rem' }}> {card.icon}</p>
              <h3 className="text-[1.3rem] md:text-2xl font-semibold">
                {card.title}
              </h3>
              <p className={`mt-3 text-[.9rem] font-normal `}>
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA now appears immediately after the last card */}
        <button className="mt-10 inline-flex items-center rounded-full px-6 py-3 text-sm font-medium  transition bg-[#0b2249] text-white px-4 py-2 rounded-3xl text-sm font-medium border border-[#0b2249]
              shadow-md hover:shadow-lg
              transition-all duration-300
              whitespace-nowrap
              inline-flex items-center tracking-wide font-normal  justify-cente ml-2">
        Рассчитать цену
        </button>
      </div>
    </section>
  );
};
