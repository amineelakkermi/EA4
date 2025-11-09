import{ JSX } from 'react'
import styles from '@/styles/style'
import PortfolioCard from './PortfolioCard'
import { Project as ProjectModel } from '@/database'
import connectDB from '@/lib/mongodb'
import getBaseUrl from '@/lib/url.action'
import { cacheLife } from 'next/cache'


interface Project {
  _id: string
  title: string
  slug: string
  image: string
  tags: string[]
  href?: string
  createdAt?: string
  updatedAt?: string
}


export default async function Portfolio(): Promise<JSX.Element> {
   'use cache'
  cacheLife('hours')

  const BASE_URL = getBaseUrl();

  const response = await fetch(`${BASE_URL}/api/portfolio`, { next: { revalidate: 3600 } })


  // Vérifie que la réponse est correcte
  if (!response.ok) {
    throw new Error(`Erreur lors du chargement des événements : ${response.status}`)
  }

  const { projects } = await response.json()



  return (
    <section
      id="portfolio"
      className={`${styles.padding}  min-h-screen w-full flex flex-col gap-10 md:gap-14 justify-start items-center`}
      aria-labelledby="portfolio-title"
    >
      <h1 id="portfolio-title" className={`${styles.title} text-left`}>
        A Glimpse Into <span role="img" aria-label="target">🎯</span> My Coding Journey
      </h1>

      {projects.length > 0 ? (
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12">
          {
            projects.map((project : Project) => (
              <PortfolioCard
                       key={project._id}
                       title={project.title}
                       slug={project.slug}
                       image={project.image}
                       tags={project.tags}
                       href={project.href || `/projects/${project.slug}`}
                     />
            ) )
          }
        </div>
      ) : (
        <div className="w-full max-w-7xl text-center py-20">
          <p className="text-gray-500">Aucun projet disponible pour le moment.</p>
        </div>
      )}
    </section>
  )
}