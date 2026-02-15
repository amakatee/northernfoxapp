'use client'
import Image from 'next/image'
import { Slide } from './types'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { createSlideTimeline } from './animations/slideAnimation'

interface Props{ slide:Slide; active:boolean; priority?:boolean }

export default function SliderSlide({slide,active,priority}:Props){
 const titleRef=useRef<HTMLHeadingElement>(null)

 useEffect(()=>{
  // Kill any existing animations first
  gsap.killTweensOf(titleRef.current)
  
  if(!active) {
    // Reset when not active
    gsap.set(titleRef.current, {
      clearProps: "all"
    });
    return;
  }
  
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const tl=createSlideTimeline(titleRef.current, reduced)
  
  return ()=>{ 
    if(tl) tl.kill();
  }
 },[active])

 return (
   <div className={`absolute inset-0 ${active ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
     {/* Full width container */}
     <div className='relative w-full h-full flex items-center justify-center'>
       {/* Text content - taking 90vw width */}
       <div className='w-[90vw] overflow-hidden px-4 md:px-12'>
         <div className="overflow-hidden">
           <h2 
             ref={titleRef} 
             className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white transform translate-y-full w-full'
           >
             {slide.title}
           </h2>
         </div>
       </div>
     </div>
   </div>
 )
}