const { z } = require("zod");

const updateUserSchema = z
  .object({
    name: z.string().trim().min(2).max(100).optional(),
    email: z.string().trim().email().max(150).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1).max(72),
  newPassword: z.string().min(8).max(72),
});

const deleteAccountSchema = z.object({
  password: z.string().min(1).max(72),
});

module.exports = {
  updateUserSchema,
  changePasswordSchema,
  deleteAccountSchema,
};
