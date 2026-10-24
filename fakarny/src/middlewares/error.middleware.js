const multer = require("multer");

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File size must not exceed 5 MB",
      });
    }

    return res.status(400).json({
      success: false,
      message: "File upload failed",
    });
  }

  if (err.message === "Only PDF, JPG, PNG and WEBP files are allowed") {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message || "something went wrong",
  });
};

module.exports = errorMiddleware;
