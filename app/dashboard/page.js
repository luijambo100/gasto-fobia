"use client"

import { useFinance } from "../../context/finance-context"
import StatCard from "../../components/cards/stat-card"
import ExpensesChart from "../../components/charts/expenses-chart"

export default function DashboardPage() {

  const { ingresos, gastos, balance } = useFinance()

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold">
          Panel Principal
        </h1>
        <p className="text-gray-400">
          Resumen de tus finanzas personales
        </p>
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

        <div className="mt-6">
          <ExpensesChart />
        </div>

      </div>

    </div>
  )
}