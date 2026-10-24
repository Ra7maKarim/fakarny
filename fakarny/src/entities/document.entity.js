const { EntitySchema } = require("typeorm");

const Document = new EntitySchema({
  name: "Document",
  tableName: "documents",

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

    type: {
      type: "varchar",
      length: 50,
    },

    description: {
      type: "text",
      nullable: true,
    },

    issueDate: {
      type: "date",
      nullable: true,
    },

    expiryDate: {
      type: "date",
      nullable: true,
    },

    filePath: {
      type: "varchar",
      length: 500,
      nullable: true,
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
      inverseSide: "documents",
      joinColumn: true,
      nullable: false,
      onDelete: "CASCADE",
    },

    reminders: {
      type: "one-to-many",
      target: "Reminder",
      inverseSide: "document",
    },
  },
});

module.exports = Document;
