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

export default function StackingCards({ cards, className = '' }: StackingCardsProps) {
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

    // ── Phase 0: Measure while cards are regular blocks in normal document flow ──
    const heights: number[] = [];
    const naturalTops: number[] = [];
    const containerRect = container.getBoundingClientRect();

    cardElements.forEach((card) => {
      const rect = card.getBoundingClientRect();
      heights.push(rect.height);
      naturalTops.push(rect.top - containerRect.top);
    });

    const vh = window.innerHeight;
    const isMobile = window.innerWidth < 768;
    const revealRatio = isMobile ? 0.18 : 0.1; // exactly as specified
    const topOffset = 0.2 * vh; // T = 20vh

    // ── Compute final stacked positions Yi (pure math, no layout changes) ──
    const finalYs: number[] = [];
    let accum = topOffset;
    for (let i = 0; i < cards.length; i++) {
      finalYs[i] = accum;
      if (i < cards.length - 1) {
        accum += heights[i] * revealRatio;
      }
    }

    // Target translateY for each card (Ni - Yi)
    const targetYs = naturalTops.map((n, i) => finalYs[i] - n);
    const moveAmounts = targetYs.map(Math.abs); // positive distances each card travels upward
    const maxMove = Math.max(...moveAmounts, 200); // safety floor

    ctxRef.current = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: `+=${maxMove}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // No onEnter / onLeaveBack hacks — pure pin + transforms only
        },
      });

      // Animate every card from time 0 with proportional duration → identical velocity
      cardElements.forEach((card, i) => {
        tl.to(
          card,
          {
            y: targetYs[i],
            ease: 'none',
            duration: moveAmounts[i] / maxMove,
            onUpdate: function () {
              // Boost z-index exactly when card reaches its final Yi (Phase 3-5)
              if (this.progress() >= 0.95) {
                card.style.zIndex = String(20 + i);
              }
            },
          },
          0 // all cards start moving together the instant pinning begins
        );
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
    const handleResize = () => createAnimation();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cards]);

  return (
    <section className={`relative py-12 ${className}`}>
      {/* This is the pinned parent — cards stay in normal document flow forever */}
      <div
        ref={containerRef}
        className="relative mx-auto max-w-7xl px-6 flex flex-col gap-10 md:gap-12"
      >
        {cards.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => {
              cardRefs.current[index] = el!;
            }}
            className={`rounded-3xl p-10 shadow-2xl text-white flex flex-col transition-shadow duration-300 ${
              card.className ||
              (index === 0
                ? 'bg-[#ff5e5e]'
                : index === 1
                  ? 'bg-[#5eff9e]'
                  : index === 2
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