require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dataSource = require("../../database/data-source");
const User = require("../../entities/User.entity");
const AppError = require("../../utils/AppError");

const userRepository = dataSource.getRepository(User);

async function register(name, email, password) {
  const existingUser = await userRepository.findOneBy({
    email: email.toLowerCase(),
  });

  if (existingUser) {
    throw new AppError("Email is already registered", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = userRepository.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
  });

  const savedUser = await userRepository.save(user);

  return {
    id: savedUser.id,
    name: savedUser.name,
    email: savedUser.email,
  };
}

async function login(email, password) {
  const user = await userRepository.findOneBy({
    email: email.toLowerCase(),
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
}

module.exports = {
  register,
  login,
};
