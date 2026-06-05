// auth.routes.js

const express = require("express");

const router = express.Router();

const validate = require(
  "../../middleware/validate.middleware"
);

const {
  registerSchema,
} = require("./auth.validation");

router.post(
  "/register",
  validate(registerSchema),
  register
);

module.exports = router;