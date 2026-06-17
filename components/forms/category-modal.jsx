"use client";

import { useState } from "react";

import {
  X,
  ArrowDown,
  ArrowUp,
  ShoppingCart,
  Utensils,
  Car,
  Home,
  Wallet,
  Briefcase,
  Heart,
  Landmark,
  GraduationCap,
  CircleDollarSign,
} from "lucide-react";

import { useFinance } from "../../context/finance-context";

const ICONS = [
  {
    name: "Compras",
    value: "ShoppingCart",
    Component: ShoppingCart,
  },

  {
    name: "Comida",
    value: "Utensils",
    Component: Utensils,
  },

  {
    name: "Transporte",
    value: "Car",
    Component: Car,
  },

  {
    name: "Hogar",
    value: "Home",
    Component: Home,
  },

  {
    name: "Finanzas",
    value: "Wallet",
    Component: Wallet,
  },

  {
    name: "Trabajo",
    value: "Briefcase",
    Component: Briefcase,
  },

  {
    name: "Salud",
    value: "Heart",
    Component: Heart,
  },

  {
    name: "Banco",
    value: "Landmark",
    Component: Landmark,
  },

  {
    name: "Educación",
    value: "GraduationCap",
    Component: GraduationCap,
  },

  {
    name: "Ingresos",
    value: "CircleDollarSign",
    Component: CircleDollarSign,
  },
];

export default function CategoryModal({ open, onClose }) {
  const { agregarCategoria } = useFinance();

  const [nombre, setNombre] = useState("");

  const [tipo, setTipo] = useState("expense");

  const [icon, setIcon] = useState("Wallet");

  function guardar() {
    if (!nombre.trim()) return;

    agregarCategoria({
      id: Date.now(),

      name: nombre,

      type: tipo,

      icon,

      budget: tipo === "expense" ? 0 : null,
    });

    setNombre("");

    setTipo("expense");

    setIcon("Wallet");

    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-5">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Nueva categoría</h2>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-800"
          >
            <X />
          </button>
        </div>

        <div>
          <label className="text-sm text-slate-400">Nombre</label>

          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Freelance"
            className="w-full mt-2 p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="text-sm text-slate-400">Tipo</label>

          <div className="grid grid-cols-2 gap-3 mt-2">
            <button
              type="button"
              onClick={() => setTipo("expense")}
              className={`p-4 rounded-xl border transition ${
                tipo === "expense"
                  ? "border-red-500 bg-red-500/10"
                  : "border-slate-700"
              }`}
            >
              <ArrowDown className="mx-auto mb-2" />
              Gasto
            </button>

            <button
              type="button"
              onClick={() => setTipo("income")}
              className={`p-4 rounded-xl border transition ${
                tipo === "income"
                  ? "border-green-500 bg-green-500/10"
                  : "border-slate-700"
              }`}
            >
              <ArrowUp className="mx-auto mb-2" />
              Ingreso
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm text-slate-400">Icono</label>

          <div className="grid grid-cols-5 gap-3 mt-3">
            {ICONS.map((item) => {
              const Icon = item.Component;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setIcon(item.value)}
                  className={`h-14 rounded-xl border flex items-center justify-center transition ${
                    icon === item.value
                      ? "border-blue-600 bg-blue-600/10"
                      : "border-slate-700 hover:bg-slate-800"
                  }`}
                >
                  <Icon size={22} />
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={guardar}
          className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl p-3 font-semibold"
        >
          Crear categoría
        </button>
      </div>
    </div>
  );
}
