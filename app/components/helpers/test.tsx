'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

export default function FinchDarkSection({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef1 = useRef<HTMLDivElement>(null);
  const glowRef2 = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Основной мягкий cyan-teal glow — очень медленный дрейф
      gsap.to(glowRef1.current, {
        x: 80,
        y: -50,
        scale: 1.08,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Вторичный глубокий indigo — ещё медленнее, противоположное движение
      gsap.to(glowRef2.current, {
        x: -60,
        y: 40,
        scale: 1.05,
        duration: 24,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-screen bg-[#05050a]"
    >
      {/* Очень тёмная база — глубокий midnight blue-black */}
      <div
        className="
          absolute inset-0 
          bg-gradient-to-br 
          from-[#05050a] 
          via-[#0a0a14] 
          to-[#0c0c18]
        "
      />

      {/* Едва заметный радиальный оверлей сверху (как у Finch) */}
      <div
        className="
          absolute inset-0 
          bg-[radial-gradient(circle_at_40%_15%,rgba(100,200,255,0.035),transparent_50%)]
        "
      />

      {/* Основной glow — большой, очень мягкий cyan-teal */}
      <div
        ref={glowRef1}
        className="
          pointer-events-none
          absolute 
          -top-[20%] -right-[15%] 
          w-[600px] h-[600px] 
          bg-cyan-500/6 
          rounded-full 
          blur-[140px]
          will-change-transform
        "
      />

      {/* Вторичный glow — indigo, ещё тише */}
      <div
        ref={glowRef2}
        className="
          pointer-events-none
          absolute 
          -bottom-[25%] -left-[10%] 
          w-[520px] h-[520px] 
          bg-indigo-500/5 
          rounded-full 
          blur-[120px]
          will-change-transform
        "
      />

      {/* Очень лёгкий шум (почти невидимый, но добавляет тактильность) */}
      <div
        className="
          pointer-events-none 
          absolute inset-0 
          opacity-[0.04] 
          bg-[url('/noise.png')] 
          mix-blend-soft-light
        "
      />

      {/* Контент */}
      <div className="relative z-10 container mx-auto px-5 sm:px-6 lg:px-8 py-20 md:py-32">
        {children}
      </div>
    </section>
  );
}