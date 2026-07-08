"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useUI } from "../../context/ui-context";
import { useAuth } from "../../context/auth-context";

const titles = {
  dashboard: "Panel",
  transactions: "Transacciones",
  budgets: "Presupuestos",
  reports: "Reportes",
  settings: "Configuración",
};

export default function Navbar() {
  const path = usePathname();
  const { toggleSidebar } = useUI();
  const { usuario } = useAuth();
  const key = path.split("/")[2];

  const inicial = usuario?.nombre?.charAt(0).toUpperCase() || "?";

  return (
    <header
      className="
        h-16
        border-b
        border-slate-800
        px-6
        flex
        items-center
        justify-between
        gap-4
      "
    >
      <div className="flex items-center gap-4 min-w-0">
        {/* Botón hamburguesa: solo visible en mobile */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 -ml-2 rounded-xl hover:bg-slate-800 shrink-0"
        >
          <Menu size={22} />
        </button>

        <h1 className="text-xl font-bold truncate">Gasto Fobia</h1>
      </div>

      {/* PERFIL DE LA CUENTA */}
      <div className="flex items-center gap-3 shrink-0 min-w-0">
        {/* Nombre y correo: ocultos en mobile para no saturar el navbar */}
        <div className="hidden sm:block text-right min-w-0">
          <p className="text-sm font-medium truncate max-w-40">
            {usuario?.nombre || "Usuario"}
          </p>
          <p className="text-xs text-slate-400 truncate max-w-40">
            {usuario?.email || ""}
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
          {inicial}
        </div>
      </div>
    </header>
  );
}
