// BenefitCard.tsx
'use client';

import { forwardRef } from 'react';

interface BenefitCardProps {
  title: string;
  description: string;
  index: number;
  setCardRef: (index: number) => (el: HTMLDivElement | null) => void;
}

export const BenefitCard = forwardRef<HTMLDivElement, BenefitCardProps>(
  ({ title, description, index, setCardRef }, ref) => {
    return (
      <div
        ref={setCardRef(index)}
        className="relative group cursor-pointer"
      >
        <div className="absolute inset-0 rounded-3xl group-hover:blur-2xl transition-all duration-500" />
        <div className="relative p-8 rounded-3xl group-hover:border-white/30 transition-all duration-500">
          {/* Title with slide-up effect */}
          <div className="overflow-hidden mb-2">
            <div className="benefit-title translate-y-full will-change-transform">
              <h3 className="text-[1.3rem] md:text-2xl font-normal  text-white leading-tight tracking-wide">
                {title}
              </h3>
            </div>
          </div>

          {/* Description with slide-up effect */}
          <div className="overflow-hidden">
            <div className="benefit-description translate-y-full will-change-transform">
              <p className="text-white/80 text-base tracking-wide  font-light max-w-prose leading-relaxed ">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

BenefitCard.displayName = 'BenefitCard';