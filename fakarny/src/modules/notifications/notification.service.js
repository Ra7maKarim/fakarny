const dataSource = require("../../database/data-source");
const Notification = require("../../entities/Notification.entity");
const AppError = require("../../utils/AppError");

const notificationRepository = dataSource.getRepository(Notification);

async function getMyNotifications(userId) {
  return await notificationRepository.find({
    where: {
      user: { id: userId },
    },
    order: {
      createdAt: "DESC",
    },
  });
}

async function markAsRead(userId, notificationId) {
  const notification = await notificationRepository.findOne({
    where: {
      id: notificationId,
      user: { id: userId },
    },
  });

  if (!notification) {
    throw new AppError("Notification not found", 404);
  }

  notification.isRead = true;

  return await notificationRepository.save(notification);
}

module.exports = {
  getMyNotifications,
  markAsRead,
};
