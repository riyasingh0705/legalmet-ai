exports.uploadPackagingImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a packaging image.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Packaging image received.",
      file: {
        name: req.file.originalname,
        size: req.file.size,
        mimeType: req.file.mimetype,
      },
      inspection: {
        status: "RECEIVED",
        declarations: null,
        findings: [],
      },
    });
  } catch (error) {
    next(error);
  }
};