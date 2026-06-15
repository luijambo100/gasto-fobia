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
  }, [usuario]);

  if (!usuario) {
    return null;
  }

  return (
    <div
      className="
flex
min-h-screen
bg-slate-950
text-white
"
    >
      <Sidebar />

      <div
        className="
flex-1
flex
flex-col
"
      >
        <Navbar />

        <main
          className="
flex-1
overflow-auto
p-6
"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
