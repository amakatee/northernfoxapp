'use client';

import {
  useRef,
  useLayoutEffect,
  useMemo
} from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import LetsTalkButton from '../../helpers/MainButton';

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

  const overlayText = 'Northern Fox Co.';
  const overlayWords = useMemo(() => overlayText.split(' '), []);

  const headingText = 'Ваш надежный мост между Китаем и Россией.';
  const headingWords = useMemo(() => headingText.split(' '), []);

  // ----------------------------------------------------------------------
  // GSAP animations

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      // image container (бывшее видео)
      tl.fromTo(
        videoContainerRef.current,
        { y: 200, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.6 },
        0
      );

      // overlay words
      if (overlayWordsRef.current) {
        const words =
          overlayWordsRef.current.querySelectorAll('.overlay-word');

        tl.fromTo(
          words,
          { x: '-100%', opacity: 0 },
          {
            x: '0%',
            opacity: 1,
            duration: 0.8,
            stagger: 0.1
          },
          0.4
        );
      }

      // heading words
      if (headingRef.current) {
        const words =
          headingRef.current.querySelectorAll('.heading-word');

        tl.fromTo(
          words,
          { y: '100%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.7,
            stagger: 0.05
          },
          0.9
        );
      }

      // paragraph
      tl.fromTo(
        paragraphRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        1.2
      );

      // button
      const btn = buttonRef.current?.querySelector('button');

      if (btn) {
        tl.fromTo(
          btn,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8 },
          1.4
        );
      }

      // ------------------------------------------------------------------
      // Параллакс-эффект для оверлейного текста "Northern Fox Co."
      if (overlayContainerRef.current) {
        gsap.to(overlayContainerRef.current, {
          y: 30,                   // смещение вверх при скролле
          ease: 'none',
          scrollTrigger: {
            trigger: overlayContainerRef.current,
            start: 'top bottom',   // начинаем движение, когда верх элемента достигает низа вьюпорта
            end: 'bottom top',     // заканчиваем, когда низ элемента достигает верха вьюпорта
            scrub: 0.5,            // плавное следование за скроллом
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // ----------------------------------------------------------------------

  return (
    <div className="flex flex-col md:flex-row items-stretch pb-10 lg:pt-10 bg-white min-h-[80vh]">
      
      {/* IMAGE COLUMN (бывшее видео) */}

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
            <LetsTalkButton>
              Получить консультацию
            </LetsTalkButton>
          </div>

        </div>
      </div>
    </div>
  );
}