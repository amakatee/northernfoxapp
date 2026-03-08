export interface Slide { id: string | number;
     title: string; 
     description: string; 
     imageUrl?: string; 
     altText?: string; 
     ctaText?: string; 
     ctaLink?: string ;
     subtitle: string;
     duration: string;
     suitableFor: string[];
     cost: string;
     reliability: number,
    
    }
export interface SliderProps { slides: Slide[]; autoPlayInterval?: number; enableAutoPlay?: boolean; className?: string }