'use client';

import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface CardData {
  id: string;
  title: string;
  description: string;
  className?: string;
}

interface StackingCardsProps {
  cards: CardData[];
  className?: string;
}

export default function StackingCards({
  cards,
  className = '',
}: StackingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  const createAnimation = () => {
    const container = containerRef.current;
    if (!container || cardRefs.current.length === 0) return;

    if (ctxRef.current) ctxRef.current.revert();

    const cardElements = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    // ── 1. Measure natural positions & heights ──
    const heights: number[] = [];
    const naturalTops: number[] = [];

    cardElements.forEach((card) => {
      const rect = card.getBoundingClientRect();
      heights.push(rect.height);
      naturalTops.push(rect.top + window.scrollY); // document space
    });

    const vh = window.innerHeight;
    const revealRatio = window.innerWidth < 768 ? 0.18 : 0.10;
    const topOffset = 0.2 * vh;

    // ── 2. Final stacked positions (viewport space) ──
    const finalYs: number[] = [];
    let accum = topOffset;
    for (let i = 0; i < cards.length; i++) {
      finalYs[i] = accum;
      if (i < cards.length - 1) accum += heights[i] * revealRatio;
    }

    const distances = naturalTops.map((n, i) => n - finalYs[i]);

    // ── 3. Prepare container & cards for animation ──
    const originalContainerHeight = container.offsetHeight;

    cardElements.forEach((card, i) => {
      card.style.position = 'absolute';
      card.style.top = `${naturalTops[i] - naturalTops[0]}px`; // relative to first card
      card.style.left = '50%';
      card.style.transform = 'translateX(-50%)';
      card.style.width = '90%';
      card.style.maxWidth = '640px';
      card.style.willChange = 'transform';
    });

    container.style.height = `${originalContainerHeight}px`;
    container.style.position = 'relative';

    // ── 4. GSAP Context + Timeline ──
    ctxRef.current = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${distances.reduce((sum, d) => sum + d, 0)}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      let startTime = 0;

      cardElements.forEach((card, i) => {
        const distance = distances[i];

        // Sequential start: each card starts only after previous one finished
        tl.to(
          card,
          {
            y: -distance,
            ease: 'none',
            onStart: () => {
              // Optional: visual feedback when card starts moving
            },
          },
          startTime
        );

        startTime += distance;
      });

      // Correct Z-index: First card (top of final stack) has highest z-index
      cardElements.forEach((card, i) => {
        gsap.set(card, { zIndex: cards.length - i }); // Card 0 = highest z-index
      });
    }, container);
  };

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      createAnimation();
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (ctxRef.current) ctxRef.current.revert();
    };
  }, [cards]);

  useEffect(() => {
    const onResize = () => {
      createAnimation();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [cards]);

  return (
    <section className={`relative py-12 ${className}`}>
      <div
        ref={containerRef}
        className="relative mx-auto max-w-7xl flex flex-col gap-10 px-6"
      >
        {cards.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => {
              if (el) cardRefs.current[i] = el;
            }}
            className={`rounded-3xl p-10 shadow-2xl text-white flex flex-col transition-shadow duration-300 ${
              card.className ||
              (i === 0
                ? 'bg-[#ff5e5e]'
                : i === 1
                ? 'bg-[#5eff9e]'
                : i === 2
                ? 'bg-[#5eb8ff]'
                : 'bg-[#ffe45e]')
            }`}
            role="article"
            aria-labelledby={`title-${card.id}`}
          >
            <h2
              id={`title-${card.id}`}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              {card.title}
            </h2>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}