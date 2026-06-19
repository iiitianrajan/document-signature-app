import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FileText, User, Clock, PenTool } from "lucide-react";

import { getPublicSignature } from "../services/signatureService";
import API_BASE_URL from "../config/api";

export default function PublicSign() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [signature, setSignature] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSignature();
  }, []);

  const fetchSignature = async () => {
    try {
      const res = await getPublicSignature(token);

      setSignature(res.data.signature);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950 flex justify-center items-center">
        <h1 className="text-white text-2xl font-semibold">
          Loading Signature Request...
        </h1>
      </div>
    );
  }

  if (!signature) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950 flex justify-center items-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-red-500">
            Invalid Signature Link
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950 flex justify-center items-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            Signature Request
          </h1>

          <p className="text-gray-500 mt-2">
            A document is waiting for your signature
          </p>
        </div>

        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <FileText className="text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Document</p>
              <p className="font-semibold">
                {signature.documentId.originalName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <User className="text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Signer</p>
              <p className="font-semibold">{signature.signer.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="text-yellow-600" />
            <div>
              <p className="text-sm text-gray-500">Status</p>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  signature.status === "SIGNED"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {signature.status}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => {
              const fixedPath = signature.documentId.filePath.replace(
                /\\/g,
                "/",
              );

              navigate(`/public-document/${token}`, {
                state: {
                  pdfUrl: `${API_BASE_URL}/${fixedPath}`,
                  documentId: signature.documentId._id,
                },
              });
            }}
            className="
            w-full
            flex
            items-center
            justify-center
            gap-2
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-3
            rounded-xl
            font-semibold
            transition"
          >
            <PenTool size={18} />
            Sign Document
          </button>
        </div>
      </div>
    </div>
  );
}
