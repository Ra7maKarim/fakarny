const notificationService = require("./notification.service");
const asyncHandler = require("../../utils/asyncHandler");

async function getMyNotifications(req, res) {
  const notifications = await notificationService.getMyNotifications(
    req.user.id,
  );

  res.status(200).json({
    success: true,
    results: notifications.length,
    data: notifications,
  });
}

async function markAsRead(req, res) {
  const notification = await notificationService.markAsRead(
    req.user.id,
    Number(req.params.id),
  );

  res.status(200).json({
    success: true,
    message: "Notification marked as read",
    data: notification,
  });
}

module.exports = {
  getMyNotifications: asyncHandler(getMyNotifications),
  markAsRead: asyncHandler(markAsRead),
};
