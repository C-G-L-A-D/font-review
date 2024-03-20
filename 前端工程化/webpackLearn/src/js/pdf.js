import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
const doc = new jsPDF();

// 将html元素导出生成为pdf
const createPdf = (element) => {
  html2canvas(element).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const imgProps = doc.getImageProperties(imgData);
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    doc.save("download.pdf");
  });
};

export default createPdf;
