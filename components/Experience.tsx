"use client"

import { useEffect, useRef } from 'react'
import styles, { layout } from '@/styles/style'
import Image from 'next/image'
import experienceImg from '@/public/experienceImg.png';
import Title from './Title';
import BlurText from './BlurText';
import gsap from 'gsap'

const Experience = () => {
  const experienceImgRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const target = experienceImgRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              target,
              { y: -60, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power3.out',
              }
            )

            observer.unobserve(target)
          }
        })
      },
      {
        threshold: 0.2,
      }
    )

    observer.observe(target)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
   <div id='experience' className={`${styles.padding} min-h-[500px] flex justify-between items-center relative w-full`}>
    <div className={`max-w-6xl mx-auto mt-16 flex justify-between items-center `}>
      <div className="w-[95%]">
      <BlurText
      text="Turning ideas into meaningful digital solutions"
      delay={150}
      animateBy="words"
      direction="top"
      className={`${styles.title}`}/>
      </div>
      <div className="w-[30%]" ref={experienceImgRef}>
        <Image src={experienceImg} width={215} height={215} alt='experience' />
      </div>
    </div>
   </div>
  )
}

export default Experience