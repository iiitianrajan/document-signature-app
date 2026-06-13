import { Document, Page, pdfjs } from "react-pdf";

// ADD THIS
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PDFViewer({ pdfUrl }) {
  return (
    <div className="relative">
      <Document
        file={pdfUrl}
        onLoadError={(error) =>
          console.error("PDF Error:", error)
        }
      >
        <Page pageNumber={1} />
      </Document>

      <div
        className="absolute bg-yellow-400 px-3 py-1 rounded"
        style={{
          left: "250px",
          top: "400px",
        }}
      >
        Sign Here
      </div>
    </div>
  );
}