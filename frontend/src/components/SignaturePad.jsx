import { useEffect, useRef } from "react";
import SignaturePadLib from "signature_pad";

export default function SignaturePad({
  onSave,
}) {
  const canvasRef = useRef(null);

  const signaturePad =
    useRef(null);

  useEffect(() => {
    signaturePad.current =
      new SignaturePadLib(
        canvasRef.current
      );

    return () => {
      signaturePad.current?.off();
    };
  }, []);

  const handleClear =
    () => {
      signaturePad.current.clear();
    };

  const handleSave =
    () => {
      if (
        signaturePad.current.isEmpty()
      ) {
        alert(
          "Please draw your signature"
        );
        return;
      }

      const image =
        signaturePad.current.toDataURL(
          "image/png"
        );

      onSave(image);
    };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={700}
        height={200}
        className="
          border-2
          border-dashed
          rounded-lg
          bg-white
          w-full
        "
      />

      <div className="flex gap-3 mt-4">
        <button
          onClick={
            handleClear
          }
          className="
            bg-gray-500
            hover:bg-gray-600
            text-white
            px-5
            py-2
            rounded-lg
          "
        >
          Clear
        </button>

        <button
          onClick={
            handleSave
          }
          className="
            bg-green-600
            hover:bg-green-700
            text-white
            px-5
            py-2
            rounded-lg
          "
        >
          Accept & Sign
        </button>
        
      </div>
    </div>
  );
}