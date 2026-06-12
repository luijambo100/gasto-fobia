"use client"

import { useState } from "react"
import { useFinance } from "../../../context/finance-context"
import AddTransaction from "../../../components/cards/add-transaction"

export default function TransactionsPage() {

  const { transactions, eliminarTransaccion } = useFinance()
  const [filtro, setFiltro] = useState("todos")

  const filtradas = transactions.filter((t) => {
    if (filtro === "todos") return true
    return t.type === filtro
  })

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Transacciones
      </h1>

      {/* FILTROS */}
      <div className="flex gap-2">
        <button onClick={() => setFiltro("todos")} className="px-3 py-1 bg-slate-800 rounded">
          Todos
        </button>
        <button onClick={() => setFiltro("income")} className="px-3 py-1 bg-green-600 rounded">
          Ingresos
        </button>
        <button onClick={() => setFiltro("expense")} className="px-3 py-1 bg-red-600 rounded">
          Gastos
        </button>
      </div>

      {/* FORMULARIO */}
      <AddTransaction />

      {/* LISTA */}
      <div className="space-y-3">

        {filtradas.length === 0 ? (
          <div className="text-center text-gray-400 p-10 border border-dashed border-slate-700 rounded-xl">
            No hay transacciones registradas
          </div>
        ) : (
          filtradas.map((t) => (
            <div
              key={t.id}
              className="flex justify-between items-center bg-slate-900 p-4 rounded-xl border border-slate-800"
            >

              <div>
                <p className="font-semibold">
                  {t.description}
                </p>

                <p className={
                  t.type === "income"
                    ? "text-green-500"
                    : "text-red-500"
                }>
                  {t.type === "income" ? "Ingreso" : "Gasto"}
                </p>
              </div>

              <div className="flex items-center gap-4">

                <span className="font-bold">
                  S/ {t.amount}
                </span>

                <button
                  onClick={() => eliminarTransaccion(t.id)}
                  className="text-red-500"
                >
                  Eliminar
                </button>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  )
}