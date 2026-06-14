const fs = require("fs");
const path = require("path");
const { PDFDocument } = require("pdf-lib");

const Signature = require("../models/Signature");
const Document = require("../models/Document");

exports.createSignature = async (req, res) => {
  try {
    const { documentId, x, y, page } = req.body;

    const signature = await Signature.create({
      documentId,
      signer: req.user.id,
      x,
      y,
      page,
    });

    res.status(201).json({
      success: true,
      signature,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.finalizeSignature = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    const signature = await Signature.findOne({
      documentId: document._id,
    });

    if (!signature) {
      return res.status(404).json({
        message: "Signature not found",
      });
    }

    const existingPdf = fs.readFileSync(document.filePath);

    const pdfDoc = await PDFDocument.load(existingPdf);

    const pages = pdfDoc.getPages();

    const page = pages[signature.page - 1];

    page.drawText("Digitally Signed", {
      x: signature.x,
      y: signature.y,
      size: 18,
    });

    page.drawText(new Date().toLocaleString(), {
      x: signature.x,
      y: signature.y - 20,
      size: 10,
    });

    const pdfBytes = await pdfDoc.save();

    const fileName = `signed-${Date.now()}.pdf`;

    const outputPath = path.join("signed-pdfs", fileName);

    fs.writeFileSync(outputPath, pdfBytes);

    document.status = "SIGNED";

    await document.save();

    res.json({
      success: true,
      signedPdf: outputPath,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
