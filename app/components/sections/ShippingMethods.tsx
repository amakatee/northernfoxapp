"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DeliveryMethodCard from "../helpers/DeliveryMethodCard";
import LetsTalkButton from "../helpers/MainButton";

gsap.registerPlugin(ScrollTrigger);

export default function ShippingMethodsPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const timelineRef = useRef<GSAPTimeline | null>(null);

  const gradients = [
    "bg-[radial-gradient(circle_at_25%_75%,rgba(103,232,249,0.18)_0%,transparent_45%),radial-gradient(circle_at_75%_25%,rgba(165,243,252,0.22)_0%,transparent_55%),radial-gradient(ellipse_at_center,rgba(15,23,42,0.95)_0%,#0a0a0f_70%)]",
    "bg-[radial-gradient(circle_at_20%_80%,rgba(45,212,191,0.20)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(103,232,249,0.25)_0%,transparent_60%),radial-gradient(ellipse_at_center,rgba(15,23,42,0.96)_0%,#0a0a0f_72%)]",
    "bg-[radial-gradient(circle_at_28%_78%,rgba(192,132,252,0.18)_0%,transparent_48%),radial-gradient(circle_at_72%_22%,rgba(236,72,153,0.20)_0%,transparent_55%),radial-gradient(ellipse_at_center,rgba(15,23,42,0.95)_0%,#0a0a0f_70%)]",
    "bg-[radial-gradient(circle_at_22%_82%,rgba(192,38,211,0.22)_0%,transparent_50%),radial-gradient(circle_at_78%_18%,rgba(168,85,247,0.25)_0%,transparent_58%),radial-gradient(ellipse_at_center,rgba(15,23,42,0.96)_0%,#0a0a0f_71%)]",
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
    // Prevent scroll chaining and optimize touch events
    const section = sectionRef.current;
    if (section) {
      section.style.touchAction = "pan-y";
    }

    // Check if we're on mobile
    const isMobile = window.innerWidth < 768;
    
    // Adjust animation parameters for mobile
    const INITIAL_GAP = isMobile ? 28 : 36; // Smaller gap on mobile
    const DELTA = INITIAL_GAP - 10;
    
    const cards = cardsRef.current;
    if (cards.length !== 4) return;

    // Kill any existing ScrollTriggers and timelines
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    ScrollTrigger.getAll().forEach(st => {
      if (st.vars.trigger === sectionRef.current) st.kill();
    });

    // Pre-optimize cards for better performance
    cards.forEach((card, index) => {
      gsap.set(card, {
        y: `${index * INITIAL_GAP}vh`,
        zIndex: index + 1,
        willChange: isMobile ? "transform" : "transform, opacity",
        force3D: true, // Enable GPU acceleration
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      });
    });

    // Create timeline with optimized settings
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${(cards.length - 1) * (isMobile ? 120 : 150)}vh`,
        scrub: isMobile ? 0.5 : 1, // Reduced scrub on mobile for better performance
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: true, // Improve scroll performance
        preventOverlaps: true,
        // markers: false,
      },
      defaults: {
        ease: "none",
        duration: 1,
        overwrite: "auto",
      },
    });

    timelineRef.current = tl;

    // Cascade animation with optimizations
    for (let phase = 1; phase < cards.length; phase++) {
      const group = cards.slice(phase);
      
      tl.to(
        group,
        {
          y: `-=${DELTA}vh`,
          ease: "none",
          duration: 1,
          modifiers: {
            y: (y) => {
              // Clamp values to prevent visual glitches
              const numY = parseFloat(y);
              const maxY = (cards.length - 1) * INITIAL_GAP;
              return `${Math.min(Math.max(numY, 0), maxY)}vh`;
            }
          }
        },
        phase - 1
      );
    }

    // Refresh ScrollTrigger on resize with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) cardsRef.current[index] = el;
  };

  return (
    <section
      ref={sectionRef}
      className="relative text-white overflow-hidden"
      style={{
        touchAction: "pan-y", // Improve touch scrolling
        WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
      }}
    >
      <div className="max-w-6xl px-4 mx-auto h-screen flex items-center justify-center">
        <div className="relative w-full h-[550px]">
          {shippingMethods.map((method, index) => (
            <div
              key={method.id}
              ref={(el) => setCardRef(el, index)}
              className="absolute w-full left-0 top-0"
              style={{
                willChange: "transform",
                transform: "translateZ(0)", // Force hardware acceleration
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
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