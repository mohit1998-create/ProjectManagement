// auth.routes.js

const express = require("express");

const router = express.Router();
const { profile,register, login } = require("./auth.controller");
const authenticate = require("../../middleware/auth.middleware");


const validate = require(
  "../../middleware/validate.middleware"
);

const {
  registerSchema,
} = require("./auth.validation");

const {
  loginSchema,
} = require("./auth.validation");

router.get(
  "/profile",
  authenticate,
  profile
);

router.post(
  "/register",
  validate(registerSchema),
  register
);
router.post(
  "/login",
  validate(loginSchema),
  login 
);

module.exports = router;