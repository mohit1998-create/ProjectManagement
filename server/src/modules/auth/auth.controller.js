// auth.controller.js
const asyncHandler = require(
  "../../utils/asyncHandler"
);
const { registerUser  ,loginUser } = require("./auth.service");


const register = asyncHandler(
  async (req, res) => {
    const user =
      await registerUser(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  }
);

const login = asyncHandler(
  async (req, res) => {
    const { email, password } = req.body;

    const result = await loginUser(
      email,
      password
    );

    res.json({
      success: true,
      data: result,
    });
  }
);

const profile = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
};


module.exports = {
  register,
  login,
  profile,
};