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
 const imgRef=useRef<HTMLDivElement>(null)

 useEffect(()=>{
  if(!active) return
  
  gsap.killTweensOf([titleRef.current, descRef.current, imgRef.current])
  
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const tl=createSlideTimeline(titleRef.current, descRef.current, imgRef.current, reduced)
  
  return ()=>{ tl?.kill() }
 },[active])



 return (
 <div className={`absolute inset-0 ${active?'opacity-100 z-10':'opacity-0 z-0'}`}>
   
     {/* <Image
      src="/images/msc.jpeg" 
      alt="Northern Fox Digital Agency"
      fill
      sizes="(max-width: 768px) 90vw, 60vw"
      className="object-cover  shadow-2xl "
      priority
      quality={70}
    /> */}
  {/* Split layout container - side by side on ALL devices */}
  <div className='relative w-full h-full flex flex-row'>
   {/* Left side - Text content (60%) */}
   <div className='relative w-[70%] h-full overflow-hidden'>
    <div className='absolute  flex items-center justify-center  px-4 md:px-12'>
     <div className='max-w-2xl flex flex-col justify-center gap-1'>
     <div ref={titleRef} className='mb-3' >
                      <h3 className="text-lg font-semibold text-white">{slide.title}</h3>
                      <p className="text-sm text-cyan-200/70">{slide.subtitle}</p>
      </div>
      <div  ref={descRef}  className="flex mb-5 justify-between items-center mb-4 text-sm">
                    <span className="text-blue-200/80">⏱ {slide.duration}</span>
                    <span className={`font-medium px-2 py-0.5 rounded ${
                      slide.cost === 'Высокая' ? 'bg-red-900/30 text-red-400' :
                      slide.cost === 'Средняя' ? 'bg-yellow-900/30 text-yellow-400' :
                      'bg-green-900/30 text-green-400'
                    }`}>
                      {slide.cost} стоимость
                    </span>
                  </div>
         <button
                    // onClick={() => handleCalculate(method.id)}
         className="mt-auto w-full py-2.5  hover:from-cyan-600/50 hover:to-blue-600/50 border border-cyan-500/30 hover:border-cyan-400/50 text-white font-medium rounded-lg transition-all duration-300 active:scale-95 text-sm"
                  >
          Рассчитать стоимость
          </button>         

                 
      {/* <h2 
       ref={titleRef} 
       className='text-xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 text-white'
      >
       {slide.title}
      </h2> */}
      {/* <p 
       ref={descRef} 
       className='text-xs md:text-lg lg:text-xl text-white/90 max-w-xl'
      >
       {slide.description}
      </p> */}
     </div>
    </div>
   </div>
   
   {/* Right side - Image (40%) */}
   <div className='relative w-[30%] h-full overflow-hidden'>
   <div className="mb-4">
        <h4 className="text-xs uppercase tracking-wider text-blue-300/70 mb-2">Подходит для:</h4>
            <div className="flex flex-wrap gap-2">
                {slide.suitableFor.slice(0, 4).map((item, i) => (
                    <span key={i} className="text-xs bg-blue-900/30 text-blue-200 px-2 py-1 rounded-full border border-blue-700/30">
                          {item}
                     </span>
                      ))}
             </div>
    </div>
                               
   </div>
  </div>
 </div>
 )
}