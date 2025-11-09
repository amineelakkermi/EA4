"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!res?.error) router.push("/dashboard");
    else alert("Identifiants invalides");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <form
        onSubmit={handleSubmit}
        className="
          bg-white p-8 rounded-3xl shadow-2xl w-80 sm:w-96 space-y-6
          border border-gray-200
        "
      >
        <h1 className="text-2xl font-bold text-center text-gray-900">Connexion</h1>
        <p className="text-center text-gray-500 text-sm">
          Connectez-vous pour accéder au tableau de bord
        </p>
        
        <div className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="
              w-full border border-gray-300 p-3 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-black/20
              transition-all duration-200
            "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="
              w-full border border-gray-300 p-3 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-black/20
              transition-all duration-200
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="
            w-full bg-black text-white py-3 rounded-xl font-semibold
            shadow-md hover:shadow-lg
            hover:bg-gray-800
            transition-all duration-200
            active:scale-95
          "
        >
          Se connecter
        </button>

      
      </form>
    </div>
  );
}
