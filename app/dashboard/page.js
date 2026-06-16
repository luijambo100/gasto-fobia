"use client";

import { useFinance } from "../../context/finance-context";

import StatCard from "../../components/cards/stat-card";

import ExpensesChart from "../../components/charts/expenses-chart";

export default function DashboardPage() {
  const { ingresos, gastos, balance } = useFinance();

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div>
        <h1 className="text-2xl font-bold">Panel Principal</h1>

        <p className="text-gray-400">Resumen de tus finanzas personales</p>
      </div>

      {/* TARJETAS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Ingresos"
          value={`S/ ${ingresos}`}
          color="text-green-500"
        />

        <StatCard
          title="Gastos"
          value={`S/ ${Math.abs(gastos)}`}
          color="text-red-500"
        />

        <StatCard
          title="Balance"
          value={`S/ ${balance}`}
          color={balance >= 0 ? "text-blue-500" : "text-red-500"}
        />
      </div>

      {/* GRAFICO */}

      <div>
        <ExpensesChart />
      </div>

      {/* BLOQUE INFO */}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-900 rounded-2xl p-6">
          <h3 className="font-bold">Objetivo mensual</h3>

          <p className="text-gray-400 mt-2">Controla ingresos y gastos.</p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <h3 className="font-bold">Estado financiero</h3>

          <p className="text-gray-400 mt-2">Tus movimientos están guardados.</p>
        </div>
      </div>

      {/* RESUMEN */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 rounded-2xl p-6">Ingresos activos</div>

        <div className="bg-slate-900 rounded-2xl p-6">Control mensual</div>

        <div className="bg-slate-900 rounded-2xl p-6">Últimos movimientos</div>
      </div>
    </div>
  );
}
