// app/dashboard/edit/[id]/page.tsx
import UpdateProject from '../../UpdateProject'


export default function EditProjectByIdPage({ params }: { params: { id: string } }) {
  const { id } = params

  return (
    <section className="relative isolate min-h-screen flex flex-col items-center justify-center bg-white px-4 md:px-10">
      <div className="z-10 w-full max-w-4xl p-6 rounded-2xl shadow-lg bg-white/90 backdrop-blur-md">
        <UpdateProject id={id} />
      </div>
    </section>
  )
}
