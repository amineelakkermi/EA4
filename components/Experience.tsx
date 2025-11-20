"use client"

import { useEffect, useRef } from 'react'
import styles from '@/styles/style'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Title from './Title'

gsap.registerPlugin(ScrollTrigger)

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const rightIconRef = useRef<HTMLDivElement | null>(null)

  // Animation de fade-out au scroll avec pin
  useEffect(() => {
    if (!sectionRef.current || !contentRef.current || !rightIconRef.current) return

    const ctx = gsap.context(() => {
      // ScrollTrigger commun pour le pin
      const scrollTriggerConfig = {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=100%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        // markers: true, // Décommenter pour debug
      }

      // Animation du contenu principal (Title)
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -50,
        ease: 'power2.inOut',
        scrollTrigger: scrollTriggerConfig
      })

      // Animation de l'icône droite
      gsap.to(rightIconRef.current, {
        opacity: 0,
        y: 30,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1,
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      id="experience"
      className={`w-full snap-start snap-always relative lg:px-12 px-6 pt-12 min-h-[500px] flex items-center`}
    >
      
      <div ref={contentRef} className='max-w-6xl mx-auto'>
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
