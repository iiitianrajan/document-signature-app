const fs = require("fs");
const path = require("path");
const { PDFDocument, rgb } = require("pdf-lib");

exports.finalizeSignature = async (
  req,
  res
) => {
  try {
    const { pdfPath, x, y } = req.body;

    const existingPdf =
      fs.readFileSync(pdfPath);

    const pdfDoc =
      await PDFDocument.load(
        existingPdf
      );

    const pages =
      pdfDoc.getPages();

    const firstPage =
      pages[0];

    firstPage.drawText(
      "SIGNED",
      {
        x,
        y,
        size: 20,
        color: rgb(0, 0.6, 0),
      }
    );

    const pdfBytes =
      await pdfDoc.save();

    const outputPath =
      `uploads/signed-${Date.now()}.pdf`;

    fs.writeFileSync(
      outputPath,
      pdfBytes
    );

    res.json({
      success: true,
      file: outputPath,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};