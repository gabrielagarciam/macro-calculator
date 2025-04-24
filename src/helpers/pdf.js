import html2pdf from "html2pdf.js";

export function downloadPDF(element, filename = "documento.pdf") {
  html2pdf()
    .set({
      filename,
      margin: 0,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "px", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] }, // <== ¡Importante!
    })
    .from(element)
    .save();
}
