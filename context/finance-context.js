"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState([]);

  const [categories, setCategories] = useState([]);

  const [presupuesto, setPresupuesto] = useState(0);

  // CARGAR

  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions");

    const savedCategories = localStorage.getItem("categories");

    const savedBudget = localStorage.getItem("budget");

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }

    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }

    if (savedBudget) {
      setPresupuesto(Number(savedBudget));
    }
  }, []);

  // GUARDAR

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));

    localStorage.setItem("categories", JSON.stringify(categories));

    localStorage.setItem("budget", presupuesto);
  }, [transactions, categories, presupuesto]);

  // CATEGORIAS

  function agregarCategoria(categoria) {
    setCategories((prev) => [...prev, categoria]);
  }

  function eliminarCategoria(id) {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }

  // TRANSACCIONES

  function agregarTransaccion(data) {
    setTransactions((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...data,
      },
    ]);
  }

  function eliminarTransaccion(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  // PRESUPUESTO

  function actualizarPresupuesto(valor) {
    setPresupuesto(Number(valor));
  }

  // CALCULOS

  const ingresos = transactions
    .filter((t) => t.type === "income")
    .reduce((a, t) => a + Number(t.amount), 0);

  const gastos = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, t) => a + Number(t.amount), 0);

  const balance = ingresos + gastos;

  const totalGastado = Math.abs(gastos);

  const porcentaje = presupuesto
    ? Math.min((totalGastado / presupuesto) * 100, 100)
    : 0;

  const excedido = totalGastado > presupuesto;

  return (
    <FinanceContext.Provider
      value={{
        transactions,

        categories,

        agregarCategoria,

        eliminarCategoria,

        agregarTransaccion,

        eliminarTransaccion,

        presupuesto,

        actualizarPresupuesto,

        ingresos,

        gastos,

        balance,

        totalGastado,

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
