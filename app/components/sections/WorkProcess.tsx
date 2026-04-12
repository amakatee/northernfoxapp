"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import NeonSection from "../helpers/NeonSection";

export interface Step {
  step: number;
  name: string;
  description: string;
}

export interface WorkProcessProps {
  title: string;
  subtitle: string;
  steps: Step[];
}

interface WorkProcessComponentProps {
  work_process: WorkProcessProps;
}

export default function WorkProcess({ work_process }: WorkProcessComponentProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".wp-title", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(".wp-subtitle", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.15,
        ease: "power2.out",
      });

      gsap.from(".wp-step", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.18,
        ease: "power3.out",
      });

      gsap.from(".wp-arrow", {
        opacity: 0,
        y: -20,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-white pt-0 pb-10 flex justify-center">
      <div ref={containerRef} className="max-w-4xl w-full">

        {/* Title */}
        <h2 className="wp-title text-black text-4xl px-8 sm:text-5xl font-semibold mb-4">
          {work_process.title}
        </h2>

        {/* Subtitle */}
        <p className="wp-subtitle px-8 text-black/70 text-lg sm:text-xl max-w-2xl mb-14 leading-relaxed">
          {work_process.subtitle}
        </p>

        <NeonSection>
          <div className="flex flex-col rounded-xl px-8 py-12 gap-8 relative">

            {work_process.steps.map((step, index) => (
              <div key={step.step} className="relative">

                {/* Step Row */}
                <div className="wp-step flex gap-6 items-start">

                  {/* Digit Circle (LEFT) */}
                  <div className="flex flex-col items-center">

                    <div className="w-12 h-12 rounded-full bg-[#6d4aff]/20 flex items-center justify-center text-white text-xl font-semibold shadow-[0_0_20px_#6d4aff55]">
                      {step.step}
                    </div>

                    {/* Arrow under digit */}
                    {index < work_process.steps.length - 1 && (
                      <div className="wp-arrow mt-8">
                        <svg
                          width="15"
                          height="110"
                          viewBox="0 0 20 120"
                          fill="none"
                          stroke="rgba(109, 74, 255, 0.25)"
                          strokeWidth="3"
                        >
                          <line x1="10" y1="0" x2="10" y2="100" strokeLinecap="round" />
                          <polyline points="2,90 10,110 18,90" />
                        </svg>
                      </div>
                    )}

                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-[#d4f2ff] text-xl font-semibold mb-1">
                      {step.name}
                    </h3>
                    <p className="text-[#d4f2ff]/70 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

              </div>
            ))}

          </div>
        </NeonSection>

      </div>
    </section>
  );
}
