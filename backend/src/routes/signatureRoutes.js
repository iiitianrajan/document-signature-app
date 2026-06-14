const express = require("express");

const router = express.Router();

const {
  createSignature,
  finalizeSignature,
} = require("../controllers/signatureController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createSignature);
router.post("/finalize/:id", protect, finalizeSignature);

module.exports = router;
