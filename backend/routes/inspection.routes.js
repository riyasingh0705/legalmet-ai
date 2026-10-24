const express = require("express");
const multer = require("multer");
const {
  uploadPackagingImage,
} = require("../controllers/inspection.controller");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 1,
  },
  fileFilter: (req, file, callback) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error(
        "Only JPG, PNG and WebP images are allowed."
      );
      error.status = 400;
      return callback(error);
    }

    callback(null, true);
  },
});

router.post(
  "/analyze",
  upload.single("image"),
  uploadPackagingImage
);

module.exports = router;