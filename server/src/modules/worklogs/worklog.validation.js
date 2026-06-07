const Joi = require("joi");

const createWorkLogSchema = Joi.object({
  taskId: Joi.string().required(),
  description: Joi.string().required(),
  hoursWorked: Joi.number().min(0).required(),
});

const updateWorkLogSchema = Joi.object({
  description: Joi.string(),
  hoursWorked: Joi.number().min(0),
}).min(1);

module.exports = {
  createWorkLogSchema,
  updateWorkLogSchema,
};