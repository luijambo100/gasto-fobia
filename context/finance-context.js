"use client";

import { createContext, useContext, useEffect, useState } from "react";

const DEFAULT_CATEGORIES = [
  { id: 1, name: "Compras", type: "expense", icon: "ShoppingCart" },
  { id: 2, name: "Comida", type: "expense", icon: "Utensils" },
  { id: 3, name: "Transporte", type: "expense", icon: "Car" },
  { id: 4, name: "Hogar", type: "expense", icon: "Home" },

  { id: 5, name: "Salario", type: "income", icon: "CircleDollarSign" },
  { id: 6, name: "Freelance", type: "income", icon: "Briefcase" },
  { id: 7, name: "Inversiones", type: "income", icon: "Landmark" },
];

function useStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") {
      return defaultValue;
    }

    try {
      const saved = localStorage.getItem(key);

      if (!saved) {
        return defaultValue;
      }

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
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
}

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useStorage("transactions", []);

  const [categories, setCategories] = useStorage(
    "categories",
    DEFAULT_CATEGORIES,
  );

  const [presupuestos, setPresupuestos] = useStorage("budgets", []);

  // ─────────────────────────────
  // CATEGORIAS
  // ─────────────────────────────

  function agregarCategoria(categoria) {
    const nueva = {
      id: Date.now(),
      ...categoria,
    };

    setCategories((prev) => [...prev, nueva]);

    if (categoria.type === "expense") {
      setPresupuestos((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          category: nueva.name,
          amount: 0,
        },
      ]);
    }
  }

  function eliminarCategoria(id) {
    const categoria = categories.find((c) => c.id === id);

    setCategories((prev) => prev.filter((c) => c.id !== id));

    if (categoria) {
      setPresupuestos((prev) =>
        prev.filter((p) => p.category !== categoria.name),
      );
    }
  }

  // ─────────────────────────────
  // TRANSACCIONES
  // ─────────────────────────────

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

  // ─────────────────────────────
  // PRESUPUESTOS
  // ─────────────────────────────

  function actualizarPresupuestoCategoria(category, amount) {
    const valor = Number(amount) || 0;

    setPresupuestos((prev) => {
      const existe = prev.find((p) => p.category === category);

      if (existe) {
        return prev.map((p) =>
          p.category === category
            ? {
                ...p,
                amount: valor,
              }
            : p,
        );
      }

      return [
        ...prev,

        {
          id: Date.now(),

          category,

          amount: valor,
        },
      ];
    });
  }

  function obtenerPresupuestoCategoria(category) {
    return presupuestos.find((p) => p.category === category)?.amount || 0;
  }

  // ─────────────────────────────
  // CALCULOS
  // ─────────────────────────────

  const ingresos = transactions
    .filter((t) => t.type === "income")
    .reduce((a, t) => a + (Number(t.amount) || 0), 0);

  const totalGastado = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, t) => a + Math.abs(Number(t.amount) || 0), 0);

  const balance = ingresos - totalGastado;

  const presupuestoTotal = presupuestos.reduce(
    (a, p) => a + (Number(p.amount) || 0),
    0,
  );

  const porcentaje =
    presupuestoTotal > 0
      ? Math.min((totalGastado / presupuestoTotal) * 100, 100)
      : 0;

  const excedido = totalGastado > presupuestoTotal;

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        categories,
        presupuestos,

        agregarCategoria,
        eliminarCategoria,

        agregarTransaccion,
        eliminarTransaccion,

        actualizarPresupuestoCategoria,
        obtenerPresupuestoCategoria,

        ingresos,
        totalGastado,
        balance,

        presupuestoTotal,
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
