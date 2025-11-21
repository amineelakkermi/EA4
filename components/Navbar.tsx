'use client'

import Link from 'next/link'
import React, { JSX, useEffect, useRef, useState } from 'react'
import logo2 from '@/public/logo2.png'
import Image from 'next/image'
import gsap from 'gsap'
import styles from '@/styles/style'

interface NavItem {
  id: string
  name: string
  href: string
}

const navItems: NavItem[] = [
  { id: 'home', name: 'Home', href: '#home' },
  { id: 'experience', name: 'Experience', href: '#experience' },
  { id: 'services', name: 'Services', href: '#services' },
  { id: 'portfolio', name: 'Portfolio', href: '#portfolio' },
  { id: 'contact', name: 'Contact', href: '#contact' },
]

export default function Navbar(): JSX.Element {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)
  const mobileListRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Animation d'ouverture du menu mobile (panneau + items en stagger)
  useEffect(() => {
    if (!isOpen || !mobileMenuRef.current) return

    // Utiliser un contexte GSAP isolé pour éviter les conflits
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Animation du conteneur
      tl.fromTo(
        mobileMenuRef.current,
        { y: -16, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.25,
          ease: 'power3.out',
        }
      )

      // Animation des items
      if (mobileListRef.current) {
        const items = Array.from(mobileListRef.current.querySelectorAll('li'))

        tl.fromTo(
          items,
          { y: 8, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.15,
          },
          '-=0.1'
        )
      }
    })

    return () => ctx.revert()
  }, [isOpen])

  return (
    <>
      {/* Logo */}
      <div id="main-navbar" className={`${styles.padding} fixed top-0 left-0 right-0 z-[1002] max-w-6xl mx-auto flex justify-between items-center`}>
        <Link href="/" className="z-[1000]" aria-label="Go to homepage">
          <Image src={logo2} width={70} height={70} alt="logo" className={`${isOpen ? "hidden" : "block"}`} />
        </Link>

        {/* Hamburger Button */}
        <button
          className="right-5 lg:right-36 z-[1001] transition-all duration-300"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? (
            // Close Icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              color="white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            // Menu Icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>
      {/* Full Screen Menu Overlay */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-[999] bg-[#1a2332] flex items-start justify-start"
        >
          <nav aria-label="Main navigation" className="w-full px-8 md:px-16 pt-32">
            <ul ref={mobileListRef} className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <li key={item.id} className="flex items-start gap-4 group">
                  <span className="text-sm md:text-base font-light text-white/60 mt-2 min-w-[2rem]">
                    0{index + 1}
                  </span>
                  <Link
                    href={item.href}
                    className="text-5xl md:text-7xl lg:text-8xl font-black uppercase text-white hover:text-white/70 transition-colors leading-none tracking-tight"
                    onClick={() => setIsOpen(false)}
                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  )
}