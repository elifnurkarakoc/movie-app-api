const express = require("express");
const { create, index, deleteMovieList } = require("../controllers/Lists");
const validate = require("../middlewares/validate");
const authenticateToken = require("../middlewares/authenticate");
const schemas = require("../validations/Lists");

const router = express.Router();

//get
router.route("/").get(authenticateToken, index);

//create
router
  .route("/")
  .post(authenticateToken, validate(schemas.createValidation), create);

//delete
router.route("/:id").delete(authenticateToken, deleteMovieList);

module.exports = {
  router,
};
