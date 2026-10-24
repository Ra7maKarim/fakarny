const reminderService = require("./reminder.service");
const asyncHandler = require("../../utils/asyncHandler");

async function createReminder(req, res) {
  const reminder = await reminderService.createReminder(
    req.user.id,
    req.body.documentId,
    req.body.daysBefore,
  );

  res.status(201).json({
    success: true,
    message: "Reminder created successfully",
    data: reminder,
  });
}

async function getMyReminders(req, res) {
  const reminders = await reminderService.getMyReminders(req.user.id);

  res.status(200).json({
    success: true,
    results: reminders.length,
    data: reminders,
  });
}

async function deleteReminder(req, res) {
  await reminderService.deleteReminder(req.user.id, Number(req.params.id));

  res.status(200).json({
    success: true,
    message: "Reminder deleted successfully",
  });
}

module.exports = {
  createReminder: asyncHandler(createReminder),
  getMyReminders: asyncHandler(getMyReminders),
  deleteReminder: asyncHandler(deleteReminder),
};
