const bcrypt = require("bcrypt");
const dataSource = require("../../database/data-source");
const User = require("../../entities/User.entity");
const AppError = require("../../utils/AppError");

const userRepository = dataSource.getRepository(User);

async function getMyProfile(userId) {
  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

async function updateMyProfile(userId, updateData) {
  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (updateData.email) {
    updateData.email = updateData.email.toLowerCase();

    const existingUser = await userRepository.findOneBy({
      email: updateData.email,
    });

    if (existingUser && existingUser.id !== userId) {
      throw new AppError("Email is already registered", 409);
    }
  }

  Object.assign(user, updateData);

  const savedUser = await userRepository.save(user);

  return {
    id: savedUser.id,
    name: savedUser.name,
    email: savedUser.email,
    createdAt: savedUser.createdAt,
  };
}

async function changePassword(userId, currentPassword, newPassword) {
  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isPasswordCorrect = await bcrypt.compare(
    currentPassword,
    user.password,
  );

  if (!isPasswordCorrect) {
    throw new AppError("Current password is incorrect", 401);
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await userRepository.save(user);
}

async function deleteMyAccount(userId, password) {
  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new AppError("Password is incorrect", 401);
  }

  await userRepository.remove(user);
}

module.exports = {
  getMyProfile,
  updateMyProfile,
  changePassword,
  deleteMyAccount,
};
