const Joi = require("joi");

const createValidation = Joi.object({
  title: Joi.string().required(),
  desc: Joi.string(),
  img: Joi.string(),
  imgTitle: Joi.string(),
  imgSm: Joi.string(),
  trailer: Joi.string(),
  video: Joi.string(),
  year: Joi.string(),
  limit: Joi.string(),
  genre: Joi.string(),
  isSeries: Joi.boolean(),
});

module.exports = {
  createValidation,
};
