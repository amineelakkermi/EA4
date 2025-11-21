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
  const shapeRef = useRef<HTMLDivElement | null>(null);

  // Animation de fade-out au scroll avec pin
  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      // Réinitialiser la position de départ
      gsap.set(contentRef.current, {
        opacity: 1,
        y: 0,
      })
      
      // Timeline avec ScrollTrigger et pin
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        }
      })

      // Animation du contenu
      tl.to(contentRef.current, {
        opacity: 0,
        scale: 0.7,
        y: -50,
        ease: 'power2.out',
      })

      // Animation du contenu
      tl.to(shapeRef.current, {
        opacity: 0,
        rotate: 180,
        duration: 1,
        scale: 0.7,
        x: 250,
        y: -50,
        ease: 'power2.out',
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      id="experience"
      className={`w-full relative lg:px-12 px-6 pt-12 min-h-[100vh] flex items-center`}
    >

     
      <div ref={shapeRef} className='absolute right-[10%] top-[10%] md:top-[25%]'>
      <svg xmlns="http://www.w3.org/2000/svg" className='w-[50px] md:w-[100px] h-[50px] md:h-[100px]' fill="none" viewBox='0 0 256 256'><path d="M 92 72 C 142.81 72 184 113.19 184 164 C 184 214.81 142.81 256 92 256 C 41.19 256 0 214.81 0 164 C 0 113.19 41.19 72 92 72 Z M 256 0 L 256 256 L 184 256 L 184 72 L 0 72 L 0 0 Z" fill="#96f45c"></path></svg>
      </div>
      <div ref={contentRef} className='max-w-6xl mx-auto'>
        <Title />
      </div>
    </div>
  )
}

export default Experience
