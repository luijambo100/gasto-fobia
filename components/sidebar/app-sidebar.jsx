"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { useUI } from "../../context/ui-context";

import {
  LayoutDashboard,
  Receipt,
  Wallet,
  PieChart,
  Settings,
  Menu,
} from "lucide-react";

const items = [
  ["Dashboard", "/dashboard", LayoutDashboard],

  ["Transacciones", "/dashboard/transactions", Receipt],

  ["Presupuestos", "/dashboard/budgets", Wallet],

  ["Reportes", "/dashboard/reports", PieChart],

  ["Configuración", "/dashboard/settings", Settings],
];

export default function Sidebar() {
  const pathname = usePathname();

  const { sidebarOpen, toggleSidebar } = useUI();

  return (
    <aside
      className={`

transition-all

duration-300

border-r

border-slate-800

bg-slate-950

${sidebarOpen ? "w-72" : "w-20"}

`}
    >
      <div
        className="
p-4
"
      >
        <button onClick={toggleSidebar}>
          <Menu />
        </button>
      </div>

      <nav
        className="
space-y-2
px-3
"
      >
        {items.map(([label, href, Icon]) => (
          <Link
            key={href}
            href={href}
            className={`

flex

items-center

gap-3

rounded-xl

p-3

${pathname === href ? "bg-blue-600" : "hover:bg-slate-800"}

`}
          >
            <Icon />

            {sidebarOpen && label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
