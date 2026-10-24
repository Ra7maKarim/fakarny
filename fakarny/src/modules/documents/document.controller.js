const documentService = require("./document.service");
const asyncHandler = require("../../utils/asyncHandler");

async function createDocument(req, res) {
  const documentData = {
    ...req.body,
    filePath: req.file ? `uploads/documents/${req.file.filename}` : null,
  };

  const document = await documentService.createDocument(
    req.user.id,
    documentData,
  );

  res.status(201).json({
    success: true,
    message: "Document created successfully",
    data: document,
  });
}

async function getMyDocuments(req, res) {
  const documents = await documentService.getMyDocuments(req.user.id);

  res.status(200).json({
    results: documents.length,
    data: documents,
  });
}

async function updateDocument(req, res) {
  const document = await documentService.updateDocument(
    req.user.id,
    Number(req.params.id),
    req.body,
  );

  res.status(200).json({
    message: "Document updated successfully",
    data: document,
  });
}

async function deleteDocument(req, res) {
  await documentService.deleteDocument(req.user.id, Number(req.params.id));

  res.status(200).json({
    message: "Document deleted successfully",
  });
}

module.exports = {
  createDocument: asyncHandler(createDocument),
  getMyDocuments: asyncHandler(getMyDocuments),
  updateDocument: asyncHandler(updateDocument),
  deleteDocument: asyncHandler(deleteDocument),
};
