'use client';

import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { Button } from '../../helpers/LetsTalkButton';

// ----------------------------------------------------------------------
// Types (optional, can be omitted if not using strict mode)
interface WordWrapperProps {
  children: React.ReactNode;
  className?: string;
}

// ----------------------------------------------------------------------
export default function NorthernFoxHeroAnimated() {
  // Refs
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const overlayWordsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Video state
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);

  // Static content (memoized to avoid unnecessary recalculations)
  const overlayText = 'Northern Fox Co.';
  const overlayWords = useMemo(() => overlayText.split(' '), []);

  const headingText = 'Ваш надежный мост между Китаем и Россией.';
  const headingWords = useMemo(() => headingText.split(' '), []);

  // --------------------------------------------------------------------
  // Lazy‑load video when it enters the viewport
  useEffect(() => {
    if (!videoContainerRef.current || videoLoaded || videoLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !videoLoaded && !videoLoading && videoRef.current) {
            setVideoLoading(true);
            const video = videoRef.current;

            // Set video source and load
            video.src = '/images/gz.MP4';
            video.load();

            // Attempt autoplay (must be muted)
            video.play()
              .then(() => {
                setVideoLoaded(true);
                setVideoLoading(false);
              })
              .catch((err) => {
                // Autoplay was blocked – we still consider video loaded (user can start manually)
                console.debug('Autoplay prevented:', err);
                setVideoLoaded(true);
                setVideoLoading(false);
              });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(videoContainerRef.current);
    return () => observer.disconnect();
  }, [videoLoaded, videoLoading]);

  // --------------------------------------------------------------------
  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // After all animations, remove overflow‑hidden from every word wrapper
          // to guarantee no character is ever clipped.
          document.querySelectorAll('.word-wrapper').forEach((el) => {
            el.classList.remove('overflow-hidden');
          });
        },
      });

      // 1. Video container slide up + fade
      if (videoContainerRef.current) {
        tl.fromTo(
          videoContainerRef.current,
          { y: 200, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.8, ease: 'expo.out' },
          0
        );
      }

      // 2. Overlay words – each slides from left
      if (overlayWordsRef.current) {
        const words = overlayWordsRef.current.querySelectorAll('.overlay-word');
        tl.fromTo(
          words,
          { x: '-100%', opacity: 0 },
          { x: '0%', opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
          0.5
        );
      }

      // 3. Heading words – each slides from bottom
      if (headingRef.current) {
        const headingSpans = headingRef.current.querySelectorAll('.heading-word');
        tl.fromTo(
          headingSpans,
          { y: '100%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power2.out' },
          1.0
        );
      }

      // 4. Paragraph – fades and slides up
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

    return () => ctx.revert(); // Clean up GSAP animations on unmount
  }, []);

  // --------------------------------------------------------------------
  // Handlers
  const handleVideoError = useCallback(() => {
    setVideoError(true);
    setVideoLoading(false);
    console.error('Video failed to load');
  }, []);

  // --------------------------------------------------------------------
  return (
    <div className="flex flex-col md:flex-row items-stretch bg-white min-h-[70vh]">
      {/* Left column – Video */}
      <div
        ref={videoContainerRef}
        className="relative w-full md:w-1/2 h-[30vh] md:h-[70vh] overflow-hidden bg-gray-100"
      >
        {/* Video element */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted
          playsInline
          preload="none" // Lazy loading, so no preload
          poster="/images/video-poster.jpg" // Ensure this image exists
          aria-label="Promotional video showing logistics operations"
          onError={handleVideoError}
        >
          <track kind="captions" srcLang="ru" label="Russian captions" />
          Your browser does not support the video tag.
        </video>

        {/* Loading state */}
        {videoLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200/80 backdrop-blur-sm">
            <div className="w-10 h-10 border-4 border-[#0b2249] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error fallback */}
        {videoError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-700">
            <p className="text-center p-4">
              Видео не загрузилось. <br />
              <span className="text-sm">Пожалуйста, обновите страницу.</span>
            </p>
          </div>
        )}

        {/* Overlay text – split into animated words */}
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
                  className="word-wrapper overflow-hidden inline-block mr-2"
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
        {/* Added extra right padding to safeguard last character */}
        <div className="max-w-lg pr-4 md:pr-6">
          {/* Heading */}
          <div className="overflow-hidden">
            <h2
              ref={headingRef}
              // Increased line-height and tiny bottom padding for descenders (я, у, р)
              className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#0b2249] mb-5 leading-[1.2] tracking-tight flex flex-wrap pb-1"
            >
              {headingWords.map((word, idx) => {
                // Apply italic to indices 4,5,6 (Китаем, и, Россий.)
                const isItalic = idx >= 4 && idx <= 6;
                return (
                  <div
                    key={idx}
                    className="word-wrapper overflow-hidden inline-block mr-2"
                  >
                    <span
                      className={`heading-word inline-block ${
                        isItalic ? 'italic font-semibold' : 'font-light'
                      }`}
                      style={{ opacity: 0, transform: 'translateY(100%)' }}
                    >
                      {word}
                    </span>
                  </div>
                );
              })}
            </h2>
          </div>

          {/* Paragraph and button */}
          <div className="space-y-6">
            <div className="overflow-hidden">
              <p
                ref={paragraphRef}
                className="text-[#0b2249] md:text-xl leading-relaxed text-[16px] font-light tracking-normal"
                style={{ opacity: 0, transform: 'translateY(20px)' }}
              >
                Мы не просто перевозим грузы — мы берем на себя всю логистику: от верификации поставщиков в Китае до стопроцентной страховки и легального таможенного оформления. Работаем в белую, чтобы ваш бизнес рос без рисков.
              </p>
            </div>

            <div className="overflow-hidden">
              <div ref={buttonRef}>
                <Button size="default" variant="primary">
                  Получить консультацию
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}