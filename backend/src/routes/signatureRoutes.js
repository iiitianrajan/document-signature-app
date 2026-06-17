const express = require("express");

const router = express.Router();

const {
  createSignature,
  finalizeSignature,
  generateLink,
  getPublicSignature,
  getSignatureByDocument,
  sendSignatureEmail,
  savePublicSignature,
  rejectSignature
} = require("../controllers/signatureController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createSignature);
router.post("/finalize/:id", protect, finalizeSignature);
router.get("/link/:id", protect, generateLink);
router.get("/public/:token", getPublicSignature);
router.get("/document/:documentId", protect, getSignatureByDocument);
router.post("/send-email", protect, sendSignatureEmail);
router.post("/public-sign/:token", savePublicSignature);
router.post("/reject/:token", rejectSignature);

module.exports = router;
