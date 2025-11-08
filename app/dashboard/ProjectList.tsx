// app/dashboard/ProjectList.tsx
import PortfolioCard from "@/components/PortfolioCard"
import getBaseUrl from "@/lib/url.action"

// Définis le type d’un projet (adapte selon ton modèle Mongoose)
interface Project {
  _id?: string
  title: string
  description?: string
  image?: string
  tags?: string[]
  [key: string]: any
}

const ProjectList = async () => {
  const BASE_URL = getBaseUrl()
  const response = await fetch(`${BASE_URL}/api/portfolio`, { next: { revalidate: 60 } })

  if (!response.ok) throw new Error("Failed to fetch projects")

  const { projects }: { projects: Project[] } = await response.json()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <PortfolioCard key={project.title} {...project} />
      ))}
    </div>
  )
}

export default ProjectList
