// app/components/StackingCardsSection.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

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
  const gap = 10; // px

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
    <section className="w-full bg-white text-white px-6 py-24 md:px-10 lg:px-20">
      <div className="max-w-5xl  mx-auto">
        <h2 className="text-3xl md:text-4xl text-black lg:text-5xl font-semibold tracking-tight">
          Industries we build for
        </h2>
        <p className="mt-4 max-w-2xl pb-7 text-neutral-500">
          From complex fintech products to high‑growth SaaS, we design and ship systems that stay fast,
          stable, and easy to evolve.
        </p>

        {/* --- FIX #1: SCROLL SPACER --- */}
        {wrapperHeight && (
          <div style={{ height: wrapperHeight }} />
        )}

        {/* --- FIX #1: REAL CARDS FLOW WITH NEGATIVE MARGIN --- */}
        <div
          className="relative  flex flex-col gap-[10px]"
          style={{
            marginTop: wrapperHeight ? `-${wrapperHeight}px` : undefined,
          }}
        >
          {cards.map((card, index) => (
            <div
              key={card.title}
              ref={index === 0 ? firstCardRef : undefined}
              className="
 
                sticky
                w-full
                rounded-2xl
                p-10
                bg-neutral-900
              "
              style={{
                zIndex: index + 1,

                // --- FIX #2: progressive sticky top ---
                top: cardHeight
                  ? `calc(15vh + ${visiblePart * index}px)`
                  : "15vh",
              }}
            >
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
        <button className="mt-10 inline-flex items-center rounded-full border border-neutral-900 px-6 py-3 text-sm font-medium text-black hover:bg-neutral-900 transition">
          Book a discovery call
        </button>
      </div>
    </section>
  );
};
