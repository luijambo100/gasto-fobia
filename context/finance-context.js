"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Datos por defecto

const DEFAULT_CATEGORIES = [
  { id: 1, name: "Compras", type: "expense", icon: "ShoppingCart" },
  { id: 2, name: "Comida", type: "expense", icon: "Utensils" },
  { id: 3, name: "Transporte", type: "expense", icon: "Car" },
  { id: 4, name: "Hogar", type: "expense", icon: "Home" },
  { id: 5, name: "Salario", type: "income", icon: "CircleDollarSign" },
  { id: 6, name: "Freelance", type: "income", icon: "Briefcase" },
  { id: 7, name: "Inversiones", type: "income", icon: "Landmark" },
];

// Hook de persistencia

function useStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved === null) return defaultValue;
      const parsed = JSON.parse(saved);

      if (key === "transactions") {
        return parsed.map((t) => ({
          ...t,
          amount: Number(t.amount) || 0,
        }));
      }

      return parsed;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Contexto

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useStorage("transactions", []);
  const [categories, setCategories] = useStorage(
    "categories",
    DEFAULT_CATEGORIES,
  );
  const [presupuesto, setPresupuesto] = useStorage("budget", 0);

  // Categorías

  function agregarCategoria(categoria) {
    setCategories((prev) => [...prev, { id: Date.now(), ...categoria }]);
  }

  function eliminarCategoria(id) {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }

  // Transacciones

  function agregarTransaccion(data) {
    setTransactions((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...data,
        amount: Number(data.amount) || 0,
      },
    ]);
  }

  function eliminarTransaccion(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  // Presupuesto

  function actualizarPresupuesto(valor) {
    setPresupuesto(Number(valor));
  }

  // Cálculos

  const ingresos = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => {
      const amount = Number(t.amount) || 0;
      return acc + amount;
    }, 0);

  const totalGastado = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      const amount = Math.abs(Number(t.amount) || 0);
      return acc + amount;
    }, 0);

  const balance = ingresos - totalGastado;

  const porcentaje =
    presupuesto > 0 ? Math.min((totalGastado / presupuesto) * 100, 100) : 0;

  const excedido = totalGastado > presupuesto;

  // Valor del contexto

  return (
    <FinanceContext.Provider
      value={{
        // Estado
        transactions,
        categories,
        presupuesto,
        // Acciones — categorías
        agregarCategoria,
        eliminarCategoria,
        // Acciones — transacciones
        agregarTransaccion,
        eliminarTransaccion,
        // Acciones — presupuesto
        actualizarPresupuesto,
        // Cálculos derivados
        ingresos,
        totalGastado,
        balance,
        porcentaje,
        excedido,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  return useContext(FinanceContext);
}
