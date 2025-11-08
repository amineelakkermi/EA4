// app/dashboard/ProjectList.tsx
import getBaseUrl from "@/lib/url.action"
import ProjectCard from "../../components/PortfolioCard"

const ProjectList = async () => {
  const BASE_URL = getBaseUrl()
  const response = await fetch(`${BASE_URL}/api/portfolio`, { next: { revalidate: 60 } })

  if (!response.ok) throw new Error("Failed to fetch projects")
  const { projects } = await response.json()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project._id || project.title}  {...project} />
      ))}

      
    </div>
  )
}

export default ProjectList
