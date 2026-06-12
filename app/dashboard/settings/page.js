"use client";

import { useAuth } from "../../../context/auth-context";

export default function Settings() {
  const {
    usuario,

    logout,
  } = useAuth();

  return (
    <div
      className="
space-y-6
"
    >
      <h1
        className="
text-2xl
font-bold
"
      >
        Configuración
      </h1>

      <div
        className="
bg-slate-900
rounded-2xl
p-6
"
      >
        <p>Usuario:</p>

        <p
          className="
text-xl
mt-2
"
        >
          {usuario?.email}
        </p>

        <button
          onClick={logout}
          className="
mt-4
bg-red-600
px-4
py-2
rounded
"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
