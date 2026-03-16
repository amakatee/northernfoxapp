"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DeliveryMethodCard from "../helpers/ShippingCard";

gsap.registerPlugin(ScrollTrigger);

export default function ShippingMethodsPage() {
  const sectionRef = useRef(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const gradients = [
    // 1. Авиаперевозки — лёгкий blue-indigo bias (самый "воздушный", техно-синий, как верхние карточки)
    "bg-gradient-to-br from-slate-950/94 via-indigo-950/44 via-blue-950/38 to-slate-900/82",
  
    // 2. Железнодорожные — muted teal-cyan с лёгким purple shift (баланс, промышленный, спокойный)
    "bg-gradient-to-br from-slate-950/94 via-cyan-950/42 via-teal-950/36 to-indigo-950/40",
        // 4. Морские — deepest purple-violet + blue-reddish undertone (экономика, объём, глубина)
        "bg-gradient-to-br from-slate-950/94 via-violet-950/45 via-purple-950/39 to-fuchsia-950/42",
// 3. Автомобильные — более заметный reddish-purple / rose bias
     "bg-gradient-to-br from-slate-950/94 via-purple-950/42 via-rose-950/38 to-fuchsia-950/45",
  

  ];
  const shippingMethods = [
    // ... (your shipping methods data remains the same) ...
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
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      // --- 1. SET INITIAL STAGGERED POSITIONS (More Space Between Cards) ---
      // Position cards with a vertical gap. The exact value (e.g., 40) depends on your card's height.
      // You can adjust this to get the perfect "stacked with space" look.
      cards.forEach((card, index) => {
        if (index === 0) return; // First card stays at top: 0
        gsap.set(card, {
          y: index * 80, // <-- Increase this value for more initial space
          scale: 1,   // <-- Optional: Slightly scale down deeper cards for perspective
        });
      });

      // --- 2. CREATE THE SCROLL-TRIGGERED ANIMATION TIMELINE ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${cards.length * 100}%`, // Increased end for smoother animation over more scroll distance
          scrub: 1.2, // Slightly increased scrub for a silkier feel
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true, // Ensures markers/pins recalc on resize
        }
      });

      // Animate each card to create the "90% cover" effect
      cards.forEach((card, i) => {
        if (i === 0) return; // Skip first card as the starting point

        // Animate the current card moving up to cover the previous one
        tl.fromTo(
          card,
          { y: i * 320, scale: 1 }, // Start from its initial staggered position
          {
            y: 0,                     // End at the top, covering the previous card
            scale: 1,                  // Scale back to full size
            ease: "power1.out",        // Smooth easing
            duration: 1.5
          },
          i * 0.8 // Stagger the start times
        );

        // Simultaneously, slightly move the previous card(s) out of the way
        // and apply a subtle scale down to create the "stack" effect.
        // This targets the card directly above (i-1) to settle at a 90% cover position.
        tl.to(
          cards[i - 1],
          {
            y: 0,          // <-- KEY: Moves the previous card up slightly.
                             // A negative value like -20 means its top edge moves up,
                             // leaving about 20px of its bottom part visible beneath the new card.
            scale: 1,     // Keep a subtle scale difference
            ease: "power1.inOut",
            duration: 1.5
          },
          i * 0.8 // Same stagger time as the incoming card's animation
        );
      });

      // Optional: Add a final touch for the last card to ensure it settles perfectly
      tl.to({}, { duration: 0.2 }); // A small pause at the end

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) cardsRef.current[index] = el;
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-blue-950 text-white overflow-hidden" // Added overflow-hidden to contain animations
    >
      <div className="max-w-6xl px-4 mx-auto h-screen flex items-center justify-center">
        <div className="relative w-full h-[550px]"> {/* Slightly increased height for better spacing */}

          {shippingMethods.map((method, index) => (
            <div
              key={method.id}
              ref={(el) => setCardRef(el, index)}
              className="absolute w-full will-change-transform left-0 top-0" // Ensure all cards start from top:0
              style={{
                zIndex: index + 1,
                // Initial transform is now handled by gsap.set in useEffect
              }}
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