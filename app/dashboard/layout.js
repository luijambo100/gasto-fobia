import Sidebar from "../../components/sidebar/app-sidebar"
import Navbar from "../../components/navbar/top-navbar"

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      
      {/* Sidebar fijo */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">

        {/* Navbar superior */}
        <Navbar />

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>

      </div>

    </div>
  )
}