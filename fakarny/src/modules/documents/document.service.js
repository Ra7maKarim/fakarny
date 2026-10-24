const dataSource = require("../../database/data-source");
const Document = require("../../entities/Document.entity");
const AppError = require("../../utils/AppError");

const documentRepository = dataSource.getRepository(Document);

// 1. Create document
async function createDocument(userId, documentData) {
  const document = documentRepository.create({
    ...documentData,
    user: { id: userId },
  });

  return await documentRepository.save(document);
}

// 2. Get all documents for the logged-in user
async function getMyDocuments(userId) {
  return await documentRepository.find({
    where: {
      user: { id: userId },
    },
    order: {
      createdAt: "DESC",
    },
  });
}

// 3. Update document
async function updateDocument(userId, documentId, updateData) {
  const document = await documentRepository.findOne({
    where: {
      id: documentId,
      user: { id: userId },
    },
  });

  if (!document) {
    throw new AppError("Document not found", 404);
  }

  Object.assign(document, updateData);

  return await documentRepository.save(document);
}

// 4. Delete document
async function deleteDocument(userId, documentId) {
  const document = await documentRepository.findOne({
    where: {
      id: documentId,
      user: { id: userId },
    },
  });

  if (!document) {
    throw new AppError("Document not found", 404);
  }

  await documentRepository.remove(document);
}

module.exports = {
  createDocument,
  getMyDocuments,
  updateDocument,
  deleteDocument,
};
