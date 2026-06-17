"use client";

import { useState } from "react";
import { useFinance } from "../../../context/finance-context";

export default function BudgetsPage() {
  const {
    presupuesto,
    actualizarPresupuesto,
    totalGastado,
    porcentaje,
    excedido,
  } = useFinance();

  const [valor, setValor] = useState(presupuesto);

  return (
    <div className="space-y-6">
      <h1
        className="
text-2xl
font-bold
"
      >
        Presupuesto mensual
      </h1>

      <div
        className="
bg-slate-900
p-6
rounded-2xl
border
border-slate-800
space-y-4
"
      >
        <input
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="Ej: 3000"
          className="
w-full
bg-slate-800
p-3
rounded
"
        />

        <button
          onClick={() => actualizarPresupuesto(valor)}
          className="
w-full
bg-blue-600
py-3
rounded
"
        >
          Guardar presupuesto
        </button>
      </div>

      <div
        className="
bg-slate-900
p-6
rounded-2xl
space-y-4
"
      >
        <div
          className="
flex
justify-between
"
        >
          <span>Gastado</span>

          <span>S/ {totalGastado}</span>
        </div>

        <div
          className="
w-full
bg-slate-800
rounded-full
h-4
overflow-hidden
"
        >
          <div
            style={{
              width: `${porcentaje}%`,
            }}
            className={`

h-full

${excedido ? "bg-red-500" : "bg-green-500"}

`}
          />
        </div>

        <p>{porcentaje.toFixed(0)}% del presupuesto</p>

        {excedido && (
          <div
            className="
text-red-500
font-semibold
"
          >
            ⚠ Has excedido tu presupuesto
          </div>
        )}
      </div>
    </div>
  );
}
