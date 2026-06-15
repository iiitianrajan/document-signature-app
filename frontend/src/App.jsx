import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import DocumentViewer from "./pages/DocumentViewer";
import PublicSign from "./pages/PublicSign";
import PublicDocumentViewer from "./pages/PublicDocumentViewer";
import AuditLogs from "./pages/AuditLogs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/document/:id" element={<DocumentViewer />} />
      <Route path="/sign/:token" element={<PublicSign />} />
      <Route
        path="/public-document/:token"
        element={<PublicDocumentViewer />}
      />
      <Route path="/audit/:documentId" element={<AuditLogs />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
