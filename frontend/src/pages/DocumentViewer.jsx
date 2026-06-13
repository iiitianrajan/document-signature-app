import { useLocation } from "react-router-dom";
import PDFViewer from "../components/PDFViewer";

export default function DocumentViewer() {
  const location = useLocation();

  return (
    <div className="p-4">
      <PDFViewer pdfUrl={location.state.pdfUrl} />
    </div>
  );
}