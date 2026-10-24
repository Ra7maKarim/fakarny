const express = require("express");
const userController = require("./user.controller");
const protect = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");

const {
  updateUserSchema,
  changePasswordSchema,
  deleteAccountSchema,
} = require("./user.schema");

const router = express.Router();

router.use(protect);

router.get("/me", userController.getMyProfile);

router.patch("/me", validate(updateUserSchema), userController.updateMyProfile);

router.patch(
  "/change-password",
  validate(changePasswordSchema),
  userController.changePassword,
);

router.delete(
  "/me",
  validate(deleteAccountSchema),
  userController.deleteMyAccount,
);

module.exports = router;
