const express = require("express");
const reminderController = require("./reminder.controller");
const protect = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const { createReminderSchema } = require("./reminder.schema");

const router = express.Router();

router.use(protect);

router
  .route("/")
  .post(validate(createReminderSchema), reminderController.createReminder)
  .get(reminderController.getMyReminders);

router.delete("/:id", reminderController.deleteReminder);

module.exports = router;
