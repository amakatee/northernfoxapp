// slideAnimation.ts
import gsap from "gsap";

export const createSlideTimeline = (
  titleEl: HTMLElement | null, 
  reduced: boolean
) => {
  if(!titleEl) return null;
  
  if(reduced) { 
    gsap.set(titleEl, {
      opacity: 1,
      y: 0
    }); 
    return null; 
  }

  // Set initial positions - start from bottom (outside the container)
  gsap.set(titleEl, { 
    y: "100%",           // Start from bottom (outside)
    opacity: 0,
    visibility: 'visible'
  });

  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
    }
  });
  
  // Animate title from bottom to top
  tl.to(titleEl, {
    y: 0,
    opacity: 1,
    duration: 0.6
  }, 0);
  
  return tl;
}