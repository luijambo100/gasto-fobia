"use client";

import { useMemo } from "react";

import { BarChart3, TrendingUp, TrendingDown, Wallet } from "lucide-react";

import { useFinance } from "../../../context/finance-context";

import MonthlyTrendChart from "../../../components/charts/monthly-trend-chart";
import ExpensesChart from "../../../components/charts/expenses-chart";

export default function ReportsPage() {
  const { transactions, ingresos, totalGastado, balance } = useFinance();

  // TOTAL MOVIMIENTOS
  const totalMovimientos = transactions.length;

  // GASTOS POR CATEGORIA
  const categoryData = useMemo(() => {
    const grouped = {};

    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        if (!grouped[t.category]) {
          grouped[t.category] = 0;
        }

        grouped[t.category] += Math.abs(Number(t.amount || 0));
      });

    return Object.entries(grouped)
      .map(([name, amount]) => ({
        name,
        amount,
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  // GRAFICO BARRAS
  const chartData = useMemo(() => {
    const grouped = {};

    transactions.forEach((t) => {
      if (!t.date) return;

      const month = new Date(t.date).toLocaleDateString("es-PE", {
        month: "short",
      });

      if (!grouped[month]) {
        grouped[month] = {
          income: 0,
          expense: 0,
        };
      }

      grouped[month][t.type] += Math.abs(Number(t.amount || 0));
    });

    return Object.entries(grouped).map(([month, values]) => ({
      month,
      income: values.income,
      expense: values.expense,
    }));
  }, [transactions]);

  const promedioIngreso =
    ingresos / transactions.filter((t) => t.type === "income").length || 0;

  const promedioGasto =
    totalGastado / transactions.filter((t) => t.type === "expense").length || 0;

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div>
        <h1 className="text-3xl font-bold">Reportes financieros</h1>

        <p className="text-slate-400 mt-2">
          Análisis completo de ingresos y gastos
        </p>
      </div>

      {/* TARJETAS */}

      <div className="grid md:grid-cols-4 gap-5">
        <Card
          title="Movimientos"
          value={totalMovimientos}
          color="text-white"
          icon={<Wallet />}
        />

        <Card
          title="Ingresos"
          value={`S/ ${ingresos}`}
          color="text-green-500"
          icon={<TrendingUp />}
        />

        <Card
          title="Gastos"
          value={`S/ ${totalGastado}`}
          color="text-red-500"
          icon={<TrendingDown />}
        />

        <Card
          title="Balance"
          value={`S/ ${balance}`}
          color="text-blue-500"
          icon={<BarChart3 />}
        />
      </div>

      {/* GRAFICO DE BARRAS */}

      {chartData.length > 0 && (
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6">
          <h2 className="text-xl font-bold">Tendencia mensual</h2>

          <p className="text-slate-400 mb-6">
            Comparación entre ingresos y gastos
          </p>

          <MonthlyTrendChart data={chartData} />
        </div>
      )}

      {/* GASTO POR CATEGORIAS + DETALLES */}

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6">
          <h2 className="text-xl font-bold mb-5">Gastos por categorías</h2>

          <ExpensesChart />
        </div>

        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6">
          <div className="flex justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold">Detalles de categorías</h2>

              <p className="text-slate-400">Distribución de gastos</p>
            </div>

            <BarChart3 />
          </div>

          <div className="space-y-5">
            {categoryData.length ? (
              categoryData.map((cat) => {
                const porcentaje = (cat.amount / totalGastado) * 100;

                return (
                  <div key={cat.name}>
                    <div className="flex justify-between mb-2">
                      <span>{cat.name}</span>

                      <div className="text-right">
                        <span>S/ {cat.amount}</span>

                        <span className="ml-3 text-slate-400">
                          {porcentaje.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <div className="h-3 bg-slate-800 rounded-full">
                      <div
                        className="bg-blue-600 h-full rounded-full"
                        style={{
                          width: `${porcentaje}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-slate-500">No hay datos</p>
            )}
          </div>
        </div>
      </div>

      {/* RESUMEN */}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6">
          <h2 className="text-xl font-bold">Resumen ingresos</h2>

          <p className="text-green-500 text-4xl mt-6">S/ {ingresos}</p>

          <div className="mt-8 space-y-3">
            <Row label="Promedio" value={`S/ ${promedioIngreso.toFixed(2)}`} />

            <Row
              label="Movimientos"
              value={transactions.filter((t) => t.type === "income").length}
            />
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6">
          <h2 className="text-xl font-bold">Resumen gastos</h2>

          <p className="text-red-500 text-4xl mt-6">S/ {totalGastado}</p>

          <div className="mt-8 space-y-3">
            <Row label="Promedio" value={`S/ ${promedioGasto.toFixed(2)}`} />

            <Row
              label="Movimientos"
              value={transactions.filter((t) => t.type === "expense").length}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, icon, color }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
      <div className="flex justify-between">
        <span className="text-slate-400">{title}</span>

        <div className={color}>{icon}</div>
      </div>

      <h3 className={`text-3xl font-bold mt-5 ${color}`}>{value}</h3>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-400">{label}</span>

      <span>{value}</span>
    </div>
  );
}
