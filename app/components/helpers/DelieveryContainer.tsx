'use client';

import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface CardData {
  id: string;
  title: string;
  description: string;
  className?: string; // optional extra Tailwind classes per card
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

  // Register GSAP once
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  const createAnimation = () => {
    const container = containerRef.current;
    if (!container || cardRefs.current.length === 0) return;

    // Clean previous context
    if (ctxRef.current) ctxRef.current.revert();

    const cardElements = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    // ── 1. Measure natural layout (Phase 0) ──
    const containerRect = container.getBoundingClientRect();
    const heights: number[] = [];
    const naturalTops: number[] = [];

    cardElements.forEach((card) => {
      const rect = card.getBoundingClientRect();
      heights.push(rect.height);
      naturalTops.push(rect.top - containerRect.top);
    });

    const vh = window.innerHeight;
    const isMobile = window.innerWidth < 768;
    const revealRatio = isMobile ? 0.18 : 0.1;
    const topOffset = 0.2 * vh; // 20vh

    // ── 2. Compute final stacked positions Y_i ──
    const finalYs: number[] = [];
    let accum = topOffset;
    for (let i = 0; i < cards.length; i++) {
      finalYs[i] = accum;
      if (i < cards.length - 1) {
        accum += heights[i] * revealRatio;
      }
    }

    // Target translateY values (negative)
    const targetYs = naturalTops.map((n, i) => finalYs[i] - n);
    const moveAmounts = targetYs.map((y) => -y); // positive distances
    const maxMove = moveAmounts[cards.length - 1];
    const pinDistance = Math.max(100, maxMove); // safety minimum

    // ── 3. Convert to absolute positioning (no layout shift) ──
    const naturalContainerHeight = container.offsetHeight;

    cardElements.forEach((card, i) => {
      card.style.position = 'absolute';
      card.style.top = `${naturalTops[i]}px`;
      card.style.left = '50%';
      card.style.transform = 'translateX(-50%)';
      card.style.width = '90%';
      card.style.maxWidth = '640px';
      card.style.zIndex = String(i + 1);
      // Performance hint
      card.style.willChange = 'transform';
    });

    container.style.height = `${naturalContainerHeight}px`;

    // ── 4. Create ScrollTrigger + timeline ──
    ctxRef.current = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: `+=${pinDistance}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => {
            // Shrink to viewport height once pinned
            container.style.height = '100vh';
            container.style.overflow = 'hidden';
          },
          onLeaveBack: () => {
            // Restore for reverse scroll
            container.style.height = `${naturalContainerHeight}px`;
            container.style.overflow = 'visible';
          },
        },
      });

      // Animate each card with proportional duration → same velocity
      cardElements.forEach((card, i) => {
        const targetY = targetYs[i];
        const moveAmount = moveAmounts[i];
        const durationFraction = moveAmount / maxMove;

        tl.to(
          card,
          {
            y: targetY,
            ease: 'none',
            duration: durationFraction,
            onUpdate: function () {
              // Boost z-index when card "sticks"
              if (this.progress() >= 0.98) {
                card.style.zIndex = String(20 + i);
              }
            },
          },
          0 // all start together
        );
      });
    }, container);
  };

  // Initial setup + refresh
  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      createAnimation();
      ScrollTrigger.refresh();
    }, 50);

    return () => {
      clearTimeout(timer);
      if (ctxRef.current) ctxRef.current.revert();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === containerRef.current) st.kill();
      });
    };
  }, [cards]);

  // Responsive rebuild
  useEffect(() => {
    const onResize = () => {
      createAnimation();
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
              cardRefs.current[i] = el!;
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