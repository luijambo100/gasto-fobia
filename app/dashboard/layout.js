"use client";

import Sidebar from "../../components/sidebar/app-sidebar";
import Navbar from "../../components/navbar/top-navbar";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/auth-context";

export default function Layout({ children }) {
  const router = useRouter();
  const { usuario } = useAuth();

  useEffect(() => {
    if (!usuario) {
      router.replace("/login");
    }
  }, [usuario, router]);

  if (!usuario) return null;

  return (
    <div className="h-screen flex bg-slate-950 text-white overflow-hidden">
      <Sidebar />

      {/* CONTENIDO */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden w-full">
        {/* NAVBAR FIJO */}
        <div className="shrink-0">
          <Navbar />
        </div>

        {/* SOLO ESTA ZONA HACE SCROLL */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
