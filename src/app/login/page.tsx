"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { House } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/"); // ou qualquer página após login
    } else {
      const data = await res.json();
      setError(data.error || "Erro ao fazer login");
    }
  };

  return (
    <div className="h-full">
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="text-gray-500 hover:text-blue-600 transition-colors flex items-center space-x-4"
        >
          <House size={28} strokeWidth={2.2} />
          <span>Voltar</span>
        </Link>
      </div>
      <div className="min-h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-lg shadow-md w-96 space-y-4 border-1"
        >
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 hover:cursor-pointer"
          >
            Entrar
          </button>
          {error && (
            <p className="text-red-500 text-sm flex justify-center ">{error}</p>
          )}
          <p className="text-center text-sm">
            Não tem uma conta?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Cadastre-se
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
