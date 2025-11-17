
import Contact from '@/components/Contact'
import EmailScrolling from '@/components/EmailScrolling'
import Experience from '@/components/Experience'
import Feedbacks from '@/components/Feedbacks'
import Hero from '@/components/Hero'
import Portfolio from '@/components/Portfolio'
import Services from '@/components/Services'
import Technologies from '@/components/Technologies'
import React from 'react'

const page = () => {
  return (
    <main>
      <Hero />
      <Technologies />
      <Experience />
      <Services />
      <Portfolio />
      <Feedbacks />
      <Contact />
      <EmailScrolling />

    </main>
  )
}

export default page