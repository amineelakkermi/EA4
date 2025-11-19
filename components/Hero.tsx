"use client"

import styles from '@/styles/style'
import Link from 'next/link'
import HeroSahpes from './HeroSahpes'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Technologies from './Technologies'

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const descRef = useRef<HTMLParagraphElement | null>(null)
  const buttonsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!titleRef.current || !descRef.current || !buttonsRef.current) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(
      titleRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .fromTo(
        descRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(
        buttonsRef.current,
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
      className="relative bg isolate min-h-[100svh] grid place-items-center overflow-hidden"
    >

    <HeroSahpes />


      {/* 2) Wrapper: retire mt-16/md:mt-8/lg:mt-16 qui décalaient vers le bas */}
      <div className="mx-auto max-w-7xl w-full pb-6">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <h1 ref={titleRef} className={`${styles.title} text-black leading-[60px] md:leading-[100px]`}>
         Turning Ideas
            <br />
            <span className="px-3 rounded-[10px] bg-black text-white">
               into Fast
            </span>{' '}
            Web Experiences
          </h1>

          <p ref={descRef} className="max-w-3xl mx-auto text-base sm:text-lg text-neutral-600">
            I’m a Web Developer specialized in creating fast and aesthetic web
            experiences using Next.js &amp; TailwindCSS.
          </p>

          <div ref={buttonsRef} className="flex items-center justify-center gap-4 sm:gap-6">
            <Link
              href="#contact"
              className="font-kufam inline-flex items-center justify-center rounded-full px-6 sm:px-8 py-3 text-base font-semibold text-black bg-lime-300 hover:bg-lime-300/90 transition-colors ring-1 ring-black shadow-[0_2px_0_#000]"
            >
              Get In Touch
            </Link>
            <Link
              href="#portfolio"
              className="font-kufam inline-flex items-center justify-center rounded-full px-6 sm:px-8 py-3 text-base font-semibold text-black bg-white hover:bg-black/[0.05] transition-colors ring-1 ring-black"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </div>

     
    </section>
  )
}