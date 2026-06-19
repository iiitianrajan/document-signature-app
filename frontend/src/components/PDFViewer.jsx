import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { saveSignature, finalizePdf } from "../services/signatureService";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export default function PDFViewer({ pdfUrl, documentId }) {
  const [position, setPosition] = useState({
    x: 250,
    y: 400,
  });
  const [signedPdfUrl, setSignedPdfUrl] = useState("");

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("Saving:", {
        documentId,
        x: position.x,
        y: position.y,
      });

      const res = await saveSignature(
        {
          documentId,
          x: position.x,
          y: position.y,
          page: 1,
        },
        token,
      );

      console.log(res.data);

      alert("Signature position saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save signature");
    }
  };
  const handleGeneratePdf = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await finalizePdf(documentId, token);

      const url = `http://localhost:5000/${res.data.signedPdf}`;

      setSignedPdfUrl(url);

      alert("Signed PDF Generated Successfully!");
    } catch (error) {
      console.error(error);

      alert("Failed to Generate PDF");
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();

    const startX = e.clientX;
    const startY = e.clientY;

    const initialX = position.x;
    const initialY = position.y;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;

      const deltaY = e.clientY - startY;

      setPosition({
        x: initialX + deltaX,
        y: initialY + deltaY,
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);

      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);

    document.addEventListener("mouseup", handleMouseUp);
  };

 return (
  <div className="min-h-screen bg-slate-100 p-6">

    <div className="max-w-7xl mx-auto">

      {/* Header */}

      <div className="mb-6">
        <h1 className="text-4xl font-bold text-slate-800">
          Document Signature
        </h1>

        <p className="text-gray-500 mt-2">
          Drag the signature placeholder to the desired location,
          then generate the final signed PDF.
        </p>
      </div>

      {/* PDF Card */}

      <div className="bg-white rounded-3xl shadow-xl p-6">

        <div className="flex justify-center overflow-auto">

          <div className="relative inline-block">

           <div
  className="
    border-4
    border-blue-500
    rounded-lg
    overflow-hidden
    shadow-lg
    inline-block
    bg-white
  "
>
  <Document file={pdfUrl}>
    <Page pageNumber={1} />
  </Document>
</div>

            <div
              onMouseDown={handleMouseDown}
              className="
                absolute
                bg-yellow-400
                hover:bg-yellow-500
                px-4
                py-2
                rounded-xl
                shadow-lg
                cursor-move
                select-none
                font-semibold
                border
                border-yellow-600
              "
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                zIndex: 9999,
              }}
            >
              ✍ Sign Here
            </div>

          </div>

        </div>

      </div>

      {/* Position Info */}

      <div className="
        mt-6
        bg-white
        rounded-2xl
        shadow-md
        p-4
      ">
        <h3 className="font-semibold text-slate-700 mb-2">
          Signature Position
        </h3>

        <div className="flex gap-6 text-gray-600">
          <span>X: {position.x}</span>
          <span>Y: {position.y}</span>
        </div>
      </div>

      {/* Actions */}

      <div className="mt-6 flex flex-wrap gap-4">

        <button
          onClick={handleSave}
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-xl
            font-medium
            shadow
          "
        >
          Save Signature Position
        </button>

        <button
          onClick={handleGeneratePdf}
          className="
            bg-green-600
            hover:bg-green-700
            text-white
            px-6
            py-3
            rounded-xl
            font-medium
            shadow
          "
        >
          Generate Signed PDF
        </button>

      </div>

      {/* Signed PDF Section */}

      {signedPdfUrl && (
        <div
          className="
            mt-8
            bg-white
            rounded-2xl
            shadow-lg
            p-6
          "
        >
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Signed PDF Ready
          </h3>

          <div className="flex gap-4">

            <a
              href={signedPdfUrl}
              target="_blank"
              rel="noreferrer"
              className="
                bg-purple-600
                hover:bg-purple-700
                text-white
                px-5
                py-3
                rounded-xl
                font-medium
              "
            >
              View Signed PDF
            </a>

            <a
              href={signedPdfUrl}
              download
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-5
                py-3
                rounded-xl
                font-medium
              "
            >
              Download Signed PDF
            </a>

          </div>
        </div>
      )}

    </div>

  </div>
);
}
