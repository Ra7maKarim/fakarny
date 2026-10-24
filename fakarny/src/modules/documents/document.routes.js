const express = require("express");
const documentController = require("./document.controller");
const protect = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const upload = require("../../middlewares/upload.middleware");
const {
  createDocumentSchema,
  updateDocumentSchema,
} = require("./document.schema");

const router = express.Router();

router.use(protect);

router
  .route("/")
  .post(
    upload.single("file"),
    validate(createDocumentSchema),
    documentController.createDocument,
  )
  .get(documentController.getMyDocuments);

router
  .route("/:id")
  .patch(validate(updateDocumentSchema), documentController.updateDocument)
  .delete(documentController.deleteDocument);

module.exports = router;
