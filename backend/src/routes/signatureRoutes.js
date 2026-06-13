const express = require("express");

const router = express.Router();

const {
  createSignature,
} = require(
  "../controllers/signatureController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

router.post(
  "/",
  protect,
  createSignature
);

module.exports = router;