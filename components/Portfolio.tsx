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
import Svg from './Svg'

export default async function Portfolio(): Promise<JSX.Element> {
  'use cache';
  cacheLife('hours');

  const projects: any[] = await GET();

  return (
    <section
      id="portfolio"
      className={`${styles.padding} snap-start snap-always relative min-h-[100svh] w-full flex flex-col justify-center items-center`}
      aria-labelledby="portfolio-title"
    >

      <div
        className={` w-full max-w-6xl mx-auto flex flex-col jutify-center flex-col gap-10`}>
        <h1 className={`${styles.title} flex items-center`}>A Glimpse Into My Coding Journey</h1>

        {projects?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Colonne gauche - 2 premiers projets */}
            <div className="flex flex-col gap-8 lg:gap-12">
              {projects.slice(0, 2).map((project: any) => (
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

            {/* Colonne droite - 2 projets suivants avec décalage */}
            <div className="flex flex-col gap-8 lg:gap-12 md:mt-8 lg:mt-12">
              {projects.slice(2, 4).map((project: any) => (
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
          </div>
        ) : (
          <div className="w-full max-w-7xl text-center py-20">
            <p className="text-gray-500">Aucun projet disponible pour le moment.</p>
          </div>
        )}
      </div>

      <div className='absolute right-[5%] top-[3%] md:top-[0%]'>
      <Svg />
      </div>
    </section>
  )
}
