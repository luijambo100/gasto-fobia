"use client";

import { useFinance } from "../../context/finance-context";

import { exportarExcel } from "../../services/export-excel";

import { exportarPDF } from "../../services/export-pdf";

export default function ExportActions() {
  const { transactions } = useFinance();

  return (
    <div
      className="
flex
gap-3
"
    >
      <button
        onClick={() => exportarExcel(transactions)}
        className="
bg-green-600
px-4
py-2
rounded-xl
"
      >
        Exportar Excel
      </button>

      <button
        onClick={() => exportarPDF(transactions)}
        className="
bg-red-600
px-4
py-2
rounded-xl
"
      >
        Exportar PDF
      </button>
    </div>
  );
}
