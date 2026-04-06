"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DeliveryMethodCard from "../helpers/DeliveryMethodCard";

gsap.registerPlugin(ScrollTrigger);

export default function ShippingMethodsPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const gradients = [
    "bg-black","bg-black","bg-black","bg-black"
    // "bg-[radial-gradient(circle_at_25%_75%,rgba(103,232,249,0.18)_0%,transparent_45%),radial-gradient(circle_at_75%_25%,rgba(165,243,252,0.22)_0%,transparent_55%),radial-gradient(ellipse_at_center,rgba(15,23,42,0.95)_0%,#0a0a0f_70%)]",
    // "bg-[radial-gradient(circle_at_20%_80%,rgba(45,212,191,0.20)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(103,232,249,0.25)_0%,transparent_60%),radial-gradient(ellipse_at_center,rgba(15,23,42,0.96)_0%,#0a0a0f_72%)]",
    // "bg-[radial-gradient(circle_at_28%_78%,rgba(192,132,252,0.18)_0%,transparent_48%),radial-gradient(circle_at_72%_22%,rgba(236,72,153,0.20)_0%,transparent_55%),radial-gradient(ellipse_at_center,rgba(15,23,42,0.95)_0%,#0a0a0f_70%)]",
    // "bg-[radial-gradient(circle_at_22%_82%,rgba(192,38,211,0.22)_0%,transparent_50%),radial-gradient(circle_at_78%_18%,rgba(168,85,247,0.25)_0%,transparent_58%),radial-gradient(ellipse_at_center,rgba(15,23,42,0.96)_0%,#0a0a0f_71%)]",
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
    if (!sectionRef.current || cards.length !== 4) return;

    const isMobile = window.innerWidth < 768;

    // 👉 measure ONCE in pixels
    // const GAP = isMobile ? 120 : 160;
     const GAP = isMobile ? 300 : 310;

    // 👉 set initial stack in px (no vh)
    cards.forEach((card, i) => {
      gsap.set(card, {
        y: i * GAP,
        zIndex: i + 1,
      });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${(cards.length - 1) * GAP * 2}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
      defaults: { ease: "none" },
    });

    // 👉 simple cascade — pure transform only
    for (let phase = 1; phase < cards.length; phase++) {
      tl.to(
        cards.slice(phase),
        {
          y: `-=${GAP - 50}`,
        },
        phase - 1
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
    };
  }, []);

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) cardsRef.current[index] = el;
  };

  return (
    <section
      ref={sectionRef}
      className="relative text-white overflow-hidden"
    >
      <div className="max-w-6xl px-4 mx-auto h-screen flex items-center justify-center">
        {/* 👉 ONLY this layer is promoted */}
        <div className="relative w-full h-[550px] will-change-transform">
          {shippingMethods.map((method, index) => (
            <div
              key={method.id}
              ref={(el) => setCardRef(el, index)}
              className="absolute w-full left-0 top-0"
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
const gradients = [
  // 1. Авиаперевозки — лёгкий, воздушный (blue-indigo-cyan)
  "bg-[radial-gradient(circle_at_25%_75%,rgba(103,232,249,0.18)_0%,transparent_45%),radial-gradient(circle_at_75%_25%,rgba(165,243,252,0.22)_0%,transparent_55%),radial-gradient(ellipse_at_center,rgba(15,23,42,0.95)_0%,#0a0a0f_70%)]",

  // 2. Железнодорожные — спокойный teal-cyan-industrial
  "bg-[radial-gradient(circle_at_20%_80%,rgba(45,212,191,0.20)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(103,232,249,0.25)_0%,transparent_60%),radial-gradient(ellipse_at_center,rgba(15,23,42,0.96)_0%,#0a0a0f_72%)]",

  // 3. Автомобильные — тёплый purple-rose + холодный оттенок
  "bg-[radial-gradient(circle_at_28%_78%,rgba(192,132,252,0.18)_0%,transparent_48%),radial-gradient(circle_at_72%_22%,rgba(236,72,153,0.20)_0%,transparent_55%),radial-gradient(ellipse_at_center,rgba(15,23,42,0.95)_0%,#0a0a0f_70%)]",

  // 4. Морские — глубокий violet-purple с magenta/fuchsia акцентом
  "bg-[radial-gradient(circle_at_22%_82%,rgba(192,38,211,0.22)_0%,transparent_50%),radial-gradient(circle_at_78%_18%,rgba(168,85,247,0.25)_0%,transparent_58%),radial-gradient(ellipse_at_center,rgba(15,23,42,0.96)_0%,#0a0a0f_71%)]",
];