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
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Transacciones", href: "/dashboard/transactions", icon: Receipt },
  { label: "Categorías", href: "/dashboard/categories", icon: Tags },
  { label: "Presupuestos", href: "/dashboard/budgets", icon: Wallet },
  { label: "Reportes", href: "/dashboard/reports", icon: PieChart },
  { label: "Configuración", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useUI();

  return (
    <>
      {/* Overlay solo en mobile, cuando el sidebar está abierto */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      <aside
        className={`
          shrink-0
          fixed md:relative
          inset-y-0 left-0
          z-50 md:z-auto

          bg-slate-950
          border-r
          border-slate-800

          transition-all
          duration-300

          flex
          flex-col

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${sidebarOpen ? "w-72" : "w-72 md:w-20"}
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
          {sidebarOpen && <h2 className="text-xl font-bold">GastoFobia</h2>}

          <button
            onClick={toggleSidebar}
            className="p-2 rounded-xl hover:bg-slate-800"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-2">
          {items.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 768 && sidebarOpen) toggleSidebar();
                }}
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
    </>
  );
}
