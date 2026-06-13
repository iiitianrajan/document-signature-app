const Signature = require("../models/Signature");

exports.createSignature =
  async (req, res) => {
    try {
      const {
        documentId,
        x,
        y,
        page,
      } = req.body;

      const signature =
        await Signature.create({
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