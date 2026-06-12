"use client";

import { useState } from "react";
import { useFinance } from "../../context/finance-context";

const categorias = [
  "Alimentación",
  "Transporte",
  "Entretenimiento",
  "Servicios",
  "Salud",
  "Educación",
  "Otros",
];

export default function TransactionModal() {
  const { agregarTransaccion } = useFinance();

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: "expense",
    category: "Otros",
  });

  function guardar() {
    if (!form.description || !form.amount) return;

    const monto =
      form.type === "expense"
        ? -Math.abs(Number(form.amount))
        : Math.abs(Number(form.amount));

    agregarTransaccion({
      description: form.description,

      amount: monto,

      type: form.type,

      category: form.category,
    });

    setForm({
      description: "",
      amount: "",
      type: "expense",
      category: "Otros",
    });

    setOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
bg-blue-600
px-4
py-2
rounded-xl
"
      >
        Nueva transacción
      </button>

      {open && (
        <div
          className="
fixed
inset-0
bg-black/60
flex
items-center
justify-center
z-50
"
        >
          <div
            className="
w-full
max-w-lg
bg-slate-900
rounded-2xl
p-6
space-y-4
"
          >
            <h2
              className="
text-xl
font-bold
"
            >
              Agregar movimiento
            </h2>

            <input
              placeholder="Descripción"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,

                  description: e.target.value,
                })
              }
              className="
w-full
bg-slate-800
p-3
rounded
"
            />

            <input
              type="number"
              placeholder="Monto"
              value={form.amount}
              onChange={(e) =>
                setForm({
                  ...form,

                  amount: e.target.value,
                })
              }
              className="
w-full
bg-slate-800
p-3
rounded
"
            />

            <select
              value={form.type}
              onChange={(e) =>
                setForm({
                  ...form,

                  type: e.target.value,
                })
              }
              className="
w-full
bg-slate-800
p-3
rounded
"
            >
              <option value="expense">Gasto</option>

              <option value="income">Ingreso</option>
            </select>

            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,

                  category: e.target.value,
                })
              }
              className="
w-full
bg-slate-800
p-3
rounded
"
            >
              {categorias.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <div
              className="
flex
gap-3
"
            >
              <button
                onClick={() => setOpen(false)}
                className="
flex-1
bg-slate-700
py-3
rounded
"
              >
                Cancelar
              </button>

              <button
                onClick={guardar}
                className="
flex-1
bg-blue-600
py-3
rounded
"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
