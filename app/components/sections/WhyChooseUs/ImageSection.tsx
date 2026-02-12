'use client';

import { forwardRef } from 'react';
import Image from 'next/image';

interface ImageSectionProps {
  imageRef: React.RefObject<HTMLDivElement | null>;
}

export const ImageSection = ({ imageRef }: ImageSectionProps) => {
  return (
    <div ref={imageRef} className="w-full lg:w-1/3">
      <div className="relative h-[500px] md:h-[550px] w-full overflow-hidden shadow-2xl group">
        <Image
          src="/images/air.JPG"
          alt="Логистика и доставка грузов"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0066cc]/15 to-gray-950" />
      </div>
    </div>
  );
};

ImageSection.displayName = 'ImageSection';