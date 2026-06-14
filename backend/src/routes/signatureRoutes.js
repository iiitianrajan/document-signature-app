const express = require("express");

const router = express.Router();

const {
  createSignature,
  finalizeSignature,
  generateLink,
  getPublicSignature,
  getSignatureByDocument,
  sendSignatureEmail,
} = require("../controllers/signatureController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createSignature);
router.post("/finalize/:id", protect, finalizeSignature);
router.get("/link/:id", protect, generateLink);
router.get("/public/:token", getPublicSignature);
router.get("/document/:documentId", protect, getSignatureByDocument);
router.post("/send-email", protect, sendSignatureEmail);

module.exports = router;
