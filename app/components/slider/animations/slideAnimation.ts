// slideAnimation.ts
import gsap from "gsap";

export const createSlideTimeline = (
  titleEl: HTMLElement | null, 
  descEl: HTMLElement | null, 
  imgEl: HTMLElement | null, 
  reduced: boolean
) => {
  if(!titleEl || !descEl) return null;
  
  if(reduced) { 
    gsap.set([titleEl, descEl], {
      opacity: 1,
      y: 0
    }); 
    return null; 
  }

  // Set initial positions - start from bottom (outside the container)
  gsap.set([titleEl, descEl], { 
    y: "100%",           // Start from bottom (outside)
    opacity: 0,
    visibility: 'visible'
  });

  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
    }
  });
  
  // Animate from bottom to top with stagger
  tl.to(titleEl, {
    y: 0,
    opacity: 1,
    duration: 0.6
  }, 0)
  .to(descEl, {
    y: 0,
    opacity: 1,
    duration: 0.6
  }, 0.2);
  
  return tl;
}