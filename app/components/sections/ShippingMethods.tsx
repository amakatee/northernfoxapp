"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DeliveryMethodCard from "../helpers/ShippingCard";

gsap.registerPlugin(ScrollTrigger);

export default function ShippingMethodsPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const gradients = [
    "bg-gradient-to-br from-slate-950/94 via-indigo-950/44 via-blue-950/38 to-slate-900/82",
    "bg-gradient-to-br from-slate-950/94 via-cyan-950/42 via-teal-950/36 to-indigo-950/40",
    "bg-gradient-to-br from-slate-950/94 via-violet-950/45 via-purple-950/39 to-fuchsia-950/42",
    "bg-gradient-to-br from-slate-950/94 via-purple-950/42 via-rose-950/38 to-fuchsia-950/45",
  ];

  const shippingMethods = [
    {
      id: 1,
      icon: <></>,
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

  useEffect(() => {
    const cards = cardsRef.current;
    if (cards.length !== 4) return;

    const ctx = gsap.context(() => {
      const PEEK_VH = 10;           // 10vh видимой полоски предыдущей карточки (по ТЗ)
      const INITIAL_GAP_VH = 35;    // начальный равный зазор (подстрой под скриншот IMG_1964 — "small gaps")
      const DELTA_VH = INITIAL_GAP_VH - PEEK_VH; // сколько сдвигается вся группа за одну фазу

      // === 1. INITIAL STATE: равные зазоры + z-index (поздние карточки сверху) ===
      cards.forEach((card, index) => {
        gsap.set(card, {
          y: `${index * INITIAL_GAP_VH}vh`,
          zIndex: index + 1,
          scale: 1,
        });
      });

      // === 2. MASTER TIMELINE + SCROLLTRIGGER (pin + 1:1 scrub) ===
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${(cards.length - 1) * 100}vh`, // 3 фазы × 100vh = идеально под прямой скролл
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // markers: true, // раскомментировать для отладки позиций
        },
      });

      // === 3. CASCADE АНИМАЦИЯ: в каждой фазе двигается ГРУППА (ведущая + все ниже) ===
      // Это сохраняет равные зазоры внутри группы до остановки ведущей карточки
      for (let phase = 1; phase < cards.length; phase++) {
        const group = cards.slice(phase); // ведущая + все ниже

        tl.to(
          group,
          {
            y: `-=${DELTA_VH}vh`,   // все в группе сдвигаются НА ОДНО И ТО ЖЕ расстояние
            ease: "none",           // линейно = 100% контроль скролла
            duration: 1,            // 1 единица таймлайна = 100vh скролла
          },
          phase - 1                 // фазы идут строго последовательно (без пересечения)
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) cardsRef.current[index] = el;
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-blue-950 text-white overflow-hidden"
    >
      <div className="max-w-6xl px-4 mx-auto h-screen flex items-center justify-center">
        <div className="relative w-full h-[550px]">
          {shippingMethods.map((method, index) => (
            <div
              key={method.id}
              ref={(el) => setCardRef(el, index)}
              className="absolute w-full will-change-transform left-0 top-0"
            >
              <DeliveryMethodCard
                {...method}
                bgGradient={gradients[index % gradients.length]}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}