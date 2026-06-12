const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const { uploadDocument } = require("../controllers/documentController");

const { protect } = require("../middleware/authMiddleware");

router.post("/upload", protect, upload.single("pdf"), uploadDocument);

module.exports = router;
