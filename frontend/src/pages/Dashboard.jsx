import { useEffect, useState } from "react";
import { getDocuments } from "../services/documentService";

export default function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found");
        return;
      }

      const res = await getDocuments(token);

      setDocuments(res.data.documents || []);
    } catch (error) {
      console.error(error);
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
    return (
      <h2 className="p-6">
        Loading Dashboard...
      </h2>
    );
  }

  return (
  <div className="min-h-screen bg-slate-100">
    {/* Navbar */}
    <nav className="bg-slate-900 text-white px-8 py-4 shadow-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Document Signature Platform
        </h1>

        <button
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
    </nav>

    <div className="max-w-7xl mx-auto p-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <h2 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h2>

        <p className="text-gray-500 mt-2">
          Manage, preview and sign your PDF documents securely.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-gray-500">
            Total Documents
          </h3>

          <p className="text-4xl font-bold text-blue-600 mt-2">
            {documents.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-gray-500">
            Pending Documents
          </h3>

          <p className="text-4xl font-bold text-yellow-500 mt-2">
            {
              documents.filter(
                (doc) => doc.status === "PENDING"
              ).length
            }
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-gray-500">
            Signed Documents
          </h3>

          <p className="text-4xl font-bold text-green-600 mt-2">
            {
              documents.filter(
                (doc) => doc.status === "SIGNED"
              ).length
            }
          </p>
        </div>
      </div>

      {/* Documents Section */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">
          Recent Documents
        </h2>

        {documents.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">
              No documents uploaded yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {documents.map((doc) => (
              <div
                key={doc._id}
                className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">
                      {doc.originalName}
                    </h3>

                    <p className="text-gray-500 mt-1">
                      {(doc.fileSize / 1024).toFixed(2)} KB
                    </p>

                    <p className="text-gray-500">
                      Uploaded:{" "}
                      {new Date(
                        doc.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                    {doc.status}
                  </span>
                </div>

                <button
                  onClick={() =>
                    previewDocument(
                      doc.filePath
                    )
                  }
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                  Preview PDF
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);
}