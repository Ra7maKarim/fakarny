const { EntitySchema } = require("typeorm");

const Bill = new EntitySchema({
  name: "Bill",
  tableName: "bills",

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

    amount: {
      type: "decimal",
      precision: 10,
      scale: 2,
    },

    dueDate: {
      type: "date",
    },

    status: {
      type: "varchar",
      length: 30,
      default: "unpaid",
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
      inverseSide: "bills",
      joinColumn: true,
      nullable: false,
      onDelete: "CASCADE",
    },
  },
});

module.exports = Bill;
