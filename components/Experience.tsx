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
        start: "top 100%",    // réduit la zone -> plus rapide
        end: "bottom 120%",
        scrub: 1.5,          // smooth & rapide
      }
    })

    // RIGHT ICON (descend très vite)
    gsap.to(right, {
      y: 100,
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
      className={`w-full snap-start snap-always relative lg:px-12 px-6 pt-12 min-h-[500px] flex items-center`}
    >
      
      <div className='max-w-6xl mx-auto'>
       <Title />
      </div>



    

      {/* RIGHT ICON */}
      <div ref={rightIconRef} className="absolute right-[5%] lg:right-[10%] top-[-5%] md:top-[0%]">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-[45px] md:w-[80px] h-[45px] md:h-[80px]" fill="none" viewBox="0 0 256 256" ><path d="M 92 72 C 142.81 72 184 113.19 184 164 C 184 214.81 142.81 256 92 256 C 41.19 256 0 214.81 0 164 C 0 113.19 41.19 72 92 72 Z M 256 0 L 256 256 L 184 256 L 184 72 L 0 72 L 0 0 Z" fill="#96f45c"></path></svg>
      </div>

    </div>
  )
}

export default Experience
