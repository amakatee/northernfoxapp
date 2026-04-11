// app/components/StackingCardsSection.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
const cardBackgrounds = [
  "bg-[radial-gradient(circle_at_10%_15%,rgba(0,200,180,0.36)_0%,rgba(0,200,180,0.20)_2%,rgba(10,28,30,0.92)_60%,rgba(12,32,34,1)_85%)]",
  "bg-[radial-gradient(circle_at_90%_95%,rgba(255,40,40,0.38)_0%,rgba(255,40,40,0.22)_0%,rgba(28,8,10,0.92)_60%,rgba(32,10,12,1)_100%)]",
  "bg-[radial-gradient(circle_at_90%_15%,rgba(0,255,235,0.38)_0%,rgba(0,255,235,0.22)_0%,rgba(8,28,32,0.92)_60%,rgba(10,32,36,1)_100%)]  ",
  "bg-[radial-gradient(circle_at_10%_15%,rgba(0,140,255,0.42)_0%,rgba(0,140,255,0.18)_2%,rgba(0,15,35,0.9)_60%,#050608_85%)]",
];
const bg = "bg-[#05080b]"
const cards = [
  {
    title: "Fintech & Payments",
    description: "High‑load systems, real‑time processing, and bulletproof security for financial products.",
  },
  {
    title: "SaaS Platforms",
    description: "Multi‑tenant architectures, subscription billing, and scalable dashboards for B2B and B2C.",
  },
  {
    title: "E‑commerce",
    description: "Conversion‑driven storefronts, custom checkouts, and integrations with modern payment providers.",
  },
  {
    title: "Internal Tools",
    description: "Admin panels, analytics, and automation that actually match your internal workflows.",
  },
];

export const StackingCardsSection: React.FC = () => {
  const firstCardRef = useRef<HTMLDivElement | null>(null);
  const [cardHeight, setCardHeight] = useState<number | null>(null);

  const cardsCount = cards.length;
  const gap = 20; // px

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
    <section className={`"w-full text-white px-5 py-24 md:px-10 
    lg:px-20
     ${bg}`}
  >
      <div className="max-w-5xl  mx-auto">
        <h2 className="text-3xl md:text-4xl text-white lg:text-5xl font-semibold tracking-tight">
          Industries we build for
        </h2>
        <p className="mt-4 max-w-2xl pb-9 text-neutral-300">
          From complex fintech products to high‑growth SaaS, we design and ship systems that stay fast,
          stable, and easy to evolve.
        </p>

        {/* --- FIX #1: SCROLL SPACER --- */}
        {wrapperHeight && (
          <div style={{ height: wrapperHeight }} />
        )}

        {/* --- FIX #1: REAL CARDS FLOW WITH NEGATIVE MARGIN --- */}
        <div
          className="relative  flex flex-col gap-[20px]"
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
    px-8
    py-7
    backdrop-blur-xl bg-opacity-95
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
            <p className="mb-10"> 🛫</p>
              <h3 className="text-xl md:text-2xl font-semibold">
                {card.title}
              </h3>
              <p className="mt-3 text-neutral-300">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA now appears immediately after the last card */}
        <button className="mt-10 inline-flex items-center rounded-full border border-neutral-100 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-900 transition">
          Book a discovery call
        </button>
      </div>
    </section>
  );
};
