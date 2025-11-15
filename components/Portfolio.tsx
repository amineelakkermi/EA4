// app/components/Portfolio.js (Server Component)
import { JSX } from 'react'
import styles from '@/styles/style'
import PortfolioCard from './PortfolioCard'
import { cacheLife } from 'next/cache'
import connectDB from '@/lib/mongodb'
import { Project } from '@/database'
import { GET } from '@/app/api/portfolio/route'
import Title from './Title'
import BlurText from './BlurText'

export default async function Portfolio(): Promise<JSX.Element> {
  'use cache';
  cacheLife('hours');

  const projects = await GET();

  return (
    <section
      id="portfolio"
      className={`${styles.padding} relative mt-12 min-h-screen w-full flex flex-col gap-10 md:gap-14 justify-start items-center`}
      aria-labelledby="portfolio-title"
    >

          

       <BlurText
      text="A Glimpse Into 🎯 My Coding Journey"
      delay={150}
      animateBy="words"
      direction="top"
      className="text-[35px] lg:text-[64px] font-poppins font-[600]"/>

    
    
    

      {projects?.length > 0 ? (
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12">
          {projects.map((project) => (
            <PortfolioCard
              key={project._id}
              title={project.title}
              slug={project.slug}
              image={project.image}
              tags={project.tags}
              href={project.href || `/projects/${project.slug}`}
            />
          ))}
        </div>
      ) : (
        <div className="w-full max-w-7xl text-center py-20">
          <p className="text-gray-500">Aucun projet disponible pour le moment.</p>
        </div>
      )}
    </section>
  )
}
