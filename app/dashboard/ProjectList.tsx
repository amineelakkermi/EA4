// app/dashboard/ProjectList.tsx
import PortfolioCard from "@/components/PortfolioCard"
import getBaseUrl from "@/lib/url.action"

// 🧩 Type aligné avec ton modèle Mongoose (portfolio.model.ts)
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

const ProjectList = async () => {
  const BASE_URL = getBaseUrl()
  const response = await fetch(`${BASE_URL}/api/portfolio`, {
    next: { revalidate: 60 },
  })

  if (!response.ok) throw new Error("Failed to fetch projects")

  const { projects }: { projects: Project[] } = await response.json()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project : Project) => (
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
  )
}

export default ProjectList
