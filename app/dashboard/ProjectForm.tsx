'use client'

import React, { Suspense, useState } from 'react'



type Status = { state: 'idle' | 'submitting' | 'success' | 'error'; message?: string };

export default function ProjectForm(){
  const [ status , setStatus ] = useState<Status>({ state: 'idle' });

  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>){
    ev.preventDefault();
    const form = ev.currentTarget;
    const formData = new FormData(form);

    if(!formData.get('title') || !formData.get('image') || !formData.get('tags')){
       alert('Title, image and tags are required.')
       return
    }

    try{
    const res = await fetch( '/api/portfolio' , {
      method: 'POST',
      body: formData,
    });

    if(!res.ok) throw new Error('Failed to create project');
    setStatus({ state: 'success' , message: 'Project created successfully!'});
    form.reset();
    
    } catch(error: any){
        setStatus({ state: 'error', message: error.message || 'Something went wrong' })
    }

  }

  return (
      <section className="w-full py-10 bg-white">
      <div className="max-w-3xl mx-auto p-6 rounded-xl border shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Add New Project</h2>
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
              required
            />
          </div>

          <button
            type="submit"
            disabled={status.state === 'submitting'}
            className="px-6 py-2 rounded-full bg-lime-300 hover:bg-lime-300/90 text-black font-semibold transition"
          >
            {status.state === 'submitting' ? 'Submitting…' : 'Add Project'}
          </button>

         {
          status.state !== 'idle' && status.message && (
            <p className={`${status.state === "success" ? 'text-green-600' : 'text-red-600'}`}>
              {status.message}
            </p>
          )
         }
        </form>
      </div>
    </section>
  )
}