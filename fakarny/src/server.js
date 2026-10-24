require("dotenv").config();
const AppDataSource = require("./database/data-source");
const app = require("./app");
const startReminderScheduler = require("./services/reminder-scheduler.service");

AppDataSource.initialize()
  .then(() => {
    console.log("data server has been connected...");
  })
  .catch((err) => {
    console.log("data server connection error => ", err);
  });

startReminderScheduler();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server running on ${port}...`);
});
