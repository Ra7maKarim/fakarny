const cron = require("node-cron");
const { LessThanOrEqual } = require("typeorm");

const dataSource = require("../database/data-source");
const Reminder = require("../entities/Reminder.entity");
const Notification = require("../entities/Notification.entity");

function startReminderScheduler() {
  cron.schedule("0 0 * * *", async () => {
    try {
      const reminderRepository = dataSource.getRepository(Reminder);
      const notificationRepository = dataSource.getRepository(Notification);

      const today = new Date().toISOString().slice(0, 10);

      const reminders = await reminderRepository.find({
        where: {
          isSent: false,
          reminderDate: LessThanOrEqual(today),
        },
        relations: {
          document: {
            user: true,
          },
        },
      });

      for (const reminder of reminders) {
        const document = reminder.document;

        await notificationRepository.save(
          notificationRepository.create({
            title: "Document Expiry Reminder",
            message: `Your document "${document.title}" is expiring on ${document.expiryDate}.`,
            user: { id: document.user.id },
          }),
        );

        reminder.isSent = true;
        await reminderRepository.save(reminder);
      }

      console.log(`Processed ${reminders.length} reminders`);
    } catch (error) {
      console.error("Reminder scheduler error:", error.message);
    }
  });

  console.log("Reminder scheduler started");
}

module.exports = startReminderScheduler;
