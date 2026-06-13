import { useLocation, useParams } from "react-router-dom";
import PDFViewer from "../components/PDFViewer";

export default function DocumentViewer() {
  const location = useLocation();
  const { id } = useParams();

  if (!location.state?.pdfUrl) {
    return (
      <div className="p-4 text-red-500">
        PDF URL not found.
      </div>
    );
  }

  return (
    <div className="p-4">
      <PDFViewer
        pdfUrl={location.state.pdfUrl}
        documentId={id}
      />
    </div>
  );
}