'use client';

import { forwardRef } from 'react';

interface SectionTitleProps {
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  underlineRef: React.RefObject<HTMLDivElement | null>;
}

export const SectionTitle = ({ titleRef, underlineRef }: SectionTitleProps) => {
  return (
    <>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#003f7f] to-transparent opacity-50 mt-10 lg:hidden"></div>
      <h2 
        ref={titleRef} 
        className="text-3xl pl-7 lg:pt-10 md:text-2xl lg:text-5xl font-bold text-[#003f7f] mb-8 mt-8 md:mt-15 md:mb-8 tracking-tighter"
      >
        Почему выбирают нас
      </h2>
    </>
  );
};

SectionTitle.displayName = 'SectionTitle';