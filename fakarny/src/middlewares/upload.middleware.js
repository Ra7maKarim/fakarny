const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const uploadFolder = path.join(process.cwd(), "uploads", "documents");

fs.mkdirSync(uploadFolder, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, uploadFolder);
  },

  filename: function (req, file, callback) {
    const extension = path.extname(file.originalname).toLowerCase();
    const filename = crypto.randomUUID() + extension;

    callback(null, filename);
  },
});

function fileFilter(req, file, callback) {
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    return callback(new Error("Only PDF, JPG, PNG and WEBP files are allowed"));
  }

  callback(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;
