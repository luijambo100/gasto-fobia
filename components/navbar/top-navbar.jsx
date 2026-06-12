import { Bell, Search } from "lucide-react"

export default function Navbar() {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-slate-800 bg-slate-950">
      
      {/* Search */}
      <div className="flex items-center gap-2 bg-slate-900 px-3 py-2 rounded-xl w-80">
        <Search size={18} className="text-gray-400" />
        <input
          placeholder="Buscar transacciones..."
          className="bg-transparent outline-none w-full text-sm"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">

        <button className="relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="w-9 h-9 rounded-full bg-blue-600" />

      </div>

    </header>
  )
}