const Joi = require("joi");

const createTaskSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .required(),

  description: Joi.string()
    .allow(""),

  priority: Joi.string()
    .valid(
      "Low",
      "Medium",
      "High",
      "Critical"
    ),

  deadline: Joi.date()
    .required(),

  estimatedHours:
    Joi.number().min(0),

  assignedEmployee:
    Joi.string().required(),

  projectId:
    Joi.string().required(),
});

const updateTaskSchema =
  Joi.object({
    title: Joi.string(),

    description:
      Joi.string().allow(""),

    priority: Joi.string().valid(
      "Low",
      "Medium",
      "High",
      "Critical"
    ),

    deadline: Joi.date(),

    estimatedHours:
      Joi.number(),

    assignedEmployee:
      Joi.string(),
  });

  const updateStatusSchema =
  Joi.object({
    status: Joi.string()
      .valid(
        "To Do",
        "In Progress",
        "In Review",
        "Completed",
        "Blocked"
      )
      .required(),
  });

module.exports = {
  createTaskSchema,
    updateTaskSchema,
    updateStatusSchema,
};