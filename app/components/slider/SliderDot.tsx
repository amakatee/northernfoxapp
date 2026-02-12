'use client'
interface Props{active:boolean;onClick:()=>void;index:number}
export default function SliderDot({active,onClick,index}:Props){
 return (
  <button 
   aria-label={`Go to slide ${index+1}`} 
   onClick={onClick}
   className={`w-3 h-3 md:w-3.4 md:h-3.4 rounded-full transition-all duration-300 
    ${active 
      ? 'bg-transparent scale-99 border-[2.4px] border-[#122C4F]/60' 
      : 'bg-transparent border border-white/60 hover:border-white'
    }`}
  />
 )
}