require("dotenv").config();
const jwt = require("jsonwebtoken");
const dataSource = require("../database/data-source");
const User = require("../entities/User.entity");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

async function protect(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new AppError("Please login first", 401);
  }

  const token = authorization.split(" ")[1];

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new AppError("Invalid or expired token", 401);
  }

  const userRepository = dataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id: decoded.id,
  });

  if (!user) {
    throw new AppError("User not found", 401);
  }

  req.user = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  next();
}

module.exports = asyncHandler(protect);
