"use client"

import styles from '@/styles/style'
import Link from 'next/link'
import Title from './Title'
import BlurText from './BlurText'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'


export default function Hero() {
  const starRef = useRef<HTMLDivElement | null>(null)
  const rightIconRef = useRef<HTMLDivElement | null>(null)
  const triangleRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const elements: (HTMLDivElement | null)[] = [rightIconRef.current, starRef.current, triangleRef.current]
    const targets = elements.filter((el): el is HTMLDivElement => !!el)
    if (!targets.length) return

    gsap.fromTo(
      targets,
      { y: -60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.15,
      }
    )
  }, [])

   
 
  return (
    // 1) Section: centered vertically (grid) + 100svh pour mobile
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate min-h-[100svh] grid place-items-center overflow-hidden bg-white"
    >
      <div className='absolute -z-10'>
        <svg width="1440" height="820" viewBox="0 0 1440 820" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_f_7_579)">
            <ellipse cx="122.953" cy="551.996" rx="122.953" ry="551.996" transform="matrix(-0.185795 0.982589 -0.950553 -0.310562 1267.33 460.357)" fill="#35F605" fillOpacity="0.5" />
          </g>
          <defs>
            <filter id="filter0_f_7_579" x="-5.42752" y="3.8147e-06" width="1450.42" height="819.48" filterUnits="userSpaceOnUse" colorInterpolation-filters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_7_579" />
            </filter>
          </defs>
        </svg>
      </div>

      <div
        ref={rightIconRef}
        className="absolute -z-10 right-[10%] top-[30%]">
        <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.0593 39.4507C12.5538 41.1159 14.4552 41.4894 17.7077 40.5674C20.6632 39.7311 24.3731 37.9044 28.1557 35.4268C31.9382 32.9492 35.3446 30.1092 37.7533 27.4342C40.4043 24.4855 41.498 22.1503 41.0021 20.4871C40.6821 19.4092 39.7744 18.8748 38.2885 18.8797C37.3896 18.9034 36.494 19.0416 35.6115 19.2927L35.6019 19.2766L35.5816 19.3029C35.5056 19.3234 35.431 19.3398 35.3536 19.3643C32.3982 20.2026 28.6883 22.0293 24.9125 24.5069C21.1368 26.9844 17.7222 29.8224 15.3135 32.4975C12.6572 35.4542 11.5634 37.7855 12.0593 39.4507ZM25.2863 25.8028C28.2936 23.8349 31.2507 22.2855 33.7955 21.3294C31.5297 23.6847 28.4928 26.1558 25.1264 28.3592C22.4115 30.1403 19.605 31.5969 16.7335 32.715C19.0171 30.3819 22.0079 27.9473 25.2863 25.8028ZM14.9136 34.7759C18.0074 33.8928 21.967 31.9803 25.5164 29.653C29.8194 26.8343 33.6155 23.5646 35.9935 20.6351C37.5623 20.25 39.8134 20 40.128 21.0537C40.4755 22.2224 38.4376 24.8982 37.1778 26.3006C34.8259 28.9148 31.4817 31.696 27.7643 34.133C24.0468 36.57 20.4087 38.3601 17.5211 39.1799C16.5862 39.4523 15.6369 39.6041 14.684 39.6339C13.8106 39.6368 13.0901 39.4371 12.9158 38.8821C12.6615 37.9838 13.8046 36.1919 14.919 34.7759L14.9136 34.7759Z" fill="#1E2CFB" />
          <path d="M0.454173 35.3557L3.37373 45.1676C4.45347 48.7956 7.9145 50.5252 13.125 50.0519C18.1741 49.5912 24.3275 47.1294 30.4501 43.1202C36.5726 39.1111 41.9509 34.019 45.5773 28.7914C49.3225 23.4021 50.7914 18.438 49.7117 14.814L46.7921 5.00017C45.8317 1.75507 42.9486 0.023505 38.617 0.0379443C38.1106 0.0396326 37.5852 0.0656036 37.0409 0.115842C31.9918 0.576539 25.8383 3.03831 19.7158 7.04948C13.5933 11.0607 8.21501 16.1488 4.5886 21.3743C0.843364 26.7656 -0.624194 31.7317 0.454173 35.3557ZM48.844 15.3818C49.7372 18.381 48.3047 22.8991 44.9159 27.7788C41.3624 32.8911 36.0883 37.88 30.0659 41.8242C24.0435 45.7685 18.0052 48.1916 13.0633 48.6398C12.5439 48.6899 12.0434 48.7118 11.5618 48.7134C7.66974 48.7264 5.03715 47.2684 4.24142 44.5977C3.34963 41.5985 4.78069 37.0805 8.17085 32.2007C11.723 27.0865 16.9971 22.0955 23.0195 18.1513C29.0419 14.207 35.0802 11.788 40.0221 11.3357C44.7362 10.9064 47.9509 12.3806 48.844 15.3818ZM5.24994 22.3869C8.80347 17.2746 14.0776 12.2857 20.0999 8.34148C26.1223 4.39722 32.1606 1.97214 37.1026 1.5239C41.8167 1.10467 45.0313 2.5688 45.9231 5.57L47.7602 11.7417C46.3031 10.4896 44.1941 9.84091 41.5366 9.84977C41.0305 9.85146 40.5056 9.87541 39.9618 9.92564C34.9113 10.3843 28.7579 12.8481 22.6353 16.8573C16.5128 20.8664 11.1346 25.9545 7.50951 31.1821C5.06039 34.7089 3.58472 38.0549 3.15891 40.9536L1.31779 34.7859C0.428711 31.7442 1.8249 27.218 5.21826 22.342Z" fill="#1E2CFB" />
          <path d="M4.23814 44.567C5.03462 47.2353 7.66973 48.6921 11.5655 48.6791C12.0475 48.6775 12.5485 48.6557 13.0684 48.6055C18.0151 48.1577 24.0579 45.7467 30.0874 41.7957C36.1169 37.8446 41.3947 32.8701 44.9517 27.7621C48.3438 22.8865 49.7776 18.3723 48.8836 15.3756C47.9897 12.379 44.7719 10.9041 40.0533 11.333C35.1066 11.7849 29.0638 14.1919 23.0344 18.1429C17.0049 22.0939 11.727 27.0705 8.17141 32.1805C4.77795 37.048 3.34549 41.5623 4.23814 44.567ZM15.3409 32.5295C17.7491 29.8606 21.1616 27.029 24.9378 24.5571C28.714 22.0851 32.4272 20.2625 35.3765 19.4262C35.4538 19.4017 35.5285 19.3854 35.6044 19.3649L35.6247 19.3387L35.6343 19.3548C36.5167 19.1042 37.4121 18.9663 38.3107 18.9427C39.7949 18.9377 40.7037 19.4729 41.0237 20.5463C41.5194 22.2057 40.4259 24.5357 37.7756 27.4776C35.3674 30.1466 31.955 32.9781 28.1801 35.4521C24.4052 37.926 20.6893 39.7466 17.7346 40.581C14.4787 41.501 12.5764 41.1283 12.0874 39.4669C11.5985 37.8054 12.6906 35.4674 15.3409 32.5215L15.3409 32.5295Z" fill="#F2CFFF" />
          <path d="M14.9526 34.8327C18.0463 33.9476 22.0057 32.0311 25.5549 29.6988C29.8576 26.874 33.6535 23.5972 36.0314 20.6614C37.6001 20.2755 39.8511 20.025 40.1656 21.0809C40.5131 22.2522 38.4753 24.9338 37.2156 26.3392C34.8638 28.959 31.5199 31.7463 27.8026 34.1885C24.0854 36.6307 20.4475 38.4247 17.5601 39.2462C16.6251 39.5192 15.676 39.6714 14.7231 39.7012C13.8498 39.7041 13.1293 39.504 12.955 38.9477C12.6953 38.0475 13.8383 36.2518 14.9526 34.8327Z" fill="#1E2CFB" />
          <path d="M5.21826 22.342C8.77655 17.2253 14.0577 12.2341 20.0882 8.28798C26.1186 4.34185 32.165 1.91764 37.1135 1.46716C41.834 1.04772 45.0529 2.51253 45.9458 5.51513L47.7853 11.6897C46.3263 10.437 44.2145 9.78804 41.5534 9.79691C41.0467 9.7986 40.5211 9.82257 39.9765 9.87282C34.9193 10.3338 28.7576 12.7967 22.6269 16.8098C16.4962 20.8228 11.1107 25.9113 7.48082 31.1413C5.02841 34.6677 3.55076 38.0174 3.12438 40.9174L1.28081 34.7448C0.390553 31.7442 1.8249 27.218 5.21826 22.342Z" fill="#1E2CFB" />
        </svg>
      </div>

      <div
        ref={starRef}
        className="absolute hidden md:block -z-10 md:left-[10%] xl:left-[30%] top-[28%]"
      >
        <svg width="48" height="46" viewBox="0 0 48 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.7764 0L29.3893 17.2746H47.5528L32.8582 27.9508L38.471 45.2254L23.7764 34.5491L9.08178 45.2254L14.6946 27.9508L0 17.2746H18.1636L23.7764 0Z" fill="#799EFF" />
        </svg>
      </div>

      <div
        ref={triangleRef}
        className="absolute  -z-10  left-[15%] bottom-[15%] xl:bottom-[30%]"
      >
        <svg width="36" height="39" viewBox="0 0 36 39" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.07468 -6.51984e-06L35.5361 11.1363L26.4614 38.3737L-5.4129e-06 27.2374L9.07468 -6.51984e-06Z" fill="#AEE21D" />
        </svg>
      </div>

      {/* 2) Wrapper: retire mt-16/md:mt-8/lg:mt-16 qui décalaient vers le bas */}
      <div className="mx-auto max-w-7xl w-full px-6 sm:px-10 py-12">
        <div className="mx-auto max-w-4xl text-center space-y-5">
          <p className="text-base md:text-lg text-black/80 ">
            Hello <span role="img" aria-label="waving hand">👋</span>, I’m Amine
          </p>

          <BlurText
            text={`UI DESIGNER`}
            delay={150}
            animateBy="words"
            direction="top"
            className="text-[35px] lg:text-[64px] font-poppins font-[600]"
          />

          <BlurText
            text={`CREATIVE WEB DEVELOPER`}
            delay={150}
            animateBy="words"
            direction="top"
            className="text-[35px] lg:text-[64px] font-poppins font-[600]"
          />

          <p className="mx-auto max-w-3xl text-base sm:text-lg text-neutral-600">
            I’m a Web Developer specialized in creating fast and aesthetic web experiences
            using Next.js & TailwindCSS.
          </p>

          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <Link href="#contact" className="font-kufam inline-flex items-center justify-center rounded-full px-6 sm:px-8 py-3 text-base font-semibold text-black bg-lime-300 hover:bg-lime-300/90 transition-colors ring-1 ring-black shadow-[0_2px_0_#000]">
              Get In Touch
            </Link>
            <Link href="#portfolio" className="font-kufam inline-flex items-center justify-center rounded-full px-6 sm:px-8 py-3 text-base font-semibold text-black bg-white hover:bg-black/[0.05] transition-colors ring-1 ring-black">
              View Portfolio
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}



