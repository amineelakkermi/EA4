"use client"

import { useEffect, useRef } from 'react'
import styles from '@/styles/style'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Title from './Title'

const Experience = () => {
  const leftIconRef = useRef(null)
  const rightIconRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const left = leftIconRef.current
    const right = rightIconRef.current

    // LEFT ICON (monte très vite)
    gsap.to(left, {
      y: -100,              // distance plus grande = vitesse plus rapide
      ease: "none",
      scrollTrigger: {
        trigger: "#experience",
        start: "top 90%",    // réduit la zone -> plus rapide
        end: "bottom 120%",
        scrub: 1.5,          // smooth & rapide
      }
    })

    // RIGHT ICON (descend très vite)
    gsap.to(right, {
      y: 140,
      ease: "none",
      scrollTrigger: {
        trigger: "#experience",
        start: "top 90%",
        end: "bottom 130%",
        scrub: 1.5,
      }
    })

    ScrollTrigger.refresh()
  }, [])

  return (
    <div
      id="experience"
      className={`w-full relative lg:px-12 px-6 pt-12 rounded-[35px] min-h-[400px] flex items-center`}
    >
      
      <div className='max-w-3xl mx-auto'>
       <Title />
      </div>



      {/* LEFT ICON */}
      <div ref={leftIconRef} className="absolute left-[5%] lg:left-[10%] bottom-[-5%] md:bottom-[0%]">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-[45px] md:w-[80px] h-[45px] md:h-[80px]" fill="none" viewBox="0 0 256 256">
          <path d="M 228 0 C 172.772 0 128 44.772 128 100 L 128 0 L 0 0 L 0 28 C 0 83.228 44.772 128 100 128 L 0 128 L 0 256 L 28 256 C 83.228 256 128 211.228 128 156 L 128 256 L 256 256 L 256 228 C 256 172.772 211.228 128 156 128 L 256 128 L 256 0 Z" fill="#B4E50D" />
        </svg>
      </div>

      {/* RIGHT ICON */}
      <div ref={rightIconRef} className="absolute right-[5%] lg:right-[10%] top-[-5%] md:top-[0%]">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-[45px] md:w-[80px] h-[45px] md:h-[80px]" fill="none" viewBox="0 0 256 256">
          <path d="M 228 0 C 172.772 0 128 44.772 128 100 L 128 0 L 0 0 L 0 28 C 0 83.228 44.772 128 100 128 L 0 128 L 0 256 L 28 256 C 83.228 256 128 211.228 128 156 L 128 256 L 256 256 L 256 228 C 256 172.772 211.228 128 156 128 L 256 128 L 256 0 Z" fill="#B4E50D" />
        </svg>
      </div>

    </div>
  )
}

export default Experience
