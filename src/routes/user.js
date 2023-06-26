const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const { protect, } = require("../middlewares/auth");
router
  .post("/register", userController.registerUser)
  .post("/login", userController.loginUser)
  .post("/refreshtoken", userController.refreshToken)
  .get("/profile", protect, userController.profileUser);

module.exports = router;
