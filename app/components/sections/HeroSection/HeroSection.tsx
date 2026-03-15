'use client';

import {
  useRef,
  useLayoutEffect,
  useEffect,
  useState,
  useMemo,
  useCallback
} from 'react';

import gsap from 'gsap';
import LetsTalkButton from '../../helpers/MainButton';

// ----------------------------------------------------------------------

export default function NorthernFoxHeroAnimated() {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const overlayWordsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // ----------------------------------------------------------------------

  const overlayText = 'Northern Fox Co.';
  const overlayWords = useMemo(() => overlayText.split(' '), []);

  const headingText = 'Ваш надежный мост между Китаем и Россией.';
  const headingWords = useMemo(() => headingText.split(' '), []);

  // ----------------------------------------------------------------------
  // Lazy video loading

  useEffect(() => {
    if (!videoContainerRef.current || videoLoaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const video = videoRef.current;
        if (!video) return;

        video.load();

        video.play().catch(() => {
          // autoplay might be blocked but video still loads
        });

        setVideoLoaded(true);
        observer.disconnect();
      },
      {
        threshold: 0.15,
        rootMargin: '200px'
      }
    );

    observer.observe(videoContainerRef.current);

    return () => observer.disconnect();
  }, [videoLoaded]);

  // ----------------------------------------------------------------------
  // GSAP animations

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      // video
      tl.fromTo(
        videoContainerRef.current,
        { y: 200, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.6 },
        0
      );

      // overlay words
      if (overlayWordsRef.current) {
        const words = overlayWordsRef.current.querySelectorAll('.overlay-word');

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
        const words = headingRef.current.querySelectorAll('.heading-word');

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
    });

    return () => ctx.revert();
  }, []);

  // ----------------------------------------------------------------------

  const handleVideoError = useCallback(() => {
    setVideoError(true);
    console.error('Video failed to load');
  }, []);

  // ----------------------------------------------------------------------

  return (
    <div className="flex flex-col md:flex-row items-stretch bg-white min-h-[70vh]">

      {/* VIDEO COLUMN */}

      <div
        ref={videoContainerRef}
        className="relative w-full md:w-1/2 h-[30vh] md:h-[70vh] overflow-hidden bg-gray-100"
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/video-poster.jpg"
          aria-label="Promotional video showing logistics operations"
          onError={handleVideoError}
        >
          {/* <source src="/images/gz.webm" type="video/webm" /> */}
          <source src="/images/gz.mp4" type="video/mp4" />
        </video>

        {/* error fallback */}

        {videoError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-700">
            <p className="text-center p-4">
              Видео не загрузилось <br />
              <span className="text-sm">Попробуйте обновить страницу</span>
            </p>
          </div>
        )}

        {/* overlay text */}

        <div className="absolute bottom-2 left-0 flex items-center justify-center pl-8">
          <div className="text-3xl md:text-4xl font-semibold bg-black/25 tracking-wide text-white drop-shadow-xl rounded-sm inline-block py-2 px-1">
            <div
              ref={overlayWordsRef}
              className="flex flex-wrap items-center"
            >
              {overlayWords.map((word, i) => (
                <div key={i} className="word-wrapper overflow-hidden mr-2">
                  <span className="overlay-word inline-block opacity-0">
                    {word}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TEXT COLUMN */}

      <div className="w-full md:w-1/2 bg-white z-10 md:h-[70vh] p-8 md:p-12 flex items-end">

        <div className="max-w-lg pr-4 md:pr-6">

          {/* heading */}

          <h2
            ref={headingRef}
            className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#0b2249] mb-5 leading-[1.2] tracking-tight flex flex-wrap pb-1"
          >
            {headingWords.map((word, i) => {
              const italic = i >= 4 && i <= 6;

              return (
                <div key={i} className="word-wrapper overflow-hidden mr-2">
                  <span
                    className={`heading-word inline-block ${
                      italic ? 'italic font-semibold' : 'font-light'
                    }`}
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

          <div ref={buttonRef} className="mt-6">
            <LetsTalkButton>
              Получить консультацию
            </LetsTalkButton>
          </div>

        </div>
      </div>
    </div>
  );
}