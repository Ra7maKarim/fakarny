
const authService = require("./auth.service");
const asyncHandler = require("../../utils/asyncHandler");

async function register(req, res) {
  const user = await authService.register(
    req.body.name,
    req.body.email,
    req.body.password
  );

  res.status(201).json({
    message: "Account created successfully",
    data: user,
  });
}

async function login(req, res) {
  const result = await authService.login(
    req.body.email,
    req.body.password
  );

  res.status(200).json({
    message: "Login successful",
    data: result,
  });
}

module.exports = {
  register: asyncHandler(register),
  login: asyncHandler(login),
};
