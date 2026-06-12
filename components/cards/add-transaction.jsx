"use client"

import { useState } from "react"
import { useFinance } from "../../context/finance-context"
import { categorias } from "../../lib/categorias"

export default function AddTransaction() {

  const { agregarTransaccion } = useFinance()

  const [descripcion, setDescripcion] = useState("")
  const [monto, setMonto] = useState("")
  const [categoria, setCategoria] = useState("Otros")

  function handleAdd() {

    if (!descripcion || !monto) return

    agregarTransaccion({
      description: descripcion,
      amount: Number(monto),
      type: Number(monto) > 0 ? "income" : "expense",
      category: categoria
    })

    setDescripcion("")
    setMonto("")
  }

  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">

      <input
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="w-full p-2 bg-slate-800 rounded"
      />

      <input
        placeholder="Monto"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        className="w-full p-2 bg-slate-800 rounded"
      />

      {/* CATEGORÍA */}
      <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        className="w-full p-2 bg-slate-800 rounded"
      >
        {categorias.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <button
        onClick={handleAdd}
        className="bg-blue-600 px-4 py-2 rounded w-full"
      >
        Agregar
      </button>

    </div>
  )
}