import { useEffect, useState } from "react";
import { getDocuments } from "../services/documentService";

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("TOKEN:", token);

      const res = await getDocuments(token);

      console.log("API RESPONSE:", res.data);

      setDocuments(res.data.documents || []);
    } catch (error) {
      console.error(
        "FETCH DOCUMENTS ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const previewDocument = (filePath) => {
    const fixedPath = filePath.replace(/\\/g, "/");

    window.open(
      `http://localhost:5000/${fixedPath}`,
      "_blank"
    );
  };

  if (loading) {
    return <h2>Loading Documents...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Documents</h1>

      <h3>Total Documents: {documents.length}</h3>

      {documents.length === 0 ? (
        <p>No documents found.</p>
      ) : (
        documents.map((doc) => (
          <div
            key={doc._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{doc.originalName}</h3>

            <p>
              <strong>Status:</strong> {doc.status}
            </p>

            <p>
              <strong>File Size:</strong>{" "}
              {doc.fileSize} bytes
            </p>

            <p>
              <strong>Path:</strong>{" "}
              {doc.filePath}
            </p>

            <button
              onClick={() =>
                previewDocument(doc.filePath)
              }
            >
              Preview PDF
            </button>
          </div>
        ))
      )}
    </div>
  );
}