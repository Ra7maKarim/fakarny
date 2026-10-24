require("dotenv").config();
const { DataSource } = require("typeorm");
const User = require("../entities/User.entity");
const Document = require("../entities/Document.entity");
const Bill = require("../entities/Bill.entity");
const Reminder = require("../entities/Reminder.entity");
const Notification = require("../entities/Notification.entity");

const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,

  entities: [User, Document, Bill, Reminder, Notification],
});

module.exports = dataSource;
