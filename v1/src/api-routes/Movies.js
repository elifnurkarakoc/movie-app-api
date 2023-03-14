const express = require("express");
const {
  create,
  update,
  deleteMovieInfo,
  getMovie,
  getMovies,
  getRandomMovie,
} = require("../controllers/Movies");
const authenticateToken = require("../middlewares/authenticate");
const validate = require("../middlewares/validate");

const schemas = require("../validations/Movies");

const router = express.Router();

//get
router.route("/find/:id").get(authenticateToken,authenticateToken, getMovie);

//getAll
router.route("/").get(authenticateToken,authenticateToken, getMovies);

//get random
router.route("/random").get(authenticateToken, getRandomMovie);

//create
router.route("/").post(authenticateToken,validate(schemas.createValidation), create);

//update
router.route("/:id").put(authenticateToken, update);

//delete
router.route("/:id").delete(authenticateToken, deleteMovieInfo);

module.exports = {
  router,
};
