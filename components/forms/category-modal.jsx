"use client";

import { useState } from "react";
import { X, ArrowDown, ArrowUp, ShoppingCart, Utensils, Car, Home, Wallet, Briefcase, Heart, Landmark, GraduationCap, CircleDollarSign,} from "lucide-react";
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

  function limpiar() {
    setNombre("");
    setTipo("expense");
    setIcon("Wallet");
  }

  function cerrar() {
    limpiar();
    onClose();
  }

  function guardar() {
    if (!nombre.trim()) return;
    agregarCategoria({
      id: Date.now(),
      name: nombre,
      type: tipo,
      icon,
      budget: 0,
    });

    cerrar();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-5">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
        {/* HEADER */}

        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">
              Nueva categoría
            </h2>
            <p className="text-slate-400 mt-1">
              Crea categorías personalizadas
            </p>
          </div>

          <button
            onClick={cerrar}
            className="p-2 rounded-xl hover:bg-slate-800"
          >
            <X />
          </button>
        </div>

        {/* NOMBRE */}

        <div>
          <label className="text-sm text-slate-400">
            Nombre
          </label>

          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Viajes"
            className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-blue-600"
          />
        </div>

        {/* ICONOS */}

        <div>
          <label className="text-sm text-slate-400">
            Icono
          </label>

          <div className="grid grid-cols-5 gap-3 mt-3">
            {ICONS.map(({ value, Component }) => (
              <button
                key={value}
                type="button"
                onClick={() => setIcon(value)}
                className={`h-16 rounded-2xl border flex items-center justify-center transition
                  ${
                    icon === value
                      ? "border-blue-600 bg-blue-600/20"
                      : "border-slate-700 hover:border-slate-500"
                  }
                  `}
              >
                <Component size={24} />
              </button>
            ))}
          </div>
        </div>

        {/* BOTONES */}

        <div className="flex gap-3">
          <button
            onClick={cerrar}
            className="flex-1 border border-slate-700 rounded-xl p-3"
          >
            Cancelar
          </button>

          <button
            onClick={guardar}
            className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-xl p-3 font-semibold"
          >
            Crear categoría
          </button>
        </div>
      </div>
    </div>
  );
}
