'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WhyWhiteLogistics: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const data = {
    title: "Прозрачность или риск",
    highlight: "Почему прозрачное партнёрство важнее «гибких» схем",
    problems: [
      { bold: "Серые схемы", text: "дают кажущуюся выгоду, но ведут к блокировкам, штрафам и потере товара." },
      { bold: "Частные поставщики", text: "гибки, но не гарантируют надёжность: могут исчезнуть или подвести в последний момент." },
      { bold: "Непрозрачные логисты", text: "скрывают реальные комиссии и риски, оставляя вас один на один с таможней." },
      { bold: "Мелкий шрифт в договорах", text: "штрафы за хранение, «непредвиденные» сборы, отсутствие чеков." },
    ],
    conclusion: "Белое партнёрство — это предсказуемость, безопасность и долгосрочный успех." 
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.from(".wwl-title", {
        yPercent: 120,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
  
      // Card depth entrance
      gsap.from(".wwl-card", {
        scale: 0.96,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 75%",
        },
      });
  
      // Problem lines premium reveal
      const items = gsap.utils.toArray<HTMLElement>(".problem-item");
  
      items.forEach((el, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
  
        tl.from(el, {
          x: -60,
          y: 20,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });
  
      // Conclusion emphasis
      gsap.from(".wwl-conclusion", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".wwl-conclusion",
          start: "top 90%",
        },
      });
    }, sectionRef);
  
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pt-10  md:py-28 px-3 ">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
        <h2 className="text-[#0b2249] text-3xl px-3 sm:text-5xl font-semibold mb-4">
          {data.title}
        </h2>

        {/* Subtitle */}
        <p className="wp-subtitle px-3 text-[#0b2249]/90 text-[1.1rem] sm:text-xl max-w-2xl mb-8 leading-relaxed">
          {data.highlight}
        </p>

          
          {/* Main Heading */}
          {/* <div className="title mb-12">
            <h2 className="h4-size text-4xl px-3 md:text-[42px] leading-[1.15] font-semibold text-black">
            
              <br />
              <strong className="text-[#0b2249]  text-xl">
                <p>{data.highlight}</p>
              </strong>
            </h2>
          </div> */}

          {/* Problems Content */}
          <div ref={contentRef} className=" border-[#5b3bcc]/50 bg-[linear-gradient(90deg,#180628,#0f0a29_55%,#0c132f_85%,#050d22)] space-y-8 px-7 py-10 rounded-3xl mb-16">
            {data.problems.map((item, index) => (
              <p key={index} className="problem-item body text-[1.1rem] md:text-[17.5px] leading-relaxed text-[#d4f2ff]/80">
                <strong className="text-white">{item.bold}</strong> {item.text}
              </p>
            ))}
            <div className=" border-t border-white/60 pt-10">
            <p className="text-[1.3rem] px-1 md:text-[17.5px] leading-relaxed text-[#d4f2ff] max-w-3xl">
              {data.conclusion}
            </p>
          </div>
          </div>

        

        </div>
      </div>
    </section>
  );
};

export default WhyWhiteLogistics;