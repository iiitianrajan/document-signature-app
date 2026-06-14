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
    <>
      <div className="relative inline-block">
        <Document file={pdfUrl}>
          <Page pageNumber={1} />
        </Document>

        <div
          onMouseDown={handleMouseDown}
          className="absolute bg-yellow-400 px-4 py-2 rounded-lg shadow-lg cursor-move select-none font-semibold"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            zIndex: 9999,
          }}
        >
          Sign Here
        </div>
      </div>

      <div className="mt-4 bg-gray-100 p-3 rounded-lg">
        <h2 className="font-bold">
          X: {position.x} | Y: {position.y}
        </h2>
      </div>

      <button
        onClick={handleSave}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
      >
        Save Signature Position
      </button>
      <button
        onClick={handleGeneratePdf}
        className="
  mt-4
  ml-3
  bg-green-600
  hover:bg-green-700
  text-white
  px-5
  py-2
  rounded-lg"
      >
        Generate Signed PDF
      </button>
      {signedPdfUrl && (
  <div className="mt-6">
    <a
      href={signedPdfUrl}
      target="_blank"
      rel="noreferrer"
      className="
        bg-purple-600
        hover:bg-purple-700
        text-white
        px-5
        py-2
        rounded-lg
      "
    >
      View Signed PDF
    </a>
  </div>
)}
    </>
  );
}
