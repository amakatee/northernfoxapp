'use client';

import { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Card {
  title: string;
  description: string;
}

export default function StackingCards({ cards }: { cards: Card[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctxRef = useRef<gsap.Context | null>(null);

  const setup = () => {
    if (ctxRef.current) ctxRef.current.revert();

    const wrapper = wrapperRef.current;
    const cardElements = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!wrapper || cardElements.length === 0) return;

    ctxRef.current = gsap.context(() => {
      const V = window.innerHeight;
      const T = 0.2 * V;
      const R = window.innerWidth < 768 ? 0.18 : 0.10;

      const heights: number[] = [];
      const naturalTops: number[] = [];

      // Measure in document space
      cardElements.forEach((card) => {
        const rect = card.getBoundingClientRect();
        heights.push(rect.height);
        naturalTops.push(rect.top + window.scrollY);
      });

      // Compute final stacking Y positions (viewport space)
      const finalYs: number[] = [];
      let cumulative = T;
      for (let i = 0; i < heights.length; i++) {
        finalYs.push(cumulative);
        if (i < heights.length - 1) {
          cumulative += heights[i] * R;
        }
      }

      // Calculate travel distances for each card
      const distances = naturalTops.map((Ni, i) => Ni - finalYs[i]);

      // Set z-index (later cards behind)
      cardElements.forEach((card, i) => {
        gsap.set(card, { zIndex: cardElements.length - i });
      });

      // Create timeline with sequential starts
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          pin: wrapper,
          start: 'top top',
          end: () => `+=${distances.reduce((a, b) => a + b, 0)}`,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // === SEQUENTIAL ANIMATION ===
      let startTime = 0;

      cardElements.forEach((card, i) => {
        const duration = distances[i];

        tl.to(
          card,
          {
            y: -distances[i],
            ease: 'none',
          },
          startTime                     // ← This creates the sequential delay
        );

        startTime += duration;          // Next card starts after this one finishes
      });
    }, wrapper);
  };

  useLayoutEffect(() => {
    setup();
    return () => ctxRef.current?.revert();
  }, [cards]);

  useEffect(() => {
    const handleResize = () => {
      const timeout = setTimeout(() => {
        ScrollTrigger.refresh();
        setup();
      }, 350);
      return () => clearTimeout(timeout);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cards]);

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-center mb-20">
          Industries We Serve
        </h2>

        <div
          ref={wrapperRef}
          className="flex flex-col gap-8 md:gap-10 relative will-change-transform"
        >
          {cards.map((card, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              role="article"
              className="bg-white border border-gray-100 rounded-3xl p-8 md:p-10 shadow-2xl"
            >
              <h3 className="text-3xl font-semibold text-gray-900 mb-4">
                {card.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-[17px]">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}