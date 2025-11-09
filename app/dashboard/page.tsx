// app/dashboard/page.tsx
export const dynamic = "force-dynamic"; // 🔥 Indique que cette page est dynamique (sessions + requêtes temps réel)

import styles from "@/styles/style";
import ProjectForm from "./ProjectForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authIOptions";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // 🔐 Protection d’accès
  if (!session) redirect("/login");
  if (session.user?.role !== "admin") redirect("/");

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate min-h-screen flex flex-col items-center justify-center bg-white px-4 md:px-10"
    >
      <div className="z-10 w-full max-w-4xl p-6 rounded-2xl shadow-lg bg-white/90 backdrop-blur-md">
        <ProjectForm />
      </div>
    </section>
  );
}
