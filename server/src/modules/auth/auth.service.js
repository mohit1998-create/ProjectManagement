// auth.service.js

const bcrypt = require("bcryptjs");
const User = require("../users/user.model");
const { generateToken } = require("../../services/jwt.service");
const {
  createAuditLog,
} = require(
  "../auditlogs/auditlog.service"
);


const registerUser = async (data) => {
  const existingUser = await User.findOne({
    email: data.email,
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(
    data.password,
    10
  );

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: data.role,
  });

  return user;
};

module.exports = {
  registerUser,
};

const loginUser = async (
  email,
  password
) => {
  const user =
    await User.findOne({
      email,
    });

  if (!user) {
    throw new ApiError(
      401,
      "Invalid credentials"
    );
  }

  const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isMatch) {
    throw new ApiError(
      401,
      "Invalid credentials"
    );
  }

  const token =
    generateToken(user);

  await createAuditLog({
    userId: user._id,
    action: "LOGIN",
    entity: "User",
    entityId: user._id,
    newValue: {
      email: user.email,
      role: user.role,
    },
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

module.exports = {
  registerUser,
  loginUser,
};