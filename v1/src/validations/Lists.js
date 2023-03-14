const Joi = require("joi");

const createValidation = Joi.object({
  title: Joi.string().required(),
  type: Joi.string(),
  genre: Joi.string(),
  content: Joi.array(),
});

module.exports = {
  createValidation,
};
