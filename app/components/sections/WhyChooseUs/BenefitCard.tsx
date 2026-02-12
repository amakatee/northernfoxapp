'use client';

import { forwardRef } from 'react';
import { Benefit } from './constants/benefits';

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
        <div className="relative p-7 rounded-3xl group-hover:border-white/30 transition-all duration-500">
          <h3 className="text-2xl md:text-2xl font-bold text-white mb-4 leading-tight tracking-tight">
            {title}
          </h3>
          <p className="text-white/80 text-lg leading-relaxed font-light">
            {description}
          </p>
        </div>
      </div>
    );
  }
);

BenefitCard.displayName = 'BenefitCard';