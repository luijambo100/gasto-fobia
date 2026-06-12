"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState([]);

  const [presupuesto, setPresupuesto] = useState(0);

  // CARGAR DATOS
  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions");

    const savedBudget = localStorage.getItem("budget");

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }

    if (savedBudget) {
      setPresupuesto(Number(savedBudget));
    }
  }, []);

  // GUARDAR DATOS
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));

    localStorage.setItem("budget", presupuesto);
  }, [transactions, presupuesto]);

  // AGREGAR
  function agregarTransaccion(data) {
    setTransactions((prev) => [
      ...prev,

      {
        id: Date.now(),

        category: "Otros",

        ...data,
      },
    ]);
  }

  // ELIMINAR
  function eliminarTransaccion(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  // PRESUPUESTO
  function actualizarPresupuesto(valor) {
    setPresupuesto(Number(valor));
  }

  // CÁLCULOS
  const ingresos = transactions
    .filter((t) => t.type === "income")
    .reduce((a, t) => a + Number(t.amount), 0);

  const gastos = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, t) => a + Number(t.amount), 0);

  const balance = ingresos + gastos;

  const totalGastado = Math.abs(gastos);

  const porcentaje = presupuesto
    ? Math.min(
        (totalGastado / presupuesto) * 100,

        100,
      )
    : 0;

  const excedido = totalGastado > presupuesto;

  return (
    <FinanceContext.Provider
      value={{
        transactions,

        agregarTransaccion,

        eliminarTransaccion,

        ingresos,

        gastos,

        balance,

        presupuesto,

        actualizarPresupuesto,

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
