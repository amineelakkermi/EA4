"use client"

import styles from '@/styles/style'
import Link from 'next/link'
import HeroSahpes from './HeroSahpes'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Technologies from './Technologies'

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!titleRef.current || !textRef.current) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(
      titleRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.4'
      )
  }, [])

  return (
    // 1) Section: centered vertically (grid) + 100svh pour mobile
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate min-h-[100svh] grid place-items-center overflow-hidden"
    >

    <HeroSahpes />


      {/* 2) Wrapper: texte aligné à gauche */}
      <div className="mx-auto max-w-6xl w-full pb-25 px-6">
        <div className="max-w-6xl space-y-10">
          <h1 ref={titleRef} className={`max-w-[1100px] text-[45px] lg:text-[80px] font-kufam text-white font-[600]`}>
            UI <span className='text-yellow'>DESIGNER</span>
            <br />
            CREATIVE WEB DEVELOPER
          </h1>

          <p ref={textRef} className={`${styles.paragraph} max-w-[650px] text-gray-200`}>
          I’m a Web Developer specialized in creating fast and aesthetic web experiences using Next.js & TailwindCSS.
          </p>

          {/* Statistics 
          <div className="flex gap-8 md:gap-12">
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl font-bold text-white font-kufam">02+</span>
              <span className="text-sm md:text-base text-gray-300 mt-1">Years Experience</span>
            </div>
            <div className="h-16 w-[1px] bg-gray-400/30"></div>
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl font-bold text-white font-kufam">+15</span>
              <span className="text-sm md:text-base text-gray-300 mt-1">Projects Completed</span>
            </div>
          </div>
          */}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 right-8 md:bottom-36 md:right-12">
        <div className="relative w-24 h-24 md:w-28 md:h-28 animate-spin-slow">
          {/* Circular Text */}
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
          
          {/* Arrow in center */}
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