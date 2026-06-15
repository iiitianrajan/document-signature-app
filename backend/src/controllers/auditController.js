const Audit = require("../models/Audit");

exports.getAuditLogs = async (req, res) => {
  try {
    const audits = await Audit.find({
      documentId: req.params.documentId,
    })
      .populate("userId", "name email")
      .sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      audits,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
