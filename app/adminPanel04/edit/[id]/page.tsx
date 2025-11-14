 // app/dashboard/edit/[id]/page.tsx
import UpdateProject from '../../UpdateProject'

export default async function EditProjectByIdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <section className="...">
      <UpdateProject id={id} />
    </section>
  )
}
