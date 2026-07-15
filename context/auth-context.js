"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Al montar, verificar si hay sesión activa (cookie JWT)
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setUsuario(data);
      })
      .finally(() => setCargando(false));
  }, []);

  async function register({ nombre, email, password }) {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { ok: false, error: data.error || "Error al registrar" };
    }

    return { ok: true };
  }

  async function login({ email, password }) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) return false;

    const data = await res.json();
    setUsuario(data);
    return true;
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUsuario(null);
  }

  return (
    <AuthContext.Provider
      value={{ usuario, cargando, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
