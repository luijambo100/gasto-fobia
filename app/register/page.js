"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "../../context/auth-context";

export default function Register() {
  const router = useRouter();

  const { register } = useAuth();

  const [nombre, setNombre] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  function crearCuenta() {
    if (!nombre || !email || !password) {
      alert("Completa todos los campos");

      return;
    }

    const result = register({
      nombre,

      email,

      password,
    });

    if (!result.ok) {
      alert(result.error);

      return;
    }

    alert("Cuenta creada");

    router.push("/login");
  }

  return (
    <div
      className="
min-h-screen
bg-slate-950
flex
items-center
justify-center
px-6
"
    >
      <div
        className="
w-full
max-w-md
bg-slate-900
rounded-3xl
p-8
space-y-5
shadow-2xl
"
      >
        <h1
          className="
text-white
text-3xl
font-bold
text-center
"
        >
          Crear cuenta
        </h1>

        <input
          placeholder="Nombre"
          onChange={(e) => setNombre(e.target.value)}
          className="
w-full
p-4
rounded-xl
bg-slate-800
text-white
"
        />

        <input
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="correo@ejemplo.com"
          onChange={(e) => setEmail(e.target.value)}
          className="
w-full
p-4
rounded-xl
bg-slate-800
text-white
"
        />

        <input
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
          className="
w-full
p-4
rounded-xl
bg-slate-800
text-white
"
        />

        <button
          onClick={crearCuenta}
          className="
w-full
bg-blue-600
hover:bg-blue-700
text-white
p-4
rounded-xl
"
        >
          Registrarme
        </button>
      </div>
    </div>
  );
}
