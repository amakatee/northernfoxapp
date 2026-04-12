'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WhyWhiteLogistics: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const data = {
    title: "Работать в белую, а не в серую",
    highlight: "Почему прозрачное партнёрство важнее «гибких» схем",
    problems: [
      { bold: "Серые схемы", text: "дают кажущуюся выгоду, но ведут к блокировкам, штрафам и потере товара." },
      { bold: "Частные поставщики", text: "гибки, но не гарантируют надёжность: могут исчезнуть или подвести в последний момент." },
      { bold: "Непрозрачные логисты", text: "скрывают реальные комиссии и риски, оставляя вас один на один с таможней." },
      { bold: "Мелкий шрифт в договорах", text: "штрафы за хранение, «непредвиденные» сборы, отсутствие чеков." },
    ],
    conclusion: "Серая логистика экономит копейки, но стоит миллионов. Белое партнёрство — это предсказуемость, безопасность и долгосрочный успех." 
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".title", 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }
      );

      gsap.fromTo(".problem-item", 
        { opacity: 0, x: -30 }, 
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.9, 
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="]  md:py-28 px-3">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          
          {/* Main Heading */}
          <div className="title mb-12">
            <h2 className="h4-size text-4xl px-3 md:text-[42px] leading-[1.15] font-semibold text-white">
              {/* {data.title} */}
              <br />
              <strong className="text-black">
                <i>{data.highlight}</i>
              </strong>
            </h2>
          </div>

          {/* Problems Content */}
          <div ref={contentRef} className="hire-us--left-content-top border-[#5b3bcc]/50 bg-[#0f0b1f] space-y-8 px-10 py-10 rounded-3xl mb-16">
            {data.problems.map((item, index) => (
              <p key={index} className="problem-item body text-lg md:text-[17.5px] leading-relaxed text-gray-300">
                <strong className="text-white">{item.bold}</strong> {item.text}
              </p>
            ))}
          </div>

          {/* Bottom Conclusion */}
          <div className="hire-us--left-content-bottom border-t border-[#4a2b8f]/60 pt-10">
            <p className="text-lg px-2 md:text-[17.5px] leading-relaxed text-gray-700 max-w-3xl">
              {data.conclusion}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyWhiteLogistics;