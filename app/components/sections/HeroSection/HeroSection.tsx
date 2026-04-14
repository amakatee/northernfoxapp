'use client';

import {
  useRef,
  useLayoutEffect,
  useMemo,
  useState
} from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import LetsTalkButton from '../../helpers/MainButton';
import LogisticsFormModal from '../../helpers/LogisticFormModal'
import { useLogisticsModal } from "../../providers/ModalProvider";
// Регистрируем плагин ScrollTrigger для работы с параллаксом
gsap.registerPlugin(ScrollTrigger);

// ----------------------------------------------------------------------

export default function NorthernFoxHeroAnimated() {
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const overlayWordsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const overlayContainerRef = useRef<HTMLDivElement>(null); // реф для контейнера оверлейного текста

  // ----------------------------------------------------------------------

  const overlayText = '北狐 Northern Fox Co.';
  const overlayWords = useMemo(() => overlayText.split(' '), []);

  const headingText = 'Ваш надежный мост между Китаем и Россией.';
  const headingWords = useMemo(() => headingText.split(' '), []);
  const { openLogisticsModal } = useLogisticsModal();
  // ----------------------------------------------------------------------
  // GSAP animations

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(min-width: 0px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power4.out" }
        });
  
        // IMAGE FADE + LIFT
        tl.fromTo(
          videoContainerRef.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.6 },
          0
        );
  
        // OVERLAY TEXT (premium slide-in)
        if (overlayWordsRef.current) {
          const words = overlayWordsRef.current.querySelectorAll(".overlay-word");
  
          tl.fromTo(
            words,
            { yPercent: 120, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.1,
              stagger: 0.08,
              ease: "expo.out"
            },
            0.4
          );
        }
  
        // HEADING WORDS (smooth cinematic rise)
        if (headingRef.current) {
          const words = headingRef.current.querySelectorAll(".heading-word");
  
          tl.fromTo(
            words,
            { yPercent: 120, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.05,
              ease: "power4.out"
            },
            0.9
          );
        }
  
        // PARAGRAPH
        tl.fromTo(
          paragraphRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1 },
          1.3
        );
  
        // BUTTON
        const btn = buttonRef.current?.querySelector("button");
        if (btn) {
          tl.fromTo(
            btn,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9 },
            1.5
          );
        }
  
        // PREMIUM PARALLAX FOR OVERLAY TEXT
        if (overlayContainerRef.current) {
          gsap.to(overlayContainerRef.current, {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: overlayContainerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6
            }
          });
        }
  
        // LIGHT PARALLAX FOR HEADING
        if (headingRef.current) {
          gsap.to(headingRef.current, {
            yPercent: -5,
            ease: "none",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5
            }
          });
        }
      });
    });
  
    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);
  

  // ----------------------------------------------------------------------

  return (
    <div className="flex flex-col md:flex-row items-stretch pb-6 lg:pt-10 bg-white min-h-[80vh]">
  

      <div
        ref={videoContainerRef}
        className="relative w-full md:w-1/2 h-[30vh] md:h-[80vh] overflow-hidden bg-gray-100"
      >
        <Image
          src="/images/video-poster.jpg"
          alt="Logistics operations"
          fill
          priority
          className="object-cover"
        />

        {/* overlay text */}

        <div
          ref={overlayContainerRef}
          className="absolute bottom-4 left-0 flex items-center justify-center pl-8"
        >
          <div className="text-3xl md:text-4xl font-semibold bg-black/25 tracking-wide text-white drop-shadow-xl rounded-sm inline-block py-2 px-1">
            <div
              ref={overlayWordsRef}
              className="flex flex-wrap items-center"
            >
              {overlayWords.map((word, i) => (
                <div
                  key={i}
                  className="word-wrapper overflow-hidden mr-2"
                >
                  <span className="overlay-word inline-block opacity-0 will-change-transform">
                    {word}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TEXT COLUMN */}

      <div className="w-full md:w-1/2 bg-white z-10 md:h-[80vh] p-8 md:p-12 flex items-end">
        <div className="max-w-lg pr-4 md:pr-6">

          {/* heading */}

          <h2
            ref={headingRef}
            className="text-3xl heading-word md:text-4xl lg:text-5xl font-medium text-[#0b2249] mb-5 leading-[1.2] tracking-tight flex flex-wrap pb-1"
          >
            {headingWords.map((word, i) => {
              const italic = i >= 4 && i <= 6;

              return (
                <div
                  key={i}
                  className="word-wrapper overflow-hidden mr-2"
                >
                  <span
                    className={`
                      heading-word inline-block will-change-transform
                      ${
                        italic
                          ? 'italic font-semibold translate-x-[0.03em] pr-[0.2em]'
                          : 'font-light'
                      }
                    `}
                  >
                    {word}
                  </span>
                </div>
              );
            })}
          </h2>

          {/* paragraph */}

          <p
            ref={paragraphRef}
            className="text-[#0b2249] md:text-xl leading-relaxed text-[16px] font-light"
          >
            Мы не просто перевозим грузы — мы берем на себя всю логистику: от
            верификации поставщиков в Китае до стопроцентной страховки и
            легального таможенного оформления. Работаем в белую, чтобы ваш
            бизнес рос без рисков.
          </p>

          {/* button */}

          <div ref={buttonRef} className="mt-10 mb-5">
              <LetsTalkButton onClick={openLogisticsModal}>
                Получить консультацию
              </LetsTalkButton>
            </div>

        </div>
      </div>
      {/* Modal */}
      {/* <LogisticsFormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      /> */}
    </div>
  );
}