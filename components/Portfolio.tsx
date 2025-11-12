import { JSX } from 'react'
import styles from '@/styles/style'
import PortfolioCard from './PortfolioCard'
import { notFound } from 'next/navigation'
import getBaseUrl from '@/lib/url.action'
import { cacheLife } from 'next/cache'

export default async function Portfolio(): Promise<JSX.Element> {
  'use cache';
  cacheLife('hours')

  // 🔧 تأكد أن لديك دالة getBaseUrl تعمل في كل البيئات
  const BASE_URL = getBaseUrl()
  let projects = [] // 🟢 تعريف المتغير في النطاق العام

  try {
    const response = await fetch(`${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}/api/portfolio`, { next: { revalidate: 3600 } })


    if (!response.ok) {
      if (response.status === 404) {
        return notFound()
      }
      console.error(`⚠️ Failed to fetch portfolio: ${response.status} ${response.statusText}`)
    } else {
      const data = await response.json()
      projects = data.projects || []
    }

  } catch (error) {
    console.error('🚨 Error fetching portfolio:', error)
    // لا نرمي الخطأ حتى لا يتوقف الـ build في Vercel
  }

  return (
    <section
      id="portfolio"
      className={`${styles.padding} min-h-screen w-full flex flex-col gap-10 md:gap-14 justify-start items-center`}
      aria-labelledby="portfolio-title"
    >
      <h1 id="portfolio-title" className={`${styles.title} text-left`}>
        A Glimpse Into <span role="img" aria-label="target">🎯</span> My Coding Journey
      </h1>

      {projects.length > 0 ? (
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
