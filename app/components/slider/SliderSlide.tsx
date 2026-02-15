'use client'
import Image from 'next/image'
import { Slide } from './types'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { createSlideTimeline } from './animations/slideAnimation'

interface Props{ slide:Slide; active:boolean; priority?:boolean }

export default function SliderSlide({slide,active,priority}:Props){
 const titleRef=useRef<HTMLHeadingElement>(null)
 const descRef=useRef<HTMLParagraphElement>(null)
 // We don't need imgRef anymore since it's commented out
 // const imgRef=useRef<HTMLDivElement>(null)

 useEffect(()=>{
  // Kill any existing animations first
  gsap.killTweensOf([titleRef.current, descRef.current])
  
  if(!active) {
    // Reset when not active
    gsap.set([titleRef.current, descRef.current], {
      clearProps: "all"
    });
    return;
  }
  
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches
  // Pass null for imgEl since we're not using it
  const tl=createSlideTimeline(titleRef.current, descRef.current, null, reduced)
  
  return ()=>{ 
    if(tl) tl.kill();
  }
 },[active])

 return (
   <div className={`absolute inset-0 ${active ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
     {/* Split layout container - side by side on ALL devices */}
     <div className='relative w-full h-full flex flex-row'>
       {/* Left side - Text content (90%) with overflow hidden for animation */}
       <div className='relative w-[90vw] h-full overflow-hidden'>
         <div className='absolute inset-0 flex items-center justify-center px-4 md:px-12'>
           <div className='max-w-2xl overflow-hidden'>
             {/* Title with bottom-to-top animation */}
             <div className="overflow-hidden">
               <h2 
                 ref={titleRef} 
                 className='text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 text-white transform translate-y-full'
               >
                 {slide.title}
               </h2>
             </div>
             {/* Description with bottom-to-top animation */}
             <div className="overflow-hidden">
               <p 
                 ref={descRef} 
                 className='text-md md:text-lg lg:text-xl text-white/90 max-w-xl transform translate-y-full text-lg md:text-xl leading-relaxed font-medium tracking-normal'
               >
                 {slide.description}
               </p>
             </div>
           </div>
         </div>
       </div>
       
       {/* Right side - Image (40%) - Commented out as in your code */}
       {/* <div className='relative w-[40%] h-full overflow-hidden'>
         <div 
           ref={imgRef} 
           className='absolute inset-0'
         >
           <Image 
             src={slide.imageUrl} 
             alt={slide.altText} 
             fill 
             priority={priority} 
             className='object-cover'
           />
         </div>
       </div> */}
     </div>
   </div>
 )
}