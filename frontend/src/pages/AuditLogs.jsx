import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuditLogs } from "../services/auditService";
import {
  ShieldCheck,
  Mail,
  FileCheck,
  PenSquare,
  Clock,
  User,
  Globe,
} from "lucide-react";

export default function AuditLogs() {
  const { documentId } = useParams();

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await getAuditLogs(
        documentId,
        token
      );

      setLogs(res.data.audits);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getActionDetails = (
    action
  ) => {
    switch (action) {
      case "SIGNATURE_PLACED":
        return {
          label:
            "Signature Position Saved",
          icon: (
            <PenSquare
              className="text-blue-500"
              size={22}
            />
          ),
          color:
            "bg-blue-100 text-blue-700",
        };

      case "SIGNED_PDF_GENERATED":
        return {
          label:
            "Signed PDF Generated",
          icon: (
            <FileCheck
              className="text-green-500"
              size={22}
            />
          ),
          color:
            "bg-green-100 text-green-700",
        };

      case "SIGNATURE_EMAIL_SENT":
        return {
          label:
            "Signature Invitation Sent",
          icon: (
            <Mail
              className="text-purple-500"
              size={22}
            />
          ),
          color:
            "bg-purple-100 text-purple-700",
        };

      default:
        return {
          label: action,
          icon: (
            <ShieldCheck
              size={22}
            />
          ),
          color:
            "bg-gray-100 text-gray-700",
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950 flex items-center justify-center">
        <h2 className="text-white text-2xl font-semibold">
          Loading Audit Trail...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950 p-8">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">
            Audit Trail
          </h1>

          <p className="text-gray-300 mt-2">
            Complete activity history
            for this document.
          </p>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-slate-800">
              Activity Log
            </h2>
          </div>

          {logs.length === 0 ? (
            <div className="p-10 text-center">
              <ShieldCheck
                size={60}
                className="mx-auto text-gray-300"
              />

              <h3 className="mt-4 text-xl font-semibold text-gray-600">
                No Audit Records Found
              </h3>
            </div>
          ) : (
            <div className="divide-y">

              {logs.map((log) => {
                const action =
                  getActionDetails(
                    log.action
                  );

                return (
                  <div
                    key={log._id}
                    className="p-6 hover:bg-slate-50 transition"
                  >
                    <div className="flex gap-4">

                      <div>
                        {action.icon}
                      </div>

                      <div className="flex-1">

                        <div className="flex justify-between items-center flex-wrap gap-2">

                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${action.color}`}
                          >
                            {
                              action.label
                            }
                          </span>

                          <span className="text-sm text-gray-500">
                            {new Date(
                              log.createdAt
                            ).toLocaleString()}
                          </span>

                        </div>

                        <div className="mt-4 grid md:grid-cols-2 gap-4">

                          <div className="flex items-center gap-2 text-gray-700">
                            <User
                              size={18}
                            />

                            <span>
                              {
                                log.userId
                                  ?.name
                              }
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-gray-700">
                            <Globe
                              size={18}
                            />

                            <span>
                              {
                                log.ipAddress
                              }
                            </span>
                          </div>

                        </div>

                      </div>

                    </div>
                  </div>
                );
              })}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}