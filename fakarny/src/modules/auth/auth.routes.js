const express = require("express");

const authController = require("./auth.controller");

const { registerSchema, loginSchema } = require("./auth.schema");

const validate = require("../../middlewares/validate.middleware");

const router = express.Router();

router.post("/register", validate(registerSchema), authController.register);

router.post("/login", validate(loginSchema), authController.login);

module.exports = router;
