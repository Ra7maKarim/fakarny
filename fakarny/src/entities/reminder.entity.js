
const { EntitySchema } = require("typeorm");

const Reminder = new EntitySchema({
  name: "Reminder",
  tableName: "reminders",

  columns: {
    id: {
      primary: true,
      generated: true,
      type: "int",
    },

    daysBefore: {
      type: "int",
    },

    reminderDate: {
      type: "date",
    },

    isSent: {
      type: "boolean",
      default: false,
    },

    createdAt: {
      type: "timestamp",
      createDate: true,
    },
  },

  relations: {
    document: {
      type: "many-to-one",
      target: "Document",
      inverseSide: "reminders",
      joinColumn: true,
      nullable: false,
      onDelete: "CASCADE",
    },
  },
});

module.exports = Reminder;
