import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function PublicSignatureViewer({ onSave }) {
  const sigRef = useRef();

  const handleSave = () => {
    const image = sigRef.current.getTrimmedCanvas().toDataURL("image/png");

    onSave(image);
  };

  return (
    <div>
      <SignatureCanvas
        ref={sigRef}
        canvasProps={{
          width: 500,
          height: 200,
          className: "border rounded",
        }}
      />
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="
 Why are you rejecting
 this document?
 "
        className="
  w-full
  border
  rounded-lg
  p-3
  mt-4
 "
      />

      <button onClick={handleSave}>Save Signature</button>
    </div>
  );
}
