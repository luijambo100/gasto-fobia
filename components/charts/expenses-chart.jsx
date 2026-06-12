"use client"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts"

import { useFinance } from "../../context/finance-context"

const COLORS = ["#2563EB", "#22C55E", "#EF4444", "#F59E0B", "#8B5CF6"]

export default function ExpensesChart() {

  const { transactions } = useFinance()

  const dataMap = {}

  transactions
    .filter(t => t.type === "expense")
    .forEach(t => {
      if (!dataMap[t.category]) {
        dataMap[t.category] = 0
      }
      dataMap[t.category] += Math.abs(t.amount)
    })

  const data = Object.keys(dataMap).map((key) => ({
    name: key,
    value: dataMap[key]
  }))

  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 h-80">

      <h2 className="font-bold mb-4">
        Gastos por categoría
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
          >

            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}

          </Pie>

          <Tooltip />

        </PieChart>
      </ResponsiveContainer>

    </div>
  )
}