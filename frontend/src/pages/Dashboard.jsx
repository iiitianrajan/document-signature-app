import { useEffect, useState } from "react";
import { getDocuments } from "../services/documentService";
import { useNavigate } from "react-router-dom";
import UploadDocument from "../components/UploadDocument";
import { FileText, Clock, CheckCircle, LogOut, Eye } from "lucide-react";
import {
  getSignatureByDocument,
  generateLink,
  sendSignatureEmail,
} from "../services/signatureService";

export default function Dashboard() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [selectedDocumentId, setSelectedDocumentId] = useState("");
  const [filter, setFilter] = useState("ALL");

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

  const handleSendEmail = async () => {
    if (!email) {
      alert("Enter email");
      return;
    }

    if (!generatedLink) {
      alert("Generate link first");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await sendSignatureEmail(
        email,
        generatedLink,
        selectedDocumentId,
        token,
      );

      alert(res.data.message);

      setEmail("");
    } catch (error) {
      console.error(error);

      alert("Failed to send email");
    }
  };
  const previewDocument = (filePath) => {
    const fixedPath = filePath.replace(/\\/g, "/");

    window.open(`http://localhost:5000/${fixedPath}`, "_blank");
  };

  const handleGenerateLink = async (documentId) => {
    try {
      const token = localStorage.getItem("token");

      const sigRes = await getSignatureByDocument(documentId, token);

      const signatureId = sigRes.data.signature._id;

      const linkRes = await generateLink(signatureId, token);

      setGeneratedLink(linkRes.data.link);

      setSelectedDocumentId(documentId);
    } catch (error) {
      console.error(error);
      alert("Create a signature first");
    }
  };

  const pendingDocs = documents.filter(
    (doc) => doc.status === "PENDING",
  ).length;

  const signedDocs = documents.filter((doc) => doc.status === "SIGNED").length;
  const rejectedDocs = documents.filter(
    (doc) => doc.status === "REJECTED",
  ).length;

  const filteredDocuments = documents.filter((doc) => {
    if (filter === "ALL") return true;

    return doc.status === filter;
  });
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950 flex items-center justify-center">
        <h2 className="text-white text-2xl font-semibold">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950">
      {/* Navbar */}
      <nav className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Document Signature Platform
            </h1>

            <p className="text-gray-300 text-sm">
              Secure PDF Management System
            </p>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white">Welcome Back</h2>

          <p className="text-gray-300 mt-2">
            Manage, preview and digitally sign your PDF documents.
          </p>
        </div>

        {/* Stats */}
        <div
          className="grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-300">Total Documents</p>

                <h3 className="text-4xl font-bold text-blue-400 mt-2">
                  {documents.length}
                </h3>
              </div>

              <FileText size={40} className="text-blue-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-300">Pending</p>

                <h3 className="text-4xl font-bold text-yellow-400 mt-2">
                  {pendingDocs}
                </h3>
              </div>

              <Clock size={40} className="text-yellow-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-300">Signed</p>

                <h3 className="text-4xl font-bold text-green-400 mt-2">
                  {signedDocs}
                </h3>
              </div>

              <CheckCircle size={40} className="text-green-400" />
            </div>
          </div>
        </div>

        <UploadDocument refreshDocuments={fetchDocuments} />
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setFilter("ALL")}
            className="px-4 py-2 rounded-lg bg-slate-700 text-white"
          >
            All
          </button>

          <button
            onClick={() => setFilter("PENDING")}
            className="px-4 py-2 rounded-lg bg-yellow-500 text-white"
          >
            Pending
          </button>

          <button
            onClick={() => setFilter("SIGNED")}
            className="px-4 py-2 rounded-lg bg-green-600 text-white"
          >
            Signed
          </button>

          <button
            onClick={() => setFilter("REJECTED")}
            className="px-4 py-2 rounded-lg bg-red-600 text-white"
          >
            Rejected
          </button>
        </div>
        {/* Documents */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800">
              Recent Documents
            </h2>

            <span className="text-gray-500">{documents.length} Documents</span>
          </div>

          {documents.length === 0 ? (
            <div className="text-center py-12">
              <FileText size={60} className="mx-auto text-gray-300 mb-4" />

              <h3 className="text-xl font-semibold text-gray-600">
                No Documents Found
              </h3>

              <p className="text-gray-500 mt-2">
                Upload your first PDF and start collecting digital signatures
                securely.
              </p>
            </div>
          ) : (
            <div className="grid gap-5">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc._id}
                  className="border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                      <h3 className="font-bold text-lg text-slate-800">
                        {doc.originalName}
                      </h3>

                      <p className="text-gray-500 mt-1">
                        {(doc.fileSize / 1024).toFixed(2)} KB
                      </p>

                      <p className="text-gray-500">
                        Uploaded: {new Date(doc.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          doc.status === "SIGNED"
                            ? "bg-green-100 text-green-700"
                            : doc.status === "REJECTED"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {doc.status}
                      </span>

                      <button
                        onClick={() => {
                          const fixedPath = doc.filePath.replace(/\\/g, "/");

                          navigate(`/document/${doc._id}`, {
                            state: {
                              pdfUrl: `http://localhost:5000/${fixedPath}`,
                            },
                          });
                        }}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
                      >
                        <Eye size={18} />
                        Preview
                      </button>
                      <button
                        onClick={() => navigate(`/audit/${doc._id}`)}
                        className="
bg-purple-600
hover:bg-purple-700
text-white
px-4
py-2
rounded-xl"
                      >
                        Audit Trail
                      </button>
                      <button
                        onClick={() => handleGenerateLink(doc._id)}
                        className=" bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl"
                      >
                        Generate Link
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {generatedLink && (
          <div className="mt-6 p-4 bg-green-100 rounded-xl">
            <h3 className="font-bold mb-2">Public Signature Link</h3>

            <input
              value={generatedLink}
              readOnly
              className="
      w-full
      border
      p-2
      rounded"
            />

            <button
              onClick={() => navigator.clipboard.writeText(generatedLink)}
              className="
      mt-3
      bg-blue-600
      text-white
      px-4
      py-2
      rounded"
            >
              Copy Link
            </button>
            {generatedLink && (
              <div className="mt-6 border rounded-xl p-4">
                <h3 className="font-bold mb-3">Send Signature Invitation</h3>

                <input
                  type="email"
                  placeholder="Enter recipient email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
      w-full
      border
      rounded-lg
      p-3
      mb-3"
                />

                <button
                  onClick={handleSendEmail}
                  className="
      bg-green-600
      hover:bg-green-700
      text-white
      px-5
      py-2
      rounded-lg"
                >
                  Send Invitation
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
