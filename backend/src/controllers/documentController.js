const Document = require("../models/Document");

exports.uploadDocument = async (req, res) => {
    console.log("REQ.FILE =>", req.file);
  try {
    const document = await Document.create({
        
      owner: req.user.id,

      originalName: req.file.originalname,

      fileName: req.file.filename,

      filePath: req.file.path,

      fileSize: req.file.size,
    });

    res.status(201).json({
      success: true,
      document,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({
      owner: req.user.id,
    });

    res.status(200).json({
      success: true,
      documents,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};