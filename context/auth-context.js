"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("usuario");

    if (saved) {
      setUsuario(JSON.parse(saved));
    }
  }, []);

  function login(data) {
    setUsuario(data);

    localStorage.setItem("usuario", JSON.stringify(data));
  }

  function logout() {
    setUsuario(null);

    localStorage.removeItem("usuario");
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,

        login,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
