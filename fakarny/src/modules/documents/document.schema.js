const { z } = require("zod");

const createDocumentSchema = z.object({
  title: z.string().trim().min(2).max(150),
  type: z.string().trim().min(2).max(50),
  description: z.string().trim().optional(),
  issueDate: z.string().date().optional(),
  expiryDate: z.string().date().optional(),
});

const updateDocumentSchema = createDocumentSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update",
  });

module.exports = {
  createDocumentSchema,
  updateDocumentSchema,
};
