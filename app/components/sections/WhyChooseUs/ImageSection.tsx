'use client';

import { forwardRef } from 'react';
import Image from 'next/image';

interface ImageSectionProps {
  imageRef: React.RefObject<HTMLDivElement | null>;
}

export const ImageSection = ({ imageRef }: ImageSectionProps) => {
  return (
    <div ref={imageRef} className="w-full lg:w-1/3 mt-[-135px] md:hidden lg:hidden ">
      <div className="relative h-[500px] md:h-[550px] w-full overflow-hidden  group backdrop-blur-3xl  ">
        <Image
          src="/images/air.png"
          alt="Логистика и доставка грузов"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          priority
          // style={{
          //   maskImage: 'radial-gradient(circle, black 50%, transparent 90%)',
          //   WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 90%)',
          // }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0066cc]/4 to-gray-950" />
      </div>
    </div>
  );
};

ImageSection.displayName = 'ImageSection';