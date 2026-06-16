"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import { useFinance } from "../../context/finance-context";

const COLORS = ["#2563EB", "#22C55E", "#EF4444", "#F59E0B", "#8B5CF6"];

export default function ExpensesChart() {
  const { transactions } = useFinance();

  const dataMap = {};

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      if (!dataMap[t.category]) {
        dataMap[t.category] = 0;
      }

      dataMap[t.category] += Math.abs(t.amount);
    });

  const data = Object.keys(dataMap).map((key) => ({
    name: key,
    value: dataMap[key],
  }));

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
      <h2 className="font-bold mb-5 text-white">Gastos por categoría</h2>

      <div className="w-full h-[300px] min-w-0">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={95}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500">
            No hay gastos registrados
          </div>
        )}
      </div>
    </div>
  );
}
