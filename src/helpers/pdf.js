import html2pdf from "html2pdf.js";

export function downloadPDF(element, filename = "documento.pdf") {
  html2pdf()
    .set({
      filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    })
    .from(element)
    .save();
}
