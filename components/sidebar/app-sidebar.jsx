"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Wallet,
  Receipt,
  PieChart,
  Settings
} from "lucide-react"

const items = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Transacciones", href: "/dashboard/transactions", icon: Receipt },
  { name: "Presupuestos", href: "/dashboard/budgets", icon: Wallet },
  { name: "Reportes", href: "/dashboard/reports", icon: PieChart },
  { name: "Configuración", href: "/dashboard/settings", icon: Settings }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-72 bg-slate-950 border-r border-slate-800 p-4">
      
      <div className="text-2xl font-bold p-4 mb-6">
        💸 GastoFobia
      </div>

      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition
                ${active 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-400 hover:bg-slate-800 hover:text-white"}
              `}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          )
        })}
      </nav>

    </aside>
  )
}