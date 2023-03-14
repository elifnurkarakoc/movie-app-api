const express = require("express");
const { login, create } = require("../controllers/Auth");
const validate = require("../middlewares/validate");
const schemas = require("../validations/Users");

const router = express.Router();

router.route("/register").post(validate(schemas.createValidation), create);
router.route("/login").post(validate(schemas.loginValidation), login);

module.exports = {
  router,
};
