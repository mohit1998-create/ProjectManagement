const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),

  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(6)
    .required(),

  role: Joi.string()
    .valid(
      "Admin",
      "ProjectManager",
      "Employee"
    )
    .required()
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(50),

  role: Joi.string().valid(
    "Admin",
    "ProjectManager",
    "Employee"
  ),

  isActive: Joi.boolean()
});

module.exports = {
  createUserSchema,
  updateUserSchema
};