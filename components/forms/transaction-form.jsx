"use client";

import { useState } from "react";
import { useFinance } from "../../context/finance-context";
import { Button } from "../ui/button";

export default function TransactionForm({ onClose }) {
  const { agregarTransaccion, categories } = useFinance();

  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: "expense",
    category: "",
  });

  function guardar(e) {
    e.preventDefault();

    if (!form.description || !form.amount || !form.category) return;

    agregarTransaccion({
      description: form.description,
      amount:
        form.type === "expense"
          ? -Math.abs(Number(form.amount))
          : Number(form.amount),
      type: form.type,
      category: form.category,
      date: new Date().toISOString(),
    });

    setForm({
      description: "",
      amount: "",
      type: "expense",
      category: "",
    });

    onClose?.();
  }

  return (
    <form onSubmit={guardar} className="space-y-5">
      <div>
        <label className="text-sm text-slate-400">Descripción</label>

        <input
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          placeholder="Ej: Compra supermercado"
          className="w-full mt-2 p-3 rounded-xl bg-slate-800 border border-slate-700"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-slate-400">Monto</label>

          <input
            type="number"
            value={form.amount}
            onChange={(e) =>
              setForm({
                ...form,
                amount: e.target.value,
              })
            }
            className="w-full mt-2 p-3 rounded-xl bg-slate-800 border border-slate-700"
          />
        </div>

        <div>
          <label className="text-sm text-slate-400">Tipo</label>

          <select
            value={form.type}
            onChange={(e) =>
              setForm({
                ...form,
                type: e.target.value,
                category: "",
              })
            }
            className="w-full mt-2 p-3 rounded-xl bg-slate-800 border border-slate-700"
          >
            <option value="expense">Gasto</option>

            <option value="income">Ingreso</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm text-slate-400">Categoría</label>

        <select
          value={form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value,
            })
          }
          className="w-full mt-2 p-3 rounded-xl bg-slate-800 border border-slate-700"
        >
          <option value="">Seleccionar</option>

          {categories
            .filter((c) => c.type === form.type)
            .map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onClose}
        >
          Cancelar
        </Button>

        <Button type="submit" className="flex-1">
          Guardar
        </Button>
      </div>
    </form>
  );
}
