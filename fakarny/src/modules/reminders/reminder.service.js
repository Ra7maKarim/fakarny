const dataSource = require("../../database/data-source");
const Reminder = require("../../entities/Reminder.entity");
const Document = require("../../entities/Document.entity");
const AppError = require("../../utils/AppError");

const reminderRepository = dataSource.getRepository(Reminder);
const documentRepository = dataSource.getRepository(Document);

async function createReminder(userId, documentId, daysBefore) {
  const document = await documentRepository.findOne({
    where: {
      id: documentId,
      user: { id: userId },
    },
  });

  if (!document) {
    throw new AppError("Document not found", 404);
  }

  if (!document.expiryDate) {
    throw new AppError("This document has no expiry date", 400);
  }

  const expiryDate = new Date(`${document.expiryDate}T00:00:00Z`);
  expiryDate.setUTCDate(expiryDate.getUTCDate() - daysBefore);

  const reminderDate = expiryDate.toISOString().slice(0, 10);

  const reminder = reminderRepository.create({
    daysBefore,
    reminderDate,
    document: { id: document.id },
  });

  return await reminderRepository.save(reminder);
}

async function getMyReminders(userId) {
  return await reminderRepository
    .createQueryBuilder("reminder")
    .innerJoin("reminder.document", "document")
    .addSelect([
      "document.id",
      "document.title",
      "document.type",
      "document.expiryDate",
    ])
    .where("document.userId = :userId", { userId })
    .orderBy("reminder.reminderDate", "ASC")
    .getMany();
}

async function deleteReminder(userId, reminderId) {
  const reminder = await reminderRepository
    .createQueryBuilder("reminder")
    .innerJoin("reminder.document", "document")
    .where("reminder.id = :reminderId", { reminderId })
    .andWhere("document.userId = :userId", { userId })
    .getOne();

  if (!reminder) {
    throw new AppError("Reminder not found", 404);
  }

  await reminderRepository.remove(reminder);
}

module.exports = {
  createReminder,
  getMyReminders,
  deleteReminder,
};
