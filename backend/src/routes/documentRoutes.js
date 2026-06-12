const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  uploadDocument,
  getDocuments,
} = require("../controllers/documentController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getDocuments);
router.post("/upload", protect, upload.single("pdf"), uploadDocument);

module.exports = router;
