const { z } = require("zod");

const createReminderSchema = z.object({
  documentId: z.coerce.number().int().positive(),
  daysBefore: z.coerce.number().int().min(0).max(365),
});

module.exports = { createReminderSchema };
