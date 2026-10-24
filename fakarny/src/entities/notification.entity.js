
const { EntitySchema } = require("typeorm");

const Notification = new EntitySchema({
  name: "Notification",
  tableName: "notifications",

  columns: {
    id: {
      primary: true,
      generated: true,
      type: "int",
    },

    title: {
      type: "varchar",
      length: 150,
    },

    message: {
      type: "text",
    },

    isRead: {
      type: "boolean",
      default: false,
    },

    createdAt: {
      type: "timestamp",
      createDate: true,
    },
  },

  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      inverseSide: "notifications",
      joinColumn: true,
      nullable: false,
      onDelete: "CASCADE",
    },
  },
});

module.exports = Notification;
