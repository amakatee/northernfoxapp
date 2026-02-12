'use client';

import { useRef } from 'react';
import { benefits } from './constants/benefits';
import { useWhyChooseUsAnimations } from './hooks/useWhyChooseUsAnimations';
import { BenefitCard } from './BenefitCard';
import { SectionTitle } from './SectionTitle';
import { DecorativeBackground } from './DecorativeBackground';
import { ImageSection } from './ImageSection';

export const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { setCardRef } = useWhyChooseUsAnimations({
    sectionRef,
    titleRef,
    underlineRef,
    imageRef,
    cardsCount: benefits.length,
  });

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden">
      <DecorativeBackground />
      <SectionTitle titleRef={titleRef} underlineRef={underlineRef} />
      
      <div className="relative max-w-[100vw] bg-gradient-to-br from-[#003f7f] via-[#0050a0] to-[#0066cc] z-10">
        
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">
          {/* Benefits Grid */}
          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
              {benefits.map((benefit, index) => (
                <BenefitCard
                  key={index}
                  title={benefit.title}
                  description={benefit.description}
                  index={index}
                  setCardRef={setCardRef}
                />
              ))}
            </div>
          </div>

          {/* Image Section */}
          <ImageSection imageRef={imageRef} />
        </div>
      </div>
    </section>
  );
};