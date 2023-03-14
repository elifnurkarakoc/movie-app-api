const express = require("express");
const {
  index,
  update,
  deleteUserAccount,
  getUserInfo,
  getUserStats,
} = require("../controllers/Users");
const authenticateToken = require("../middlewares/authenticate");
const schemas = require("../validations/Users");

const router = express.Router();

//update
//required kısmına bakıcam, unique email username kontrolü
router.route("/:id").put(authenticateToken, update); //,validate(schemas.updateValidation)

//delete
//func isimlendirmelerimi düzeltmeliyim
router.route("/:id").delete(authenticateToken, deleteUserAccount);

//get
router.route("/find/:id").get(getUserInfo);

//getall
router.route("/").get(authenticateToken, index); 

//get user stats
router.route("/stats").get(getUserStats); 

module.exports = {
  router,
};
