"use client";

import { useState } from "react";
import { Trash2, Plus, Wallet } from "lucide-react";
import * as Icons from "lucide-react";

import { useFinance } from "../../../context/finance-context";
import { Button } from "../../../components/ui/button";
import CategoryModal from "../../../components/forms/category-modal";

export default function CategoriesPage() {
  const { categories, eliminarCategoria } = useFinance();

  const [open, setOpen] = useState(false);

  const gastos = categories?.filter((c) => c.type === "expense") || [];

  const ingresos = categories?.filter((c) => c.type === "income") || [];

  function renderIcon(iconName) {
    const Icon = Icons[iconName] || Wallet;

    return (
      <div
        className="
w-14
h-14
rounded-2xl
bg-slate-800
flex
items-center
justify-center
"
      >
        <Icon size={26} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Categorías</h1>

          <p className="text-slate-400 mt-1">
            Administra tus categorías de ingresos y gastos
          </p>
        </div>

        <Button onClick={() => setOpen(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Nueva categoría
        </Button>
      </div>

      {/* GASTOS */}

      <section>
        <h2 className="text-xl font-semibold mb-5">Categorías de gastos</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {gastos.map((category) => (
            <div
              key={category.id}
              className="
bg-slate-900
border
border-slate-800
rounded-2xl
p-6
hover:border-blue-600
transition
"
            >
              <div className="flex justify-between">
                <div className="flex gap-4">
                  {renderIcon(category.icon)}

                  <div>
                    <h3 className="font-semibold">{category.name}</h3>

                    {category.budget > 0 && (
                      <p className="text-sm text-slate-400 mt-1">
                        Presupuesto: S/ {category.budget}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => eliminarCategoria(category.id)}
                  className="
p-2
rounded-xl
text-slate-400
hover:bg-red-500/10
hover:text-red-500
"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INGRESOS */}

      <section>
        <h2 className="text-xl font-semibold mb-5">Categorías de ingresos</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {ingresos.map((category) => (
            <div
              key={category.id}
              className="
bg-slate-900
border
border-slate-800
rounded-2xl
p-6
hover:border-green-600
transition
"
            >
              <div className="flex justify-between">
                <div className="flex gap-4">
                  {renderIcon(category.icon)}

                  <div>
                    <h3 className="font-semibold">{category.name}</h3>

                    <p className="text-sm text-slate-400">Ingreso</p>
                  </div>
                </div>

                <button
                  onClick={() => eliminarCategoria(category.id)}
                  className="
p-2
rounded-xl
text-slate-400
hover:bg-red-500/10
hover:text-red-500
"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CategoryModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
