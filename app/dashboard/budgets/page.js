"use client";

import { useState } from "react";
import { useFinance } from "../../../context/finance-context";

export default function BudgetsPage() {
  const {
    categories,
    presupuestos,
    actualizarPresupuestoCategoria,
    gastadoPorCategoria,
  } = useFinance();

  const [valores, setValores] = useState(() => {
    const inicial = {};

    categories.forEach((cat) => {
      if (cat.type === "expense") {
        const existente = presupuestos.find((p) => p.category === cat.name);

        inicial[cat.name] = existente?.amount || "";
      }
    });

    return inicial;
  });

  function cambiarValor(nombre, valor) {
    setValores((prev) => ({
      ...prev,
      [nombre]: valor,
    }));
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div>
        <h1 className="text-3xl font-bold">Presupuestos</h1>

        <p className="text-slate-400 mt-1">
          Administra presupuesto por categoría
        </p>
      </div>

      {/* CATEGORIAS */}

      <div className="grid md:grid-cols-2 gap-6">
        {categories
          .filter((cat) => cat.type === "expense")
          .map((categoria) => {
            const presupuesto =
              presupuestos.find((p) => p.category === categoria.name)?.amount ||
              0;

            const gastado = gastadoPorCategoria[categoria.name] || 0;

            const porcentaje =
              presupuesto > 0
                ? Math.min((gastado / presupuesto) * 100, 100)
                : 0;

            const excedido = presupuesto > 0 && gastado > presupuesto;

            return (
              <div
                key={categoria.id}
                className="
                bg-slate-900
                border
                border-slate-800
                rounded-3xl
                p-6
                "
              >
                {/* TITULO */}

                <div className="flex justify-between mb-5">
                  <h2 className="text-xl font-bold">{categoria.name}</h2>

                  <span className="text-slate-400">Gasto</span>
                </div>

                {/* INPUT + BOTON */}

                <div className="flex gap-3">
                  <input
                    type="number"
                    value={valores[categoria.name]}
                    placeholder="Ej: 500"
                    onChange={(e) =>
                      cambiarValor(categoria.name, e.target.value)
                    }
                    className="
                    flex-1
                    bg-slate-800
                    p-3
                    rounded-xl
                    "
                  />

                  <button
                    onClick={() =>
                      actualizarPresupuestoCategoria(
                        categoria.name,
                        valores[categoria.name],
                      )
                    }
                    className="
                    px-5
                    bg-blue-600
                    hover:bg-blue-700
                    rounded-xl
                    "
                  >
                    Guardar
                  </button>
                </div>

                {/* INFO */}

                <div className="mt-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Gastado</span>

                    <span>S/ {gastado}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Presupuesto</span>

                    <span>S/ {presupuesto}</span>
                  </div>

                  {/* BARRA */}

                  <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`
                        h-full
                        transition-all
                        ${excedido ? "bg-red-500" : "bg-green-500"}
                      `}
                      style={{
                        width: `${porcentaje}%`,
                      }}
                    />
                  </div>

                  <p className="text-sm text-slate-400">
                    {porcentaje.toFixed(0)}% usado
                  </p>

                  {excedido && (
                    <div className="text-red-500 font-medium">
                      ⚠ Presupuesto excedido
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
