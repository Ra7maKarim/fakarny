const userService = require("./user.service");
const asyncHandler = require("../../utils/asyncHandler");

async function getMyProfile(req, res) {
  const user = await userService.getMyProfile(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
}

async function updateMyProfile(req, res) {
  const user = await userService.updateMyProfile(req.user.id, req.body);

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: user,
  });
}

async function changePassword(req, res) {
  await userService.changePassword(
    req.user.id,
    req.body.currentPassword,
    req.body.newPassword,
  );

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
}

async function deleteMyAccount(req, res) {
  await userService.deleteMyAccount(req.user.id, req.body.password);

  res.status(200).json({
    success: true,
    message: "Account deleted successfully",
  });
}

module.exports = {
  getMyProfile: asyncHandler(getMyProfile),
  updateMyProfile: asyncHandler(updateMyProfile),
  changePassword: asyncHandler(changePassword),
  deleteMyAccount: asyncHandler(deleteMyAccount),
};
