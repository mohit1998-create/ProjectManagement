// auth.controller.js
const asyncHandler = require(
  "../../utils/asyncHandler"
);
const { registerUser } = require("./auth.service");
const { loginUser } = require("./auth.service");


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


module.exports = {
  register,
  login,
};