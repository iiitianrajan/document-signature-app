import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import SignaturePad from "../components/SignaturePad";

import {
  savePublicSignature,
   rejectSignature
} from "../services/signatureService";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PublicDocumentViewer() {
  const location =
    useLocation();

  const { token } =
    useParams();

  const [signed, setSigned] =
  useState("");
    const [reason,setReason] =
useState("");

  if (!location.state) {
    return (
      <h1 className="p-8">
        No Document Found
      </h1>
    );
  }

  const handleSaveSignature =
    async (image) => {
      try {
        const res =
          await savePublicSignature(
            token,
            image
          );

        alert(
          res.data.message
        );

        setSigned("signed");
      } catch (error) {
        console.error(error);

        alert(
          error.response?.data
            ?.message ||
            "Failed to sign document"
        );
      }
    };
    const handleReject =
async()=>{

 try{

  if(!reason){
   alert(
    "Enter rejection reason"
   );
   return;
  }

  await rejectSignature(
    token,
    reason
  );

  alert(
   "Document rejected"
  );

  setSigned("rejected");

 }catch(error){

  console.error(error);

 }

};

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6">

        <h1 className="text-3xl font-bold mb-6">
          Sign Document
        </h1>

        <div className="flex justify-center border rounded-lg p-4 bg-gray-50 overflow-auto">
          <Document
            file={
              location.state.pdfUrl
            }
          >
            <Page
              pageNumber={1}
            />
          </Document>
        </div>

        {!signed && (
  <>
    <h2 className="text-xl font-semibold mt-8 mb-3">
      Draw Your Signature
    </h2>

    <SignaturePad
      onSave={handleSaveSignature}
    />
    
<div className="mt-6">
  <h2 className="text-xl font-semibold mb-3">
    Reject Document
  </h2>

  <textarea
    value={reason}
    onChange={(e) =>
      setReason(e.target.value)
    }
    placeholder="Enter rejection reason..."
    className="
      w-full
      border
      rounded-lg
      p-3
      min-h-[120px]
    "
  />

  <button
    onClick={handleReject}
    className="
      mt-3
      bg-red-600
      hover:bg-red-700
      text-white
      px-5
      py-2
      rounded-lg
    "
  >
    Reject Document
  </button>
</div>
  </>
)}

      {signed === "signed" && (
  <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-lg">
    ✅ Document Signed Successfully
  </div>
)}

{signed === "rejected" && (
  <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">
    ❌ Document Rejected Successfully
  </div>
)}

      </div>
    </div>
  );
}