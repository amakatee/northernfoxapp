'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import gsap from 'gsap';
import  { Button } from '../../helpers/LetsTalkButton';

export default function NorthernFoxHeroAnimated() {
  // Refs for animated elements
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const overlayWordsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Lazy‑load video state
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Static text (memoised to avoid recalculations)
  const overlayText = 'Northern Fox Co.';
  const overlayWords = useMemo(() => overlayText.split(' '), []);

  const headingText = 'Ваш надежный мост между Китаем и Россией.';
  const headingWords = useMemo(() => headingText.split(' '), []);

  // IntersectionObserver for video lazy loading
  useEffect(() => {
    if (!videoContainerRef.current || videoLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !videoLoaded && videoRef.current) {
            const video = videoRef.current;
            video.src = '/images/gz.MP4';
            video.load();
            setVideoLoaded(true);

            // Attempt autoplay (muted videos can autoplay in most browsers)
            video.play().catch((err) => {
              // Autoplay was prevented – this is fine, user can start it manually if needed
              console.debug('Video autoplay blocked:', err);
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(videoContainerRef.current);
    return () => observer.disconnect();
  }, [videoLoaded]);

  // GSAP animations (using a timeline for better control)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Video container slide up + fade
      if (videoContainerRef.current) {
        tl.fromTo(
          videoContainerRef.current,
          { y: 200, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.8, ease: 'expo.out' },
          0
        );
      }

      // 2. Overlay words – each slides from left (x: -100%) with opacity, staggered
      if (overlayWordsRef.current) {
        const words = overlayWordsRef.current.querySelectorAll('.overlay-word');
        tl.fromTo(
          words,
          { x: '-100%', opacity: 0 },
          {
            x: '0%',
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
          },
          0.5
        );
      }

      // 3. Heading words – each slides from bottom (y: 100%) with opacity, staggered
      if (headingRef.current) {
        const headingSpans = headingRef.current.querySelectorAll('.heading-word');
        tl.fromTo(
          headingSpans,
          { y: '100%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power2.out',
          },
          1.0
        );
      }

      // 4. Paragraph – fades and slides up slightly
      if (paragraphRef.current) {
        tl.fromTo(
          paragraphRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
          1.4
        );
      }

      // 5. Button – slides from left with fade
      if (buttonRef.current) {
        const button = buttonRef.current.querySelector('button');
        if (button) {
          tl.fromTo(
            button,
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
            1.8
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
          onError={() => setVideoError(true)}
        >
          Your browser does not support the video tag.
        </video>

        {videoError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-700">
            Video failed to load
          </div>
        )}

        {/* Overlay text – split into animated words (left-to-right stagger) */}
        <div className="absolute bottom-2 left-0 flex items-center justify-center pl-8">
          <div className="text-3xl md:text-4xl font-bold bg-black/25 tracking-wider text-white drop-shadow-xl rounded-sm inline-block py-2 px-3">
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
      <div className="w-full md:w-1/2 bg-white z-10 md:h-[70vh] p-8 md:p-12 flex items-end">
        <div className="max-w-lg">
          {/* Heading with each word animated from bottom (stagger) */}
          <div className="overflow-hidden">
            <h2
              ref={headingRef}
              className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#0b2249] mb-5 leading-[1.1] tracking-tight flex flex-wrap"
            >
              {headingWords.map((word, idx) => {
                // Apply italic to indices 4,5,6 (Китаем, и, Россий.)
                const isItalic = idx >= 4 && idx <= 6;
                return (
                  <div
                    key={idx}
                    className="overflow-hidden inline-block mr-2"
                  >
                    <span
                      className={`heading-word inline-block ${isItalic ? 'italic font-semibold' : 'font-light leading-[1]'}`}
                      style={{ opacity: 0, transform: 'translateY(100%)' }}
                    >
                      {word}
                    </span>
                  </div>
                );
              })}
            </h2>
          </div>

          {/* Paragraph and button container */}
          <div className="space-y-6">
            {/* Paragraph with overflow‑hidden wrapper */}
            <div className="overflow-hidden">
              <p
                ref={paragraphRef}
                className="text-[#0b2249] md:text-xl leading-relaxed text-[16px] font-light tracking-normal"
                style={{ opacity: 0, transform: 'translateY(20px)' }}
              >
                Мы не просто перевозим грузы — мы берем на себя всю логистику: от верификации поставщиков в Китае до стопроцентной страховки и легального таможенного оформления. Работаем в белую, чтобы ваш бизнес рос без рисков.
              </p>
            </div>

            {/* Button with overflow‑hidden wrapper */}
            <div className="overflow-hidden">
              <div ref={buttonRef}>
               <Button size='default' variant='primary' >Получить консультацию</Button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}