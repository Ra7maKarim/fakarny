
const { EntitySchema } = require("typeorm");

const User = new EntitySchema({
  name: "User",
  tableName: "users",

  columns: {
    id: {
      primary: true,
      generated: true,
      type: "int",
    },

    name: {
      type: "varchar",
      length: 100,
    },

    email: {
      type: "varchar",
      length: 150,
      unique: true,
    },

    password: {
      type: "varchar",
      length: 255,
    },

    createdAt: {
      type: "timestamp",
      createDate: true,
    },
  },

  relations: {
    documents: {
      type: "one-to-many",
      target: "Document",
      inverseSide: "user",
    },

    bills: {
      type: "one-to-many",
      target: "Bill",
      inverseSide: "user",
    },

    notifications: {
      type: "one-to-many",
      target: "Notification",
      inverseSide: "user",
    },
  },
});

module.exports = User;
