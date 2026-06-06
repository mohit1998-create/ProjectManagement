const Joi = require("joi");

const createProjectSchema =
  Joi.object({
    name: Joi.string()
      .min(3)
      .required(),

    description:
      Joi.string().allow(""),

    startDate:
      Joi.date().required(),

    endDate:
      Joi.date().required(),

    managerId:
      Joi.string().required(),
  });

  updateProjectSchema = Joi.object({    
    name: Joi.string().min(3),
    
    description: Joi.string().allow(""),

    startDate: Joi.date(),

    endDate: Joi.date(),

    status: Joi.string().valid(
      "Planning",
      "Active",
      "Completed",
      "Archived"
    ),

    managerId: Joi.string(),
  });                       

  
  module.exports = {
    createProjectSchema,
    updateProjectSchema
  };