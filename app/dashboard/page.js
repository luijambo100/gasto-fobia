"use client";

import Link from "next/link";
import * as Icons from "lucide-react";
import { useMemo } from "react";
import {
  Plus,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowRight,
} from "lucide-react";

import { useFinance } from "../../context/finance-context";
import StatCard from "../../components/cards/stat-card";
import ExpensesChart from "../../components/charts/expenses-chart";
import MonthlyTrendChart from "../../components/charts/monthly-trend-chart";
import { Button } from "../../components/ui/button";

export default function DashboardPage() {
  const {
    transactions,
    categories,
    presupuestoTotal,
    porcentaje,
    excedido,
    totalGastado,
    ingresos,
    balance,
  } = useFinance();

  const recientes = useMemo(
    () => [...transactions].reverse().slice(0, 5),
    [transactions],
  );

  const topCategorias = useMemo(() => categories.slice(0, 3), [categories]);

  // Date.now() movido fuera del render, dentro de useMemo
  const chartData = useMemo(() => {
    const grouped = {};

    transactions.forEach((t) => {
      // Si la transacción no tiene fecha usamos una fecha fija,
      // nunca Date.now() directamente en el render
      const date = new Date(t.date ?? 0);
      const month = date.toLocaleDateString("es-PE", { month: "short" });

      if (!grouped[month]) grouped[month] = { income: 0, expense: 0 };
      grouped[month][t.type] += Math.abs(Number(t.amount));
    });

    return Object.entries(grouped).map(([month, data]) => ({
      month,
      income: data.income,
      expense: data.expense,
    }));
  }, [transactions]);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-slate-400 mt-1">Resumen de tus finanzas</p>
        </div>

        <Link href="/dashboard/transactions">
          <Button>
            <Plus className="w-5 h-5 mr-2" />
            Agregar movimiento
          </Button>
        </Link>
      </div>

      {/* TARJETAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Balance"
          value={`S/ ${balance}`}
          color="text-blue-500"
          icon={<DollarSign />}
        />
        <StatCard
          title="Ingresos"
          value={`S/ ${ingresos}`}
          color="text-green-500"
          icon={<TrendingUp />}
        />
        <StatCard
          title="Gastos"
          value={`S/ ${totalGastado}`}
          color="text-red-500"
          icon={<TrendingDown />}
        />
      </div>

      {/* CONTENIDO */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold">Últimos movimientos</h2>
                <p className="text-slate-400">Tus últimas 5 transacciones</p>
              </div>
              <Link
                href="/dashboard/transactions"
                className="text-blue-500 flex items-center gap-2"
              >
                Ver todo <ArrowRight size={18} />
              </Link>
            </div>

            <div className="space-y-4">
              {recientes.length > 0 ? (
                recientes.map((t) => (
                  <div
                    key={t.id}
                    className="flex justify-between border-b border-slate-800 pb-4"
                  >
                    <div>
                      <p className="font-medium">{t.description}</p>
                      <p className="text-sm text-slate-400">{t.category}</p>
                    </div>
                    <p
                      className={
                        t.type === "income" ? "text-green-500" : "text-red-500"
                      }
                    >
                      S/ {Math.abs(t.amount)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500">No hay movimientos</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6">
          <h2 className="text-xl font-bold">Presupuesto total</h2>
          <p className="text-slate-400 mt-1">Resumen actual</p>

          <div className="mt-8">
            <div className="flex justify-between">
              <span>Gastado</span>
              <span className={excedido ? "text-red-500" : ""}>
                S/ {totalGastado}
              </span>
            </div>

            <div className="mt-2">
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${excedido ? "bg-red-500" : "bg-blue-600"}`}
                  style={{ width: `${porcentaje}%` }}
                />
              </div>
            </div>

            <div className="mt-3 flex justify-between text-sm text-slate-400">
              <span>{porcentaje.toFixed(0)}% usado</span>
              <span>Presupuesto: S/ {presupuestoTotal}</span>
            </div>

            {excedido && (
              <p className="mt-3 text-red-500 text-sm font-medium">
                ⚠ Presupuesto total excedido
              </p>
            )}

            {presupuestoTotal === 0 && (
              <p className="mt-3 text-slate-500 text-sm">
                Sin presupuesto configurado —{" "}
                <Link
                  href="/dashboard/budgets"
                  className="text-blue-500 underline"
                >
                  configúralo aquí
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* TENDENCIA */}
      {chartData.length > 0 && <MonthlyTrendChart data={chartData} />}

      {/* ABAJO */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6">
          <h2 className="text-xl font-bold mb-6">Gastos por categoría</h2>
          <ExpensesChart />
        </div>

        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6">
          <h2 className="text-xl font-bold">Este mes</h2>
          <p className="text-slate-400 mb-6">Resumen mensual</p>

          <div className="space-y-5">
            {topCategorias.map((cat) => {
              const Icon = Icons[cat.icon] || Icons.Wallet;
              return (
                <div key={cat.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Icon size={22} />
                    <span>{cat.name}</span>
                  </div>
                  <span className="text-slate-400">
                    {cat.type === "income" ? "Ingreso" : "Gasto"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
