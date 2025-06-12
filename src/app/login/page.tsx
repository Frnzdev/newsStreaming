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
      <div className="absolute mt-30 top-6 left-6">
        <Link
          href="/"
          className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-4"
        >
          <House size={28} strokeWidth={2.2} />
          <span>Voltar</span>
        </Link>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-background">
        {" "}
        {/* Added bg-background here */}
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-lg shadow-md w-96 space-y-4 border border-border bg-card text-foreground"
        >
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-input rounded bg-input/30 text-foreground"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full p-2 border border-input rounded bg-input/30 text-foreground"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-2 rounded hover:bg-primary/90 hover:cursor-pointer"
          >
            Entrar
          </button>
          {error && (
            <p className="text-destructive text-sm flex justify-center ">
              {error}
            </p>
          )}
          <p className="text-center text-sm text-foreground">
            Não tem uma conta?{" "}
            <a href="/register" className="text-primary hover:underline">
              Cadastre-se
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
