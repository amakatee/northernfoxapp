"use client"
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function OverlapCards() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const zIndexCounter = useRef(1) // Keep track of the highest z-index

  useEffect(() => {
    const cards = cardRefs.current

    cards.forEach((card, index) => {
      if (!card) return

      // Create scroll trigger for each card
      ScrollTrigger.create({
        trigger: card,
        start: `top+=20% bottom`,
        end: `+=300`,
        pin: false,
        onEnter: () => {
          // When card hits sticky position, set its z-index to a higher value
          gsap.to(card, {
            onStart: () => {
              card.style.zIndex = `${zIndexCounter.current++}` // Increase z-index
            },
            position: 'sticky',
            top: '20vh',
            duration: 0.3,
            ease: 'power2.out',
          })
        },
        onLeaveBack: () => {
          // Optional: reset z-index if needed
        },
      })
    })

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <div className="h-screen overflow-y-scroll bg-gray-100" ref={containerRef}>
      <div className="flex flex-col items-center space-y-8 p-8">
        {['Card 1', 'Card 2', 'Card 3', 'Card 4'].map((text, index) => (
          <div
            key={index}
            ref={(el: HTMLDivElement | null) => {
              cardRefs.current[index] = el
            }}            className="w-64 h-64 bg-blue-500 flex items-center justify-center text-white text-xl rounded-lg shadow-lg"
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  )
}