'use client'
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

export default function NorthernFoxHeroAnimated() {
  // Refs for animated elements
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const overlayWordsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Lazy‑load video
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Split overlay text into words
  const overlayText = 'Northern Fox Co.';
  const overlayWords = overlayText.split(' '); // ['Northern', 'Fox', 'Co.']

  // Split heading into words (keep punctuation with last word)
  const headingText = 'Ваш надежный мост между Китаем и Россией.';
  const headingWords = headingText.split(' ');

  // IntersectionObserver for video lazy loading
  useEffect(() => {
    if (!videoContainerRef.current || videoLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !videoLoaded && videoRef.current) {
            videoRef.current.src = '/images/gz.MP4';
            videoRef.current.load();
            setVideoLoaded(true);
            videoRef.current.play().catch(() => {}); // ignore autoplay blockers
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(videoContainerRef.current);
    return () => observer.disconnect();
  }, [videoLoaded]);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Video container slide up + fade
      if (videoContainerRef.current) {
        gsap.fromTo(
          videoContainerRef.current,
          { y: 200, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.8, ease: 'expo.out' }
        );
      }

      // 2. Overlay words – each slides from left (x: -100%) with opacity, staggered
      if (overlayWordsRef.current) {
        const words = overlayWordsRef.current.querySelectorAll('.overlay-word');
        gsap.fromTo(
          words,
          { x: '-100%', opacity: 0 },
          {
            x: '0%',
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,        // 'Northern' → 'Fox' → 'Co.'
            ease: 'power2.out',
            delay: 0.5,
          }
        );
      }

      // 3. Heading words – each slides from bottom (y: 100%) with opacity, staggered
      if (headingRef.current) {
        const headingSpans = headingRef.current.querySelectorAll('.heading-word');
        gsap.fromTo(
          headingSpans,
          { y: '100%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power2.out',
            delay: 1.0,
          }
        );
      }

      // 4. Paragraph – fades and slides up slightly
      if (paragraphRef.current) {
        gsap.fromTo(
          paragraphRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 1.4 }
        );
      }

      // 5. Button – slides from left with fade
      if (buttonRef.current) {
        const button = buttonRef.current.querySelector('button');
        if (button) {
          gsap.fromTo(
            button,
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.0, ease: 'power3.out', delay: 1.8 }
          );
        }
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-stretch bg-white">
      {/* Left column – Video */}
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
          autoPlay={false}
          preload="none"
          poster="/images/video-poster.jpg"
          aria-label="Promotional video showing logistics operations"
        >
          Your browser does not support the video tag.
        </video>

        {/* Overlay text – split into animated words (left-to-right stagger) */}
        <div className="absolute bottom-2 left-0 flex items-center justify-center pl-8">
          <div className="text-3xl md:text-4xl font-bold bg-black/15 tracking-wider text-white drop-shadow-xl rounded-sm inline-block py-2 px-3">
            <div
              ref={overlayWordsRef}
              className="flex flex-wrap items-center"
              aria-label={overlayText}
            >
              {overlayWords.map((word, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden inline-block mr-2"
                >
                  <span
                    className="overlay-word inline-block"
                    style={{ opacity: 0, transform: 'translateX(-100%)' }}
                  >
                    {word}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right column – Text Content */}
      <div className="w-full md:w-1/2 bg-white md:h-[70vh] p-8 md:p-12 flex items-end">
        <div className="max-w-lg">
          {/* Heading with each word animated from bottom (stagger) */}
          <div className="overflow-hidden">
            <h2
              ref={headingRef}
              className="text-2xl md:text-4xl lg:text-5xl font-semiboldgit  text-[#0b2249] mb-5 leading-[1.1] tracking-normal flex flex-wrap"
            >
              {headingWords.map((word, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden inline-block mr-2"
                >
                  <span
                    className="heading-word inline-block"
                    style={{ opacity: 0, transform: 'translateY(100%)' }}
                  >
                    {word}
                  </span>
                </div>
              ))}
            </h2>
          </div>

          {/* Paragraph and button container */}
          <div className="space-y-6">
            {/* Paragraph with overflow‑hidden wrapper */}
            <div className="overflow-hidden">
              <p
                ref={paragraphRef}
                className="text-[#0b2249] md:text-xl leading-relaxed text-base font-light tracking-normal"
                style={{ opacity: 0, transform: 'translateY(20px)' }}
              >
                Мы не просто перевозим грузы — мы берем на себя всю логистику: от верификации поставщиков в Китае до стопроцентной страховки и легального таможенного оформления. Работаем в белую, чтобы ваш бизнес рос без рисков.
              </p>
            </div>

            {/* Button with overflow‑hidden wrapper */}
            <div className="overflow-hidden">
              <div ref={buttonRef}>
                <button
                  className="text-[#0b2249] px-0 py-3 rounded-full text-[1.2rem] font-semibold leading-relaxed tracking-normal hover:bg-[#1a3a6e] transition-colors"
                  style={{ opacity: 0, transform: 'translateX(-20px)' }}
                >
                  Получить консультацию
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}