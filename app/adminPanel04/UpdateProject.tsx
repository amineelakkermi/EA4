'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Project = {
  _id: string
  title: string
  slug: string
  image: string
  tags: string[]
  href?: string
}

export default function UpdateProject({ id }: { id: string }) {
  const [project, setProject] = useState<Project | null>(null)
  const [title, setTitle] = useState('')
  const [href, setHref] = useState('')
  const [tags, setTags] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<{ state: 'idle' | 'saving' | 'success' | 'error', message?: string }>({ state: 'idle' })
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/portfolio/${id}`, { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to fetch project')
        const data = await res.json()

        const p: Project = data.project
        setProject(p)
        setTitle(p.title || '')
        setHref(p.href || '')
        setTags(JSON.stringify(p.tags || []))
      } catch (e: any) {
        setStatus({ state: 'error', message: e?.message || 'Erreur de chargement' })
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  async function handleDelete() {
    if (!project?._id) return
    const ok = window.confirm('Supprimer ce projet ? Cette action est irréversible.')
    if (!ok) return
    try {
      setDeleting(true)
      const res = await fetch(`/api/portfolio/${project._id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('La suppression a échoué')
      router.push('/adminPanel04/list')
    } catch (e: any) {
      setStatus({ state: 'error', message: e?.message || 'Erreur' })
    } finally {
      setDeleting(false)
    }
  }

  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    if (!project?._id) return
    setStatus({ state: 'saving' })
    try {
      const fd = new FormData()
      if (title) fd.append('title', title)
      if (href) fd.append('href', href)
      if (tags) fd.append('tags', tags)
      if (imageFile) fd.append('image', imageFile)

      const res = await fetch(`/api/portfolio?id=${project._id}`, {
        method: 'PUT',
        body: fd,
      })
      if (!res.ok) throw new Error('La mise à jour a échoué')
      const data = await res.json()
      setStatus({ state: 'success', message: 'Projet mis à jour' })
      // reflect updated slug if title changed
      if (data?.project) setProject(data.project)
    } catch (e: any) {
      setStatus({ state: 'error', message: e?.message || 'Erreur' })
    }
  }

  if (loading) return <p>Chargement...</p>
  if (!project) return <p className="text-red-600">Projet introuvable.</p>

  return (
    <section className="w-full py-10 bg-white">
      <div className="max-w-3xl mx-auto p-6 rounded-xl border shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Update Project</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block font-medium text-black mb-1">
              Project Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Awesome Project"
              className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-black/10"
              required
            />
          </div>

          {/* Href */}
          <div>
            <label htmlFor="href" className="block font-medium text-black mb-1">
              Project Link (optional)
            </label>
            <input
              type="text"
              id="href"
              name="href"
              value={href}
              onChange={(e) => setHref(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block font-medium text-black mb-1">
              Tags (JSON array)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder='["React", "Next.js"]'
              className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-black/10"
              required
            />
          </div>

          {/* Image */}
          <div>
            <label htmlFor="image" className="block font-medium text-black mb-1">
              Project Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="w-full"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={status.state === 'saving'}
              className="px-6 py-2 rounded-full bg-lime-300 hover:bg-lime-300/90 text-black font-semibold transition"
            >
              {status.state === 'saving' ? 'Enregistrement…' : 'Enregistrer'}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="px-6 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold transition"
            >
              {deleting ? 'Suppression…' : 'Supprimer'}
            </button>
          </div>

          {status.state !== 'idle' && status.message && (
            <p className={`${status.state === 'error' ? 'text-red-600' : 'text-green-600'}`}>
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}