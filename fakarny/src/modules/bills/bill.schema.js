const { z } = require("zod");

const createBillSchema = z.object({
  title: z.string().trim().min(2).max(150),
  amount: z.coerce.number().positive(),
  dueDate: z.string().date(),
  status: z.enum(["unpaid", "paid"]).optional(),
});

const updateBillSchema = createBillSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

module.exports = { createBillSchema, updateBillSchema };
