"use client";

import { usePathname } from "next/navigation";

const titles = {
  dashboard: "Panel",

  transactions: "Transacciones",

  budgets: "Presupuestos",

  reports: "Reportes",

  settings: "Configuración",
};

export default function Navbar() {
  const path = usePathname();

  const key = path.split("/")[2];

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
"
    >
      <div>
        <h1
          className="
text-xl
font-bold
"
        >
          {titles[key] || "Dashboard"}
        </h1>
      </div>

      <div
        className="
w-10
h-10
rounded-full
bg-blue-600
"
      />
    </header>
  );
}
