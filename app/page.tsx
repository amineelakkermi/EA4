
import Contact from '@/components/Contact'
import Experience from '@/components/Experience'
import Feedbacks from '@/components/Feedbacks'
import GetInTouch from '@/components/GetInTouch'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Portfolio from '@/components/Portfolio'
import Services from '@/components/Services'
import Technologies from '@/components/Technologies'
import React from 'react'

const page = () => {
  return (
    <main>
      <div className='bg snap-start snap-always'>
      <Navbar />
      <Hero />
      </div>
      <Experience />
      <Services />
      <Portfolio />
      <Feedbacks />
      <GetInTouch />
      <Contact />
    </main>
  )
}

export default page