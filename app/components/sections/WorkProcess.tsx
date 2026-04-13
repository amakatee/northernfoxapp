"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NeonSection from "../helpers/NeonSection";

gsap.registerPlugin(ScrollTrigger);

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
      const steps = gsap.utils.toArray<HTMLElement>(".wp-step");

      steps.forEach((step) => {
        const number = step.querySelector("div > div");
        const title = step.querySelector(".wp-title");
        const desc = step.querySelector(".wp-desc");
        const line = step.querySelector(".arrow-line");
        const head = step.querySelector(".arrow-head");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
          },
        });

        // Prepare arrow for draw animation
        if (line) {
          const length = (line as SVGPathElement).getTotalLength();
          gsap.set(line, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
        }

        tl
          // Digit scale in
          .from(number, {
            scale: 0.6,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          })

          // Title masked reveal
          .from(
            title,
            {
              yPercent: 120,
              duration: 0.8,
              ease: "power4.out",
            },
            "-=0.3"
          )

          // Description masked reveal
          .from(
            desc,
            {
              yPercent: 120,
              duration: 0.9,
              ease: "power4.out",
            },
            "-=0.6"
          );

        // Arrow draw + head appear
        if (line && head) {
          tl.to(
            line,
            {
              strokeDashoffset: 0,
              duration: 1.2,
              ease: "power2.inOut",
            },
            "-=0.4"
          ).from(
            head,
            {
              opacity: 0,
              y: -10,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.6"
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-white pt-0 pb-10 flex justify-center">
      <div ref={containerRef} className="max-w-4xl w-full">
        {/* Title */}
        <h2 className="text-[#0b2249] text-3xl px-4 sm:text-5xl font-semibold mb-4">
          {work_process.title}
        </h2>

        {/* Subtitle */}
        <p className="wp-subtitle px-4 text-[#0b2249]/70 text-[1.1rem] sm:text-xl max-w-2xl mb-14 leading-relaxed">
          {work_process.subtitle}
        </p>

        <NeonSection>
          <div className="flex flex-col rounded-xl px-8 py-12 gap-8 relative">
            {work_process.steps.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="wp-step flex gap-6 items-start">
                  {/* Digit + Arrow */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#6d4aff]/20 flex items-center justify-center text-[#d4f2ff] text-xl font-semibold shadow-[0_0_20px_#6d4aff55]">
                      {step.step}
                    </div>

                    {index < work_process.steps.length - 1 && (
                      <div className="mt-8">
                        <svg
                          className="wp-arrow-svg"
                          width="15"
                          height="110"
                          viewBox="0 0 20 120"
                          fill="none"
                          stroke="rgba(109, 74, 255, 0.25)"
                          strokeWidth="3"
                        >
                          <path
                            className="arrow-line"
                            d="M10 0 V100"
                            strokeLinecap="round"
                          />
                          <polyline
                            className="arrow-head"
                            points="2,90 10,110 18,90"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Text */}
                  <div className="wp-text">
                    <div className="wp-mask">
                      <h3 className="wp-title text-[#d4f2ff] text-xl font-semibold mb-3">
                        {step.name}
                      </h3>
                    </div>

                    <div className="wp-mask">
                      <p className="wp-desc text-[#d4f2ff]/70 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </NeonSection>
      </div>

      {/* Mask utility for text reveal */}
      <style jsx>{`
        .wp-mask {
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}