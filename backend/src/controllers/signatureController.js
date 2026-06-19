const fs = require("fs");
const path = require("path");
const { PDFDocument } = require("pdf-lib");

const Signature = require("../models/Signature");
const Document = require("../models/Document");
const { v4: uuidv4 } = require("uuid");
const transporter = require("../utils/sendEmail");
const createAudit = require("../utils/createAudit");

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
    await createAudit({
      documentId,
      userId: req.user.id,
      action: "SIGNATURE_PLACED",
      ipAddress: req.ip,
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
    const document = await Document.findById(
      req.params.id
    );

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    const signature =
      await Signature.findOne({
        documentId: document._id,
      });

    if (!signature) {
      return res.status(404).json({
        message: "Signature not found",
      });
    }

    const existingPdf =
      fs.readFileSync(
        document.filePath
      );

    const pdfDoc =
      await PDFDocument.load(
        existingPdf
      );

    const pages =
      pdfDoc.getPages();

    const page =
      pages[
        signature.page - 1
      ];

    const pageHeight =
      page.getHeight();

    const signX =
      signature.x;

    const signY =
      pageHeight -
      signature.y -
      60;

    // Draw Signature Image

    if (
      signature.signatureImage
    ) {
      const base64 =
        signature.signatureImage
          .split(",")[1];

      const pngImage =
        await pdfDoc.embedPng(
          Buffer.from(
            base64,
            "base64"
          )
        );

      page.drawImage(
        pngImage,
        {
          x: signX,
          y: signY,
          width: 120,
          height: 60,
        }
      );
    }

    // Draw Timestamp closer to signature

    page.drawText(
      `Signed: ${new Date().toLocaleString()}`,
      {
        x: signX,
        y: signY - 5,
        size: 8,
      }
    );

    const pdfBytes =
      await pdfDoc.save();

    const fileName =
      `signed-${Date.now()}.pdf`;

    const outputPath =
      path.join(
        "signed-pdfs",
        fileName
      );

    fs.writeFileSync(
      outputPath,
      pdfBytes
    );

    // Update Signature

    signature.status =
      "SIGNED";

    await signature.save();

    // Update Document

    document.status =
      "SIGNED";

    await document.save();

    // Audit Log

    await createAudit({
      documentId:
        document._id,
      userId:
        signature.signer,
      action:
        "SIGNED_PDF_GENERATED",
      ipAddress:
        req.ip,
    });

    res.json({
      success: true,
      signedPdf:
        outputPath,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};

exports.generateLink = async (req, res) => {
  const signature = await Signature.findById(req.params.id);

  if (!signature) {
    return res.status(404).json({
      message: "Signature not found",
    });
  }

  signature.publicToken = uuidv4();

  await signature.save();

  const link = `http://localhost:5173/sign/${signature.publicToken}`;

  res.json({
    success: true,
    link,
  });
};

exports.getPublicSignature = async (req, res) => {
  try {
    const signature = await Signature.findOne({
      publicToken: req.params.token,
    })
      .populate("documentId")
      .populate("signer");

    if (!signature) {
      return res.status(404).json({
        message: "Signature not found",
      });
    }

    res.json({
      success: true,
      signature,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getSignatureByDocument = async (req, res) => {
  try {
    const signature = await Signature.findOne({
      documentId: req.params.documentId,
    });

    if (!signature) {
      return res.status(404).json({
        message: "Signature not found",
      });
    }

    res.json({
      success: true,
      signature,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.sendSignatureEmail = async (req, res) => {
  try {
    const { email, link } = req.body;

    await transporter.sendMail({
      from: `"Document Signature Platform" <${process.env.EMAIL_USER}>`,

      to: email,

      subject: "Document Signature Request - Document Signature Platform",

      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: auto;
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
        ">

          <h2 style="
            color:#2563eb;
            margin-bottom:10px;
          ">
            Document Signature Request
          </h2>

          <p>Hello,</p>

          <p>
            You have received a request to review and digitally sign a document through the
            <strong>Document Signature Platform</strong>.
          </p>

          <p>
            Please click the button below to securely access and sign the document.
          </p>

          <div style="
            text-align:center;
            margin:30px 0;
          ">
            <a
              href="${link}"
              style="
                background:#2563eb;
                color:white;
                text-decoration:none;
                padding:12px 24px;
                border-radius:8px;
                font-weight:bold;
                display:inline-block;
              "
            >
              Review & Sign Document
            </a>
          </div>

          <p>
            If the button does not work,
            copy and paste this URL into your browser:
          </p>

          <p style="
            word-break:break-all;
            color:#2563eb;
          ">
            ${link}
          </p>

          <hr style="
            margin:25px 0;
          ">

          <p style="
            font-size:14px;
            color:#6b7280;
          ">
            If you were not expecting this request,
            you may safely ignore this email.
          </p>

          <p style="
            font-size:14px;
            color:#6b7280;
          ">
            This is an automated message from the
            Document Signature Platform.
          </p>

          <p>
            Regards,<br>
            <strong>
              Document Signature Platform
            </strong>
          </p>

        </div>
        `,
    });

    await createAudit({
      documentId: req.body.documentId,
      userId: req.user.id,
      action: "SIGNATURE_EMAIL_SENT",
      ipAddress: req.ip,
    });

    res.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.savePublicSignature = async (req, res) => {
  try {
    const { signatureImage } = req.body;

    const signature = await Signature.findOne({
      publicToken: req.params.token,
    });

    if (!signature) {
      return res.status(404).json({
        message: "Signature not found",
      });
    }

    signature.signatureImage = signatureImage;

    signature.signatureImage = signatureImage;

    signature.status = "SIGNED";

    await signature.save();

    const document = await Document.findById(signature.documentId);

    if (document) {
      document.status = "SIGNED";

      await document.save();
    }

    await createAudit({
      documentId: signature.documentId,
      action: "PUBLIC_SIGNATURE_COMPLETED",
      ipAddress: req.ip,
    });

    res.json({
      success: true,
      message: "Document signed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.rejectSignature = async (req, res) => {
  try {
    const { reason } = req.body;

    const signature = await Signature.findOne({
      publicToken: req.params.token,
    });

    if (!signature) {
      return res.status(404).json({
        message: "Signature not found",
      });
    }

    signature.status = "REJECTED";

    signature.rejectReason = reason;

    await signature.save();
    const document = await Document.findById(signature.documentId);

    if (document) {
      document.status = "REJECTED";

      await document.save();
    }

    await createAudit({
      documentId: signature.documentId,
      action: "DOCUMENT_REJECTED",
      ipAddress: req.ip,
    });

    res.json({
      success: true,
      message: "Document rejected",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
