const mongoose = require("mongoose");

const signatureSchema = new mongoose.Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },

    signer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    x: {
      type: Number,
      required: true,
    },

    y: {
      type: Number,
      required: true,
    },

    page: {
      type: Number,
      default: 1,
    },
    publicToken: {
      type: String,
      unique: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "SIGNED", "REJECTED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Signature", signatureSchema);
