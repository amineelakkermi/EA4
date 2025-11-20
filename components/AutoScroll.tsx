'use client'

import { useEffect, useState } from 'react'

interface AutoScrollProps {
  enabled?: boolean
  sectionDelay?: number // Temps en ms avant de passer à la section suivante
  scrollDuration?: number // Durée du scroll en ms
}

export default function AutoScroll({ 
  enabled = false, 
  sectionDelay = 3000,
  scrollDuration = 1000 
}: AutoScrollProps) {
  const [isAutoScrolling, setIsAutoScrolling] = useState(enabled)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!isAutoScrolling) return

    const sections = [
      '#home',
      '#experience',
      '#services',
      '#portfolio',
      '#feedbacks',
      '#contact'
    ]

    const scrollToNextSection = () => {
      const nextIndex = (currentIndex + 1) % sections.length
      const targetSection = document.querySelector(sections[nextIndex])
      
      if (targetSection) {
        targetSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
        setCurrentIndex(nextIndex)
      }
    }

    const timer = setTimeout(scrollToNextSection, sectionDelay)

    return () => clearTimeout(timer)
  }, [isAutoScrolling, currentIndex, sectionDelay])

  // Raccourci clavier pour activer/désactiver (Ctrl + Shift + A)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setIsAutoScrolling(prev => !prev)
        setCurrentIndex(0)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  // Désactiver le scroll auto si l'utilisateur scroll manuellement
  useEffect(() => {
    const handleUserScroll = () => {
      if (isAutoScrolling) {
        setIsAutoScrolling(false)
      }
    }

    let scrollTimeout: NodeJS.Timeout
    const debouncedScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(handleUserScroll, 100)
    }

    window.addEventListener('wheel', debouncedScroll)
    window.addEventListener('touchmove', debouncedScroll)

    return () => {
      window.removeEventListener('wheel', debouncedScroll)
      window.removeEventListener('touchmove', debouncedScroll)
      clearTimeout(scrollTimeout)
    }
  }, [isAutoScrolling])

  if (!isAutoScrolling) return null

  return (
    <div className="fixed bottom-8 right-8 z-[1000] bg-[#7B1DFF] text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-pulse">
      <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
      <span className="text-sm font-medium">Défilement automatique</span>
      <button
        onClick={() => setIsAutoScrolling(false)}
        className="ml-2 hover:bg-white/20 rounded-full p-1 transition-colors"
        aria-label="Arrêter le défilement"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  )
}
