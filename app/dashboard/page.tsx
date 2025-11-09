// app/dashboard/page.tsx
import styles from '@/styles/style'
import ProjectForm from './ProjectForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { authOptions } from '@/lib/authIOptions'
import { cacheLife } from 'next/cache'

// Désactive le cache et force le rendu dynamique

const DashboardPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/login')
  if (session.user?.role !== 'admin') redirect('/')

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate min-h-screen flex flex-col items-center justify-center bg-white px-4 md:px-10"
    >
      <div className="z-10 w-full max-w-4xl p-6 rounded-2xl shadow-lg bg-white/90 backdrop-blur-md">
        <Suspense fallback={<p>Chargement du formulaire...</p>}>
          <ProjectForm />
        </Suspense>
      </div>
    </section>
  )
}

export default DashboardPage
