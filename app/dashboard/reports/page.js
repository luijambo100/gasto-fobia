"use client";

import { useFinance } from "../../../context/finance-context";

export default function ReportsPage() {
  const { transactions } = useFinance();

  return (
    <div>
      <h1
        className="
text-2xl
font-bold
mb-6
"
      >
        Reportes
      </h1>

      <div
        className="
grid
gap-4
"
      >
        <div
          className="
bg-slate-900
rounded-2xl
p-6
"
        >
          Total registros
          <br />
          <span
            className="
text-5xl
font-bold
"
          >
            {transactions.length}
          </span>
        </div>
      </div>
    </div>
  );
}
