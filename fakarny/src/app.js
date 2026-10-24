const express = require("express");

const cors = require("./config/cors");
const security = require("./config/security");
const errorHandler = require("./middlewares/error.middleware");

const authRoutes = require("./modules/auth/auth.routes");
const documentRoutes = require("./modules/documents/document.routes");
const billRoutes = require("./modules/bills/bill.routes");
const reminderRoutes = require("./modules/reminders/reminder.routes");
const notificationRoutes = require("./modules/notifications/notification.routes");
const userRoutes = require("./modules/users/user.routes");

const app = express();

app.use(security);
app.use(cors);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/users", userRoutes);

app.all("/{*splat}", (req, res, next) => {
  return next(new AppError(`can't find ${req.originalUrl}`, 404));
});
app.use(errorHandler);

module.exports = app;
