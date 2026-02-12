'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseWhyChooseUsAnimationsProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  underlineRef: React.RefObject<HTMLDivElement | null>;
  imageRef: React.RefObject<HTMLDivElement | null>;
  cardsCount: number;
}

export const useWhyChooseUsAnimations = ({
  sectionRef,
  titleRef,
  underlineRef,
  imageRef,
  cardsCount,
}: UseWhyChooseUsAnimationsProps) => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardsRef.current[index] = el;
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        });
      }

      // Underline animation
      if (underlineRef.current) {
        gsap.from(underlineRef.current, {
          scaleX: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.3,
          scrollTrigger: {
            trigger: underlineRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        });
      }

      // Cards animations
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        });

        // Hover animations
        const handleMouseEnter = () => {
          gsap.to(card, {
            y: -8,
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup function for this card
        return () => {
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mouseleave', handleMouseLeave);
        };
      });

      // Image animation
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          x: 60,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        });
      }

      // Floating background animations
      gsap.to('.floating-bg-1', {
        y: 20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.floating-bg-2', {
        y: -20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [cardsCount, imageRef, sectionRef, titleRef, underlineRef]);

  return { setCardRef, cardsRef };
};