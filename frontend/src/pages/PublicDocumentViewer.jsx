import { useLocation } from "react-router-dom";
import PDFViewer from "../components/PDFViewer";

export default function PublicDocumentViewer() {
  const location = useLocation();

  if (!location.state) {
    return (
      <h1 className="p-8">
        No Document Found
      </h1>
    );
  }

  return (
    <PDFViewer
      pdfUrl={location.state.pdfUrl}
      documentId={location.state.documentId}
    />
  );
}