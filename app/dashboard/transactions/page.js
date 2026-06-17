"use client";

import { useMemo, useState } from "react";
import {
  Plus, Search, Filter, TrendingUp, TrendingDown, Receipt, X,
} from "lucide-react";

import { useFinance } from "../../../context/finance-context";
import TransactionForm from "../../../components/forms/transaction-form";

export default function TransactionsPage() {
  const { transactions, categories, eliminarTransaccion } = useFinance();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sort, setSort] = useState("date");

  const filtered = useMemo(() => {
    let data = [...transactions];
    if (filterType !== "all") data = data.filter((t) => t.type === filterType);
    if (filterCategory !== "all") data = data.filter((t) => t.category === filterCategory);
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (t) =>
          t.description?.toLowerCase().includes(q) ||
          t.category?.toLowerCase().includes(q),
      );
    }
    if (sort === "date")     data.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sort === "amount")   data.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
    if (sort === "category") data.sort((a, b) => a.category.localeCompare(b.category));
    return data;
  }, [transactions, search, filterType, filterCategory, sort]);

  const income  = filtered.filter((t) => t.type === "income") .reduce((a, t) => a + Number(t.amount), 0);
  const expense = filtered.filter((t) => t.type === "expense").reduce((a, t) => a + Math.abs(t.amount), 0);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Transacciones</h1>
          <p className="text-slate-400 mt-1">Administra ingresos y gastos</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} />
          Nueva transacción
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowModal(false)}        // cierra al hacer clic fuera
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg mx-4"
            onClick={(e) => e.stopPropagation()}     // evita que se cierre al hacer clic dentro
          >
            {/* Cabecera del modal */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Nueva transacción</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <TransactionForm onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}

      {/* FILTROS */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-4 top-4 text-slate-500" />
          <input
            placeholder="Buscar transacción..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 p-3 rounded-xl bg-slate-900 border border-slate-800"
          />
        </div>

        <select
          value={filterType}
          onChange={(e) => { setFilterType(e.target.value); setFilterCategory("all"); }}
          className="bg-slate-900 border border-slate-800 rounded-xl p-3"
        >
          <option value="all">Todos</option>
          <option value="income">Ingresos</option>
          <option value="expense">Gastos</option>
        </select>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-xl p-3"
        >
          <option value="all">Todas categorías</option>
          {categories
            .filter((cat) => filterType === "all" ? true : cat.type === filterType)
            .map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
        </select>
      </div>

      {/* ORDEN */}
      <div className="flex items-center gap-3">
        <Filter size={18} />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-transparent"
        >
          <option value="date">Fecha</option>
          <option value="amount">Monto</option>
          <option value="category">Categoría</option>
        </select>
      </div>

      {/* LISTA */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
        <h2 className="text-xl font-bold mb-6">Todas las transacciones</h2>
        <div className="space-y-4">
          {filtered.length ? (
            filtered.map((t) => (
              <div
                key={t.id}
                className="flex justify-between items-center border-b border-slate-800 pb-4"
              >
                <div>
                  <p className="font-medium">{t.description}</p>
                  <p className="text-sm text-slate-400">{t.category}</p>
                </div>
                <div className="flex items-center gap-6">
                  <p className={t.type === "income" ? "text-green-500" : "text-red-500"}>
                    S/ {Math.abs(t.amount)}
                  </p>
                  <button onClick={() => eliminarTransaccion(t.id)} className="text-red-500">
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-slate-500">
              <Receipt size={42} className="mx-auto mb-3" />
              No hay transacciones
            </div>
          )}
        </div>
      </div>

      {/* RESUMEN */}
      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-slate-900 rounded-3xl p-6">
          <p className="text-slate-400">Total movimientos</p>
          <h3 className="text-3xl font-bold">{filtered.length}</h3>
        </div>
        <div className="bg-slate-900 rounded-3xl p-6">
          <div className="flex gap-2"><TrendingUp /> Ingresos</div>
          <h3 className="text-3xl font-bold text-green-500 mt-3">S/ {income}</h3>
        </div>
        <div className="bg-slate-900 rounded-3xl p-6">
          <div className="flex gap-2"><TrendingDown /> Gastos</div>
          <h3 className="text-3xl font-bold text-red-500 mt-3">S/ {expense}</h3>
        </div>
      </div>
    </div>
  );
}