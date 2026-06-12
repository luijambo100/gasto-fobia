"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "../../context/auth-context";

export default function Login() {
  const router = useRouter();

  const { login } = useAuth();

  const [email, setEmail] = useState("");

  function entrar() {
    login({
      nombre: "Usuario",

      email,
    });

    router.push("/dashboard");
  }

  return (
    <div
      className="
min-h-screen
flex
items-center
justify-center
bg-slate-950
"
    >
      <div
        className="
w-full
max-w-md
bg-slate-900
rounded-3xl
p-8
space-y-4
"
      >
        <h1
          className="
text-3xl
font-bold
text-center
"
        >
          Iniciar sesión
        </h1>

        <input
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
w-full
p-3
bg-slate-800
rounded
"
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="
w-full
p-3
bg-slate-800
rounded
"
        />

        <button
          onClick={entrar}
          className="
w-full
bg-blue-600
py-3
rounded
"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
