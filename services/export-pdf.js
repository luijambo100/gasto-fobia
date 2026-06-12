import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportarPDF(transacciones) {
  const doc = new jsPDF();

  doc.setFontSize(20);

  doc.text("Reporte Financiero", 14, 20);

  autoTable(doc, {
    head: [["Descripción", "Categoría", "Tipo", "Monto"]],

    body: transacciones.map((t) => [
      t.description,
      t.category,

      t.type === "income" ? "Ingreso" : "Gasto",

      `S/ ${t.amount}`,
    ]),
  });

  doc.save("reporte-financiero.pdf");
}
