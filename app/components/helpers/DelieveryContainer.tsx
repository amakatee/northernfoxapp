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

  // Register GSAP plugin
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  const createAnimation = () => {
    const container = containerRef.current;
    if (!container || cardRefs.current.length === 0) return;

    if (ctxRef.current) ctxRef.current.revert();

    const cardElements = cardRefs.current.filter(Boolean) as HTMLDivElement[];

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
    const topOffset = 0.15 * vh;

    // Define the gap between all cards
    const gap = 35; // adjust as needed

    // Compute final Ys with equal gaps
    const finalYs: number[] = [];
    let accum = topOffset;
    for (let i = 0; i < cards.length; i++) {
      finalYs[i] = accum;
      if (i < cards.length - 1) {
        // Add height * revealRatio + gap for next card
        accum += heights[i] * revealRatio + gap;
      }
    }

    // Target translateY
    const targetYs = finalYs.map((y, i) => y - naturalTops[i]);
    const moveAmounts = targetYs.map((y) => -y);
    const maxMove = Math.max(...moveAmounts);
    const pinDistance = Math.max(100, maxMove);

    // Set absolute positioning
    const naturalContainerHeight = container.offsetHeight;
    cardElements.forEach((card, i) => {
      Object.assign(card.style, {
        position: 'absolute',
        top: `${naturalTops[i]}px`,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '640px',
        zIndex: String(i + 1),
        willChange: 'transform',
      });
    });
    container.style.height = `${naturalContainerHeight}px`;

    // Create ScrollTrigger + timeline
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
            container.style.height = '100vh';
            container.style.overflow = 'hidden';
          },
          onLeaveBack: () => {
            container.style.height = `${naturalContainerHeight}px`;
            container.style.overflow = 'visible';
          },
        },
      });

      cardElements.forEach((card, i) => {
        const targetY = targetYs[i];
        const moveAmount = moveAmounts[i];
        const durationFraction = moveAmount / maxMove;

        tl.to(
          card,
          {
            y: targetY,
            ease: 'power1.inOut',
            duration: durationFraction,
            onUpdate: () => {
              if (tl.progress() >= 0.98) {
                card.style.zIndex = String(20 + i);
              }
            },
          },
          0
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
    <section className={`relative  ${className}`}>
      <div
        ref={containerRef}
        className="relative mx-auto max-w-7xl flex flex-col gap-8 px-6"
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