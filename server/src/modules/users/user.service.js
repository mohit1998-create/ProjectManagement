const bcrypt = require("bcryptjs");
const User = require("./user.model");
const ApiError = require("../../utils/ApiError");

const createUser = async (payload) => {
  const existingUser = await User.findOne({
    email: payload.email
  });

  if (existingUser) {
    throw new ApiError(
      409,
      "User already exists"
    );
  }

  payload.password =
    await bcrypt.hash(
      payload.password,
      10
    );

  const user =
    await User.create(payload);

  return user;
};

const getUsers = async ({
  page = 1,
  limit = 10,
  search,
  role,
}) => {
  const filter = {
    isActive: true,
  };

  if (role) {
    filter.role = role;
  }

  if (search) {
    filter.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        email: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const skip = (page - 1) * limit;

  const users = await User.find(filter)
    .select("-password")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .lean();

  const total = await User.countDocuments(filter);

  return {
    users,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getUserById = async (id) => {
  const user = await User.findOne({
    _id: id,
    isActive: true,
  }).select("-password");

  if (!user) {
    throw new ApiError(
      404,
      "User not found"
    );
  }

  return user;
};

const updateUser = async (
  id,
  payload
) => {

  const user =
    await User.findById(id);

  if (!user) {
    throw new ApiError(
      404,
      "User not found"
    );
  }

  if (payload.email) {
    delete payload.email;
  }

  if (payload.password) {
    delete payload.password;
  }

  const updatedUser =
    await User.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

  return updatedUser;
};

const deactivateUser = async (
  id,
  currentUserId
) => {
  if (
    currentUserId.toString() === id
  ) {
    throw new ApiError(
      400,
      "You cannot deactivate yourself"
    );
  }

  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(
      404,
      "User not found"
    );
  }

  if (!user.isActive) {
    throw new ApiError(
      400,
      "User is already deactivated"
    );
  }

  user.isActive = false;

  await user.save();

  return user;
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deactivateUser
};