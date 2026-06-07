const Joi = require("joi");

const createReplySchema = Joi.object({
  message: Joi.string().trim().required(),
});

const updateReplySchema = Joi.object({
  message: Joi.string().trim().required(),
});

module.exports = {
  createReplySchema,
  updateReplySchema,
};