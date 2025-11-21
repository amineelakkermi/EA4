"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from '@/styles/style'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const scrollIndicatorRef = useRef(null)

  // 🔹 Entry animation: Title & Text
  useEffect(() => {
    const ctx = gsap.context(() => {
      // تعيين الوضع الابتدائي
      gsap.set([titleRef.current, textRef.current], { opacity: 0, y: 50 })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 1.2 })
        .to(textRef.current, { opacity: 1, y: 0, duration: 1.2 }, '-=0.8')
    })

    return () => ctx.revert()
  }, [])

  // 🔹 Scroll animation: fade out & pin
  useEffect(() => {
    if (!sectionRef.current || !contentRef.current || !scrollIndicatorRef.current) return

    const ctx = gsap.context(() => {
      const navbar = document.querySelector('#main-navbar')
      if (!navbar) return

      gsap.set([contentRef.current, scrollIndicatorRef.current, navbar], {
        opacity: 1,
        y: 0,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        }
      })

      // تحريك المحتوى والNavbar للأعلى أثناء التمرير
      tl.to([contentRef.current, navbar], {
        opacity: 0,
        y: -50,
        ease: 'power2.inOut',
      }, 0)

      // مؤشر Scroll يتحرك للأسفل ويختفي
      tl.to(scrollIndicatorRef.current, {
        opacity: 0,
        y: 30,
        ease: 'power2.inOut',
      }, 0)
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate min-h-[100vh] grid place-items-center overflow-hidden"
    >
      {/* محتوى رئيسي */}
      <div ref={contentRef} className="mx-auto max-w-6xl w-full pt-20 px-6">
        <div className="max-w-6xl space-y-5">
          <h1
            ref={titleRef}
            className="max-w-[1100px] text-[50px] xs:text-[65px] sm:text-[80px] md:text-[100px] lg:text-[150px] lg:leading-[170px] font-kufam text-white font-[700]"
          >
           FRONTEND <br />
           <span className='text-yellow'>DEVELOPER</span>
          </h1>

          <p
            ref={textRef}
            className={`${styles.paragraph} max-w-[650px] text-gray-200`}
          >
            I’m a Web Developer specialized in creating fast and aesthetic web experiences using Next.js & TailwindCSS.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 right-8 md:bottom-36 md:right-12"
      >
        <div className="relative w-24 h-24 md:w-28 md:h-28 animate-spin-slow">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <path
                id="circlePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              />
            </defs>
            <text className="text-[10px] fill-white font-medium tracking-wider">
              <textPath href="#circlePath" startOffset="0%">
                * SCROLL DOWN * SCROLL DOWN 
              </textPath>
            </text>
          </svg>

          <div className="absolute inset-0 flex items-center justify-center animate-bounce-slow">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
