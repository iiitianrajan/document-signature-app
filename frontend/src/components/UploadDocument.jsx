import { useState } from "react";
import { uploadDocument } from "../services/documentService";

export default function UploadDocument({
  refreshDocuments,
}) {
  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Select PDF");
      return;
    }

    try {
      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "pdf",
        file
      );

      const token =
        localStorage.getItem(
          "token"
        );

      await uploadDocument(
        formData,
        token
      );

      alert(
        "PDF Uploaded Successfully"
      );

      setFile(null);

      refreshDocuments();

    } catch (error) {
      console.error(error);

      alert(
        "Upload Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 mb-8">

      <h2 className="text-2xl font-bold mb-4">
        Upload Document
      </h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setFile(
            e.target.files[0]
          )
        }
        className="mb-4 block"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="
        bg-blue-600
        hover:bg-blue-700
        text-white
        px-5
        py-2
        rounded-lg"
      >
        {loading
          ? "Uploading..."
          : "Upload PDF"}
      </button>

    </div>
  );
}