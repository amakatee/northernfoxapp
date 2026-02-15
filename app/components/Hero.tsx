'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function HeroSection() {
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each line as a whole
      const lines = [line1Ref, line2Ref, buttonRef]
      
      lines.forEach((ref, index) => {
        if (ref.current?.children) {
          gsap.set(ref.current.children, { y: '100%' })
          gsap.to(ref.current.children, {
            y: '0%',
            duration: 1.2,
            ease: 'power4.out',
            delay: index * 0.3, // 0s, 0.3s, 0.6s delay
          })
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative w-full bg-white  px-4 py-10 md:py-18 lg:py-18 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Line 1 */}
        <div ref={line1Ref} className="overflow-hidden">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
            北狐 Northern Fox
          </h1>
        </div>

        {/* Line 2 */}
        <div ref={line2Ref} className="mt-3 overflow-hidden md:mt-8">
          <p className="max-w-3xl text-lg  sm:text-xl md:text-2xl text-[#050b1e] text-lg md:text-xl leading-relaxed font-medium tracking-normal">
          Экспертный подбор поставщиков с полным due diligence, юридическое сопровождение контрактов, 
 страхование груза на 100% стоимости, легальное таможенное оформление и доставка 
 с end-to-end контролем.          </p>
        </div>

        {/* Button */}
        <div ref={buttonRef} className="mt-10 overflow-hidden md:mt-10">
          <div>
            <a
              href="#"
              className="inline-flex items-center rounded-md bg-black px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Подробнее →
            </a>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(0,100,255,0.03),transparent)]" />
    </section>
  )
}