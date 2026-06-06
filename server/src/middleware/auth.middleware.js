const jwt = require("jsonwebtoken");
const User = require("../modules/users/user.model");
const ApiError = require("../utils/ApiError");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(
        new ApiError(401, "Authorization header is missing")
      );
    }

    if (!authHeader.startsWith("Bearer ")) {
      return next(
        new ApiError(401, "Invalid authorization format")
      );
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(
        new ApiError(401, "User not found")
      );
    }

    if (!user.isActive) {
      return next(
        new ApiError(403, "User account is inactive")
      );
    }

    req.user = user;

    next();
  } catch (error) {
    return next(
      new ApiError(401, "Invalid or expired token")
    );
  }
};

module.exports = authenticate;