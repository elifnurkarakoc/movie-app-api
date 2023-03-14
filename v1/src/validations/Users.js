const Joi = require("joi");

const createValidation = Joi.object({
  username: Joi.string().required().min(3),
  password: Joi.string().required().min(8),
  email: Joi.string().email().required().min(8),
  isAdmin: Joi.boolean(),
  profilePic: Joi.string(),
});

const loginValidation = Joi.object({
  email: Joi.string().email().required().min(8),
  password: Joi.string().required().min(8),
});

const updateValidation = Joi.object({
  username: Joi.string().required().min(3),
  password: Joi.string().required().min(8),
  email: Joi.string().email().required().min(8),
});

module.exports = {
  createValidation,
  loginValidation,
  updateValidation,
};
