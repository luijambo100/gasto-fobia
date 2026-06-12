import * as XLSX from "xlsx";

export function exportarExcel(transacciones) {
  const rows = transacciones.map((t) => ({
    Descripción: t.description,

    Categoría: t.category,

    Tipo: t.type === "income" ? "Ingreso" : "Gasto",

    Monto: t.amount,
  }));

  const wb = XLSX.utils.book_new();

  const ws = XLSX.utils.json_to_sheet(rows);

  XLSX.utils.book_append_sheet(wb, ws, "Movimientos");

  XLSX.writeFile(wb, "mis-gastos.xlsx");
}
