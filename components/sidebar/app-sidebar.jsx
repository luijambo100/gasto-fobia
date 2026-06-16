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
  Tags,
} from "lucide-react";

const items = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    label: "Transacciones",
    href: "/dashboard/transactions",
    icon: Receipt,
  },

  {
    label: "Categorías",
    href: "/dashboard/categories",
    icon: Tags,
  },

  {
    label: "Presupuestos",
    href: "/dashboard/budgets",
    icon: Wallet,
  },

  {
    label: "Reportes",
    href: "/dashboard/reports",
    icon: PieChart,
  },

  {
    label: "Configuración",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const { sidebarOpen, toggleSidebar } = useUI();

  return (
    <aside
      className={`

bg-slate-950
border-r
border-slate-800

transition-all
duration-300

flex
flex-col

${sidebarOpen ? "w-72" : "w-20"}

`}
    >
      <div
        className="
h-20
px-5
flex
items-center
justify-between
border-b
border-slate-800
"
      >
        {sidebarOpen && (
          <h2
            className="
text-xl
font-bold
"
          >
            GastoFobia
          </h2>
        )}

        <button
          onClick={toggleSidebar}
          className="
p-2
rounded-xl
hover:bg-slate-800
"
        >
          <Menu size={20} />
        </button>
      </div>

      <nav
        className="
flex-1
p-3
space-y-2
"
      >
        {items.map((item) => {
          const active = pathname === item.href;

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`

group

flex
items-center
gap-4

rounded-2xl

px-4
py-3

transition

${
  active
    ? "bg-blue-600 text-white"
    : "text-slate-400 hover:bg-slate-900 hover:text-white"
}

`}
            >
              <Icon size={20} />

              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
